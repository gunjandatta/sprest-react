import * as React from "react";
import { Web, SPTypes, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, PrimaryButton, TextField, Spinner } from "office-ui-fabric-react";
import { IWebPartListCfgPanel, IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState } from "../../definitions";
import { WebPartConfigurationPanel } from ".";

/**
 * WebPart List Configuration Panel
 */
export class WebPartListCfg<Props extends IWebPartListCfgProps = IWebPartListCfgProps, State extends IWebPartListCfgState = IWebPartListCfgState> extends WebPartConfigurationPanel<Props, State> implements IWebPartListCfgPanel {
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
    _query: Types.ODataQuery = null;
    _listDropdown: Dropdown = null;
    _refreshButton: PrimaryButton = null;
    _saveButton: PrimaryButton = null;
    _webUrl: TextField = null;

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

    /**
     * Overload Methods
     */

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
                {this.renderWebUrl()}
                {this.renderList()}
            </div>
        );
    }

    // Render the save button
    onRenderFooter = () => {
        // See if the lists exists
        if (this.state.lists != null) {
            return this.renderSaveButton();
        }

        // Render nothing
        return null;
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

    // Method to render the list property
    renderList = () => {
        return (
            <Dropdown
                label="List:"
                onChanged={this.updateListName}
                ref={ddl => { this._listDropdown = ddl; }}
                options={this.state.options}
                selectedKey={this.state.cfg.ListName || ""}
            />
        );
    }

    // Method to render the save button
    renderSaveButton = () => {
        return (
            <PrimaryButton
                onClick={this.onSave}
                ref={btn => { this._refreshButton = btn; }}
                text="Save"
            />
        );
    }

    // Method to render the web url property
    renderWebUrl = () => {
        return [
            <TextField
                label="Relative Web Url:"
                key="webUrlTextField"
                ref={webUrl => { this._webUrl = webUrl; }}
                value={this.state.cfg.WebUrl || ""}
            />,
            <PrimaryButton
                key="webUrlRefreshButton"
                onClick={this.onRefresh}
                ref={btn => { this._refreshButton = btn; }}
                text="Refresh"
            />
        ];
    }

    // Method to save the webpart configuration
    private onSave = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Save the webpart configuration
        this.saveConfiguration(this.state.cfg);
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