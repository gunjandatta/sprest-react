/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { Dropdown, IDropdownOption, PrimaryButton, TextField } from "office-ui-fabric-react";
import { IWebPartListCfgPanel, IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState } from "../../definitions";
import { WebPartCfgPanel } from ".";
/**
 * WebPart List Configuration Panel
 */
export declare class WebPartListCfg<Props extends IWebPartListCfgProps = IWebPartListCfgProps, State extends IWebPartListCfgState = IWebPartListCfgState> extends WebPartCfgPanel<Props, State> implements IWebPartListCfgPanel {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Global Variables
     */
    _query: Types.ODataQuery;
    _listDropdown: Dropdown;
    _refreshButton: PrimaryButton;
    _saveButton: PrimaryButton;
    _webUrl: TextField;
    /**
     * Events
     */
    onListChanged: (state: State, option?: IDropdownOption, idx?: number) => void;
    onListsLoaded: (newState: State) => void;
    onRefresh: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Overload Methods
     */
    onRenderContents: (cfg: IWebPartListCfg) => JSX.Element;
    onRenderFooter: () => JSX.Element;
    /**
     * Methods
     */
    private loadLists;
    renderList: () => JSX.Element;
    renderSaveButton: () => JSX.Element;
    renderWebUrl: () => JSX.Element[];
    private onSave;
    private updateListName;
}
