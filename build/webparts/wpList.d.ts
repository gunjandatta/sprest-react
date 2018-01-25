/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IWebPartListItem, IWebPartListProps, IWebPartListState } from ".";
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
     * Flag to cache the items
     */
    protected _cacheFl: boolean;
    /**
     * The number of seconds to refresh the data
     */
    protected _cacheTimeout: number;
    /**
     * The key used for storing the data in cache.
     */
    protected _key: string;
    /**
     * The OData query (Default)
     */
    protected _query: Types.SP.ODataQuery;
    /**
     * Constructor
     * @param props - The webpart list properties.
     */
    constructor(props: Props);
    /**
     * Events
     */
    componentDidMount(): void;
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
    protected refreshItem: (itemId: string | number) => PromiseLike<IWebPartListItem>;
}
