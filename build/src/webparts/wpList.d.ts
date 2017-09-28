/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IWebPartListItem, IWebPartListProps, IWebPartListState } from "../definitions";
/**
 * WebPart List
 */
export declare class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends React.Component<Props, State> {
    /**
     * Global Variables
     */
    /**
     * The CAML query
     */
    protected _caml: string;
    /**
     * The OData query (Default)
     */
    protected _query: Types.ODataQuery;
    /**
     * Constructor
     * @param props - The webpart list properties.
     */
    constructor(props: Props);
    /**
     * Events
     */
    /**
     * The render container event
     * @param items - An array of webpart list items.
     */
    onRenderContainer: (items: IWebPartListItem[]) => JSX.Element;
    /**
     * The render item event
     * @param item - The webpart list item.
     */
    onRenderItem: (item: IWebPartListItem) => JSX.Element;
    /**
     * Render the component
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to load the list data
     */
    protected load: () => void;
    /**
     * Method to load the list data using a CAML query
     */
    private loadCAML;
    /**
     * Method to load the list data using an ODATA query
     */
    private loadODATA;
    /**
     * Method to update the state
     */
    private onLoadData;
    /**
     * Method to refresh an item
     */
    protected refreshItem: (itemId: React.ReactText) => PromiseLike<IWebPartListItem>;
}
