import * as React from "react";
import { SPTypes } from "gd-sprest";
import { PrimaryButton, Spinner } from "office-ui-fabric-react";
import { ItemForm, IWebPartListCfg, Panel } from "../src";
import { DataSource, ITestItem } from "./data";
import { TestList } from "./list";

/**
 * Properties
 */
export interface Props {
    cfg: IWebPartListCfg;
}

/**
 * State
 */
export interface State {
    datasource: DataSource;
    item: ITestItem;
    items: Array<ITestItem>;
}

/**
 * Demo WebPart
 */
export class DemoWebpart extends React.Component<Props, State> {
    private _itemForm: ItemForm = null;
    private _list: TestList = null;
    private _message: HTMLSpanElement = null;
    private _panel: Panel = null;

    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            datasource: new DataSource(props.cfg),
            item: {} as ITestItem,
            items: null
        };
    }

    /**
     * Public Interface
     */

    // Render the component
    render() {
        // See if the data needs to be loaded
        if (this.state.items == null) {
            // Load the items
            this.state.datasource.load().then((items: any) => {
                // Update the state
                this.setState({ items });
            });

            // Return a spinner
            return (
                <Spinner label="Loading the list data..." />
            );
        }

        // Render the webpart
        return (
            <div>
                <PrimaryButton onClick={this.onClick} text="New Item" />
                <TestList
                    items={this.state.items}
                    viewItem={this.viewItem}
                    ref={list => { this._list = list; }}
                />
                <Panel
                    isLightDismiss={true}
                    headerText="Test Item Form"
                    onRenderFooterContent={this.renderFooter}
                    ref={panel => { this._panel = panel; }}>
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md12">
                                <span className="ms-fontSize-l" ref={message => { this._message = message; }}></span>
                            </div>
                        </div>
                    </div>
                    <ItemForm
                        fields={[
                            { name: "Attachments" },
                            { name: "Title" },
                            { name: "TestBoolean" },
                            { name: "TestChoice" },
                            { name: "TestDate" },
                            { name: "TestDateTime" },
                            { name: "TestLookup" },
                            { name: "TestManagedMetadata" },
                            { name: "TestMultiChoice" },
                            { name: "TestMultiLookup" },
                            { name: "TestMultiUser" },
                            { name: "TestNote" },
                            { name: "TestNumberDecimal" },
                            { name: "TestNumberInteger" },
                            { name: "TestUrl" },
                            { name: "TestUser" }
                        ]}
                        item={this.state.item}
                        listName={this.props.cfg.ListName}
                        ref={itemForm => { this._itemForm = itemForm; }}
                    />
                </Panel>
            </div>
        );
    }

    /**
     * Events
     */

    // The click event for the button
    private onClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Update the state
        this.setState({ item: {} as ITestItem }, () => {
            // Show the item form
            this._panel.show();
        });
    }

    /**
     * Methods
     */

    // Method to render the footer
    private renderFooter = () => {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md2 ms-mdPush9">
                        <PrimaryButton
                            onClick={this.save}
                            text="Save"
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Method to save the item
    private save = () => {
        // Save the item
        this._itemForm.save<ITestItem>().then(item => {
            // Update the message
            this._message.innerHTML =
                item.existsFl ? "The item was saved successfully." : "Error: " + item.response;
        });
    }

    // Method to view an item
    private viewItem = (item: ITestItem) => {
        // Update the state
        this.setState({ item }, () => {
            // Show the item form
            this._panel.show();
        });
    }
}