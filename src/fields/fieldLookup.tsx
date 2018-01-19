import * as React from "react";
import { Helper, SPTypes, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, IDropdownProps, Spinner } from "office-ui-fabric-react";
import { IFieldLookup, IFieldLookupProps, IFieldLookupState } from "../definitions";
import { BaseField } from ".";

/**
 * Lookup Field
 */
export class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> implements IFieldLookup {
    /**
     * Render the field
     */
    renderField = () => {
        // Ensure the options exist
        if (this.state.options == null) {
            // Render a loading indicator
            return (
                <Spinner label="Loading the lookup data..." />
            );
        }

        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // See if this is an associated lookup field and we are creating or editing the field
        if (this.state.fieldInfo.readOnly &&
            (this.props.controlMode == SPTypes.ControlMode.Edit || this.props.controlMode == SPTypes.ControlMode.New)) {
            // Don't render this field
            return null;
        }

        // Update the properties
        let props: IDropdownProps = this.props.props || {};
        props.className = (this.props.className || "");
        props.disabled = this.state.fieldInfo.readOnly || this.props.controlMode == SPTypes.ControlMode.Display;
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        props.label = props.label ? props.label : this.state.fieldInfo.title;
        props.multiSelect = this.state.fieldInfo.multi;
        props.onChanged = this.onChanged;
        props.options = this.state.options;
        props.required = props.required || this.state.fieldInfo.required;

        // See if we are allowing multiple values
        if (props.multiSelect) {
            // Set the selected keys
            props.defaultSelectedKeys = this.state.value ? this.state.value.results : null;
        } else {
            // Set the selected key
            props.defaultSelectedKey = this.state.value;
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

        // See if results exist
        if (fieldValue.results) {
            let results = [];

            // Parse the results
            for (let i = 0; i < fieldValue.results.length; i++) {
                let lookupValue = fieldValue.results[i];

                // Add the lookup id
                results.push(lookupValue.Id || lookupValue);
            }

            // Update the field value
            fieldValue.results = results;
        } else {
            // Ensure the value is valid
            fieldValue = fieldValue > 0 ? fieldValue : null;
        }

        // Return the field value
        return fieldValue;
    }

    /**
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option number.
     */
    protected onChanged = (option: IDropdownOption, idx: number) => {
        // See if this is a multi-choice field
        if (this.state.fieldInfo.multi) {
            let fieldValue = this.state.value;

            // Append the option if it was selected
            if (option.isSelected || option.selected) {
                fieldValue.results.push(option.key);
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
            this.updateValue(option ? option.key : null);
        }
    }

    /**
     * The field initialized event
     * @param field - The field information.
     * @param state - The current state.
     */
    onFieldLoaded = (info, state: IFieldLookupState) => {
        let fldInfo = info as Types.Helper.ListForm.IListFormLookupFieldInfo;

        // Set the value
        state.value = this.props.defaultValue || fldInfo.defaultValue;

        // See if this is an associated lookup field
        if (fldInfo.readOnly) {
            // Set the options
            state.options = [];
        } else {
            // Load the lookup data
            Helper.ListFormField.loadLookupData(fldInfo).then(items => {
                // Update the state
                this.setState({
                    options: this.toOptions(items, fldInfo.lookupField)
                });
            });
        }
    }

    /**
     * Method to convert the field value to options
     * @param items - The lookup items.
     * @param fieldName - The lookup field name.
     */
    private toOptions = (items: Array<Types.IListItemQueryResult> = [], fieldName: string) => {
        let options: Array<IDropdownOption> = [];

        // See if this is not a required multi-lookup field
        if (!this.state.fieldInfo.required && !this.state.fieldInfo.multi) {
            // Add a blank option
            options.push({
                key: null,
                text: ""
            });
        }

        // Parse the items
        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            // Add the option
            options.push({
                key: item.Id,
                text: item[fieldName]
            });
        }

        // Return the options
        return options;
    }
}