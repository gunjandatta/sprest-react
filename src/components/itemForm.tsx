import * as React from "react";
import { Promise } from "es6-promise";
import { SPTypes, Types, Web } from "gd-sprest";
import {
    IBaseFieldInfo,
    IFieldUserState,
    IItemFormField, IItemFormProps, IItemFormState
} from "../definitions";
import { Field, Fields } from ".";

/**
 * Item Form WebPart
 */
export class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    private _list: Types.IListResult = null;

    /**
     * Constructor
     */
    constructor(props: IItemFormProps) {
        super(props);

        // Set the state
        this.state = {
            item: props.item || {}
        };
    }

    // Render the component
    render() {
        return (
            <div className={"ms-Grid " + this.props.className}>
                {this.renderFields()}
            </div>
        );
    }

    // Method to save the item form
    save<IItem = any>(): PromiseLike<IItem> {
        return new Promise((resolve, reject) => {
            // Save the item
            this.saveItem()
                // Save the attachments
                .then(this.saveAttachments)
                // Get the item    
                .then(this.getItem)
                // Resolve the promise
                .then(item => { resolve(item as IItem); })
        });
    }

    /**
     * Methods
     */

    // Method to get the item
    private getItem = (itemId) => {
        // Return a promise
        return new Promise((resolve, reject) => {
            let query = {
                Filter: "ID eq " + itemId,
                Select: ["*"]
            } as Types.ODataQuery;

            // Parse the fields
            for (let i = 0; i < this.props.fields.length; i++) {
                let field = this.props.fields[i];

                // See if this is the attachments field
                if (field.name == "Attachments") {
                    // Expand the attachment files
                    query.Expand = ["AttachmentFiles"];

                    // Get the attachment files
                    query.Select.push("Attachments");
                    query.Select.push("AttachmentFiles");

                    // Break from the loop
                    break;
                }
            }

            // Get the list
            this.getList().then((list: Types.IListResult) => {
                // Get the item
                list.Items().query(query)
                    // Execute the request
                    .execute(items => {
                        // Resolve the promise
                        resolve(items.results ? items.results[0] : null);
                    });
            });
        });
    }

    // Method to get the list
    private getList = () => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if we have already queried the list
            if (this._list) {
                // Resolve the promise
                resolve(this._list);
            } else {
                // Get the web
                (new Web(this.props.webUrl))
                    // Get the list
                    .Lists(this.props.listName)
                    // Execute this request
                    .execute(list => {
                        // Save the list
                        this._list = list;

                        // Resolve the promise
                        resolve(list);
                    });
            }
        });
    }

    // Method to get the form values
    private getValues<IItem = any>() {
        let formValues: any = {};

        // Parse the references
        for (let fieldName in this.refs) {
            let ref = this.refs[fieldName];

            // Skip the attachments
            if (fieldName == "attachments") { continue; }

            // See if this is a field
            if (ref instanceof Field) {
                let field = ref as Field;

                // See if this is a lookup or user field
                if (field.state.fieldInfo.type == SPTypes.FieldType.Lookup ||
                    field.state.fieldInfo.type == SPTypes.FieldType.User) {
                    // Ensure the field name is the "Id" field
                    fieldName += fieldName.lastIndexOf("Id") == fieldName.length - 2 ? "" : "Id";
                }

                // Get the field value
                let fieldValue: any = (ref as Field).state.value;
                if (fieldValue) {
                    // See if this is a multi-value field
                    if (fieldValue.results) {
                        let results = [];

                        // Parse the results
                        for (let i = 0; i < fieldValue.results.length; i++) {
                            let lookupValue = fieldValue.results[i];

                            // Add the lookup id if it exists
                            results.push(lookupValue.ID || lookupValue);
                        }

                        // Set the field value
                        fieldValue = { results };
                    }
                    // See if this is a lookup or user field
                    else if (field.state.fieldInfo.type == SPTypes.FieldType.Lookup ||
                        field.state.fieldInfo.type == SPTypes.FieldType.User) {
                        // Clear the value if it doesn't exist
                        fieldValue = fieldValue > 0 ? fieldValue : null;
                    }
                }
                // Else, see if this is a multi-choice field
                else if (field.state.fieldInfo.type == SPTypes.FieldType.MultiChoice) {
                    // Default the value
                    fieldValue = { results: [] };
                }

                // Set the field value
                formValues[fieldName] = fieldValue;
            }
        }

        // Return the form values
        return formValues;
    }

    // Method to render the fields
    private renderFields = () => {
        let formFields = [];
        let item = this.state.item;

        // Parse the fields
        for (let i = 0; i < this.props.fields.length; i++) {
            let field = this.props.fields[i];

            // Add the form field, based on the name
            switch (field.name) {
                // Attachment Field
                case "Attachments":
                    formFields.push(
                        <div className="ms-Grid-row" key={"row_" + field.name}>
                            <div className="ms-Grid-col ms-u-md12">
                                <Fields.FieldAttachments
                                    files={item.AttachmentFiles}
                                    key={field.name}
                                    listName={this.props.listName}
                                    ref="attachments"
                                />
                            </div>
                        </div>
                    );
                    break;
                // Default
                default:
                    formFields.push(
                        <div className="ms-Grid-row" key={"row_" + field.name}>
                            <div className="ms-Grid-col ms-u-md12">
                                <Field
                                    controlMode={item == null ? SPTypes.ControlMode.New : SPTypes.ControlMode.Edit || this.props.controlMode}
                                    defaultValue={item[field.name]}
                                    listName={this.props.listName}
                                    key={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    onRender={field.onRender}
                                    ref={field.name}
                                />
                            </div>
                        </div>
                    );
                    break;
            }
        }

        // Return the form fields
        return formFields;
    }

    // Method to save the item attachments
    private saveAttachments = (itemId: number) => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if attachments exist
            let attachments = this.refs["attachments"] as Fields.FieldAttachments;
            if (attachments) {
                // Save the attachments
                attachments.save(itemId).then(() => {
                    // Resolve the promise
                    resolve(itemId);
                });
            } else {
                // Resolve the promise
                resolve(itemId);
            }
        });
    }

    // Method to save the item
    private saveItem = () => {
        // Return a promise
        return new Promise((resolve, reject) => {
            let item: Types.IListItemQueryResult = this.props.item;

            // Get the item
            let formValues = this.getValues();

            // See if this is an existing item
            if (item && item.update) {
                // Update the item
                item.update(formValues).execute(response => {
                    // Resolve the request
                    resolve(item.Id);
                });
            } else {
                // Get the list
                this.getList().then((list: Types.IListResult) => {
                    // Set the metadata type
                    formValues["__metadata"] = { type: list.ListItemEntityTypeFullName };

                    // Get the items
                    list.Items()
                        // Add the item
                        .add(formValues)
                        // Execute the request
                        .execute(item => {
                            // Resolve the request
                            resolve(item.Id);
                        });
                });
            }
        });
    }
}