/// <reference types="react" />
import { Types } from "gd-sprest";
import { Dropdown, IDropdownOption, PrimaryButton, TextField } from "office-ui-fabric-react";
import { IWebPartCfgProps, IWebPartCfgState, IWebPartCfgPanel } from ".";
/**
 * List Configuration
 */
export interface IWebPartListCfg extends Types.Helper.WebPart.IWebPartCfg {
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
