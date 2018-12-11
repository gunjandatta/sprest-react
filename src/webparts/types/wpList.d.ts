import { Types } from "gd-sprest";
import { Component } from "react";
import { IWebPartListCfg } from ".";

/**
 * WebPart List
 */
export class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends Component<Props, State> { }

/**
 * List Item
 */
export interface IWebPartListItem extends Types.SP.IListItemQueryResult { }

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