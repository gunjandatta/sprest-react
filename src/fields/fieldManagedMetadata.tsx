import * as React from "react";
import { ContextInfo, Helper, SPTypes, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, IDropdownProps, Spinner } from "office-ui-fabric-react";
import {
    BaseField,
    IFieldManagedMetadata, IFieldManagedMetadataProps, IFieldManagedMetadataState, IManagedMetadataTermInfo
} from ".";
declare var SP;

/**
 * Managed Metadata Field
 */
export class FieldManagedMetadata extends BaseField<IFieldManagedMetadataProps, IFieldManagedMetadataState> implements IFieldManagedMetadata {
    /**
     * Render the field
     */
    renderField = () => {
        // Ensure the options exist
        if (this.state.options == null) {
            // Render a loading indicator
            return (
                <Spinner label="Loading the managed metadata data..." />
            );
        }

        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // Update the properties
        let props: IDropdownProps = this.props.props || {};
        props.className = (this.props.className || "");
        props.disabled = this.state.fieldInfo.readOnly || this.props.controlMode == SPTypes.ControlMode.Display;
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        props.multiSelect = this.state.fieldInfo.multi;
        props.label = props.label ? props.label : this.state.fieldInfo.title;
        props.onChanged = this.onChanged;
        props.options = this.state.options;
        props.required = props.required || this.state.fieldInfo.required;

        // See if we are allowing multiple values
        if (props.multiSelect) {
            let keys = [];
            let results = (this.state.value ? this.state.value.results : null) || [];

            // Parse the results
            for (let i = 0; i < results.length; i++) {
                // Add the key
                keys.push(results[i].TermGuid);
            }

            // Set the selected keys
            props.defaultSelectedKeys = keys;
        } else {
            // Set the selected key
            props.defaultSelectedKey = this.state.value ? this.state.value.TermGuid : null;
        }

        // Return the component
        return (
            <Dropdown {...props} />
        );
    }

    /**
     * Methods
     */

    /**
     * The get field value method
     */
    getFieldValue = () => {
        let fieldValue = this.state.value;
        if (fieldValue) {
            // See if results exist
            if (fieldValue.results) {
                let results = [];

                // Parse the results
                for (let i = 0; i < fieldValue.results.length; i++) {
                    let result = fieldValue.results[i] as Types.SP.ComplexTypes.FieldManagedMetadataValue;

                    // Add the term
                    results.push((result.WssId || "") + ";#" + result.Label + "|" + result.TermGuid);
                }

                // Update the field value
                fieldValue.results = results
            } else {
                // Ensure the wss id exists
                fieldValue.WssId = fieldValue.WssId || -1;
            }
        }

        // Return the field value
        return fieldValue;
    }

    /**
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option index.
     */
    protected onChanged = (option: IDropdownOption, idx: number) => {
        // See if this is a multi-choice field
        if (this.state.fieldInfo.multi) {
            // Default the value if it doesn't exist
            let fieldValue = this.state.value || {
                __metadata: { type: "Collection(SP.Taxonomy.TaxonomyFieldValue)" },
                results: []
            };

            // Append the option if it was selected
            if (option.isSelected || option.selected) {
                fieldValue.results.push({
                    Label: option.data,
                    TermGuid: option.key,
                    WssId: -1
                });
            } else {
                // Parse the results
                for (let i = 0; i < fieldValue.results.length; i++) {
                    if (fieldValue.results[i].TermGuid == option.key) {
                        // Remove the selected option
                        fieldValue.results.splice(i, 1);
                        break;
                    }
                }
            }

            // Update the field value
            this.updateValue(fieldValue);
        } else {
            // Update the field value
            this.updateValue(option && option.key ? {
                __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
                Label: option.data,
                TermGuid: option.key,
                WssId: -1
            } : null);
        }
    }

    /**
     * The field loaded event
     * @param info - The field information.
     * @param state - The current state.
     */
    onFieldLoaded = (info, state: IFieldManagedMetadataState) => {
        let fldInfo = info as Types.Helper.IListFormMMSFieldInfo;

        // See if the default value exists
        if (this.props.defaultValue) {
            // Set the value
            state.value = this.props.defaultValue;
        }
        // Else, see if this is a new form
        else if (this.props.controlMode == SPTypes.ControlMode.New) {
            // Get the default values
            let values = (fldInfo.defaultValue || "").split(";#")
            let results = [];
            for (let i = 1; i < values.length; i += 2) {
                let value = values[i].split("|");
                if (value.length == 2) {
                    // Add the value
                    results.push({
                        Label: value[0],
                        TermGuid: value[1]
                    });
                }
            }

            // See if results exist
            if (results.length > 0) {
                // See if this is a multi value
                if (fldInfo.multi) {
                    // Set the value
                    state.value = {
                        __metadata: { type: "Collection(SP.Taxonomy.TaxonomyFieldValue)" },
                        results
                    };
                } else {
                    // Set the value
                    state.value = results[0];

                    // Add the metadata
                    state.value.__metadata = { type: "SP.Taxonomy.TaxonomyFieldValue" };
                }
            }
        }

        // Load the value field
        Helper.ListFormField.loadMMSValueField(fldInfo).then(valueField => {
            // Load the terms
            Helper.ListFormField.loadMMSData(fldInfo).then(terms => {
                // Update the state
                this.setState({
                    options: this.toOptions(terms),
                    valueField: valueField as any
                });
            });
        });
    }

    /**
     * Method to convert the field value to options
     * @param terms - The managed metadata terms.
     */
    private toOptions = (terms: Array<Types.Helper.ITermInfo> = []) => {
        let options: Array<IDropdownOption> = [];
        let rootNodeText: string = null;

        // See if this is not a required multi-lookup field
        if (!this.state.fieldInfo.required && !this.state.fieldInfo.multi) {
            // Add a blank option
            options.push({
                key: null,
                text: ""
            });
        }

        // Parse the terms
        for (let i = 0; i < terms.length; i++) {
            let item = terms[i];

            // See if this is the root node
            let text = item.pathAsString.replace(/\;/g, "/");
            if (i == 0) {
                // Set the text
                rootNodeText = text + "/";
            } else {
                // Trim the root node text
                text = text.replace(rootNodeText, "");
            }

            // Add the option
            options.push({
                data: item.name,
                key: item.id,
                text
            });
        }

        // Return the options
        return options;
    }
}