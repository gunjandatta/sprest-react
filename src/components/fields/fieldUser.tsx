import * as React from "react";
import { PeoplePicker, SPTypes, Types } from "gd-sprest";
import { Promise } from "es6-promise";
import { Label, ILabelProps } from "office-ui-fabric-react";
import { BaseField, SPPeoplePicker } from "../../common";
import { IFieldUserProps, IFieldUserState } from "../../definitions";


/**
 * User Field
 */
export class FieldUser extends BaseField<IFieldUserProps, IFieldUserState> {
    /**
     * Public Interface
     */

    // Method to render the field
    renderField() {
        // See if a custom render method exists
        if(this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // Update the label properties
        let lblProps: ILabelProps = this.props.lblProps || {};
        lblProps.required = typeof (lblProps.required) === "boolean" ? lblProps.required : this.state.fieldInfo.required;

        // Set the picker props
        let props: any = this.props.pickerProps || {};
        props.onChange = this.onChange;

        // Render the component
        return (
            <div className={this.props.className}>
                <Label {...lblProps as any}>{lblProps.defaultValue || this.state.label}</Label>
                <SPPeoplePicker
                    allowMultiple={this.state.fieldInfo.allowMultiple}
                    fieldValue={this.state.value}
                    props={props}
                    ref="user"
                />
            </div>
        );
    }

    /**
     * Events
     */

    // The change event
    onChange = (personas) => {
        // Call the change event
        this.props.onChange ? this.props.onChange(personas) : null;

        // Update the field value
        this.updateValue(SPPeoplePicker.convertToFieldValue(personas, this.state.fieldInfo.allowMultiple));
    }

    // The field initialized event
    onFieldInit = (field: any, state: IFieldUserState) => {
        let userField = field as Types.IFieldUser;

        // Ensure this is a lookup field
        if (userField.FieldTypeKind != SPTypes.FieldType.User) {
            // Log
            console.warn("[gd-sprest] The field '" + userField.InternalName + "' is not a user field.");
            return;
        }

        // Update the state
        state.fieldInfo.allowMultiple = userField.AllowMultipleValues;
        state.value = SPPeoplePicker.convertToFieldValue(this.props.defaultValue);
    }
}