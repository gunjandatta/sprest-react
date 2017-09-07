import * as React from "react";
import { Web, SPTypes, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, PrimaryButton, TextField, Spinner } from "office-ui-fabric-react";
import { IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState } from "../../definitions";
import { WebPartConfigurationPanel } from ".";

/**
 * WebPart List Configuration
 */
export class WebPartListCfg<Props extends IWebPartListCfgProps = IWebPartListCfgProps, State extends IWebPartListCfgState = IWebPartListCfgState> extends WebPartConfigurationPanel<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the query
        this._query = {
            OrderBy: ["Title"],
            Top: 500
        };
    }

    /**
     * Global Variables
     */
    protected _query: Types.ODataQuery = null;
    protected _listDropdown: Dropdown = null;
    protected _refreshButton: PrimaryButton = null;
    protected _saveButton: PrimaryButton = null;
    protected _webUrl: TextField = null;

    /**
     * Events
     */

    // The list change event
    onListChanged = (state: State, option?: IDropdownOption, idx?: number) => { }

    // The lists loaded event
    onListsLoaded = (newState: State) => { }

    // The refresh button click event
    onRefresh = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Update the configuration
        let cfg = this.props.cfg;
        cfg.WebUrl = this._webUrl.state.value;

        // Load the lists
        this.loadLists(cfg);
    }

    // The render contents event
    onRenderContents = (cfg: IWebPartListCfg) => {
        // See if the lists exists
        if (this.state.lists == null) {
            // Load the lists
            this.loadLists(cfg);

            // Return a loading indicator
            return (
                <Spinner label="Loading the lists..." />
            );
        }

        // Render the component
        return (
            <div>
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
                    options={this.state.options}
                    selectedKey={cfg ? cfg.ListName : ""}
                />
            </div>
        );
    }

    // Render the save button
    onRenderFooter = () => {
        // See if the lists exists
        if (this.state.lists == null) {
            return (
                <PrimaryButton
                    onClick={this.onSave}
                    ref={btn => { this._refreshButton = btn; }}
                    text="Save"
                />
            );
        }

        // Render nothing
        return null;
    }

    // The save button click event
    onSave = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Save the webpart configuration
        this.saveConfiguration(this.state.cfg);
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
                    });
                }

                // Set the new state
                let newState = {
                    cfg,
                    lists: lists.results,
                    options
                } as State;

                // Call the on lists loaded method
                this.onListsLoaded(newState);

                // Set the state
                this.setState(newState);
            });
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