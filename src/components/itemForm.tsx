import * as React from "react";
import { Helper, SPTypes, Types, Web } from "gd-sprest";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import {
    IAttachmentFile,
    IBaseFieldInfo,
    IManagedMetadataFieldInfo,
    IItemFormField, IItemFormProps, IItemFormState
} from "../definitions";
import { Fields } from "..";
import { Field } from ".";

/**
 * Item Form
 */
export class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    /**
     * Reference to the attachments field
     */
    private _attachmentField: Fields.FieldAttachments = null;

    /** The list form */
    private _listForm = null;

    /**
     * Reference to the form fields
     */
    private _formFields: { [key: string]: Field } = {};

    /**
     * Reference to the query used to refresh the item
     */
    private _query: Types.ODataQuery = null;

    /**
     * Get the attachment field
     */
    get AttachmentField(): Fields.FieldAttachments { return this._attachmentField; }

    /**
     * Set the attachment field
     */
    set AttachmentField(field: Fields.FieldAttachments) { this._attachmentField = field; }

    /**
     * Get the control mode
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
            controlMode = this.state.listInfo.item && this.state.listInfo.item.Id > 0 ? SPTypes.ControlMode.Edit : SPTypes.ControlMode.New;
        }

        // Return the control mode
        return controlMode;
    }

    /**
     * Get the form fields
     */
    get FormFields(): { [key: string]: Field } { return this._formFields; }

    /**
     * The list item
     */
    get Item(): Types.IListItemQueryResult { return this.state.listInfo.item as any; }

    /**
     * Get the list
     */
    get List(): Types.IListResult { return this.state.listInfo.list; }

    /**
     * Get the item query
     */
    get ItemQuery(): Types.ODataQuery { return this._query; }

    /**
     * Set the item query
     */
    set ItemQuery(query: Types.ODataQuery) { this._query = query; }

    /**
     * Constructor
     */
    constructor(props: IItemFormProps) {
        super(props);

        // Set the state
        this.state = {
            listInfo: null,
            refreshFl: false,
            saveFl: false,
            updateFl: false
        };
    }

    /**
     * Method to get the form values
     */
    getFormValues<T>() { return this.getValues<T>(); }

    /**
     * Method to refresh the item
     */
    refresh() {
        // Update the state
        this.setState({ refreshFl: true });
    }

    /**
     * Render the component
     */
    render() {
        // See if the list has been loaded
        if (this.state.listInfo == null) {
            // Load the list information
            this.loadListInfo();

            // Return a spinner
            return (
                <Spinner label="Loading the list information..." />
            );
        }

        // See if we are refreshing the item
        if (this.state.refreshFl) {
            // Reload the item
            Helper.ListForm.refreshItem(this.state.listInfo).then(item => {
                // Update the item
                let listInfo = this.state.listInfo;
                listInfo.item = item;

                // Update the state
                this.setState({
                    listInfo,
                    refreshFl: false
                });
            });

            // Return a spinner
            return (
                <Spinner label="Refreshing the Item" size={SpinnerSize.large} />
            );
        }

        // See if we are updating the item
        if (this.state.updateFl) {
            // Return a spinner
            return (
                <Spinner label="Updating the Item" size={SpinnerSize.large} />
            );
        }

        // See if there is a custom renderer
        if (this.props.onRender) {
            // Render the custom event
            return (
                <div>
                    {
                        !this.state.saveFl ? null :
                            <Spinner label="Saving the Item" size={SpinnerSize.large} />
                    }
                    <div hidden={this.state.saveFl}>
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
                    {this.renderFields()}
                </div>
            </div>
        );
    }

    /**
     * Method to save the item form
     */
    save<IItem = any>(): PromiseLike<IItem> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Set the state
            this.setState({ saveFl: true }, () => {
                let listInfo = this.state.listInfo;

                // Save the item
                Helper.ListForm.saveItem(this.getFormValues(), this.List)
                    // Save the attachments
                    .then((item) => {
                        // Update the list information
                        listInfo.item = item;

                        // Save the attachments
                        this.saveAttachments(item.Id);
                    })
                    // Update the form
                    .then(item => {
                        // Refresh the item
                        Helper.ListForm.refreshItem(listInfo).then(item => {
                            // Update the list information
                            listInfo.item = item;

                            // Update the state
                            this.setState({ listInfo, saveFl: false }, () => {
                                // Resolve the promise
                                resolve(item as any);
                            });
                        });
                    });
            });
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
                let listInfo = this.state.listInfo;

                // Update the item
                Helper.ListForm.saveItem(listInfo, fieldValues).then(item => {
                    // Update the item
                    listInfo.item = item;

                    // Update the state
                    this.setState({ listInfo, updateFl: false });

                    // Resolve the promise
                    resolve(item as any);
                });
            });
        });
    }

    /**
     * Methods
     */

    /**
     * Method to get the form values
     */
    private getValues<IItem = any>() {
        let formValues: any = {};

        // Parse the fields
        for (let fieldName in this._formFields) {
            let field = this._formFields[fieldName];

            // Ensure the field exists
            if (field == null) { continue; }

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

    /**
     * Method to load the list information
     */
    private loadListInfo = () => {
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
            fields: fields,
            itemId: this.props.item ? this.props.item.Id : this.props.itemId,
            listName: this.props.listName,
            webUrl: this.props.webUrl
        }).then(listInfo => {
            // Update the state
            this.setState({ listInfo });
        });
    }

    /**
     * Method to render the fields
     */
    private renderFields = () => {
        let formFields = [];
        let item = this.state.listInfo.item;

        // See if we are displaying attachments
        if (this.props.showAttachments) {
            formFields.push(
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

        // Parse the fields
        for (let fieldName in this.state.listInfo.fields) {
            let field = this.state.listInfo.fields[fieldName];
            let readOnly = false;

            // See if we are excluding this field
            if (this.props.excludeFields && this.props.excludeFields.indexOf(fieldName) >= 0) { continue; }

            // See if this is a read-only field
            if (this.props.readOnlyFields && this.props.readOnlyFields.indexOf(fieldName) >= 0) {
                // Set the flag
                readOnly = true;
            }

            // Find the field information
            let fieldInfo = (this.props.fields || []).find((fieldInfo) => {
                return fieldInfo.name == fieldName;
            });

            // Add the form field
            formFields.push(
                <div className="ms-Grid-row" key={"row_" + fieldName}>
                    <div className="ms-Grid-col ms-md12">
                        <Field
                            controlMode={readOnly ? SPTypes.ControlMode.Display : this.ControlMode}
                            defaultValue={item[field.InternalName]}
                            field={field}
                            item={item}
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
}