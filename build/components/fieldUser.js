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
var gd_sprest_1 = require("gd-sprest");
var es6_promise_1 = require("es6-promise");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var common_1 = require("../common");
require("../../sass/fieldUser.scss");
/**
 * User Field
 */
var FieldUser = (function (_super) {
    __extends(FieldUser, _super);
    function FieldUser() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Global Variables
         */
        // Filter text
        _this._filterText = "";
        /**
         * Events
         */
        // The change event
        _this.onChange = function (value) {
            // Update the field value
            _this.updateValue(_this.getValue(value));
            // Call the change event
            _this.props.onChange ? _this.props.onChange(value) : null;
        };
        // The field initialized event
        _this.onFieldInit = function (field, state) {
            // Ensure this is a lookup field
            if (field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.User) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a user field.");
                return;
            }
            // Parse the default value to set the state's field value
            var defaultValue = field.AllowMultipleValues ? _this.props.defaultValue : [_this.props.defaultValue];
            if (defaultValue) {
                var userIDs = [];
                // Parse the users
                for (var i = 0; i < defaultValue.length; i++) {
                    var userValue = defaultValue[i];
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
        };
        /**
         * Methods
         */
        // Method to get the default personas
        _this.getDefaultPersonas = function () {
            var personas = [];
            // See if the default value exists
            if (_this.props.defaultValue) {
                // Parse the users
                var users = _this.props.defaultValue.results ? _this.props.defaultValue.results : [_this.props.defaultValue];
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
            // Return the default personas
            return personas;
        };
        // Method to get the field value
        _this.getValue = function (personas) {
            personas = personas ? personas : [];
            // See if we are allowing multiple
            if (_this.state.fieldInfo.allowMultiple) {
                var results = [];
                // Parse the personas
                for (var i = 0; i < personas.length; i++) {
                    // Add the user id
                    results.push(personas[i].itemID);
                }
                // Return the results
                return {
                    results: results
                };
            }
            else {
                // Get the last persona
                var persona = personas.length > 0 ? personas[personas.length - 1] : null;
                // Update the personas
                personas = persona ? [persona] : [];
                // Return the item id
                return persona ? persona.itemID : null;
            }
        };
        // Method to search for the user
        _this.search = function (filterText, personas) {
            // Save the filter
            _this._filterText = filterText.toLowerCase();
            // Ensure we have a minimum of 3 characters
            if (_this._filterText.length < 3) {
                return personas;
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
                            // Clear the promise
                            _this._promise = null;
                            // Resolve the promise
                            resolve(users);
                        });
                    }
                }, 500);
            });
        };
        return _this;
    }
    // Method to render the field
    FieldUser.prototype.renderField = function () {
        // Update the label properties
        var lblProps = this.props.lblProps || {};
        lblProps.required = typeof (lblProps.required) === "boolean" ? lblProps.required : this.state.fieldInfo.required;
        // Update the picker properties
        var pickerProps = this.props.pickerProps || {};
        pickerProps.defaultSelectedItems = this.getDefaultPersonas();
        pickerProps.getTextFromItem = function (persona) { return persona.primaryText; };
        pickerProps.onChange = this.onChange;
        pickerProps.onResolveSuggestions = this.search;
        pickerProps.pickerSuggestionsProps = pickerProps.pickerSuggestionsProps ? pickerProps.pickerSuggestionsProps : {
            className: "ms-PeoplePicker",
            loadingText: "Loading the user...",
            noResultsFoundText: "No users were found.",
            suggestionsHeaderText: "Suggested Users"
        };
        // Render the component
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.Label, __assign({}, lblProps), lblProps.value || this.state.label),
            React.createElement(office_ui_fabric_react_1.NormalPeoplePicker, __assign({}, pickerProps, { ref: "user" }))));
    };
    return FieldUser;
}(common_1.Field));
exports.FieldUser = FieldUser;
