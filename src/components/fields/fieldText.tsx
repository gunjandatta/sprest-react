import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";
import { IFieldTextProps, IFieldTextState } from "../../definitions";
import { BaseField } from ".";

/**
 * Text Field
 */
export class FieldText extends BaseField<IFieldTextProps, IFieldTextState> {
    /**
     * Public Interface
     */

    // Method to render the component
    renderField() {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // See if this is the display mode
        if (this.state.controlMode == SPTypes.ControlMode.Display) {
            // Return the value
            return (
                <div className={this.props.className}>{this.getFieldValue() || ""}</div>
            );
        }

        // Update the properties
        let props: ITextFieldProps = this.props.props || {};
        props.className = this.props.className;
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.label = props.label || this.state.label;
        props.multiline = typeof (props.label) === "boolean" ? props.label : this.state.fieldInfo.multiline;
        props.onChanged = this.onChange;
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

    // The on change event
    private onChange = (value: string) => {
        // Call the change event
        this.props.onChange ? this.props.onChange(value) : null;

        // Update the value
        this.updateValue(value);
    }
}