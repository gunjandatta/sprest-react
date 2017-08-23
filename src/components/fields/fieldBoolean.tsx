import * as React from "react";
import { SPTypes } from "gd-sprest";
import { Checkbox, ICheckboxProps, Label } from "office-ui-fabric-react";
import { BaseField } from "../../common";
import { IFieldBoolean, IFieldBooleanProps, IFieldBooleanState } from "../../definitions";

/**
 * Boolean field
 */
export class FieldBoolean extends BaseField<IFieldBooleanProps, IFieldBooleanState> implements IFieldBoolean {
    // Render the field
    renderField() {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // See if this is the display mode
        if (this.state.controlMode == SPTypes.ControlMode.Display) {
            // Return the value
            return (
                <div className={this.props.className}>{this.getValue() ? "Yes" : "No"}</div>
            );
        }

        // Update the checkbox properties
        let props: ICheckboxProps = this.props.props || {};
        props.checked = this.getValue();
        props.onChange = this.onChange;

        // Render the component
        return (
            <div className={this.props.className}>
                <Label ref="label">{props.label || this.state.label}</Label>
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
    private onChange = (ev: React.MouseEvent<HTMLInputElement>, checked: boolean) => {
        // Call the change event
        this.props.onChange ? this.props.onChange(checked) : null;

        // Update the value
        this.updateValue(checked);
    }
}