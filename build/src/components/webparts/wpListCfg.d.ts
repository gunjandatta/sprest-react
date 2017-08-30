/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { Dropdown, IDropdownOption, PrimaryButton, TextField } from "office-ui-fabric-react";
import { IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState } from "../../definitions";
import { WebPartConfigurationPanel } from ".";
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
    protected _refreshButton: PrimaryButton;
    protected _saveButton: PrimaryButton;
    protected _webUrl: TextField;
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
