import * as React from "react";
import { PeoplePicker, SPTypes, Types } from "gd-sprest";
import { Promise } from "es6-promise";
import {
    IPersonaProps,
    Label, ILabelProps,
    NormalPeoplePicker, IPeoplePickerProps
} from "office-ui-fabric-react";
import { Field } from "../common";
import { IUserFieldInfo, IFieldUserProps, IFieldUserState } from "../definitions";
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

        // Update the picker properties
        let pickerProps: IPeoplePickerProps = this.props.pickerProps || {} as IPeoplePickerProps;
        pickerProps.defaultSelectedItems = this.getDefaultPersonas();
        pickerProps.getTextFromItem = (persona: IPersonaProps) => { return persona.primaryText; };
        pickerProps.onChange = this.onChange;
        pickerProps.onResolveSuggestions = this.search;
        pickerProps.pickerSuggestionsProps = pickerProps.pickerSuggestionsProps ? pickerProps.pickerSuggestionsProps : {
            className: "ms-PeoplePicker",
            loadingText: "Loading the user...",
            noResultsFoundText: "No users were found.",
            suggestionsHeaderText: "Suggested Users"
        };

        // Render the component
        return (
            <div>
                <Label {...lblProps as any}>{lblProps.value || this.state.label}</Label>
                <NormalPeoplePicker {...pickerProps} ref="user" />
            </div>
        );
    }

    /**
     * Global Variables
     */

    // Filter text
    private _filterText = "";

    // Promise
    private _promise: PromiseLike<Array<IPersonaProps>>;

    /**
     * Events
     */

    // The change event
    onChange = (value) => {
        // Update the field value
        this.updateValue(this.getValue(value));

        // Call the change event
        this.props.onChange ? this.props.onChange(value) : null;
    }

    // The field initialized event
    onFieldInit = (field: any, state: IFieldUserState) => {
        // Ensure this is a lookup field
        if (field.FieldTypeKind != SPTypes.FieldType.User) {
            // Log
            console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a user field.");
            return;
        }

        // Update the state
        state.fieldInfo.allowMultiple = field.AllowMultipleValues;
        state.value = this.getValue(this.props.defaultValue);
    }

    /**
     * Methods
     */

    // Method to get the default personas
    private getDefaultPersonas = () => {
        let personas: Array<IPersonaProps> = [];

        // See if the default value exists
        if (this.props.defaultValue) {
            // Parse the users
            let users = this.props.defaultValue.results ? this.props.defaultValue.results : [this.props.defaultValue];
            for (let i = 0; i < users.length; i++) {
                let user: Types.ComplexTypes.FieldUserValue = users[i];

                // Ensure the user exists
                if(user.ID > 0) {
                    // Add the persona
                    personas.push({
                        id: user.UserName,
                        itemID: user.ID.toString(),
                        primaryText: user.Title,
                        secondaryText: user.Email,
                        tertiaryText: user.JobTitle,
                    });
                }
            }
        }

        // Return the default personas
        return personas;
    }

    // Method to get the field value
    private getValue = (personas: Array<IPersonaProps>) => {
        personas = personas ? personas : [];
        
        // See if we are allowing multiple
        if (this.state.fieldInfo.allowMultiple) {
            let results = [];

            // Parse the personas
            for (let i = 0; i < personas.length; i++) {
                // Add the user id
                results.push(personas[i].itemID);
            }

            // Return the results
            return {
                results
            };
        } else {
            // Get the last persona
            let persona = personas.length > 0 ? personas[personas.length - 1] : null;

            // Update the personas
            personas = persona ? [persona] : [];

            // Return the item id
            return persona ? persona.itemID : null;
        }
    }

    // Method to search for the user
    private search = (filterText: string, personas: Array<IPersonaProps>): Array<IPersonaProps> | PromiseLike<IPersonaProps> => {
        // Save the filter
        this._filterText = filterText.toLowerCase();

        // Ensure we have a minimum of 3 characters
        if (this._filterText.length < 3) { return personas; }

        // Return a promise
        return new Promise((resolve, reject) => {
            // Wait for the user to finish typing
            setTimeout(() => {
                // See if the user is still typing
                if (this._filterText != filterText.toLowerCase()) { return; }

                // See if the filter exists
                if (this._filterText) {
                    (new PeoplePicker())
                        // Search for the user
                        .clientPeoplePickerSearchUser({
                            MaximumEntitySuggestions: 15,
                            PrincipalSource: SPTypes.PrincipalSources.UserInfoList,
                            PrincipalType: SPTypes.PrincipalTypes.User,
                            QueryString: this._filterText
                        })
                        // Execute the request
                        .execute((results: Types.IPeoplePickerSearchUser) => {
                            let users: Array<IPersonaProps> = [];

                            // Parse the users
                            for (let i = 0; i < results.ClientPeoplePickerSearchUser.length; i++) {
                                let user = results.ClientPeoplePickerSearchUser[i];

                                // Add the user
                                users.push({
                                    id: user.Key,
                                    itemID: user.EntityData.SPUserID,
                                    primaryText: user.DisplayText,
                                    secondaryText: user.EntityData.Email,
                                    tertiaryText: user.Description
                                });
                            }

                            // Clear the promise
                            this._promise = null;

                            // Resolve the promise
                            resolve(users);
                        });
                }
            }, 500);
        });
    }
}