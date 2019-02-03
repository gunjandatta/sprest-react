import { IODataQuery, SP } from "gd-sprest";
import { Component } from "react";
import { IWebPartListCfg } from ".";

/**
 * WebPart List
 */
export class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends Component<Props, State> {

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
    protected _query: IODataQuery;
}

/**
 * List Item
 */
export interface IWebPartListItem extends SP.IListItemQuery { }

/**
 * List Properties
 */
export interface IWebPartListProps {
    /** Flag to store the items in local cache. (False by default) */
    cacheItemsFl?: boolean;

    /** The number of seconds to refresh the cached items. (Default: 300) */
    cacheTimeout?: number;

    /** The webpart configuration. */
    cfg: IWebPartListCfg;

    /** The class name to apply to the webpart. */
    className?: string;
}

/**
 * List State
 */
export interface IWebPartListState {
    items?: Array<IWebPartListItem>;
    lastRefresh?: Date;
}