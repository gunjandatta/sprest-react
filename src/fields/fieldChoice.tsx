import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import {
    BaseField,
    IFieldChoice, IFieldChoiceProps, IFieldChoiceState
} from ".";

/**
 * Choice field
 */
export class FieldChoice extends BaseField<IFieldChoiceProps, IFieldChoiceState> implements IFieldChoice {
    /**
     * Render the field
     */
    renderField = () => {
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
        props.label = props.label || this.state.fieldInfo.title;
        props.multiSelect = this.state.fieldInfo.multi;
        props.onChanged = this.onChanged;
        props.options = this.state.options;
        props.required = props.required || this.state.fieldInfo.required;

        // See if we are allowing multiple values
        if (props.multiSelect) {
            // Set the selected keys
            props.defaultSelectedKeys = this.state.value.results;
        } else {
            // Set the selected key
            props.defaultSelectedKey = this.state.value;
        }

        // Return the dropdown
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
     * The field loaded
     * @param field - The field information.
     * @param state - The current state.
     */
    onFieldLoaded = (info, state: IFieldChoiceState) => {
        let fldInfo = info as Types.Helper.ListForm.IListFormChoiceFieldInfo;

        // Set the choices
        state.options = this.toOptions(fldInfo);

        // Set the default value
        state.value = this.props.defaultValue;

        // See if this is a new form, and a default value exists
        if (this.props.controlMode == SPTypes.ControlMode.New && fldInfo.field.DefaultValue) {
            // Set the value
            state.value = state.value || (fldInfo.multi ? { results: [fldInfo.field.DefaultValue] } : fldInfo.field.DefaultValue);
        }

        // See if no value exists for a multi choice field
        if (state.value == null && info.multi) {
            // Set a default value
            state.value = { results: [] };
        }
    }

    /**
     * Method to convert the field value to options
     */
    private toOptions = (fldInfo: Types.Helper.ListForm.IListFormChoiceFieldInfo) => {
        let options: Array<IDropdownOption> = [];

        // See if this is not a required multi-choice field
        if (!fldInfo.required && !fldInfo.multi) {
            // Add a blank option
            options.push({
                key: null,
                text: ""
            });
        }

        // Parse the choices
        for (let i = 0; i < fldInfo.choices.length; i++) {
            let choice = fldInfo.choices[i];

            // Add the option
            options.push({
                key: choice,
                text: choice
            });
        }

        // Return the options
        return options;
    }
}