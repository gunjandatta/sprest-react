import * as React from "react";
import { PeoplePicker, SPTypes, Types } from "gd-sprest";
import { Label, ILabelProps, IPeoplePickerProps } from "office-ui-fabric-react";
import { SPPeoplePicker } from "../components";
import {
    BaseField,
    IFieldUserProps, IFieldUserState
} from ".";

/**
 * User Field
 */
export class FieldUser extends BaseField<IFieldUserProps, IFieldUserState> {
    /**
     * Render the field
     */
    renderField = () => {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // Update the label properties
        let lblProps: ILabelProps = this.props.lblProps || {};
        lblProps.required = typeof (lblProps.required) === "boolean" ? lblProps.required : this.state.fieldInfo.required;

        // Set the picker props
        let props: IPeoplePickerProps = this.props.pickerProps || {} as any;
        props.disabled = this.state.fieldInfo.readOnly || this.props.controlMode == SPTypes.ControlMode.Display;
        props.onChange = this.onChange;

        // Render the component
        return (
            <div className={(this.props.className || "")}>
                <Label {...lblProps as any}>{lblProps.defaultValue || this.state.fieldInfo.title}</Label>
                <SPPeoplePicker
                    allowGroups={this.state.fieldInfo.allowGroups}
                    allowMultiple={this.state.fieldInfo.multi}
                    fieldValue={this.state.value ? this.state.value.results || [this.state.value] : null}
                    props={props}
                />
            </div>
        );
    }

    /**
     * Methods
     */

    /**
     * The get field value method
     */
    getFieldValue = () => {
        let fieldValue = this.state.value;

        // See if results exist
        if (fieldValue && fieldValue.results) {
            let results = [];

            // Parse the results
            for (let i = 0; i < fieldValue.results.length; i++) {
                let lookupValue = fieldValue.results[i];

                // Add the lookup id
                results.push(lookupValue.Id || lookupValue);
            }

            // Update the field value
            fieldValue.results = results;
        } else {
            // Ensure the value is valid
            fieldValue = fieldValue > 0 ? fieldValue : null;
        }

        // Return the field value
        return fieldValue;
    }

    /**
     * The change event
     * @param personas - The user personas.
     */
    onChange = (personas) => {
        // Update the field value
        this.updateValue(SPPeoplePicker.convertToFieldValue(personas, this.state.fieldInfo.multi));
    }

    /**
     * The field loaded event
     * @param info - The field information.
     * @param state - The current state.
     */
    onFieldLoaded = (info, state: IFieldUserState) => {
        let fldInfo = info as Types.Helper.IListFormUserFieldInfo;

        // Default the value
        state.value = this.props.defaultValue || fldInfo.defaultValue;

        // See if this is a multi-lookup field
        if (fldInfo.multi) {
            let results = [];

            // Parse the users
            let users = (state.value ? state.value.results : state.value) || [];
            for (let i = 0; i < users.length; i++) {
                // Add the item id
                results.push(users[i].ID || users[i]);
            }

            // Set the value
            state.value = { results };
        } else {
            // Set the value
            state.value = state.value || state.value.ID;
        }
    }
}