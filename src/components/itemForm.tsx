import * as React from "react";
import { SPTypes, Types, Web } from "gd-sprest";
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
 * Item Form WebPart
 */
export class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    /**
     * Reference to the attachments field
     */
    private _attachmentField: Fields.FieldAttachments = null;

    /**
     * Reference to the form fields
     */
    private _fields: { [key: string]: Field } = {};

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
            controlMode = this.state.item && this.state.item.Id > 0 ? SPTypes.ControlMode.Edit : SPTypes.ControlMode.New;
        }

        // Return the control mode
        return controlMode;
    }

    /**
     * Get the form fields
     */
    get FormFields(): { [key: string]: Field } { return this._fields; }

    /**
     * Set the form fields
     */
    set FormFields(fields: { [key: string]: Field }) { this._fields = fields; }

    /**
     * Get the list
     */
    get List(): Types.IListResult { return this.state.list; }

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
            fields: props.fields,
            item: props.item || {},
            refreshFl: false,
            saveFl: false,
            updateFl: false
        };

        // Default the query
        this._query = props.query || {
            Select: ["*"]
        } as Types.ODataQuery;

        // See if we are showing attachments
        if (props.showAttachments) {
            // Expand the attachment files
            this._query.Expand = this._query.Expand || [];
            this._query.Expand.push("AttachmentFiles");

            // Get the attachment files
            this._query.Select = this._query.Select || [];
            this._query.Select.push("Attachments");
            this._query.Select.push("AttachmentFiles");
        }
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

        // Get the item
        this.getItem(this.state.item.Id).then(item => {
            // Update the state
            this.setState({ item, refreshFl: false });
        });
    }

    /**
     * Render the component
     */
    render() {
        // See if the list exists
        if (this.state.list == null) {
            // Load the list
            this.loadList();

            // Return a spinner
            return (
                <Spinner label="Loading the list..." />
            );
        }

        // Ensure the fields are loaded
        if (this.state.listFields == null) {
            // Return a spinner
            return (
                <Spinner label="Loading the list fields..." />
            );
        }

        // Ensure the item is loaded
        if (typeof (this.state.item) === "number") {
            // Return a spinner
            return (
                <Spinner label="Loading the item..." />
            );
        }

        // See if we are refreshing the item
        if (this.state.refreshFl) {
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
        return new Promise((resolve, reject) => {
            // Set the state
            this.setState({ saveFl: true }, () => {
                // Save the item
                this.saveItem()
                    // Save the attachments
                    .then(this.saveAttachments)
                    // Get the item    
                    .then(this.getItem)
                    // Update the form
                    .then(item => {
                        // Update the state
                        this.setState({ item, saveFl: false }, () => {
                            // Resolve the promise
                            resolve(item as IItem);
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
                let item = this.state.item as Types.IListItemQueryResult;

                // Update the item
                item.update(fieldValues).execute(response => {
                    // Get the item
                    this.getItem(item.Id).then(item => {
                        // Update the state
                        this.setState({ item, updateFl: false }, () => {
                            // Resolve the promise
                            resolve(item as IItem);
                        });
                    });
                });
            });
        });
    }

    /**
     * Methods
     */

    /**
     * Method to get the item
     * @param itemId - The item id.
     */
    private getItem = (itemId) => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Set the filter
            this._query.Filter = "ID eq " + itemId;

            // Get the item
            this.state.list.Items().query(this._query)
                // Execute the request
                .execute(items => {
                    // Resolve the promise
                    resolve(items.results ? items.results[0] : null);
                });
        });
    }

    /**
     * Method to get the form values
     */
    private getValues<IItem = any>() {
        let formValues: any = {};

        // Parse the fields
        for (let fieldName in this._fields) {
            let field = this._fields[fieldName];

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
     * Method to load the fields
     */
    private loadDefaultFields = () => {
        // Get the web
        let list = new Web(this.props.webUrl)
            // Load the list
            .Lists(this.props.listName);

        // Get the default content type
        list.ContentTypes()
            // Query the content types
            .query({
                Expand: ["FieldLinks"],
                Top: 1
            })
            // Execute the request
            .execute(contentTypes => {
                // Ensure the content types exist
                if (contentTypes.results) {
                    let formFields = [];

                    // Parse the default content type
                    for (let i = 0; i < contentTypes.results[0].FieldLinks.results.length; i++) {
                        let field = contentTypes.results[0].FieldLinks.results[i];

                        // Skip the content type field
                        if (field.Name == "ContentType") { continue; }

                        // Skip hidden fields
                        if (field.Hidden) { continue; }

                        // Add the field name
                        formFields.push(field.Name);
                    }

                    // Get the fields
                    list.Fields().execute(listFields => {
                        let fields: Array<IItemFormField> = [];

                        // Parse the form fields
                        for (let i = 0; i < formFields.length; i++) {
                            let formField = formFields[i];

                            // Parse the list fields
                            for (let j = 0; j < listFields.results.length; j++) {
                                let field = listFields.results[j];

                                // See if this is the target field
                                if (field.InternalName == formField) { continue; }

                                // Skip hidden fields
                                if (field.Hidden) { continue; }

                                // Add the field
                                fields.push({ name: field.InternalName });

                                // Break from the loop
                                break;
                            }
                        }

                        // Update the state
                        this.setState({ fields });
                    });
                } else {
                    console.log("[gd-sprest] Error getting default fields.");
                    console.log("[gd-sprest] " + contentTypes["response"]);
                }
            }, true);
    }

    /**
     * Method to load the list
     */
    private loadList = () => {
        // Get the web
        (new Web(this.props.webUrl))
            // Get the list
            .Lists(this.props.listName)
            // Execute this request
            .execute(list => {
                // Update the state
                this.setState({ list }, () => {
                    // See if the item id was passed in
                    if (typeof (this.state.item) === "number") {
                        // Get the item
                        this.getItem(this.state.item).then(item => {
                            // Update the state
                            this.setState({ item });
                        });
                    }
                });
            })
            // Get the list fields
            .Fields()
            // Execute the request
            .execute(fields => {
                let listFields = {};

                // Parse the fields
                for (let i = 0; i < fields.results.length; i++) {
                    let field = fields.results[i];

                    // Add the list field
                    listFields[field.InternalName] = field;
                }

                // Update the state
                this.setState({ listFields });
            });
    }

    /**
     * Method to render the fields
     */
    private renderFields = () => {
        let formFields = [];
        let item: Types.IListItemResult = this.state.item;

        // See if we are displaying attachments
        if (this.props.showAttachments) {
            formFields.push(
                <div className="ms-Grid-row" key={"row_Attachments"}>
                    <div className="ms-Grid-col-md12">
                        <Fields.FieldAttachments
                            controlMode={this.ControlMode}
                            files={item.AttachmentFiles}
                            key={"Attachments"}
                            itemId={item.Id}
                            listName={this.props.listName}
                            onFileAdded={this.props.onAttachmentAdded}
                            onFileClick={this.props.onAttachmentClick ? (file) => { return this.props.onAttachmentClick(file, this.ControlMode); } : null}
                            onFileRender={this.props.onAttachmentRender ? (file) => { return this.props.onAttachmentRender(file, this.ControlMode); } : null}
                            onRender={this.props.onRenderAttachments ? (files) => { return this.props.onRenderAttachments(files, this.ControlMode); } : null}
                            ref={field => { this._attachmentField = field; }}
                            webUrl={this.props.webUrl}
                        />
                    </div>
                </div>
            );
        }

        // Parse the fields
        for (let i = 0; i < this.state.fields.length; i++) {
            let fieldInfo = this.state.fields[i];
            let readOnly = false;

            // See if we are excluding this field
            if (this.props.excludeFields && this.props.excludeFields.indexOf(fieldInfo.name) >= 0) { continue; }

            // See if this is a read-only field
            if (this.props.readOnlyFields && this.props.readOnlyFields.indexOf(fieldInfo.name) >= 0) {
                // Set the flag
                readOnly = true;
            }

            // Add the form field
            formFields.push(
                <div className="ms-Grid-row" key={"row_" + fieldInfo.name}>
                    <div className="ms-Grid-col ms-md12">
                        <Field
                            controlMode={readOnly ? SPTypes.ControlMode.Display : this.ControlMode}
                            defaultValue={item[fieldInfo.name]}
                            field={this.state.listFields && this.state.listFields[fieldInfo.name]}
                            item={item}
                            listName={this.props.listName}
                            key={fieldInfo.name}
                            name={fieldInfo.name}
                            onChange={fieldInfo.onChange}
                            onRender={fieldInfo.onRender}
                            queryTop={this.props.queryTop}
                            ref={field => { field ? this._fields[field.props.name] = field : null; }}
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

    /**
     * Method to save the item
     */
    private saveItem = () => {
        // Return a promise
        return new Promise((resolve, reject) => {
            let item: Types.IListItemQueryResult = this.state.item;

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
                // Set the metadata type
                formValues["__metadata"] = { type: this.state.list.ListItemEntityTypeFullName };

                // Get the items
                this.state.list.Items()
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