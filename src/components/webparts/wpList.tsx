import * as React from "react";
import { Promise } from "es6-promise";
import { ContextInfo, SPTypes, Types, Web } from "gd-sprest";
import { Spinner } from "office-ui-fabric-react";
import { IWebPartListItem, IWebPartListProps, IWebPartListState } from "../../definitions";

/**
 * WebPart List
 */
export class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends React.Component<Props, State> {
    /**
     * Global Variables
     */

    // The CAML query
    protected _caml: string = null;

    // The OData query
    protected _query: Types.ODataQuery = null;

    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            items: null
        } as State;

        // Set the default query to use ODATA
        this._query = {
            Expand: [],
            GetAllItems: false,
            OrderBy: ["Title"],
            Select: ["*"],
            Top: 500
        };
    }

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

    // Method to load the list data
    protected load = () => {
        // See if we are using the CAML query
        if (this._caml) { this.loadCAML(); }
        // Else, load using the ODATA query
        else { this.loadODATA(); }
    }

    // Method to load the list data using a CAML query
    private loadCAML = () => {
        // See if we are targeting a different web
        if (this.props.cfg.WebUrl) {
            // Get the context information for the destination web
            // Note - Since we are using a POST request, this would be required for cross-site collection requests
            ContextInfo.getWeb(this.props.cfg.WebUrl).execute((contextInfo) => {
                // Get the web
                (new Web(this.props.cfg.WebUrl, { requestDigest: contextInfo.GetContextWebInformation.FormDigestValue }))
                    // Get the list
                    .Lists(this.props.cfg.ListName)
                    // Query the items
                    .getItemsByQuery(this._caml)
                    // Execute the request
                    .execute(this.onLoadData);
            });
        } else {
            // Get the web
            (new Web(this.props.cfg.WebUrl))
                // Get the list
                .Lists(this.props.cfg.ListName)
                // Query the items
                .getItemsByQuery(this._caml)
                // Execute the request
                .execute(this.onLoadData);
        }
    }

    // Method to load the list data using an ODATA query
    private loadODATA = () => {
        // Get the web
        (new Web(this.props.cfg.WebUrl))
            // Get the list
            .Lists(this.props.cfg.ListName)
            // Get the items
            .Items()
            // Query the list
            .query(this._query)
            // Execute the request
            .execute(this.onLoadData);
    }

    // Method to update the state
    private onLoadData = (items: Types.IListItemResults | Types.IResults<Types.IListItemQueryResult>) => {
        // Ensure the items exist
        if (items.results) {
            // Update the state
            this.setState({
                items: items.results as Array<IWebPartListItem>
            });
        } else {
            // Log
            console.log("[gd-sprest] Error: The list query failed.");
            console.log("[gd-sprest] " + items["response"]);
        }
    }

    // Method to refresh an item
    protected refreshItem = (itemId: number | string): PromiseLike<IWebPartListItem> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Copy the odata query
            let query: Types.ODataQuery = Object.create(this._query);

            // Update the filter to query the item
            query.Filter = "ID eq " + itemId;

            // Get the web
            (new Web(this.props.cfg.WebUrl))
                // Get the list
                .Lists(this.props.cfg.ListName)
                // Get the items
                .Items()
                // Query the list
                .query(query)
                // Execute the request
                .execute((items) => {
                    // Ensure the item exists
                    if (items.results && items.results[0]) {
                        // Resolve the promise
                        resolve(items.results[0]);
                    } else {
                        // Reject the promise
                        reject(items["response"]);
                    }
                });
        });
    }
}