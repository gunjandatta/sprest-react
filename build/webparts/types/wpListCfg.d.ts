/// <reference types="react" />
import { Types } from "gd-sprest";
import { IDropdown, IDropdownOption, PrimaryButton, ITextField } from "office-ui-fabric-react";
import { IWebPartCfgProps, IWebPartCfgState, IWebPartCfgPanel } from ".";
/**
 * List Configuration
 */
export interface IWebPartListCfg extends Types.Helper.IWebPartCfg {
    ListName?: string;
    WebUrl?: string;
}
/**
 * List Configuration Panel
 */
export interface IWebPartListCfgPanel extends IWebPartCfgPanel {
    _query: Types.SP.ODataQuery;
    _listDropdown: IDropdown;
    _refreshButton: PrimaryButton;
    _saveButton: PrimaryButton;
    _webUrl: ITextField;
    getList: (option: IDropdownOption) => Types.SP.IListQueryResult;
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
    lists?: Array<Types.SP.IListQueryResult>;
    loadFl?: boolean;
    options?: Array<IDropdownOption>;
    selectedList?: Types.SP.IListQueryResult;
}
