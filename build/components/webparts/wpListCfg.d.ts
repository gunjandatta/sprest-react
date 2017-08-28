/// <reference types="react" />
import { Types } from "gd-sprest";
import { Dropdown, IDropdownOption, PrimaryButton, TextField } from "office-ui-fabric-react";
import { IWebPartCfg, IWebPartConfigurationProps, IWebPartConfigurationState } from "../..";
import { WebPartConfigurationPanel } from ".";
/**
 * List Configuration
 */
export interface IWebPartListCfg extends IWebPartCfg {
    ListName: string;
    WebUrl: string;
}
/**
 * Properties
 */
export interface IWebPartListCfgProps extends IWebPartConfigurationProps {
    cfg: IWebPartListCfg;
}
/**
 * State
 */
export interface IWebPartListCfgState extends IWebPartConfigurationState {
    cfg: IWebPartListCfg;
    lists: Array<Types.IListQueryResult>;
    options: Array<IDropdownOption>;
}
/**
 * WebPart List Configuration
 */
export declare class WebPartListCfg extends WebPartConfigurationPanel<IWebPartListCfgProps, IWebPartListCfgState> {
    protected _query: Types.ODataQuery;
    protected _listDropdown: Dropdown;
    protected _refreshButton: PrimaryButton;
    protected _saveButton: PrimaryButton;
    protected _webUrl: TextField;
    /**
     * Constructor
     */
    constructor(props: IWebPartListCfgProps);
    /**
     * Methods
     */
    private loadLists;
    onListChanged: (state: IWebPartListCfgState, option?: IDropdownOption, idx?: number) => void;
    onListsLoaded: (newState: IWebPartListCfgState) => void;
    onRenderFooter: () => void;
    onRenderHeader: () => void;
    onRenderContents: (cfg: IWebPartListCfg) => JSX.Element;
    private onRefresh;
    private onSave;
    private updateListName;
}
