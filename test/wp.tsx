import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import { Panel } from "../build";
import { DataSource, ITestItem } from "./data";
import { ItemForm } from "./itemForm";
import { TestList } from "./list";
import { IDemoCfg } from "./wpCfg";

/**
 * Properties
 */
interface Props {
    cfg: IDemoCfg;
}

/**
 * State
 */
interface State {
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
            items: []
        };

        // Load the items
        this.state.datasource.load().then((items: any) => {
            // Update the state
            this.setState({ items });
        });
    }

    /**
     * Public Interface
     */

    // Render the component
    render() {
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
                            <div className="ms-Grid-col ms-u-md12">
                                <span className="ms-fontSize-l" ref="message"></span>
                            </div>
                        </div>
                    </div>
                    <ItemForm
                        item={this.state.item}
                        listName={this.props.cfg.ListName}
                        ref="item"
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
        let itemForm: ItemForm = this.refs["item"] as ItemForm;

        // Save the item
        this.state.datasource.save(itemForm.getValues()).then((item: ITestItem) => {
            // Ensure the item exists
            if (item.existsFl) {
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
    private viewItem = (item: ITestItem) => {
        // Update the state
        this.setState({ item }, () => {
            // Show the item form
            (this.refs["panel"] as Panel).show();
        });
    }
}