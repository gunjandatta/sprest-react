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
var common_1 = require("../common");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * Boolean field
 */
var FieldChoice = (function (_super) {
    __extends(FieldChoice, _super);
    function FieldChoice() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Events
         */
        // The change event
        _this.onChange = function (option) {
            // Update the field value
            _this.updateValue(option.key);
            // Call the change event
            _this.props.onChange ? _this.props.onChange(option) : null;
        };
        // The field initialized event
        _this.onFieldInit = function (field, state) {
            // Clear the choices
            state.fieldInfo.choices = [];
            // Ensure this is a choice field
            if (field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Choice) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a choice field.");
                return;
            }
            // Parse the choices
            for (var i = 0; i < field.Choices.results.length; i++) {
                var choice = field.Choices.results[i];
                // Add the choice
                state.fieldInfo.choices.push({
                    key: choice,
                    selected: choice == field.DefaultValue,
                    text: choice
                });
            }
            // Set the choices
            state.choices = state.fieldInfo.choices;
        };
        // The field loaded event
        _this.onFieldLoaded = function () {
            // Set the options
            _this.setState({
                choices: _this.state.fieldInfo.choices
            });
        };
        return _this;
    }
    // Render the field
    FieldChoice.prototype.renderField = function () {
        // Update the properties
        var props = this.props.props || {};
        props.selectedKey = props.defaultSelectedKey || this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        props.label = props.label || this.state.label;
        props.onChanged = this.onChange;
        props.options = this.state.choices;
        props.ref = "choice";
        props.required = props.required || this.state.fieldInfo.required;
        // Parse the choices to set the default value
        var defaultValue = this.props.defaultValue || props.defaultSelectedKey;
        for (var i = 0; i < props.options.length; i++) {
            var option = props.options[i];
            // Update the choice
            option.selected = option.key == defaultValue;
        }
        // Return the dropdown
        return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props)));
    };
    return FieldChoice;
}(common_1.Field));
exports.FieldChoice = FieldChoice;
