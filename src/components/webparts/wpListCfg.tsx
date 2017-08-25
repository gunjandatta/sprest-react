import * as React from "react";
import { Web, SPTypes } from "gd-sprest";
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
    lists: Array<IDropdownOption>;
}

/**
 * WebPart List Configuration
 */
export class WebPartListCfg extends WebPartConfigurationPanel<IWebPartListCfgProps, IWebPartListCfgState> {
    /**
     * Constructor
     */
    constructor(props: IWebPartListCfgProps) {
        super(props);

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
            .query({
                OrderBy: ["Title"],
                Top: 500
            })
            // Execute the request
            .execute((lists) => {
                let options: Array<IDropdownOption> = [];

                // Parse the lists
                for (let i = 0; i < lists.results.length; i++) {
                    let list = lists.results[i];

                    // Add the option
                    options.push({
                        key: list.Id,
                        text: list.Title
                    })
                }

                // Set the state
                this.setState({
                    cfg,
                    lists: options
                });
            });
    }

    // Method to render the panel content
    onRenderContents = (cfg: IWebPartListCfg) => {
        return (
            <div>
                <TextField
                    label="Relative Web Url:"
                    ref="webUrl"
                    value={cfg ? cfg.WebUrl : ""}
                />
                <PrimaryButton text="Refresh" onClick={this.onRefresh} />
                <Dropdown
                    label="List:"
                    onChanged={this.updateListName}
                    options={this.state.lists}
                    selectedKey={cfg ? cfg.ListName : ""}
                />
                <PrimaryButton text="Save" onClick={this.onSave} />
            </div>
        );
    }

    // The refresh button click event
    private onRefresh = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Update the configuration
        let cfg = this.props.cfg;
        cfg.WebUrl = (this.refs["webUrl"] as TextField).state.value;

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

        // Update the state
        this.setState(newState);
    }
}