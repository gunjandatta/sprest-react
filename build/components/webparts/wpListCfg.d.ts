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
    /**
     * The list change event
     * @param state - The current state, updates to this object will be saved.
     * @param option - The dropdown option.
     * @param idx - The dropdown option index.
     */
    onListChanged: (state: State, option?: IDropdownOption, idx?: number) => void;
    /**
     * The lists loaded event
     * @param newState - The new state, updates to this object will be saved.
     */
    onListsLoaded: (newState: State) => void;
    /**
     * The refresh button click event
     * @param ev - The button click event.
     */
    onRefresh: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Overload Methods
     */
    /**
     * The render contents event
     * @param cfg - The webpart list configuration.
     */
    onRenderContents: (cfg: IWebPartListCfg) => JSX.Element;
    /**
     * The render footer event
     */
    onRenderFooter: () => JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to load the lists for the drop down
     */
    private loadLists;
    /**
     * Method to render the list property
     */
    renderList: () => JSX.Element;
    /**
     * Method to render the save button
     */
    renderSaveButton: () => JSX.Element;
    /**
     * Method to render the web url property
     */
    renderWebUrl: () => JSX.Element[];
    /**
     * Method to save the webpart configuration
     */
    private onSave;
    /**
     * Method to update the list name
     */
    private updateListName;
}
