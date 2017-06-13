import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";
import { Field } from "../common";
import { IFieldTextProps, IFieldTextState } from "../definitions";

/**
 * Text Field
 */
export class FieldText extends Field<IFieldTextProps, IFieldTextState> {
    /**
     * Public Interface
     */

    // Method to render the component
    renderField() {
        let props: ITextFieldProps = this.props.props || {};

        // Update the properties
        props.defaultValue = this.props.defaultValue || this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.defaultValue ? "" : props.errorMessage) : "";
        props.label = props.label || this.state.label;
        props.multiline = typeof (props.label) === "boolean" ? props.label : this.state.fieldInfo.multiline;
        props.onChanged = this.onChange;
        props.required = typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required;
        props.rows = props.rows ? props.rows : this.state.fieldInfo.rows;

        // Return the component
        return (
            <TextField {...props as any} ref="text" />
        );
    }

    /**
     * Events
     */

    // The field initialized event
    onFieldInit = (field: any, state: IFieldTextState) => {
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
    private onChange = (value: string) => {
        // Update the field value
        this.updateValue(value);

        // Call the change event
        this.props.onChange ? this.props.onChange(value) : null;
    }
}