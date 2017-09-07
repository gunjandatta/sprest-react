import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";
import { IFieldUrlProps, IFieldUrlState } from "../../definitions";
import { BaseField } from ".";

/**
 * URL Field
 */
export class FieldUrl extends BaseField<IFieldUrlProps, IFieldUrlState> {
    /**
     * Public Interface
     */

    // Method to render the component
    renderField = () => {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // Get the default value
        let defaultValue = this.getFieldValue() as Types.ComplexTypes.FieldUrlValue;

        // See if this is the display mode
        if (this.state.controlMode == SPTypes.ControlMode.Display) {
            // Return the value
            return (
                <a href={defaultValue.Url} className={this.props.className}>{defaultValue ? defaultValue.Description || defaultValue.Url : ""}</a>
            );
        }

        // Update the url properties
        let urlProps: ITextFieldProps = this.props.urlProps || {};
        urlProps.defaultValue = defaultValue ? defaultValue.Url : "";
        urlProps.disabled = this.state.controlMode == SPTypes.ControlMode.Display;
        urlProps.placeholder = urlProps.placeholder ? urlProps.placeholder : "Url";
        urlProps.label = urlProps.label || this.state.label;
        urlProps.onChanged = this.onUrlChanged;
        urlProps.required = typeof (urlProps.required) === "boolean" ? urlProps.required : this.state.fieldInfo.required;

        // Update the description properties
        let descProps: ITextFieldProps = this.props.descProps || {};
        descProps.defaultValue = defaultValue ? defaultValue.Description : "";
        descProps.disabled = this.state.controlMode == SPTypes.ControlMode.Display;
        descProps.errorMessage = descProps.errorMessage ? descProps.errorMessage : this.state.fieldInfo.errorMessage;
        descProps.errorMessage = this.state.showErrorMessage ? (urlProps.defaultValue ? "" : descProps.errorMessage) : "";
        descProps.onChanged = this.onDescChanged;
        descProps.placeholder = descProps.placeholder ? descProps.placeholder : "Description";

        // Return the component
        return (
            <div className={this.props.className}>
                <TextField {...urlProps as any} />
                <TextField {...descProps as any} />
            </div>
        );
    }

    /**
     * Events
     */

    // The change event for the description field
    private onDescChanged = (value: string) => {
        // Get the value
        let fieldValue: Types.ComplexTypes.FieldUrlValue = this.state.value || {} as Types.ComplexTypes.FieldUrlValue;

        // Set the description
        fieldValue.Description = value;

        // Ensure the metadata type exists
        fieldValue.__metadata = fieldValue.__metadata || { type: "SP.FieldUrlValue" };

        // Call the change event
        this.props.onChange ? this.props.onChange(fieldValue) : null;

        // Update the value
        this.updateValue(fieldValue);
    }

    // The change event for the url field
    private onUrlChanged = (value: string) => {
        // Get the value
        let fieldValue: Types.ComplexTypes.FieldUrlValue = this.state.value || {} as Types.ComplexTypes.FieldUrlValue;

        // Set the url
        fieldValue.Url = value;

        // Ensure the metadata type exists
        fieldValue.__metadata = fieldValue.__metadata || { type: "SP.FieldUrlValue" };

        // Call the change event
        this.props.onChange ? this.props.onChange(fieldValue) : null;

        // Update the value
        this.updateValue(fieldValue);
    }
}