import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import {
    Checkbox,
    Dropdown, IDropdownOption, IDropdownProps
} from "office-ui-fabric-react";
import { BaseField } from "../../common";
import { IFieldChoice, IFieldChoiceProps, IFieldChoiceState } from "../../definitions";
import "../../../sass/fieldChoice.scss";

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
        props.onChanged = this.onChanged;
        props.options = this.state.choices;
        props.required = props.required || this.state.fieldInfo.required;
        props.selectedKey = this.getFieldValue();
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";

        // See if this is a multi-choice field
        if (this.state.fieldInfo.multiChoice) {
            // Update the dropdown properties
            props.onRenderItem = this.renderOption;
            props.onRenderTitle = this.renderTitle;
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
        // Execute the change event
        this.props.onChange ? this.props.onChange(option) : null;

        // Update the field value
        this.updateValue(option.key);
    }

    // The change event for selecting a multi-lookup item
    private onChecked = (key: string | number) => {
        let choices = this.state.choices;

        // Parse the choice options
        for (let i = 0; i < choices.length; i++) {
            let option = choices[i];

            // See if this is the target option
            if (option.key == key) {
                // Update the selection
                option.selected = option.selected ? false : true;
                break;
            }
        }

        // Update the state
        this.setState({ choices }, () => {
            let selectedChoices = this.getSelectedOptions(choices, "key");

            // Update the field value
            this.updateValue({
                results: selectedChoices
            });

            // Call the change event
            this.props.onChange ? this.props.onChange(selectedChoices) : null;
        });
    }

    // The field initialized event
    onFieldInit = (field: any, state: IFieldChoiceState) => {
        // Clear the choices
        state.fieldInfo.choices = [];

        // Ensure this is a choice field
        switch (field.FieldTypeKind) {
            // Choice Field
            case SPTypes.FieldType.Choice:
                break;
            // Multi-Choice Field
            case SPTypes.FieldType.MultiChoice:
                // Update the state
                state.fieldInfo.multiChoice = true;
                break;
            default:
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a choice field.");
                return;
        }

        // Parse the choices
        for (let i = 0; i < field.Choices.results.length; i++) {
            let choice = field.Choices.results[i];

            // Add the choice
            state.fieldInfo.choices.push({
                key: choice,
                selected: choice == field.DefaultValue,
                text: choice
            });
        }

        // Update the choices
        state.choices = state.fieldInfo.choices;

        // See if this is a multi-choice field
        if (state.fieldInfo.multiChoice) {
            let selectedChoices = this.getSelectedOptions(state.choices, "key");

            // Update the value
            state.value = {
                results: selectedChoices
            };
        }
    }

    // The field loaded event
    onFieldLoaded = () => {
        let choices = this.state.fieldInfo.choices;

        // See if there is a default value
        let defaultValue = this.props.defaultValue ? this.props.defaultValue : "";
        if (defaultValue) {
            // See if this is a multi-choice
            if (this.state.fieldInfo.multiChoice && defaultValue) {
                let values = defaultValue.results;

                // Parse the selected values
                for (let i = 0; i < values.length; i++) {
                    let value = values[i];

                    // Parse the choices
                    for (let j = 0; j < choices.length; j++) {
                        let choice = choices[j];

                        // See if this is the selected choice
                        if (choice.text == value) {
                            choice.selected = true;
                            break;
                        }
                    }
                }
            } else {
                // Parse the choices
                for (let i = 0; i < choices.length; i++) {
                    let option = choices[i];

                    // Set the selected flag
                    option.selected = option.key == defaultValue;
                }
            }
        }


        // Set the options
        this.setState({
            choices: this.state.fieldInfo.choices
        });
    }

    /**
     * Methods
     */

    // Method to get the selected lookup items
    private getSelectedOptions = (options: Array<IDropdownOption>, key: string): Array<string | number> => {
        let values = [];

        // Parse the options
        for (let i = 0; i < options.length; i++) {
            let option = options[i];

            // See if this option is selected
            if (option.selected) {
                // Add the option
                values.push(option[key]);
            }
        }

        // Return the values
        return values;
    }

    // Method to render the multi-lookup option
    private renderOption = (option?: IDropdownOption) => {
        // Return a checkbox
        return (
            <Checkbox
                checked={option.selected}
                className="ms-Choice-Checkbox"
                key={option.key}
                label={option.text}
                onChange={() => { this.onChecked(option.key); }}
            />
        )
    }

    // Method to render the multi-lookup display value
    private renderTitle = () => {
        // Return the title
        return (
            <span>{this.getSelectedOptions(this.state.choices, "text").join(", ")}</span>
        );
    }
}