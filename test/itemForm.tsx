import * as React from "react";
import { Label, PrimaryButton } from "office-ui-fabric-react";
import { ITestItem } from "./data";
import {
    Field, FieldAttachments, FieldBoolean, FieldChoice, FieldDateTime, FieldLookup,
    FieldNumber, FieldNumberTypes, FieldText, FieldUrl, FieldUser
} from "../build";

/**
 * Properties
 */
interface Props {
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
                item[fieldName] = (ref as Field<any, any>).state.value;
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
        return (this.refs["attachments"] as FieldAttachments).save(itemId);
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
                <FieldAttachments
                    files={item.AttachmentFiles}
                    listName={listName}
                    ref="attachments"
                />
                <FieldText
                    defaultValue={item.Title}
                    listName={listName}
                    name="Title"
                    ref="Title"
                />
                <FieldBoolean
                    defaultValue={item.TestBoolean}
                    listName={listName}
                    name="TestBoolean"
                    ref="TestBoolean"
                />
                <FieldChoice
                    defaultValue={item.TestChoice}
                    listName={listName}
                    name="TestChoice"
                    ref="TestChoice"
                />
                <FieldDateTime
                    defaultValue={item.TestDate}
                    listName={listName}
                    name="TestDate"
                    ref="TestDate"
                />
                <FieldDateTime
                    defaultValue={item.TestDateTime}
                    listName={listName}
                    name="TestDateTime"
                    ref="TestDateTime"
                />
                <FieldLookup
                    defaultValue={item.TestLookup}
                    listName={listName}
                    name="TestLookup"
                    ref="TestLookupId"
                />
                <FieldChoice
                    defaultValue={item.TestMultiChoice}
                    listName={listName}
                    name="TestMultiChoice"
                    ref="TestMultiChoice"
                />
                <FieldLookup
                    defaultValue={item.TestMultiLookup}
                    listName={listName}
                    name="TestMultiLookup"
                    ref="TestMultiLookupId"
                />
                <FieldUser
                    defaultValue={item.TestMultiUser}
                    listName={listName}
                    name="TestMultiUser"
                    ref="TestMultiUserId"
                />
                <FieldText
                    defaultValue={item.TestNote}
                    listName={listName}
                    name="TestNote"
                    ref="TestNote"
                />
                <FieldNumber
                    defaultValue={item.TestNumberDecimal}
                    listName={listName}
                    name="TestNumberDecimal"
                    ref="TestNumberDecimal"
                    type={FieldNumberTypes.Decimal}
                />
                <FieldNumber
                    defaultValue={item.TestNumberInteger}
                    listName={listName}
                    name="TestNumberInteger"
                    ref="TestNumberInteger"
                />
                <FieldUrl
                    defaultValue={item.TestUrl}
                    listName={listName}
                    name="TestUrl"
                    ref="TestUrl"
                />
                <FieldUser
                    defaultValue={item.TestUser}
                    listName={listName}
                    name="TestUser"
                    ref="TestUserId"
                />
            </div>
        );
    }
}