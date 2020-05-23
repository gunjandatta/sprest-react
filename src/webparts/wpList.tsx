import * as React from "react";
import { ContextInfo, Helper, Types, Web } from "gd-sprest";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { IWebPartListItem, IWebPartListProps, IWebPartListState } from "./types";

/**
 * WebPart List
 */
export class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends React.Component<Props, State> {
    /**
     * Global Variables
     */

    /**
     * The CAML query
     */
    protected _caml: string = null;

    /**
     * The number of seconds to refresh the data
     */
    protected _cacheTimeout: number;

    /**
     * The key used for storing the data in cache.
     */
    protected _key: string = null;

    /**
     * The OData query (Default)
     */
    protected _query: Types.IODataQuery = null;

    /**
     * Constructor
     * @param props - The webpart list properties.
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            items: null,
            lastRefresh: new Date(Date.now())
        } as State;

        // Update the cache properties
        this._key = this.props.cfg.WebPartId || "gd-sprest-items";

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

    // Component initialized event
    componentDidMount() {
        // Load the items
        this.load();
    }

    /**
     * The render container event
     * @param items - An array of webpart list items.
     */
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

    /**
     * The render item event
     * @param item - The webpart list item.
     */
    onRenderItem = (item: IWebPartListItem): JSX.Element => { return <div /> }

    /**
     * Render the component
     */
    render() {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Ensure the list name exists
            if (this.props.cfg && this.props.cfg.ListName) {
                // Return a spinner
                return (
                    <Spinner label="Loading the items..." />
                );
            }

            // Render a message
            return (
                <div>Please edit the page and configure this webpart.</div>
            );
        }

        // Return the items
        return (
            <div className={(this.props.className || "")}>
                {this.onRenderContainer(this.state.items)}
            </div>
        );
    }

    /**
     * Methods
     */

    /**
     * Method to load the list data
     */
    protected load = () => {
        // See if we are using the CAML query
        if (this._caml) { this.loadCAML(); }
        // Else, load using the ODATA query
        else { this.loadODATA(); }
    }

    /**
     * Method to load the list data using a CAML query
     */
    private loadCAML = () => {
        // See if we are targeting a different web
        if (this.props.cfg.WebUrl) {
            // Get the context information for the destination web
            // Note - Since we are using a POST request, this would be required for cross-site collection requests
            ContextInfo.getWeb(this.props.cfg.WebUrl).execute((contextInfo) => {
                // Get the web
                Web(this.props.cfg.WebUrl, { requestDigest: contextInfo.GetContextWebInformation.FormDigestValue })
                    // Get the list
                    .Lists(this.props.cfg.ListName)
                    // Query the items
                    .getItemsByQuery(this._caml)
                    // Execute the request
                    .execute(items => {
                        // Load the data
                        this.onLoadData(items);
                    });
            });
        } else {
            // Get the web
            Web(this.props.cfg.WebUrl)
                // Get the list
                .Lists(this.props.cfg.ListName)
                // Query the items
                .getItemsByQuery(this._caml)
                // Execute the request
                .execute(items => {
                    // Load the data
                    this.onLoadData(items);
                });
        }
    }

    /**
     * Method to load the list data using an ODATA query
     */
    private loadODATA = () => {
        // Get the web
        Web(this.props.cfg.WebUrl)
            // Get the list
            .Lists(this.props.cfg.ListName)
            // Get the items
            .Items()
            // Query the list
            .query(this._query)
            // Execute the request
            .execute((items) => {
                // Load the data
                this.onLoadData(items as any);
            });
    }

    /**
     * Method to update the state
     */
    private onLoadData = (items: Types.SP.IListItemCollection | { results: Array<Types.SP.IListItemQueryCollection> }) => {
        // Ensure the items exist
        if (items.results) {
            // Update the state
            this.setState({
                items: items.results as any,
                lastRefresh: new Date(Date.now())
            });
        } else {
            // Log
            console.log("[gd-sprest] Error: The list query failed.");
            console.log("[gd-sprest] " + items["response"]);

            // Update the state
            this.setState({ items: [] });
        }
    }

    /**
     * Method to refresh an item
     */
    protected refreshItem = (itemId: number | string): PromiseLike<IWebPartListItem> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Copy the odata query
            let query: Types.IODataQuery = Object.create(this._query);

            // Update the filter to query the item
            query.Filter = "ID eq " + itemId;

            // Get the web
            Web(this.props.cfg.WebUrl)
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