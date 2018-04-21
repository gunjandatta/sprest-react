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
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var _1 = require(".");
/**
 * Choice field
 */
var FieldChoice = /** @class */ (function (_super) {
    __extends(FieldChoice, _super);
    function FieldChoice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the field
         */
        _this.renderField = function () {
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // Update the properties
            var props = _this.props.props || {};
            props.className = (_this.props.className || "");
            props.disabled = _this.state.fieldInfo.readOnly || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            props.errorMessage = props.errorMessage ? props.errorMessage : _this.state.errorMessage;
            props.errorMessage = _this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
            props.label = props.label || _this.state.fieldInfo.title;
            props.multiSelect = _this.state.fieldInfo.multi;
            props.onChanged = _this.onChanged;
            props.options = _this.state.options;
            props.required = props.required || _this.state.fieldInfo.required;
            // See if we are allowing multiple values
            if (props.multiSelect) {
                // Set the selected keys
                props.defaultSelectedKeys = _this.state.value.results;
            }
            else {
                // Set the selected key
                props.defaultSelectedKey = _this.state.value;
            }
            // Return the dropdown
            return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props)));
        };
        /**
         * Methods
         */
        /**
         * The change event for the dropdown list
         * @param option - The dropdown option.
         * @param idx - The dropdown option index.
         */
        _this.onChanged = function (option, idx) {
            // See if this is a multi-choice field
            if (_this.state.fieldInfo.multi) {
                var fieldValue = _this.state.value;
                // Append the option if it was selected
                if (option.isSelected || option.selected) {
                    fieldValue.results.push(option.key);
                }
                else {
                    // Parse the results
                    for (var i = 0; i < fieldValue.results.length; i++) {
                        if (fieldValue.results[i] == option.key) {
                            // Remove the selected option
                            fieldValue.results.splice(i, 1);
                            break;
                        }
                    }
                }
                // Update the field value
                _this.updateValue(fieldValue);
            }
            else {
                // Update the field value
                _this.updateValue(option ? option.key : null);
            }
        };
        /**
         * The field loaded
         * @param field - The field information.
         * @param state - The current state.
         */
        _this.onFieldLoaded = function (info, state) {
            var fldInfo = info;
            // Set the choices
            state.options = _this.toOptions(fldInfo);
            // Set the default value
            state.value = _this.props.defaultValue;
            // See if this is a new form, and a default value exists
            if (_this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.New && fldInfo.field.DefaultValue) {
                // Set the value
                state.value = state.value || (fldInfo.multi ? { results: [fldInfo.field.DefaultValue] } : fldInfo.field.DefaultValue);
            }
            // See if no value exists for a multi choice field
            if (state.value == null && info.multi) {
                // Set a default value
                state.value = { results: [] };
            }
        };
        /**
         * Method to convert the field value to options
         */
        _this.toOptions = function (fldInfo) {
            var options = [];
            // See if this is not a required multi-choice field
            if (!fldInfo.required && !fldInfo.multi) {
                // Add a blank option
                options.push({
                    key: null,
                    text: ""
                });
            }
            // Parse the choices
            for (var i = 0; i < fldInfo.choices.length; i++) {
                var choice = fldInfo.choices[i];
                // Add the option
                options.push({
                    key: choice,
                    text: choice
                });
            }
            // Return the options
            return options;
        };
        return _this;
    }
    return FieldChoice;
}(_1.BaseField));
exports.FieldChoice = FieldChoice;
