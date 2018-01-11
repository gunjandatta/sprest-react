/// <reference types="react" />
import { Types } from "gd-sprest";
import { IWebPartCfg } from "gd-sp-webpart";
import { Dropdown, IDropdownOption, PrimaryButton, TextField } from "office-ui-fabric-react";
import { IWebPartCfgProps, IWebPartCfgState, IWebPartCfgPanel } from ".";
/**
 * List Configuration
 */
export interface IWebPartListCfg extends IWebPartCfg {
    ListName?: string;
    WebUrl?: string;
}
/**
 * List Configuration Panel
 */
export interface IWebPartListCfgPanel extends IWebPartCfgPanel {
    _query: Types.ODataQuery;
    _listDropdown: Dropdown;
    _refreshButton: PrimaryButton;
    _saveButton: PrimaryButton;
    _webUrl: TextField;
    getList: (option: IDropdownOption) => Types.IListQueryResult;
    onListChanged: (state: IWebPartListCfgState, option?: IDropdownOption, idx?: number) => void;
    onListsLoaded: (newState: IWebPartListCfgState) => void;
    onRefresh: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    renderList: () => JSX.Element;
    renderSaveButton: () => JSX.Element;
    renderWebUrl: () => Array<JSX.Element>;
}
/**
 * List Configuration Properties
 */
export interface IWebPartListCfgProps extends IWebPartCfgProps {
    cfg: IWebPartListCfg;
}
/**
 * List Configuration State
 */
export interface IWebPartListCfgState extends IWebPartCfgState {
    cfg: IWebPartListCfg;
    lists?: Array<Types.IListQueryResult>;
    loadFl?: boolean;
    options?: Array<IDropdownOption>;
    selectedList?: Types.IListQueryResult;
}
/**
 * List Item
 */
export interface IWebPartListItem extends Types.IListItemQueryResult {
}
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
