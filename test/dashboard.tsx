import * as React from "react";
import { Panel } from "../src";
import { DataSource, ITestItem } from "./data";
import { ItemForm } from "./itemForm";
import { PrimaryButton } from "office-ui-fabric-react";

/**
 * Dashboard
 */
export class Dashboard extends React.Component<null, null> {
    // Render the component
    render() {
        return (
            <div>
                <PrimaryButton onClick={this.onClick} text="Show" />
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
                    <ItemForm ref="item" />
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

        // Show the item form
        (this.refs["panel"] as Panel).show();
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
        // Save the item
        DataSource.save((this.refs["item"] as ItemForm).getValues()).then((item: ITestItem) => {
            // Update the message
            (this.refs["message"] as HTMLSpanElement).innerHTML =
                item.existsFl ? "The item was saved successfully." : "Error: " + item.response;
        });
    }
}