import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Label, TextField, ITextFieldProps } from "office-ui-fabric-react";
import { IFieldTextProps, IFieldTextState } from "../definitions";
import { BaseField } from ".";

/**
 * Text Field
 */
export class FieldText extends BaseField<IFieldTextProps, IFieldTextState> {
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
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.errorMessage;
        props.label = props.label || this.state.fieldInfo.title;
        props.multiline = typeof (props.label) === "boolean" ? props.label : this.state.fieldInfo.multiline;
        props.onChanged = this.onChange;
        props.required = typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required;
        props.rows = props.rows ? props.rows : this.state.fieldInfo.rows;
        props.value = this.getFieldValue() || "";
        props.errorMessage = this.state.showErrorMessage ? (props.value ? "" : props.errorMessage) : "";

        // See if we are displaying the value
        if (this.state.fieldInfo.readOnly || this.props.controlMode == SPTypes.ControlMode.Display) {
            // Get the html
            let __html = props.value;
            __html = this.state.fieldInfo.richText ? __html : __html.replace(/\r?\n/g, "<br/>");

            // Render the value
            return (
                <div>
                    <Label>{props.label}</Label>
                    <div dangerouslySetInnerHTML={{ __html }} />
                </div>
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
     * The on change event
     * @param value - The field value.
     */
    private onChange = (value: string) => {
        // Update the value
        this.updateValue(value);
    }
}