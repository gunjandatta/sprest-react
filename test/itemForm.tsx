import * as React from "react";
import { Label, PrimaryButton } from "office-ui-fabric-react";
import { ITestItem } from "./data";
import { Field, Fields } from "../build";

/**
 * Properties
 */
export interface Props {
    item?: ITestItem
    listName: string;
}

/**
 * Item Form
 */
export class ItemForm extends React.Component<Props, null> {
    /**
     * Public Interface
     */

    // Method to get the form values
    getValues = (): ITestItem => {
        let item: ITestItem = this.props.item || {} as ITestItem;

        // Parse the references
        for (let fieldName in this.refs) {
            let ref = this.refs[fieldName];

            // See if this is a field
            if (ref instanceof Field) {
                // Update the item value
                item[fieldName] = (ref as Field).state.value;
            }
        }

        // Return the item
        return item;
    }

    // Render the component
    render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    {this.renderForm()}
                </div>
            </div>
        );
    }

    // Method to save the item attachments
    saveAttachments = (itemId: number) => {
        // Save the attachments
        return (this.refs["attachments"] as Fields.FieldAttachments).save(itemId);
    }

    /**
     * Methods
     */

    // Method to render the item form
    private renderForm = () => {
        let item: ITestItem = this.props.item || {} as ITestItem;
        let listName = this.props.listName;
        return (
            <div className="ms-Grid-col ms-u-md12">
                <Fields.FieldAttachments
                    files={item.AttachmentFiles}
                    listName={listName}
                    ref="attachments"
                />
                <Field
                    defaultValue={item.Title}
                    listName={listName}
                    name="Title"
                    ref="Title"
                />
                <Field
                    defaultValue={item.TestBoolean}
                    listName={listName}
                    name="TestBoolean"
                    ref="TestBoolean"
                />
                <Field
                    defaultValue={item.TestChoice}
                    listName={listName}
                    name="TestChoice"
                    ref="TestChoice"
                />
                <Field
                    defaultValue={item.TestDate}
                    listName={listName}
                    name="TestDate"
                    ref="TestDate"
                />
                <Field
                    defaultValue={item.TestDateTime}
                    listName={listName}
                    name="TestDateTime"
                    ref="TestDateTime"
                />
                <Field
                    defaultValue={item.TestLookup}
                    listName={listName}
                    name="TestLookup"
                    ref="TestLookupId"
                />
                <Field
                    defaultValue={item.TestMultiChoice}
                    listName={listName}
                    name="TestMultiChoice"
                    ref="TestMultiChoice"
                />
                <Field
                    defaultValue={item.TestMultiLookup}
                    listName={listName}
                    name="TestMultiLookup"
                    ref="TestMultiLookupId"
                />
                <Field
                    defaultValue={item.TestMultiUser}
                    listName={listName}
                    name="TestMultiUser"
                    ref="TestMultiUserId"
                />
                <Field
                    defaultValue={item.TestNote}
                    listName={listName}
                    name="TestNote"
                    ref="TestNote"
                />
                <Field
                    defaultValue={item.TestNumberDecimal}
                    listName={listName}
                    name="TestNumberDecimal"
                    ref="TestNumberDecimal"
                />
                <Field
                    defaultValue={item.TestNumberInteger}
                    listName={listName}
                    name="TestNumberInteger"
                    ref="TestNumberInteger"
                />
                <Field
                    defaultValue={item.TestUrl}
                    listName={listName}
                    name="TestUrl"
                    ref="TestUrl"
                />
                <Field
                    defaultValue={item.TestUser}
                    listName={listName}
                    name="TestUser"
                    ref="TestUserId"
                />
            </div>
        );
    }
}