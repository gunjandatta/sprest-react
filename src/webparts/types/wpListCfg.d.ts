import { Helper, SP } from "gd-sprest";
import {
    IDropdown, IDropdownOption,
    PrimaryButton,
    ITextField
} from "office-ui-fabric-react";
import { WebPartCfgPanel, IWebPartCfgProps, IWebPartCfgState, IWebPartCfgPanel } from ".";

/**
 * WebPart List Configuration Panel
 */
export class WebPartListCfg<Props extends IWebPartListCfgProps = IWebPartListCfgProps, State extends IWebPartListCfgState = IWebPartListCfgState> extends WebPartCfgPanel<Props, State> implements IWebPartListCfgPanel {
    _query: SP.ODataQuery;
    _listDropdown: IDropdown;
    _refreshButton: PrimaryButton;
    _saveButton: PrimaryButton;
    _webUrl: ITextField;

    getList: (option: IDropdownOption) => SP.IListQueryResult;
    onListChanged: (state: IWebPartListCfgState, option?: IDropdownOption, idx?: number) => void;
    onListsLoaded: (newState: IWebPartListCfgState) => void;
    onRefresh: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    renderList: () => JSX.Element;
    renderSaveButton: () => JSX.Element;
    renderWebUrl: () => Array<JSX.Element>;
}

/**
 * List Configuration Panel
 */
export interface IWebPartListCfgPanel extends IWebPartCfgPanel {
    _query: SP.ODataQuery;
    _listDropdown: IDropdown;
    _refreshButton: PrimaryButton;
    _saveButton: PrimaryButton;
    _webUrl: ITextField;

    getList: (option: IDropdownOption) => SP.IListQueryResult;
    onListChanged: (state: IWebPartListCfgState, option?: IDropdownOption, idx?: number) => void;
    onListsLoaded: (newState: IWebPartListCfgState) => void;
    onRefresh: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    renderList: () => JSX.Element;
    renderSaveButton: () => JSX.Element;
    renderWebUrl: () => Array<JSX.Element>;
}

/**
 * List Configuration
 */
export interface IWebPartListCfg extends Helper.IWebPartCfg {
    ListName?: string;
    WebUrl?: string;
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
    lists?: Array<SP.IListQueryResult>;
    loadFl?: boolean;
    options?: Array<IDropdownOption>;
    selectedList?: SP.IListQueryResult;
}
