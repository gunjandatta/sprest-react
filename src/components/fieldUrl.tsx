import * as React from "react";
import { ITextFieldInformation, Props, State } from "./fieldUrl.d";
import { Types } from "gd-sprest";
import { Field, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { TextField, ITextFieldProps } from "office-ui-fabric-react";

/**
 * URL Field
 */
export class FieldUrl extends Field<Props, State> {
    /**
     * Public Interface
     */

    // Method to render the component
    renderField() {
        let defaultValue = this.getValue();

        // Update the url properties
        let urlProps: ITextFieldProps = this.props.urlProps || {};
        urlProps.defaultValue = defaultValue.Url;
        urlProps.placeholder = urlProps.placeholder ? urlProps.placeholder : "Url";
        urlProps.label = urlProps.label || this.state.label;
        urlProps.onChanged = this.onUrlChanged;
        urlProps.required = typeof (urlProps.required) === "boolean" ? urlProps.required : this.state.fieldInfo.required;

        // Update the description properties
        let descProps: ITextFieldProps = this.props.descProps || {};
        descProps.defaultValue = defaultValue.Description;
        descProps.errorMessage = descProps.errorMessage ? descProps.errorMessage : this.state.fieldInfo.errorMessage;
        descProps.errorMessage = this.state.showErrorMessage ? (urlProps.defaultValue ? "" : descProps.errorMessage) : "";
        descProps.onChanged = this.onDescChanged;
        descProps.placeholder = descProps.placeholder ? descProps.placeholder : "Description";

        // Return the component
        return (
            <div>
                <TextField {...urlProps as any} ref="url" />
                <TextField {...descProps as any} ref="description" />
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

        // Update the value
        this.updateValue(this.getValue(fieldValue));

        // Call the change event
        this.props.onChange ? this.props.onChange(fieldValue) : null;
    }

    // The change event for the url field
    private onUrlChanged = (value: string) => {
        // Get the value
        let fieldValue: Types.ComplexTypes.FieldUrlValue = this.state.value || {} as Types.ComplexTypes.FieldUrlValue;

        // Set the url
        fieldValue.Url = value;

        // Update the value
        this.updateValue(this.getValue(fieldValue));

        // Call the change event
        this.props.onChange ? this.props.onChange(fieldValue) : null;
    }

    /**
     * Methods
     */

    // Method to get the field value
    private getValue = (value?: Types.ComplexTypes.FieldUrlValue): Types.ComplexTypes.FieldUrlValue => {
        value = value ? value : this.getFieldValue() || {};
        return {
            __metadata: value.__metadata ? value.__metadata : { type: "SP.FieldUrlValue" },
            Description: value.Description ? value.Description : "",
            Url: value.Url ? value.Url : ""
        };
    }
}