import { Helper, Types } from "gd-sprest";
import { IDropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { ITextField } from "@fluentui/react/lib/TextField";
import { WebPartCfgPanel, IWebPartCfgProps, IWebPartCfgState, IWebPartCfgPanel } from ".";

/**
 * WebPart List Configuration Panel
 */
export class WebPartListCfg<Props extends IWebPartListCfgProps = IWebPartListCfgProps, State extends IWebPartListCfgState = IWebPartListCfgState> extends WebPartCfgPanel<Props, State> implements IWebPartListCfgPanel {
    _query: Types.IODataQuery;
    _listDropdown: IDropdown;
    _refreshButton: PrimaryButton;
    _saveButton: PrimaryButton;
    _webUrl: ITextField;

    getList: (option: IDropdownOption) => Types.SP.IListQuery;
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
    _query: Types.IODataQuery;
    _listDropdown: IDropdown;
    _refreshButton: PrimaryButton;
    _saveButton: PrimaryButton;
    _webUrl: ITextField;

    getList: (option: IDropdownOption) => Types.SP.IListQuery;
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
    lists?: Array<Types.SP.IListQuery>;
    loadFl?: boolean;
    options?: Array<IDropdownOption>;
    selectedList?: Types.SP.IListQuery;
}
