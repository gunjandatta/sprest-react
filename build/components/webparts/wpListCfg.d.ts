/// <reference types="react" />
import * as React from "react";
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
export declare class WebPartListCfg<Props extends IWebPartListCfgProps = IWebPartListCfgProps, State extends IWebPartListCfgState = IWebPartListCfgState> extends WebPartConfigurationPanel<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Global Variables
     */
    protected _query: Types.ODataQuery;
    protected _listDropdown: Dropdown;
    /**
     * Events
     */
    onListChanged: (state: State, option?: IDropdownOption, idx?: number) => void;
    onListsLoaded: (newState: State) => void;
    onRefresh: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    onRenderContents: (cfg: IWebPartListCfg) => JSX.Element;
    onRenderFooter: () => JSX.Element;
    onSave: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Methods
     */
    private loadLists;
    private updateListName;
}
