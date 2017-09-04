import * as React from "react";
import { SPTypes, Types, Web } from "gd-sprest";
import { Spinner } from "office-ui-fabric-react";
import { IWebPartListItem, IWebPartListProps, IWebPartListState } from "../../definitions";

/**
 * WebPart List
 */
export class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            items: null
        } as State;

        // Set the query
        this._query = {
            Expand: [],
            GetAllItems: false,
            OrderBy: ["Title"],
            Select: ["*"],
            Top: 500
        };
    }

    /**
     * Global Variables
     */

    protected _query: Types.ODataQuery = null;

    /**
     * Events
     */

    // The render container event
    onRenderContainer = (items: Array<IWebPartListItem>): JSX.Element => {
        let elItems = [];

        // Parse the items
        for (let i = 0; i < items.length; i++) {
            // Render the item
            let elItem = this.onRenderItem(items[i]);
            if (elItem) {
                // Add the item element
                elItems.push(elItem);
            }
        }

        // Render the item elements
        return <div>{elItems}</div>;
    }

    // The render item event
    onRenderItem = (item: IWebPartListItem): JSX.Element => { return <div /> }

    // Render the component
    render() {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Load the items
            this.load();

            // Return a spinner
            return (
                <Spinner label="Loading the items..." />
            );
        }

        // Return the items
        return (
            <div className={this.props.className}>
                {this.onRenderContainer(this.state.items)}
            </div>
        );
    }

    /**
     * Methods
     */

    // Method to load the documents
    protected load = () => {
        // Load the documents
        (new Web(this.props.cfg.WebUrl))
            // Get the list
            .Lists(this.props.cfg.ListName)
            // Get the items
            .Items()
            // Query the list
            .query(this._query)
            // Execute the request
            .execute(items => {
                // Ensure the items exist
                if (items.results) {
                    // Update the state
                    this.setState({
                        items: items.results
                    });
                } else {
                    // Log
                    console.log("[gd-sprest] Error: The list query failed.");
                    console.log("[gd-sprest] " + items["response"]);
                }
            });
    }
}