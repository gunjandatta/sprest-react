import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Field, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";

/**
 * Text Field Information
 */
interface ITextFieldInformation extends IFieldInfo {
    multiline?: boolean;
    rows?: number;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value:string) => void;

    /** The textfield properties. */
    props?: ITextFieldProps;
}

/**
 * State
 */
interface State extends IFieldState {
    fieldInfo: ITextFieldInformation;
}

/**
 * Text Field
 */
export class FieldText extends Field<Props, State> {
    /**
     * Public Interface
     */

    // Method to render the component
    renderField() {
        let props:ITextFieldProps = this.props.props || {};

        // Update the properties
        props.defaultValue = this.props.defaultValue || this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.defaultValue ? "" : props.errorMessage) : "";
        props.label = props.label || this.state.label;
        props.multiline = typeof (props.label) === "boolean" ? props.label : this.state.fieldInfo.multiline;
        props.onChanged = this.onChange;
        props.ref = "text";
        props.required = typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required;
        props.rows = props.rows ? props.rows : this.state.fieldInfo.rows;

        // Return the component
        return (
            <TextField {...props as any} />
        );
    }

    /**
     * Events
     */

    // The field initialized event
    onFieldInit = (field: Types.IFieldNote, state: State) => {
        // Ensure this is a lookup field
        if (field.FieldTypeKind != SPTypes.FieldType.Note && field.FieldTypeKind != SPTypes.FieldType.Text) {
            // Log
            console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a text field.");
            return;
        }

        // Update the state
        state.fieldInfo.multiline = field.FieldTypeKind == SPTypes.FieldType.Note;
        state.fieldInfo.rows = field.NumberOfLines;
    }

    // The change event
    private onChange = (value:string) => {
        // Update the field value
        this.updateValue(value);

        // Call the change event
        this.props.onChange ? this.props.onChange(value) : null;
    }
}