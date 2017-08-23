import * as React from "react";
import { SPTypes } from "gd-sprest";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";
import { FieldNumberTypes, IFieldNumberProps, IFieldNumberState } from "../../definitions";
import { BaseField } from "../../common";

/**
 * Number Field
 */
export class FieldNumber extends BaseField<IFieldNumberProps, IFieldNumberState> {
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
                <div className={this.props.className}>{this.getValue() || ""}</div>
            );
        }

        // Update the properties
        let props: ITextFieldProps = this.props.props || {};
        props.className = this.props.className;
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.label = props.label ? props.label : this.state.label;
        props.onChanged = this.updateValue;
        props.required = typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required;
        props.value = this.getValue();
        props.errorMessage = this.state.showErrorMessage ? (props.value ? "" : props.errorMessage) : "";

        // Return the component
        return (
            <TextField {...props as any} ref="number" />
        );
    }

    /**
     * Methods
     */

    // Method to return the value
    private getValue = () => {
        let value = this.getFieldValue();

        // Default the number type
        let numberType = typeof (this.props.numberType) === "number" ? this.props.numberType : FieldNumberTypes.Integer;

        // Ensure a value exists and need to convert it
        if (value && numberType == FieldNumberTypes.Integer) {
            // Convert the value to an integer
            let intValue = parseInt(value);
            value = intValue ? intValue.toString() : value;
        }

        // Return the value
        return value;
    }

    // The on change event
    private onChange = (value: number) => {
        // Call the change event
        this.props.onChange ? this.props.onChange(value) : null;

        // Update the value
        this.updateValue(value);
    }
}