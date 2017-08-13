import * as React from "react";
import { Promise } from "es6-promise";
import { PeoplePicker, SPTypes, Types } from "gd-sprest";
import {
    NormalPeoplePicker, IPeoplePickerProps, IPersonaProps
} from "office-ui-fabric-react";

/**
 * Properties
 */
export interface ISPPeoplePickerProps {
    allowMultiple?: boolean;
    fieldValue?: Array<Types.ComplexTypes.FieldUserValue>;
    props?: IPeoplePickerProps;
}

/**
 * State
 */
export interface ISPPeoplePickerState {
    fieldValue?: number | Array<number>;
    personas?: Array<IPersonaProps>;
}

/**
 * SharePoint People Picker
 */
export class SPPeoplePicker extends React.Component<ISPPeoplePickerProps, ISPPeoplePickerState> {
    /**
     * Global Variables
     */

    // Filter text
    private _filterText = "";

    /**
     * Constructor
     */
    constructor(props: ISPPeoplePickerProps) {
        super(props);

        // Get the personas
        let personas = this.convertToPersonas(props.fieldValue);

        // Set the state
        this.state = {
            fieldValue: this.convertToFieldValue(personas),
            personas
        };
    }

    // Render the component
    render() {
        let props = this.props.props || {} as IPeoplePickerProps;

        // Default the suggested properties
        let pickerSuggestionsProps = props.pickerSuggestionsProps || {
            className: "ms-PeoplePicker",
            loadingText: "Loading the user...",
            noResultsFoundText: "No users were found.",
            suggestionsHeaderText: "Suggested Users"
        };

        // Return the people picker
        return (
            <NormalPeoplePicker
                {...props}
                defaultSelectedItems={this.state.personas}
                getTextFromItem={(persona: IPersonaProps) => { return persona.primaryText; }}
                onChange={this.onChange}
                onResolveSuggestions={this.search}
                pickerSuggestionsProps={pickerSuggestionsProps}
            />
        );
    }

    /**
     * Methods
     */

    // Method to convert the personas to a field value
    private convertToFieldValue = (personas: Array<IPersonaProps>) => {
        let fieldValue = null;

        // See if we are allowing multiple
        if (this.props.allowMultiple) {
            // Default the field value
            fieldValue = { results: [] };

            // Parse the personas
            for (let i = 0; i < personas.length; i++) {
                // Add the user id
                fieldValue.results.push(personas[i].itemID);
            }
        } else {
            // Get the last persona
            let persona = personas.length > 0 ? personas[personas.length - 1] : null;

            // Set the field value
            fieldValue = persona ? persona.itemID : null;
        }

        // Return the field value
        return fieldValue;
    }

    // Method to convert the user to persona value
    private convertToPersonas = (users: Array<Types.ComplexTypes.FieldUserValue>): Array<IPersonaProps> => {
        let personas: Array<IPersonaProps> = [];

        // Ensure users exist
        if(users && users.length > 0) {
            // Parse the users
            for (let i = 0; i < users.length; i++) {
                let user: Types.ComplexTypes.FieldUserValue = users[i];

                // Ensure the user exists
                if (user.ID > 0) {
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

        // Return the personas
        return personas;
    }

    // Method executed when the value changes
    private onChange = (personas?: Array<IPersonaProps>) => {
        // Update the personas
        personas = personas ? personas : [];
        if (personas.length > 1) {
            // Remove all values except for the last entry for single user types
            personas = this.props.allowMultiple ? personas : personas.splice(personas.length - 1, 1);
        }

        // Update the state
        this.setState({
            fieldValue: this.convertToFieldValue(personas),
            personas
        }, () => {
            // Call the custom onChange event
            this.props.props && this.props.props.onChange ? this.props.props.onChange(personas) : null;
        });
    }

    // Method to search for the user
    private search = (filterText: string, personas: Array<IPersonaProps>): Array<IPersonaProps> | PromiseLike<Array<IPersonaProps>> => {
        // Save the filter
        this._filterText = filterText.toLowerCase();

        // Ensure we have a minimum of 3 characters
        if (this._filterText.length < 3) { return []; }

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
                        .execute((results) => {
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

                            // Resolve the promise
                            resolve(users);
                        });
                }
            }, 500);
        });
    }
}