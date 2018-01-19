import * as React from "react";
import { Helper, SPTypes, Types, Web } from "gd-sprest";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import {
    IAttachmentFile,
    IBaseField,
    IItemFormField, IItemFormProps, IItemFormState
} from "../definitions";
import { Fields } from "..";
import { Field } from ".";

/**
 * Item Form
 */
export class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    /**
     * Constructor
     */
    constructor(props: IItemFormProps) {
        super(props);

        // Set the state
        this.state = {
            fields: null,
            itemId: null,
            formInfo: null,
            refreshFl: false,
            saveFl: false,
            updateFl: false
        };
    }

    /**
     * Reference to the attachments field
     */
    private _attachmentField: Fields.FieldAttachments = null;

    /**
     * Reference to the form fields
     */
    private _formFields: { [key: string]: Field } = {};

    /**
     * Attachments Field
     */
    get AttachmentsField(): Fields.FieldAttachments { return this._attachmentField; }

    /**
     * Form Control Mode
     */
    get ControlMode(): number {
        let controlMode = this.props.controlMode;

        // Default the value
        if (typeof (this.props.controlMode) !== "number") {
            controlMode = SPTypes.ControlMode.Display;
        }

        // See if we are editing the form
        if (controlMode == SPTypes.ControlMode.Edit) {
            // Ensure the item exists
            controlMode = this.state.formInfo.item && this.state.formInfo.item.Id > 0 ? SPTypes.ControlMode.Edit : SPTypes.ControlMode.New;
        }

        // Return the control mode
        return controlMode;
    }

    /**
     * Get the form information
     */
    get FormInfo(): Types.Helper.ListForm.IListFormResult { return this.state.formInfo; }

    /**
     * Render the component
     */
    render() {
        let spinner = null;

        // See if the list has been loaded
        if (this.state.formInfo == null) {
            // Load the list information
            this.loadformInfo();

            // Return a spinner
            return (
                <Spinner label="Loading the list information..." />
            );
        }

        // See if we are refreshing the item
        if (this.state.refreshFl) {
            // Reload the item
            Helper.ListForm.refreshItem(this.state.formInfo).then(formInfo => {
                // Update the state
                this.setState({
                    formInfo,
                    refreshFl: false
                });
            });

            // Set the spinner
            spinner = (
                <Spinner label="Refreshing the Item" size={SpinnerSize.large} />
            );
        }
        // Else, see if we are saving the item
        else if (this.state.saveFl) {
            // Set the spinner
            spinner = (
                <Spinner label="Saving the item" size={SpinnerSize.large} />
            );
        }
        // Else, see if we are updating the item
        else if (this.state.updateFl) {
            // Set the spinner
            spinner = (
                <Spinner label="Updating the Item" size={SpinnerSize.large} />
            );
        }

        // See if there is a custom renderer
        if (this.props.onRender) {
            // Render the custom event
            return (
                <div>
                    {spinner}
                    <div hidden={spinner ? true : false}>
                        {this.props.onRender(this.ControlMode)}
                    </div>
                </div>
            );
        }

        // Render the fields
        return (
            <div className={"ms-Grid " + (this.props.className || "")}>
                {
                    !this.state.saveFl ? null :
                        <Spinner label="Saving the Item" size={SpinnerSize.large} />
                }
                <div hidden={this.state.saveFl}>
                    {this.renderAttachmentsField()}
                    {this.renderFields()}
                </div>
            </div>
        );
    }

    /**
     * Methods
     */

    /**
     * Method to get the form values
     */
    getFormValues<IItem = any>() {
        let formValues: any = {};

        // Parse the fields
        for (let fieldName in this._formFields) {
            let field = this._formFields[fieldName];
            let fieldInfo = field ? field.state.fieldInfo : null;

            // Ensure the field information exists
            if (fieldInfo == null) { continue; }

            // See if this is a lookup or user field
            if (fieldInfo.type == SPTypes.FieldType.Lookup ||
                fieldInfo.type == SPTypes.FieldType.User) {
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
                        if (fieldInfo.typeAsString == "TaxonomyFieldTypeMulti") {
                            // Add the term
                            results.push(result.WssId + ";#" + result.Label + "|" + result.TermGuid);
                        } else {
                            // Add the lookup id if it exists
                            results.push(result.ID || result);
                        }
                    }

                    // See if this is a taxonomy field with multiple values
                    if (fieldInfo.typeAsString == "TaxonomyFieldTypeMulti") {
                        // Set the hidden field name
                        let valueField = ((field as any) as Fields.FieldManagedMetadata).state.valueField
                        if (valueField) {
                            // Update the value field
                            formValues[valueField.InternalName] = results.join(";#");
                        }

                        // Continue the loop
                        continue;
                    } else {
                        // Set the field value
                        fieldValue = { results };
                    }
                }
                // See if this is a lookup or user field
                else if (fieldInfo.type == SPTypes.FieldType.Lookup ||
                    fieldInfo.type == SPTypes.FieldType.User) {
                    // Clear the value if it doesn't exist
                    fieldValue = fieldValue > 0 ? fieldValue : null;
                }
            }

            // Set the field value
            formValues[fieldName] = fieldValue;
        }

        // Return the form values
        return formValues;
    }

    /**
     * Method to load the list information
     */
    private loadformInfo = () => {
        let fields = null;
        let formFields = this.props.fields;

        // Ensure the fields exist
        if (formFields) {
            fields = [];

            // Parse the fields
            for (let i = 0; i < formFields.length; i++) {
                // Add the field
                fields.push(formFields[i].name);
            }
        }

        // Create an instance of the list form
        new Helper.ListForm({
            cacheKey: this.props.cacheKey,
            fields: fields,
            item: this.props.item,
            itemId: this.props.itemId,
            listName: this.props.listName,
            webUrl: this.props.webUrl
        }).then(formInfo => {
            // Update the state
            this.setState({ formInfo });
        });
    }

    /**
     * Method to refresh the item
     */
    refresh() {
        // Update the state
        this.setState({ refreshFl: true });
    }

    /**
     * Method to render the attachments field
     */
    private renderAttachmentsField = () => {
        let item = this.state.formInfo.item;

        // See if we are displaying attachments
        if (this.props.showAttachments) {
            return (
                <div className="ms-Grid-row" key={"row_Attachments"}>
                    <div className="ms-Grid-col-md12">
                        <Fields.FieldAttachments
                            controlMode={this.ControlMode}
                            files={item ? item.AttachmentFiles : null}
                            key={"Attachments"}
                            itemId={item.Id}
                            listName={this.props.listName}
                            onAttachmentsRender={this.props.onFieldRender == null ? null : (attachments) => this.props.onFieldRender({ listName: this.props.listName, name: "Attachments" }, attachments)}
                            onFileAdded={this.props.onAttachmentAdded}
                            onFileClick={this.props.onAttachmentClick == null ? null : (file) => { return this.props.onAttachmentClick(file, this.ControlMode); }}
                            onFileRender={this.props.onAttachmentRender == null ? null : (file) => { return this.props.onAttachmentRender(file, this.ControlMode); }}
                            onRender={this.props.onRenderAttachments == null ? null : (files) => { return this.props.onRenderAttachments(files, this.ControlMode); }}
                            ref={field => { this._attachmentField = field; }}
                            webUrl={this.props.webUrl}
                        />
                    </div>
                </div>
            );
        }

        // Render nothing
        return null;
    }

    /**
     * Method to render the fields
     */
    private renderFields = () => {
        let formFields = [];
        let item = this.state.formInfo.item;

        // Parse the form fields
        for (let fieldName in this.state.formInfo.fields) {
            let field = this.state.formInfo.fields[fieldName];
            let readOnly = false;

            // See if we are excluding this field
            if (this.props.excludeFields && this.props.excludeFields.indexOf(fieldName) >= 0) { continue; }

            // See if this is a read-only field
            if (this.props.readOnlyFields && this.props.readOnlyFields.indexOf(fieldName) >= 0) {
                // Set the flag
                readOnly = true;
            }

            // Find the field information
            let fieldInfo = null;
            let fields = this.props.fields || [];
            for (let i = 0; i < fields.length; i++) {
                // See if this is the field we are looking for
                if (fields[i].name == fieldName) {
                    // Set the field information and break from the loop
                    fieldInfo = fields[i];
                    break;
                }
            }

            // Set the default value
            let defaultValue = item ? item[field.InternalName] : null;
            if (item && defaultValue == null && (field.FieldTypeKind == SPTypes.FieldType.Lookup || field.FieldTypeKind == SPTypes.FieldType.User)) {
                // Try to set it to the "Id" field value
                defaultValue = item[field.InternalName + "Id"];
            }

            // Add the form field
            formFields.push(
                <div className="ms-Grid-row" key={"row_" + fieldName}>
                    <div className="ms-Grid-col ms-md12">
                        <Field
                            className={this.props.fieldClassName}
                            controlMode={readOnly ? SPTypes.ControlMode.Display : this.ControlMode}
                            defaultValue={defaultValue}
                            field={field}
                            listName={this.props.listName}
                            key={field.InternalName}
                            name={field.InternalName}
                            onChange={fieldInfo ? fieldInfo.onChange : null}
                            onFieldRender={this.props.onFieldRender}
                            onRender={fieldInfo ? fieldInfo.onRender : null}
                            queryTop={this.props.queryTop}
                            ref={field => { field ? this._formFields[field.props.name] = field : null; }}
                            webUrl={this.props.webUrl}
                        />
                    </div>
                </div>
            );
        }

        // Return the form fields
        return formFields;
    }

    /**
     * Method to save the item form
     */
    save<IItem = any>(): PromiseLike<IItem> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Set the state
            this.setState({ saveFl: true }, () => {
                // Save the item
                Helper.ListForm.saveItem(this.state.formInfo, this.getFormValues())
                    // Wait for the item to be saved
                    .then((formInfo) => {
                        // Save the attachments
                        this.saveAttachments(formInfo.item.Id).then(() => {
                            // Refresh the item
                            Helper.ListForm.refreshItem(formInfo).then(formInfo => {
                                // Update the state
                                this.setState({ formInfo, saveFl: false }, () => {
                                    // Resolve the promise
                                    resolve(formInfo.item as any);
                                });
                            });
                        });
                    });
            });
        });
    }

    /**
     * Method to save the item attachments
     * @param itemId - The item id.
     */
    private saveAttachments = (itemId: number): PromiseLike<void> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if attachments exist
            if (this._attachmentField) {
                // Save the attachments
                this._attachmentField.save(itemId).then(() => {
                    // Resolve the promise
                    resolve();
                });
            } else {
                // Resolve the promise
                resolve();
            }
        });
    }

    /**
     * Method to update the item.
     */
    updateItem<IItem = any>(fieldValues): PromiseLike<IItem> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Set the state
            this.setState({ updateFl: true }, () => {
                let formInfo = this.state.formInfo;

                // Update the item
                Helper.ListForm.saveItem(formInfo, fieldValues).then(formInfo => {
                    // Update the state
                    this.setState({ formInfo, updateFl: false }, () => {
                        // Resolve the promise
                        resolve(formInfo.item as any);
                    });
                });
            });
        });
    }
}