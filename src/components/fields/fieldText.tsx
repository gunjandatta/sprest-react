import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";
import { BaseField } from "../../common";
import { IFieldTextProps, IFieldTextState } from "../../definitions";

/**
 * Text Field
 */
export class FieldText extends BaseField<IFieldTextProps, IFieldTextState> {
    /**
     * Public Interface
     */

    // Method to render the component
    renderField() {
        let props: ITextFieldProps = this.props.props || {};

        // Update the properties
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.label = props.label || this.state.label;
        props.multiline = typeof (props.label) === "boolean" ? props.label : this.state.fieldInfo.multiline;
        props.onChanged = this.updateValue;
        props.required = typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required;
        props.rows = props.rows ? props.rows : this.state.fieldInfo.rows;
        props.value = this.getFieldValue();
        props.errorMessage = this.state.showErrorMessage ? (props.value ? "" : props.errorMessage) : "";

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
}