import * as React from "react";
import { Web, SPTypes, Types } from "gd-sprest";
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
export class WebPartListCfg extends WebPartConfigurationPanel<IWebPartListCfgProps, IWebPartListCfgState> {
    protected _query: Types.ODataQuery = null;
    protected _listDropdown: Dropdown = null;
    protected _refreshButton: PrimaryButton = null;
    protected _saveButton: PrimaryButton = null;
    protected _webUrl: TextField = null;

    /**
     * Constructor
     */
    constructor(props: IWebPartListCfgProps) {
        super(props);

        // Set the query
        this._query = {
            OrderBy: ["Title"],
            Top: 500
        };

        // Load the lists
        this.loadLists(props.cfg);
    }

    /**
     * Methods
     */

    // Method to load the lists for the drop down
    private loadLists = (cfg: IWebPartListCfg) => {
        // Get the web
        (new Web(cfg.WebUrl))
            // Get the lists
            .Lists()
            // Set the query
            .query(this._query)
            // Execute the request
            .execute((lists) => {
                let options: Array<IDropdownOption> = [];

                // Parse the lists
                for (let i = 0; i < lists.results.length; i++) {
                    let list = lists.results[i];

                    // Add the option
                    options.push({
                        key: list.Title,
                        text: list.Title
                    })
                }

                // Set the new state
                let newState: IWebPartListCfgState = {
                    cfg,
                    lists: lists.results,
                    options
                };

                // Call the on lists loaded method
                this.onListsLoaded(newState);

                // Set the state
                this.setState(newState);
            });
    }

    // The list change event
    onListChanged = (state: IWebPartListCfgState, option?: IDropdownOption, idx?: number) => { }

    // The lists loaded event
    onListsLoaded = (newState: IWebPartListCfgState) => { }

    // The render footer event
    onRenderFooter = () => { }

    // The render header event
    onRenderHeader = () => { }

    // The render contents event
    onRenderContents = (cfg: IWebPartListCfg) => {
        return (
            <div>
                {this.onRenderHeader()}
                <TextField
                    label="Relative Web Url:"
                    ref={webUrl => { this._webUrl = webUrl; }}
                    value={cfg ? cfg.WebUrl : ""}
                />
                <PrimaryButton
                    onClick={this.onRefresh}
                    ref={btn => { this._refreshButton = btn; }}
                    text="Refresh"
                />
                <Dropdown
                    label="List:"
                    onChanged={this.updateListName}
                    ref={ddl => { this._listDropdown = ddl; }}
                    options={this.state.lists}
                    selectedKey={cfg ? cfg.ListName : ""}
                />
                {this.onRenderFooter()}
                <PrimaryButton
                    onClick={this.onSave}
                    ref={btn => { this._refreshButton = btn; }}
                    text="Save"
                />
            </div>
        );
    }

    // The refresh button click event
    private onRefresh = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Update the configuration
        let cfg = this.props.cfg;
        cfg.WebUrl = this._webUrl.state.value;

        // Load the lists
        this.loadLists(cfg);
    }

    // The save button click event
    private onSave = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Get the configuration
        let cfg = this.state.cfg;

        // Save the webpart configuration
        this.saveConfiguration(cfg);
    }

    // Method to update the list name
    private updateListName = (option?: IDropdownOption, idx?: number) => {
        let newState = this.state;

        // Set the list name
        newState.cfg.ListName = option.text;

        // Call the change event
        this.onListChanged(newState, option, idx);

        // Update the state
        this.setState(newState);
    }
}