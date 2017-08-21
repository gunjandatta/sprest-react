"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var es6_promise_1 = require("es6-promise");
var gd_sprest_1 = require("gd-sprest");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * SharePoint People Picker
 */
var SPPeoplePicker = (function (_super) {
    __extends(SPPeoplePicker, _super);
    /**
     * Constructor
     */
    function SPPeoplePicker(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        // Filter text
        _this._filterText = "";
        /**
         * Methods
         */
        // Method to convert the user to persona value
        _this.convertToPersonas = function (users) {
            var personas = [];
            // Ensure users exist
            if (users && users.length > 0) {
                // Parse the users
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
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
        };
        // Method executed when the value changes
        _this.onChange = function (personas) {
            // Update the personas
            personas = personas ? personas : [];
            if (personas.length > 1) {
                // Remove all values except for the last entry for single user types
                personas = _this.props.allowMultiple ? personas : personas.splice(personas.length - 1, 1);
            }
            // Update the state
            _this.setState({
                fieldValue: SPPeoplePicker.convertToFieldValue(personas),
                personas: personas
            }, function () {
                // Call the custom onChange event
                _this.props.props && _this.props.props.onChange ? _this.props.props.onChange(personas) : null;
            });
        };
        // Method to search for the user
        _this.search = function (filterText, personas) {
            // Save the filter
            _this._filterText = filterText.toLowerCase();
            // Ensure we have a minimum of 3 characters
            if (_this._filterText.length < 3) {
                return [];
            }
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // Wait for the user to finish typing
                setTimeout(function () {
                    // See if the user is still typing
                    if (_this._filterText != filterText.toLowerCase()) {
                        return;
                    }
                    // See if the filter exists
                    if (_this._filterText) {
                        (new gd_sprest_1.PeoplePicker())
                            .clientPeoplePickerSearchUser({
                            MaximumEntitySuggestions: 15,
                            PrincipalSource: gd_sprest_1.SPTypes.PrincipalSources.UserInfoList,
                            PrincipalType: gd_sprest_1.SPTypes.PrincipalTypes.User,
                            QueryString: _this._filterText
                        })
                            .execute(function (results) {
                            var users = [];
                            // Parse the users
                            for (var i = 0; i < results.ClientPeoplePickerSearchUser.length; i++) {
                                var user = results.ClientPeoplePickerSearchUser[i];
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
        };
        // Get the personas
        var personas = props.props && props.props.defaultSelectedItems ? props.props.defaultSelectedItems : _this.convertToPersonas(props.fieldValue);
        // Set the state
        _this.state = {
            fieldValue: SPPeoplePicker.convertToFieldValue(personas),
            personas: personas
        };
        return _this;
    }
    // Render the component
    SPPeoplePicker.prototype.render = function () {
        var props = this.props.props || {};
        // Default the suggested properties
        var pickerSuggestionsProps = props.pickerSuggestionsProps || {
            className: "ms-PeoplePicker",
            loadingText: "Loading the user...",
            noResultsFoundText: "No users were found.",
            suggestionsHeaderText: "Suggested Users"
        };
        // Return the people picker
        return (React.createElement(office_ui_fabric_react_1.NormalPeoplePicker, __assign({}, props, { defaultSelectedItems: this.state.personas, getTextFromItem: function (persona) { return persona.primaryText; }, onChange: this.onChange, onResolveSuggestions: this.search, pickerSuggestionsProps: pickerSuggestionsProps })));
    };
    // Method to convert the personas to a field value
    SPPeoplePicker.convertToFieldValue = function (personas, allowMultiple) {
        var fieldValue = null;
        // See if we are allowing multiple
        if (allowMultiple) {
            // Default the field value
            fieldValue = { results: [] };
            // Parse the personas
            for (var i = 0; i < personas.length; i++) {
                // Add the user id
                fieldValue.results.push(personas[i].itemID);
            }
        }
        else {
            // Get the last persona
            var persona = personas.length > 0 ? personas[personas.length - 1] : null;
            // Set the field value
            fieldValue = persona ? persona.itemID : null;
        }
        // Return the field value
        return fieldValue;
    };
    return SPPeoplePicker;
}(React.Component));
exports.SPPeoplePicker = SPPeoplePicker;
//# sourceMappingURL=peoplePicker.js.map