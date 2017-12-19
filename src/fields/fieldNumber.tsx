import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Slider, ISliderProps, TextField, ITextFieldProps } from "office-ui-fabric-react";
import { FieldNumberTypes, IFieldNumberProps, IFieldNumberState } from "../definitions";
import { BaseField } from ".";

/**
 * Number Field
 */
export class FieldNumber extends BaseField<IFieldNumberProps, IFieldNumberState> {
    /**
     * Render the component
     */
    renderField = () => {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // Update the properties
        let props: ITextFieldProps = this.props.props || {};
        props.className = (this.props.className || "");
        props.disabled = this.state.fieldInfo.readOnly || this.props.controlMode == SPTypes.ControlMode.Display;
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.label = props.label ? props.label : this.state.label;
        props.onChanged = this.updateValue;
        props.required = typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required;
        props.value = this.getValue();
        props.errorMessage = this.state.showErrorMessage ? (props.value ? "" : props.errorMessage) : "";

        // See if this is a percentage
        if (this.props.numberType == FieldNumberTypes.Percentage || this.state.fieldInfo.showAsPercentage) {
            // Return a slider
            return (
                <Slider
                    className={props.className}
                    disabled={props.disabled}
                    label={props.label}
                    max={100}
                    min={0}
                    onChange={this.onChange}
                    step={1}
                    value={props.value || 0 as any}
                />
            );
        }

        // Return the component
        return (
            <TextField {...props as any} />
        );
    }

    /**
     * Methods
     */

    /**
     * Method to return the value
     */
    private getValue = () => {
        let value = this.getFieldValue();

        // Default the number type
        let numberType = typeof (this.props.numberType) === "number" ? this.props.numberType : -1;

        // See if this is a percentage
        if (this.state.fieldInfo.showAsPercentage) {
            // Convert the value to an integer
            let floatValue = parseFloat(value);
            value = typeof (floatValue) === "number" ? floatValue * 100 : value;
        }
        // Else, see if this is an integer
        else if (value && numberType == FieldNumberTypes.Integer) {
            // Convert the value to an integer
            let intValue = parseInt(value);
            value = typeof (intValue) === "number" ? intValue.toString() : value;
        }

        // Return the value
        return value;
    }

    /**
     * The on change event
     * @param value - The field value.
     */
    onChange = (value: number) => {
        // See if this is a percentage
        if (this.state.fieldInfo.showAsPercentage) {
            value = value != null ? value * .01 : value;
        }

        // Update the value
        this.updateValue(value);
    }

    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
    onFieldInit = (field: any, state: IFieldNumberState) => {
        let numberField = field as Types.IFieldNumber;

        // Ensure this is a number field
        if (numberField.FieldTypeKind != SPTypes.FieldType.Number) {
            // Log
            console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a number field.");
            return;
        }

        // Update the field information
        state.fieldInfo.maxValue = numberField.MaximumValue;
        state.fieldInfo.minValue = numberField.MinimumValue;

        // See if the show as percentage property exists
        if (numberField.ShowAsPercentage != undefined) {
            // Update the property
            state.fieldInfo.showAsPercentage = numberField.ShowAsPercentage;
        } else {
            // Check the schema xml
            state.fieldInfo.showAsPercentage = numberField.SchemaXml.indexOf('Percentage="TRUE"') > 0;
        }
    }
}