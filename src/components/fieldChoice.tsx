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
        props.label = props.label || this.state.label;
        props.defaultSelectedKey = props.selectedKey || this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? props.errorMessage : "";
        props.onChanged = this.onChange;
        props.options = props.options || this.state.choices;
        props.ref = "choice";
        props.required = props.required || this.state.fieldInfo.required;

        // Return the dropdown
        return (
            <Dropdown {...props} />
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