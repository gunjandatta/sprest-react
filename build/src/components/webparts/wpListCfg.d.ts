/// <reference types="react" />
import { Types } from "gd-sprest";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react";
import { IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from "../..";
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
export interface IWebPartListCfgProps extends IWebPartCfgProps {
    cfg: IWebPartListCfg;
}
/**
 * State
 */
export interface IWebPartListCfgState extends IWebPartCfgState {
    cfg: IWebPartListCfg;
    lists?: Array<Types.IListQueryResult>;
    options?: Array<IDropdownOption>;
}
/**
 * WebPart List Configuration
 */
export declare class WebPartListCfg extends WebPartConfigurationPanel<IWebPartListCfgProps, IWebPartListCfgState> {
    /**
     * Constructor
     */
    constructor(props: IWebPartListCfgProps);
    /**
     * Global Variables
     */
    protected _query: Types.ODataQuery;
    protected _listDropdown: Dropdown;
    /**
     * Events
     */
    onListChanged: (state: IWebPartListCfgState, option?: IDropdownOption, idx?: number) => void;
    onListsLoaded: (newState: IWebPartListCfgState) => void;
    onRenderFooter: () => JSX.Element;
    /**
     * Methods
     */
    private loadLists;
    onRenderContents: (cfg: IWebPartListCfg) => JSX.Element;
    private onRefresh;
    private onSave;
    private updateListName;
}
