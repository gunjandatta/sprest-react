import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import { Panel } from "../build";
import { DataSource, ITestItem } from "./data";
import { ItemForm } from "./itemForm";
import { TestList } from "./list";

/**
 * State
 */
interface State {
    item:ITestItem;
}

/**
 * Dashboard
 */
export class Dashboard extends React.Component<null, State> {
    /**
     * Constructor
     */
    constructor() {
        super();

        // Set the state
        this.state = {
            item: {} as ITestItem
        };
    }

    /**
     * Public Interface
     */

    // Render the component
    render() {
        return (
            <div>
                <PrimaryButton onClick={this.onClick} text="New Item" />
                <TestList viewItem={this.viewItem} ref="list" />
                <Panel
                    isLightDismiss={true}
                    headerText="Test Item Form"
                    onRenderFooterContent={this.renderFooter}
                    ref="panel">
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-md12">
                                <span className="ms-fontSize-l" ref="message"></span>
                            </div>
                        </div>
                    </div>
                    <ItemForm item={this.state.item} ref="item" />
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
                    <div className="ms-Grid-col ms-u-md2 ms-u-mdPush9">
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
        let itemForm:ItemForm = this.refs["item"] as ItemForm;

        // Save the item
        DataSource.save(itemForm.getValues()).then((item: ITestItem) => {
            // Ensure the item exists
            if(item.existsFl) {
                // Save the attachments
                itemForm.saveAttachments(item.Id).then(() => {
                    // Update the message
                    (this.refs["message"] as HTMLSpanElement).innerHTML = "The item was saved successfully.";
                });
            } else {
                // Update the message
                (this.refs["message"] as HTMLSpanElement).innerHTML = "Error: " + item.response;
            }
        });
    }

    // Method to view an item
    private viewItem = (item:ITestItem) => {
        // Update the state
        this.setState({ item }, () => {
            // Show the item form
            (this.refs["panel"] as Panel).show();
        });
    }
}