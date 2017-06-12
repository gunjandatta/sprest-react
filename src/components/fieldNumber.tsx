import * as React from "react";
import { Field, IFieldProps, IFieldState, IFieldInfo } from "../common";
import {TextField, ITextFieldProps} from "office-ui-fabric-react";

/**
 * Number Types
 */
export enum FieldNumberTypes {
    Decimal = 0,
    Integer = 1
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value:number) => void;

    /** The textfield properties. */
    props?: ITextFieldProps;

    /** The number type. */
    type?: FieldNumberTypes;
}

/**
 * Number Field
 */
export class FieldNumber extends Field<Props, IFieldState> {
    /**
     * Public Interface
     */

    // Method to render the component
    renderField() {
        let props:ITextFieldProps = this.props.props || {};

        // Update the properties
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? props.errorMessage : "";
        props.defaultValue = this.getValue();
        props.label = props.label ? props.label : this.state.label;
        props.onChanged = this.onChange;
        props.ref = "number";
        props.required = typeof(props.required) === "boolean" ? props.required : this.state.fieldInfo.required;

        // Return the component
        return (
            <TextField {...props as any} />
        );
    }

    /**
     * Methods
     */

    // Method to return the value
    private getValue = () => {
        let value = this.getFieldValue();

        // Default the field type
        let fieldType = this.props.type ? this.props.type : FieldNumberTypes.Integer;

        // Ensure a value exists and need to convert it
        if(value && fieldType == FieldNumberTypes.Integer) {
            // Convert the value to an integer
            let intValue = parseInt(value);
            value = intValue ? intValue.toString() : value;
        }

        // Return the value
        return value;
    }

    // The change event
    private onChange = (value:string) => {
        // Update the value
        this.updateValue(value);

        // Call the change event
        this.props.onChange ? this.props.onChange(parseInt(value)) : null;
    }
}