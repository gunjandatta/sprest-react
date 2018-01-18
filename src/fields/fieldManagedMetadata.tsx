import * as React from "react";
import { ContextInfo, Helper, SPTypes, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, IDropdownProps, Spinner } from "office-ui-fabric-react";
import { IFieldManagedMetadata, IFieldManagedMetadataProps, IFieldManagedMetadataState, IManagedMetadataTermInfo } from "../definitions";
import { BaseField } from ".";
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

            // Parse the results
            for (let i = 0; i < this.state.value.results.length; i++) {
                // Add the key
                keys.push(this.state.value.results[i].TermGuid);
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
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option index.
     */
    protected onChanged = (option: IDropdownOption, idx: number) => {
        // See if this is a multi-choice field
        if (this.state.fieldInfo.multi) {
            let fieldValue = this.state.value;

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
                    if (fieldValue.results[i] == option.key) {
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
            this.updateValue(option ? {
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
        let fldInfo = info as Types.Helper.ListForm.IListFormMMSFieldInfo;

        // Set the value
        state.value = this.props.defaultValue || fldInfo.defaultValue;

        // Load the value field
        Helper.ListFormField.loadMMSValueField(fldInfo).then(valueField => {
            // Load the terms
            Helper.ListFormField.loadMMSData(fldInfo).then(terms => {
                let value = null;

                // See if this is a multi-lookup field and a value exists
                if (fldInfo.multi) {
                    let results: Array<Types.ComplexTypes.FieldManagedMetadataValue> = [];

                    // Parse the values
                    let values = this.props.defaultValue ? this.props.defaultValue.results : [];
                    for (let i = 0; i < values.length; i++) {
                        let result = values[i];
                        results.push({
                            Label: result.Label,
                            TermGuid: result.TermGuid,
                            WssId: result.WssId
                        });
                    }

                    // Set the default value
                    value = {
                        __metadata: { type: "Collection(SP.Taxonomy.TaxonomyFieldValue)" },
                        results
                    };
                } else {
                    // Set the default value
                    value = fldInfo.defaultValue ? fldInfo.defaultValue : null;
                }

                // Add the metadata
                value ? value.__metadata = { type: "SP.Taxonomy.TaxonomyFieldValue" } : null;

                // Update the state
                this.setState({
                    options: this.toOptions(terms),
                    value,
                    valueField: valueField as any
                });
            });
        });
    }

    /**
     * Method to convert the field value to options
     * @param terms - The managed metadata terms.
     */
    private toOptions = (terms: Array<IManagedMetadataTermInfo> = []) => {
        let options: Array<IDropdownOption> = [];

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

            // Add the option
            options.push({
                data: item.name,
                key: item.id,
                text: item.path
            });
        }

        // Return the options
        return options;
    }
}