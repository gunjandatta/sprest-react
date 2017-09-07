import * as React from "react";
import { Promise } from "es6-promise";
import { SPTypes, Types, Web } from "gd-sprest";
import { Spinner } from "office-ui-fabric-react";
import {
    IBaseFieldInfo,
    IManagedMetadataFieldInfo,
    IItemFormField, IItemFormProps, IItemFormState
} from "../../definitions";
import { Field, Fields } from "..";

/**
 * Item Form WebPart
 */
export class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    private _attachmentField = null;
    private _fields: Array<Field> = [];
    private _list: Types.IListResult = null;

    /**
     * Constructor
     */
    constructor(props: IItemFormProps) {
        super(props);

        // Set the state
        this.state = {
            fields: props.fields,
            item: props.item || {}
        };
    }

    // Render the component
    render() {
        // See if the fields have been defined
        if (this.state.fields == null) {
            // Load the default fields
            this.loadDefaultFields();

            // Return a spinner
            return (
                <Spinner label="Loading the fields..." />
            );
        }

        // Render the fields
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
            for (let i = 0; i < this.state.fields.length; i++) {
                let field = this.state.fields[i];

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
        for (let i = 0; i < this._fields.length; i++) {
            let field = this._fields[i];
            let fieldName = field.Info ? field.Info.name : null;
            
            // Ensure the field exists
            if(fieldName == null) { continue; }

            // See if this is a lookup or user field
            if (field.Info.type == SPTypes.FieldType.Lookup ||
                field.Info.type == SPTypes.FieldType.User) {
                // Ensure the field name is the "Id" field
                fieldName += fieldName.lastIndexOf("Id") == fieldName.length - 2 ? "" : "Id";
            }

            // Get the field value
            let fieldValue: any = field.Value;
            if (fieldValue) {
                // See if this is a multi-value field
                if (fieldValue.results) {
                    let results = [];

                    // Parse the results
                    for (let i = 0; i < fieldValue.results.length; i++) {
                        let result = fieldValue.results[i];

                        // See if this is a taxonomy field with multiple values
                        if (field.Info.typeAsString == "TaxonomyFieldTypeMulti") {
                            // Add the term
                            results.push(result.WssId + ";#" + result.Label + "|" + result.TermGuid);
                        } else {
                            // Add the lookup id if it exists
                            results.push(result.ID || result);
                        }
                    }

                    // See if this is a taxonomy field with multiple values
                    if (field.Info.typeAsString == "TaxonomyFieldTypeMulti") {
                        // Set the hidden field name
                        formValues[(field.Info as IManagedMetadataFieldInfo).valueField] = results.join(";#");

                        // Continue the loop
                        continue;
                    } else {
                        // Set the field value
                        fieldValue = { results };
                    }
                }
                // See if this is a lookup or user field
                else if (field.Info.type == SPTypes.FieldType.Lookup ||
                    field.Info.type == SPTypes.FieldType.User) {
                    // Clear the value if it doesn't exist
                    fieldValue = fieldValue > 0 ? fieldValue : null;
                }
            }
            // Else, see if this is a multi-choice field
            // TODO: Is this check still needed?
            else if (field.Info.type == SPTypes.FieldType.MultiChoice) {
                // Default the value
                fieldValue = { results: [] };
            }

            // Set the field value
            formValues[fieldName] = fieldValue;
        }

        // Return the form values
        return formValues;
    }

    // Method to load the fields
    private loadDefaultFields = () => {
        // Load the web
        (new Web(this.props.webUrl))
            // Load the list
            .Lists(this.props.listName)
            // Get the content types
            .ContentTypes()
            // Query the content types
            .query({
                Expand: ["FieldLinks"]
            })
            // Execute the request
            .execute(contentTypes => {
                // Ensure the content types exist
                if (contentTypes.results) {
                    let fields: Array<IItemFormField> = [];

                    // Parse the default content type
                    for (let i = 0; i < contentTypes.results[0].FieldLinks.results.length; i++) {
                        let field = contentTypes.results[0].FieldLinks.results[i];

                        // Skip the content type field
                        if (field.Name == "ContentType") { continue; }

                        // Skip hidden fields
                        if (field.Hidden) { continue; }

                        // Add the field
                        fields.push({ name: field.Name });
                    }

                    // Update the state
                    this.setState({ fields });
                } else {
                    console.log("[gd-sprest] Error getting default fields.");
                    console.log("[gd-sprest] " + contentTypes["response"]);
                }
            });
    }

    // Method to render the fields
    private renderFields = () => {
        let formFields = [];
        let item = this.state.item;

        // See if we are displaying attachments
        if (this.props.showAttachments) {
            formFields.push(
                <div className="ms-Grid-row" key={"row_Attachments"}>
                    <div className="ms-Grid-col-md12">
                        <Fields.FieldAttachments
                            files={item.AttachmentFiles}
                            key={"Attachments"}
                            listName={this.props.listName}
                            ref={field => { this._attachmentField = field; }}
                        />
                    </div>
                </div>
            );
        }

        // Parse the fields
        for (let i = 0; i < this.state.fields.length; i++) {
            let fieldInfo = this.state.fields[i];

            // Add the form field
            formFields.push(
                <div className="ms-Grid-row" key={"row_" + fieldInfo.name}>
                    <div className="ms-Grid-col ms-md12">
                        <Field
                            controlMode={this.props.controlMode || (this.props.item && this.props.item.Id > 0 ? SPTypes.ControlMode.Edit : SPTypes.ControlMode.New)}
                            defaultValue={item[fieldInfo.name]}
                            listName={this.props.listName}
                            key={fieldInfo.name}
                            name={fieldInfo.name}
                            onChange={fieldInfo.onChange}
                            onRender={fieldInfo.onRender}
                            ref={field => { this._fields.push(field); }}
                        />
                    </div>
                </div>
            );
        }

        // Return the form fields
        return formFields;
    }

    // Method to save the item attachments
    private saveAttachments = (itemId: number) => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if attachments exist
            if (this._attachmentField) {
                // Save the attachments
                this._attachmentField.save(itemId).then(() => {
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