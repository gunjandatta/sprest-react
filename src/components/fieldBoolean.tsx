import * as React from "react";
import { IFieldBoolean, Props, State } from "./fieldBoolean.d";
import { Field } from "../common";
import { Checkbox, ICheckboxProps, Label } from "office-ui-fabric-react";

/**
 * Boolean field
 */
export class FieldBoolean extends Field<Props, State> implements IFieldBoolean {
    // Render the field
    renderField() {
        // Update the checkbox properties
        let props: ICheckboxProps = this.props.props || {};
        props.checked = typeof (props.checked) === "boolean" ? props.checked : this.getValue();
        props.onChange = this.onChange;

        // Render the component
        return (
            <div>
                <Label
                    ref="label"
                    required={typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required}>
                    {props.label || this.state.label}
                </Label>
                <Checkbox {...props as any} ref="checkbox" />
            </div>
        );
    }

    // Method to get the value
    private getValue = () => {
        // Get the field value
        let value = this.getFieldValue();

        // Return a boolean value
        return typeof (value) === "boolean" ? value : false;
    }

    // The on change event
    private onChange = () => {
        let value = (this.refs["checkbox"] as Checkbox).checked;

        // Update the value
        this.updateValue(value);

        // Call the change event
        this.props.onChange ? this.props.onChange(value) : null;
    }
}