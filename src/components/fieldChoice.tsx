import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Field, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { Dropdown, IDropdownOption, IDropdownProps } from "office-ui-fabric-react";

/**
 * Choice Field Information
 */
interface IChoiceFieldInfo extends IFieldInfo {
    /** The dropdown choices. */
    choices: Array<IDropdownOption>;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value:IDropdownOption) => void;

    /** The dropdown properties. */
    props?: IDropdownProps;
}

/**
 * State
 */
interface State extends IFieldState {
    /** The dropdown choices. */
    choices?: Array<IDropdownOption>;

    /** The field information */
    fieldInfo: IChoiceFieldInfo;
}

/**
 * Boolean field
 */
export class FieldChoice extends Field<Props, State> {
    /**
     * Public Interface
     */

    // Render the field
    renderField() {
        // Update the properties
        let props:IDropdownProps = this.props.props || {};
        props.selectedKey = props.defaultSelectedKey || this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        props.label = props.label || this.state.label;
        props.onChanged = this.onChange;
        props.options = this.state.choices;
        props.required = props.required || this.state.fieldInfo.required;

        // Parse the choices to set the default value
        let defaultValue = this.props.defaultValue || props.defaultSelectedKey;
        for(let i=0; i<props.options.length; i++) {
            let option = props.options[i];

            // Update the choice
            option.selected = option.key == defaultValue;
        }

        // Return the dropdown
        return (
            <Dropdown {...props} ref="choice" />
        );
    }

    /**
     * Events
     */

    // The change event
    protected onChange = (option: IDropdownOption) => {
        // Update the field value
        this.updateValue(option.key);

        // Call the change event
        this.props.onChange ? this.props.onChange(option) : null;
    }

    // The field initialized event
    onFieldInit = (field: Types.IFieldChoice, state: State) => {
        // Clear the choices
        state.fieldInfo.choices = [];

        // Ensure this is a choice field
        if (field.FieldTypeKind != SPTypes.FieldType.Choice) {
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

        // Set the choices
        state.choices = state.fieldInfo.choices;
    }

    // The field loaded event
    onFieldLoaded = () => {
        // Set the options
        this.setState({
            choices: this.state.fieldInfo.choices
        });
    }
}