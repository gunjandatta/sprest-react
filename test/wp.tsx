import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Panel, IPanel } from "office-ui-fabric-react/lib/Panel";
import { Components, WebParts } from "../src";
import { WebParts as WPTypes } from "../src/typings";

/**
 * List Item Information
 */
export interface IListItem extends Types.SP.IListItemQuery {
    Attachments?: boolean;
    TestBoolean?: boolean;
    TestChoice?: string;
    TestDate?: string;
    TestDateTime?: string;
    TestLookup?: Types.SP.FieldLookupValue;
    TestLookupId?: string | number;
    TestMultiChoice?: string;
    TestMultiLookup?: string;
    TestMultiLookupId?: string;
    TestMultiUser?: { results: Array<number> };
    TestMultiUserId?: Array<number>;
    TestNote?: string;
    TestNumberDecimal?: number;
    TestNumberInteger?: number;
    TestUrl?: Types.SP.FieldUrlValue;
    TestUser?: Types.SP.Data.UserInfoItem;
    TestUserId?: string | number;
    Title?: string;
}

/**
 * State
 */
export interface IListWebPartState extends WPTypes.IWebPartSearchState {
    controlMode?: number;
    errorMessage?: string;
    item?: IListItem;
}

/**
 * List WebPart
 */
export class ListWebpart extends WebParts.WebPartSearch<WPTypes.IWebPartSearchProps, IListWebPartState> {
    private _itemForm: Components.ItemForm = null;
    private _panel: IPanel = null;

    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        // Enable caching
        this._cacheFl = true;

        // Update the query
        this._query.Expand = ["AttachmentFiles", "TestLookup", "TestMultiLookup", "TestMultiUser", "TestUser"];
        this._query.OrderBy = ["Title"];
        this._query.Select = ["*", "Attachments", "AttachmentFiles", "TestLookup/ID", "TestLookup/Title", "TestMultiLookup/ID", "TestMultiLookup/Title", "TestMultiUser/ID", "TestMultiUser/Title", "TestUser/ID", "TestUser/Title"];
    }

    // The render container event
    onRenderContainer = (items) => {
        let elItems = [];

        // Ensure items exist
        if (items && items.length > 0) {
            // Parse the items
            for (let i = 0; i < items.length; i++) {
                // Add the item
                elItems.push(this.onRenderItem(items[i]));
            }

            // Return the container
            return (
                <div className="list">
                    {elItems}
                    <div className="list-row" key="item_form">
                        <Panel
                            headerText="Item Form"
                            onRenderFooterContent={this.renderFooter}
                            componentRef={panel => { this._panel = panel; }}>
                            <div className="">{this.state.errorMessage || ""}</div>
                            <Components.ItemForm
                                cacheKey="SPReactDemoListForm"
                                controlMode={this.state.controlMode}
                                item={this.state.item}
                                listName={this.props.cfg.ListName}
                                ref={form => { this._itemForm = form; }}
                                showAttachments={true}
                            />
                        </Panel>
                    </div>
                </div>
            );
        }

        // Not items exist
        return (
            <div className="empty-list">No items exist...</div>
        );
    }

    // The render item event
    onRenderItem = (item: IListItem) => {
        // Return the item
        return (
            <div className="list-row" key={"item_" + item.Id}>
                <div className="list-col-button">
                    <PrimaryButton text="View" data-itemid={item.Id} onClick={this.viewItem} />
                </div>
                <div className="list-col-button">
                    <PrimaryButton text="Edit" data-itemid={item.Id} onClick={this.editItem} />
                </div>
                <div className="list-col">
                    {item.Title ? item.Title : ""}
                </div>
                <div className="list-col">
                    {item.TestChoice ? item.TestChoice : ""}
                </div>
                <div className="list-col">
                    {item.TestDate ? item.TestDate : ""}
                </div>
                <div className="list-col">
                    {item.TestUrl ? item.TestUrl.Description : ""}
                </div>
                <div className="list-col">
                    {item.TestUser ? item.TestUser.Title : ""}
                </div>
            </div>
        );
    }

    /**
     * Methods
     */

    // Method to edit the item
    private editItem = (el: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        el.preventDefault();

        // Clear the selected item
        this.setState({
            controlMode: SPTypes.ControlMode.Edit,
            item: this.getItem(parseInt(el.currentTarget.getAttribute("data-itemid")))
        }, () => {
            // Show the panel
            this._panel.open();
        });
    }

    // Method to get the item
    private getItem = (itemId) => {
        // Parse the items
        for (let i = 0; i < this.state.items.length; i++) {
            let item = this.state.items[i];

            // See if this is the target item
            if (itemId == item.Id) {
                // Return the item
                return item;
            }
        }

        // Item not found
        return null;
    }

    // Method to render the footer
    private renderFooter = () => {
        return (
            <div className="save-button">
                <PrimaryButton
                    onClick={this.save}
                    text="Save"
                />
            </div>
        );
    }

    // Method to save the item
    private save = () => {
        // Show a save dialog
        window["SP"].SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.showWaitScreenWithNoClose", "Saving the Item", "This dialog will close after the request completes.");

        // Save the item
        let a
        this._itemForm.save<IListItem>().then(item => {
            // Close the dialog
            window["SP"].SOD.execute("sp.ui.dialog.js", "SP.UI.ModalDialog.commonModalDialogClose");
        });
    }

    // Method to view the item
    private viewItem = (el: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        el.preventDefault();

        // Clear the selected item
        this.setState({
            controlMode: SPTypes.ControlMode.Display,
            item: this.getItem(parseInt(el.currentTarget.getAttribute("data-itemid")))
        }, () => {
            // Show the panel
            this._panel.open();
        });
    }
}