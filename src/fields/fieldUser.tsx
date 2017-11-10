import * as React from "react";
import { PeoplePicker, SPTypes, Types } from "gd-sprest";
import { Label, ILabelProps, IPeoplePickerProps } from "office-ui-fabric-react";
import { IFieldUserProps, IFieldUserState } from "../definitions";
import { SPPeoplePicker } from "..";
import { BaseField } from ".";

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
                <Label {...lblProps as any}>{lblProps.defaultValue || this.state.label}</Label>
                <SPPeoplePicker
                    allowGroups={this.state.fieldInfo.allowGroups}
                    allowMultiple={this.state.fieldInfo.allowMultiple}
                    fieldValue={this.props.defaultValue ? this.props.defaultValue.results || [this.props.defaultValue] : null}
                    props={props}
                />
            </div>
        );
    }

    /**
     * Events
     */

    /**
     * The change event
     * @param personas - The user personas.
     */
    onChange = (personas) => {
        // Update the field value
        this.updateValue(SPPeoplePicker.convertToFieldValue(personas, this.state.fieldInfo.allowMultiple));
    }

    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
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
        state.fieldInfo.allowGroups = userField.SelectionMode == SPTypes.FieldUserSelectionType.PeopleAndGroups;

        // See if this is a multi-lookup field
        if (state.fieldInfo.allowMultiple) {
            let results = [];

            // Parse the users
            let users = (this.props.defaultValue ? this.props.defaultValue.results : this.props.defaultValue) || [];
            for (let i = 0; i < users.length; i++) {
                // Add the item id
                results.push(users[i].ID || users[i]);
            }

            // Set the value
            state.value = { results };
        } else {
            // Set the value
            state.value = this.props.defaultValue ? this.props.defaultValue.ID || this.props.defaultValue : null;
        }
    }
}