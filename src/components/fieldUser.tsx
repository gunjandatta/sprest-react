import * as React from "react";
import { PeoplePicker, SPTypes, Types } from "gd-sprest";
import { Promise } from "es6-promise";
import { Label, ILabelProps } from "office-ui-fabric-react";
import { Field, SPPeoplePicker } from "../common";
import { IFieldUserProps, IFieldUserState } from "../definitions";
import "../../sass/fieldUser.scss";


/**
 * User Field
 */
export class FieldUser extends Field<IFieldUserProps, IFieldUserState> {
    /**
     * Public Interface
     */

    // Method to render the field
    renderField() {
        // Update the label properties
        let lblProps: ILabelProps = this.props.lblProps || {};
        lblProps.required = typeof (lblProps.required) === "boolean" ? lblProps.required : this.state.fieldInfo.required;

        // Render the component
        return (
            <div>
                <Label {...lblProps as any}>{lblProps.defaultValue || this.state.label}</Label>
                <SPPeoplePicker {...this.props.pickerProps}
                    allowMultiple={this.state.fieldInfo.allowMultiple}
                    onChange={this.onChange}
                    ref="user"
                />
            </div>
        );
    }

    /**
     * Events
     */

    // The change event
    onChange = (value) => {
        // Get the field value
        let fieldValue = (this.refs["user"] as SPPeoplePicker).state.fieldValue;

        // Update the field value
        this.updateValue(fieldValue);

        // Call the change event
        this.props.onChange ? this.props.onChange(fieldValue) : null;
    }

    // The field initialized event
    onFieldInit = (field: any, state: IFieldUserState) => {
        // Ensure this is a lookup field
        if (field.FieldTypeKind != SPTypes.FieldType.User) {
            // Log
            console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a user field.");
            return;
        }

        // Parse the default value to set the state's field value
        let defaultValue = field.AllowMultipleValues ? this.props.defaultValue : [this.props.defaultValue];
        if (defaultValue) {
            let userIDs = [];

            // Parse the users
            for (let i = 0; i < defaultValue.length; i++) {
                let userValue: Types.ComplexTypes.FieldUserValue = defaultValue[i];
                if (userValue && userValue.ID > 0) {
                    // Add the user lookup id
                    userIDs.push(userValue.ID);
                }
            }

            // Set the default value
            defaultValue = field.AllowMultipleValues ? { results: userIDs } : userIDs[0];
        }

        // Update the state
        state.fieldInfo.allowMultiple = field.AllowMultipleValues;
        state.value = defaultValue;
    }
}