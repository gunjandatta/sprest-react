import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { SP } from "gd-sprest-def";
import { Link, TextField, ITextFieldProps } from "office-ui-fabric-react";
import { IFieldUrlProps, IFieldUrlState } from "./types";
import { BaseField } from ".";

/**
 * URL Field
 */
export class FieldUrl extends BaseField<IFieldUrlProps, IFieldUrlState> {
    /**
     * Render the component
     */
    renderField = () => {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // Get the default value
        let defaultValue = this.getFieldValue() as SP.FieldUrlValue;

        // Update the url properties
        let urlProps: ITextFieldProps = this.props.urlProps || {};
        urlProps.defaultValue = defaultValue ? defaultValue.Url : "";
        urlProps.disabled = this.props.controlMode == SPTypes.ControlMode.Display;
        urlProps.placeholder = urlProps.placeholder ? urlProps.placeholder : "Url";
        urlProps.label = urlProps.label || this.state.fieldInfo.title;
        urlProps.onChanged = this.onUrlChanged;
        urlProps.required = typeof (urlProps.required) === "boolean" ? urlProps.required : this.state.fieldInfo.required;

        // Update the description properties
        let descProps: ITextFieldProps = this.props.descProps || {};
        descProps.defaultValue = defaultValue ? defaultValue.Description : "";
        descProps.disabled = this.props.controlMode == SPTypes.ControlMode.Display;
        descProps.errorMessage = descProps.errorMessage ? descProps.errorMessage : this.state.errorMessage;
        descProps.errorMessage = this.state.showErrorMessage ? (urlProps.defaultValue ? "" : descProps.errorMessage) : "";
        descProps.onChanged = this.onDescChanged;
        descProps.placeholder = descProps.placeholder ? descProps.placeholder : "Description";

        // See if this is the display mode
        if (this.state.fieldInfo.readOnly || this.props.controlMode == SPTypes.ControlMode.Display) {
            // Return the value
            return (
                <Link
                    className={(this.props.className || "")}
                    href={defaultValue.Url}
                    label={urlProps.label}>
                    {descProps || urlProps ? descProps.defaultValue || urlProps.defaultValue : ""}
                </Link>
            );
        }

        // Return the component
        return (
            <div className={(this.props.className || "")}>
                <TextField {...urlProps as any} />
                <TextField {...descProps as any} />
            </div>
        );
    }

    /**
     * Methods
     */

    /**
     * The change event for the description field
     * @param value - The description.
     */
    private onDescChanged = (value: string) => {
        // Get the value
        let fieldValue: SP.FieldUrlValue = this.state.value || {} as SP.FieldUrlValue;

        // Set the description
        fieldValue.Description = value;

        // Ensure the metadata type exists
        fieldValue["__metadata"] = fieldValue["__metadata"] || { type: "SP.FieldUrlValue" };

        // Update the value
        this.updateValue(fieldValue);
    }

    /**
     * The change event for the url field
     * @param value - The url.
     */
    private onUrlChanged = (value: string) => {
        // Get the value
        let fieldValue: SP.FieldUrlValue = this.state.value || {} as SP.FieldUrlValue;

        // Set the url
        fieldValue.Url = value;

        // Ensure the metadata type exists
        fieldValue["__metadata"] = fieldValue["__metadata"] || { type: "SP.FieldUrlValue" };

        // Update the value
        this.updateValue(fieldValue);
    }
}