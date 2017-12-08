import * as React from "react";
import { PeoplePicker, SPTypes, Types, Web } from "gd-sprest";
import {
    NormalPeoplePicker, IPeoplePickerProps, IPersonaProps
} from "office-ui-fabric-react";

/**
 * Properties
 */
export interface ISPPeoplePickerProps {
    allowMultiple?: boolean;
    allowGroups?: boolean;
    fieldValue?: Array<Types.ComplexTypes.FieldUserValue>;
    props?: IPeoplePickerProps;
}

/**
 * State
 */
export interface ISPPeoplePickerState {
    allowGroups?: boolean;
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

    /**
     * The filter text
     */
    private _filterText = "";

    /**
     * Constructor
     */
    constructor(props: ISPPeoplePickerProps) {
        super(props);

        // Get the personas
        let personas = props.props && props.props.defaultSelectedItems ? props.props.defaultSelectedItems : this.convertToPersonas(props.fieldValue);

        // Set the state
        this.state = {
            allowGroups: typeof (props.allowGroups) === "boolean" ? props.allowGroups : false,
            fieldValue: SPPeoplePicker.convertToFieldValue(personas),
            personas
        };
    }

    /**
     * Method to convert the personas to a field value
     * @param personas - The persona values.
     * @param allowMultiple - Flag to determine if multiple user selection is allowed.
     */
    static convertToFieldValue = (personas: Array<IPersonaProps>, allowMultiple?: boolean) => {
        let fieldValue = null;

        // See if we are allowing multiple
        if (allowMultiple) {
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

    // Render the component
    render() {
        let props = this.props.props || {} as IPeoplePickerProps;

        // Default the suggested properties
        let pickerSuggestionsProps = props.pickerSuggestionsProps || {
            className: "ms-PeoplePicker",
            loadingText: "Loading the users" + (this.state.allowGroups ? " and groups" : ""),
            noResultsFoundText: "No users " + (this.state.allowGroups ? "/groups" : "") + " were found.",
            searchForMoreText: "Search All",
            suggestionsHeaderText: "Suggested Users" + (this.state.allowGroups ? "/Groups" : "")
        };

        // Return the people picker
        return (
            <NormalPeoplePicker
                {...props}
                getTextFromItem={(persona: IPersonaProps) => { return persona.primaryText; }}
                onChange={this.onChange}
                onGetMoreResults={this.searchAll}
                onResolveSuggestions={this.search}
                pickerSuggestionsProps={pickerSuggestionsProps}
                selectedItems={this.state.personas}
            />
        );
    }

    /**
     * Methods
     */

    /**
     * Method to convert the user to persona value
     * @param users - An array of field user values.
     */
    private convertToPersonas = (users: Array<Types.ComplexTypes.FieldUserValue | number> = []): Array<IPersonaProps> => {
        let personas: Array<IPersonaProps> = [];

        // Ensure users exist
        if (users && users.length > 0) {
            let user = users[0];

            // See if this is an array of user ids
            if (typeof (user) === "number") {
                let web = new Web();
                let userInfo: Array<Types.ComplexTypes.FieldUserValue> = [];

                // Parse the users
                for (let i = 0; i < users.length; i++) {
                    // Get the user
                    web.SiteUsers(users[i]).execute(user => {
                        // Add the user information
                        user.existsFl ? userInfo.push({
                            ID: parseInt(user.Id),
                            UserName: user.LoginName,
                            Title: user.Title
                        }) : null;
                    }, true);
                }

                // Wait for the requests to complete
                web.done(() => {
                    // Update the state
                    this.setState({
                        personas: this.convertToPersonas(userInfo)
                    });
                });
            } else {
                // Parse the users
                for (let i = 0; i < users.length; i++) {
                    let user = users[i] as Types.ComplexTypes.FieldUserValue;
                    if (user.ID) {
                        // Add the persona
                        personas.push({
                            id: user.UserName,
                            itemID: user.ID + "",
                            primaryText: user.Title,
                            secondaryText: user.Email,
                            tertiaryText: user.JobTitle,
                        });
                    }
                }
            }
        }

        // Return the personas
        return personas;
    }

    /**
     * Method executed when the value changes
     * @param personas - The persona values.
     */
    private onChange = (personas?: Array<IPersonaProps>) => {
        // Update the personas
        personas = personas ? personas : [];
        if (personas.length > 1) {
            // Remove all values except for the last entry for single user types
            personas = this.props.allowMultiple ? personas : personas.splice(personas.length - 1, 1);
        }

        // Update the state
        this.setState({
            fieldValue: SPPeoplePicker.convertToFieldValue(personas),
            personas
        }, () => {
            // Call the custom onChange event
            this.props.props && this.props.props.onChange ? this.props.props.onChange(personas) : null;
        });
    }

    /**
     * Method to search for all sources
     * @param filterText - The filtered text.
     * @param personas - The selected users.
     */
    private searchAll = (filterText: string, personas: Array<IPersonaProps>): Array<IPersonaProps> | PromiseLike<Array<IPersonaProps>> => {
        // Search all principal sources
        return this.search(filterText, personas, SPTypes.PrincipalSources.All);
    }

    /**
     * Method to search for the user
     * @param filterText - The filtered text.
     * @param personas - The selected users.
     */
    private search = (filterText: string, personas: Array<IPersonaProps>, source?: number): Array<IPersonaProps> | PromiseLike<Array<IPersonaProps>> => {
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
                            PrincipalSource: typeof (source) === "number" ? source : SPTypes.PrincipalSources.UserInfoList,
                            PrincipalType: this.state.allowGroups ? SPTypes.PrincipalTypes.All : SPTypes.PrincipalTypes.User,
                            QueryString: this._filterText
                        })
                        // Execute the request
                        .execute((results) => {
                            // Resolve the promise
                            resolve(this.toArray(results));
                        });
                }
            }, 500);
        });
    }

    /**
     * Method to convert the people picker results to an array
     */
    private toArray = (results: Types.IPeoplePickerSearchUser) => {
        let users: Array<IPersonaProps> = [];

        // Parse the users
        for (let i = 0; i < results.ClientPeoplePickerSearchUser.length; i++) {
            let user = results.ClientPeoplePickerSearchUser[i];

            // Add the user
            users.push({
                id: user.Key,
                itemID: user.EntityData.SPUserID || user.EntityData.SPGroupID,
                primaryText: user.DisplayText,
                secondaryText: user.EntityData.Email,
                tertiaryText: user.Description
            });
        }

        // Return the users
        return users;
    }
}