import * as React from "react";
import { Field, IFieldProps, IFieldState } from "../common";
import {
    Checkbox, ICheckboxProps,
    Label, ILabelProps
} from "office-ui-fabric-react";

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value:boolean) => void;

    /** The checkbox properties. */
    props?: ICheckboxProps;
}

/**
 * Boolean field
 */
export class FieldBoolean extends Field<Props, IFieldState> {
    // Render the field
    renderField() {
        // Update the checkbox properties
        let props:ICheckboxProps = this.props.props || {};
        props.checked = typeof(props.checked) === "boolean" ? props.checked : this.getValue();
        props.onChange = this.onChange;
        props.ref = "checkbox";

        // Render the component
        return (
            <div>
                <Label
                    ref="label"
                    required={typeof(props.required) === "boolean" ? props.required : this.state.fieldInfo.required}>
                    {props.label || this.state.label}
                </Label>
                <Checkbox {...props as any} />
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