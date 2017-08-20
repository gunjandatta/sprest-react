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
var common_1 = require("../../common");
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
        // The change event for the dropdown list
        _this.onChanged = function (option) {
            // Update the field value
            _this.updateValue(_this.state.fieldInfo.multiChoice ? _this.toFieldValue(_this.state.options) : option || option.key);
        };
        // The field initialized event
        _this.onFieldInit = function (field, state) {
            var choiceField = field;
            // Ensure this is a choice field
            if (field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Choice && field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.MultiChoice) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a choice field.");
                return;
            }
            // Update the field information
            state.fieldInfo.choices = choiceField.Choices;
            state.fieldInfo.multiChoice = choiceField.FieldTypeKind == gd_sprest_1.SPTypes.FieldType.MultiChoice;
            // See if the default value is provided
            if (_this.props.defaultValue) {
                // Set the options
                state.options = _this.toOptions(state.fieldInfo.multiChoice ? _this.props.defaultValue.results : [_this.props.defaultValue]);
            }
            else if (choiceField.DefaultValue) {
                // Set the options
                state.options = _this.toOptions([choiceField.DefaultValue]);
            }
            else {
                // Set the options
                state.options = _this.toOptions();
            }
            // Set the field value
            state.value = state.fieldInfo.multiChoice ? _this.toFieldValue(state.options) : state.fieldInfo.defaultValue;
        };
        /**
         * Methods
         */
        // Method to convert the options to a multi-choice field value
        _this.toFieldValue = function (options) {
            if (options === void 0) { options = []; }
            var results = [];
            // Parse the options
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                // See if this option is selected
                if (option.selected) {
                    // Add the result
                    results.push(option.text);
                }
            }
            // Return the field value
            return { results: results };
        };
        // Method to convert the field value to options
        _this.toOptions = function (choices) {
            if (choices === void 0) { choices = []; }
            var options = [];
            // Parse the choices
            for (var i = 0; i < _this.state.fieldInfo.choices.results.length; i++) {
                var choice = _this.state.fieldInfo.choices.results[i];
                // Create the option
                var option = {
                    key: choice,
                    selected: false,
                    text: choice
                };
                // Parse the selected choices
                for (var j = 0; j < choices.length; j++) {
                    var choice_1 = choices[j];
                    // See if this is the selected choice
                    if (option.text == choice_1) {
                        option.selected = true;
                        break;
                    }
                }
                // Add the option
                options.push(option);
            }
            // Return the options
            return options;
        };
        return _this;
    }
    // Render the field
    FieldChoice.prototype.renderField = function () {
        // Update the properties
        var props = this.props.props || {};
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.label = props.label || this.state.label;
        props.multiSelect = this.state.fieldInfo.multiChoice;
        props.onChanged = this.onChanged;
        props.options = this.state.options;
        props.required = props.required || this.state.fieldInfo.required;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        // See if this is a multi-choice
        if (props.multiSelect) {
            // Set the selected keys
            props.selectedKeys = this.state.value.results;
        }
        else {
            // Set the selected key
            props.selectedKey = this.state.value;
        }
        // Return the dropdown
        return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props, { ref: "choice" })));
    };
    return FieldChoice;
}(common_1.BaseField));
exports.FieldChoice = FieldChoice;
//# sourceMappingURL=fieldChoice.js.map