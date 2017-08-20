import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import {
    Checkbox,
    Dropdown, IDropdownOption, IDropdownProps
} from "office-ui-fabric-react";
import { BaseField } from "../../common";
import { IFieldChoice, IFieldChoiceProps, IFieldChoiceState } from "../../definitions";

/**
 * Boolean field
 */
export class FieldChoice extends BaseField<IFieldChoiceProps, IFieldChoiceState> implements IFieldChoice {
    /**
     * Public Interface
     */

    // Render the field
    renderField() {
        // Update the properties
        let props: IDropdownProps = this.props.props || {};
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.label = props.label || this.state.label;
        props.multiSelect = this.state.fieldInfo.multiChoice;
        props.onChanged = this.onChanged;
        props.options = this.state.options;
        props.required = props.required || this.state.fieldInfo.required;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";

        // See if this is a multi-choice
        if(props.multiSelect) {
            // Set the selected keys
            props.selectedKeys = this.state.value.results;
        } else {
            // Set the selected key
            props.selectedKey = this.state.value;
        }

        // Return the dropdown
        return (
            <Dropdown {...props} ref="choice" />
        );
    }

    /**
     * Events
     */

    // The change event for the dropdown list
    protected onChanged = (option: IDropdownOption) => {
        // Update the field value
        this.updateValue(this.state.fieldInfo.multiChoice ? this.toFieldValue(this.state.options) : option || option.key);
    }

    // The field initialized event
    onFieldInit = (field: any, state: IFieldChoiceState) => {
        let choiceField = field as Types.IFieldChoice;

        // Ensure this is a choice field
        if (field.FieldTypeKind != SPTypes.FieldType.Choice && field.FieldTypeKind != SPTypes.FieldType.MultiChoice) {
            // Log
            console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a choice field.");
            return;
        }

        // Update the field information
        state.fieldInfo.choices = choiceField.Choices;
        state.fieldInfo.multiChoice = choiceField.FieldTypeKind == SPTypes.FieldType.MultiChoice;

        // See if the default value is provided
        if (this.props.defaultValue) {
            // Set the options
            state.options = this.toOptions(state.fieldInfo.multiChoice ? this.props.defaultValue.results : [this.props.defaultValue]);
        }
        // Else, see if the field has a default value
        else if (choiceField.DefaultValue) {
            // Set the options
            state.options = this.toOptions([choiceField.DefaultValue]);
        } else {
            // Set the options
            state.options = this.toOptions();
        }

        // Set the field value
        state.value = state.fieldInfo.multiChoice ? this.toFieldValue(state.options) : state.fieldInfo.defaultValue;
    }

    /**
     * Methods
     */

    // Method to convert the options to a multi-choice field value
    private toFieldValue = (options: Array<IDropdownOption> = []) => {
        let results = [];

        // Parse the options
        for (let i = 0; i < options.length; i++) {
            let option = options[i];

            // See if this option is selected
            if (option.selected) {
                // Add the result
                results.push(option.text);
            }
        }

        // Return the field value
        return { results };
    }

    // Method to convert the field value to options
    private toOptions = (choices: Array<string> = []) => {
        let options: Array<IDropdownOption> = [];

        // Parse the choices
        for (let i = 0; i < this.state.fieldInfo.choices.results.length; i++) {
            let choice = this.state.fieldInfo.choices.results[i];

            // Create the option
            let option = {
                key: choice,
                selected: false,
                text: choice
            };

            // Parse the selected choices
            for (let j = 0; j < choices.length; j++) {
                let choice = choices[j];

                // See if this is the selected choice
                if (option.text == choice) {
                    option.selected = true;
                    break;
                }
            }

            // Add the option
            options.push(option);
        }

        // Return the options
        return options;
    }
}