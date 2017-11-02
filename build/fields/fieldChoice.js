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
            props.disabled = _this.state.fieldInfo.readOnly || _this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            props.errorMessage = props.errorMessage ? props.errorMessage : _this.state.fieldInfo.errorMessage;
            props.errorMessage = _this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
            props.label = props.label || _this.state.label;
            props.multiSelect = _this.state.fieldInfo.multiChoice;
            props.onChanged = _this.onChanged;
            props.options = _this.state.options;
            props.required = props.required || _this.state.fieldInfo.required;
            // See if this is a multi-choice
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
         * Events
         */
        /**
         * The change event for the dropdown list
         * @param option - The dropdown option.
         * @param idx - The dropdown option index.
         */
        _this.onChanged = function (option, idx) {
            // See if this is a multi-choice field
            if (_this.state.fieldInfo.multiChoice) {
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
         * The field initialized event
         * @param field - The field.
         * @param state - The current state.
         */
        _this.onFieldInit = function (field, state) {
            var choiceField = field;
            // Ensure this is a choice field
            if (field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Choice && field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.MultiChoice) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a choice field.");
                return;
            }
            // Update the state
            state.fieldInfo.choices = choiceField.Choices;
            state.fieldInfo.multiChoice = choiceField.FieldTypeKind == gd_sprest_1.SPTypes.FieldType.MultiChoice;
            state.options = _this.toOptions();
            // See if the default value is provided
            if (_this.props.defaultValue) {
                // Set the value
                state.value = _this.props.defaultValue;
            }
            else if (_this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.New && choiceField.DefaultValue) {
                // Set the value
                state.value = state.fieldInfo.multiChoice ? { results: [choiceField.DefaultValue] } : choiceField.DefaultValue;
            }
            else {
                // Set the default value
                state.value = state.fieldInfo.multiChoice ? { results: [] } : null;
            }
        };
        /**
         * Methods
         */
        /**
         * Method to convert the field value to options
         */
        _this.toOptions = function () {
            var options = [];
            // See if this is not a required multi-choice field
            if (!_this.state.fieldInfo.required && !_this.state.fieldInfo.multiChoice) {
                // Add a blank option
                options.push({
                    key: null,
                    text: ""
                });
            }
            // Parse the choices
            for (var i = 0; i < _this.state.fieldInfo.choices.results.length; i++) {
                var choice = _this.state.fieldInfo.choices.results[i];
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
//# sourceMappingURL=fieldChoice.js.map