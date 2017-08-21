import * as React from "react";
import { PrimaryButton, Spinner } from "office-ui-fabric-react";
import { ItemForm, Panel } from "../build";
import { DataSource, ITestItem } from "./data";
import { TestList } from "./list";
import { IDemoCfg } from "./wpCfg";

/**
 * Properties
 */
export interface Props {
    cfg: IDemoCfg;
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
                    ref="list"
                />
                <Panel
                    isLightDismiss={true}
                    headerText="Test Item Form"
                    onRenderFooterContent={this.renderFooter}
                    ref="panel">
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md12">
                                <span className="ms-fontSize-l" ref="message"></span>
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
                            { name: "TestMultiChoice" },
                            { name: "TestMultiLookup" },
                            //{ name: "TestMultiUser" },
                            { name: "TestNote" },
                            { name: "TestNumberDecimal" },
                            { name: "TestNumberInteger" },
                            { name: "TestUrl" },
                            //{ name: "TestUser" }
                        ]}
                        item={this.state.item}
                        listName={this.props.cfg.ListName}
                        ref="itemForm"
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
            (this.refs["panel"] as Panel).show();
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
        let itemForm: ItemForm = this.refs["itemForm"] as ItemForm;

        // Save the item
        itemForm.save<ITestItem>().then(item => {
            // Update the message
            (this.refs["message"] as HTMLSpanElement).innerHTML =
                item.existsFl ? "The item was saved successfully." : "Error: " + item.response;
        });
    }

    // Method to view an item
    private viewItem = (item: ITestItem) => {
        // Update the state
        this.setState({ item }, () => {
            // Show the item form
            (this.refs["panel"] as Panel).show();
        });
    }
}