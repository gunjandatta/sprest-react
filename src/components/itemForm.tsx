import * as React from "react";
import { Promise } from "es6-promise";
import { Types, Web } from "gd-sprest";
import {
    IBaseFieldInfo,
    IItemFormField, IItemFormProps, IItemFormState
} from "../definitions";
import { Field, Fields } from ".";

/**
 * Item Form WebPart
 */
export class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
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
                Select: []
            } as Types.ODataQuery;

            // Get the select fields
            for (let i = 0; i < this.props.fields.length; i++) {
                let field = this.props.fields[i];

                // Add the field
                query.Select.push(field.name);

                // See if this is the attachments field
                if (field.name == "Attachments") {
                    // Expand the attachments
                    query.Expand = ["Attachments"];

                    // Get the attachment files
                    query.Select.push("AttachmentFiles");
                }
            }

            // Get the web
            (new Web(this.props.webUrl))
                // Get the list
                .Lists(this.props.listName)
                // Get the items
                .Items(itemId)
                // Set the query
                .query(query)
                // Execute the request
                .execute(item => {
                    // Resolve the promise
                    resolve(item.Id);
                });
        });
    }

    // Method to get the form values
    private getValues<IItem = any>() {
        let formValues: any = {};

        // Parse the references
        for (let fieldName in this.refs) {
            let ref = this.refs[fieldName];

            // See if this is a field
            if (ref instanceof Field) {
                // Update the item value
                formValues[fieldName] = (ref as Field).state.value;
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
                                    defaultValue={item[field.name]}
                                    listName={this.props.listName}
                                    key={field.name}
                                    name={field.name}
                                    onChange={field.onChange}
                                    onRender={field.onRender}
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
                // Get the web
                (new Web(this.props.webUrl))
                    // Get the list
                    .Lists(this.props.listName)
                    // Get the items
                    .Items()
                    // Add the item
                    .add(formValues)
                    // Execute the request
                    .execute(item => {
                        // Resolve the request
                        resolve(item.Id);
                    });
            }
        });
    }
}