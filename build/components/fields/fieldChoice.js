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
require("../../../sass/fieldChoice.scss");
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
            _this.updateValue(option.key);
        };
        // The change event for selecting a multi-lookup item
        _this.onChecked = function (key) {
            var choices = _this.state.choices;
            // Parse the choice options
            for (var i = 0; i < choices.length; i++) {
                var option = choices[i];
                // See if this is the target option
                if (option.key == key) {
                    // Update the selection
                    option.selected = option.selected ? false : true;
                    break;
                }
            }
            // Update the state
            _this.setState({ choices: choices }, function () {
                var selectedChoices = _this.getSelectedOptions(choices, "key");
                // Update the field value
                _this.updateValue({
                    results: selectedChoices
                });
            });
        };
        // The field initialized event
        _this.onFieldInit = function (field, state) {
            // Clear the choices
            state.fieldInfo.choices = [];
            // Ensure this is a choice field
            switch (field.FieldTypeKind) {
                // Choice Field
                case gd_sprest_1.SPTypes.FieldType.Choice:
                    break;
                // Multi-Choice Field
                case gd_sprest_1.SPTypes.FieldType.MultiChoice:
                    // Update the state
                    state.fieldInfo.multiChoice = true;
                    break;
                default:
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
            // Update the choices
            state.choices = state.fieldInfo.choices;
            // See if this is a multi-choice field
            if (state.fieldInfo.multiChoice) {
                var selectedChoices = _this.getSelectedOptions(state.choices, "key");
                // Update the value
                state.value = {
                    results: selectedChoices
                };
            }
        };
        // The field loaded event
        _this.onFieldLoaded = function () {
            var choices = _this.state.fieldInfo.choices;
            // See if there is a default value
            var defaultValue = _this.props.defaultValue ? _this.props.defaultValue : "";
            if (defaultValue) {
                // See if this is a multi-choice
                if (_this.state.fieldInfo.multiChoice && defaultValue) {
                    var values = defaultValue.results;
                    // Parse the selected values
                    for (var i = 0; i < values.length; i++) {
                        var value = values[i];
                        // Parse the choices
                        for (var j = 0; j < choices.length; j++) {
                            var choice = choices[j];
                            // See if this is the selected choice
                            if (choice.text == value) {
                                choice.selected = true;
                                break;
                            }
                        }
                    }
                }
                else {
                    // Parse the choices
                    for (var i = 0; i < choices.length; i++) {
                        var option = choices[i];
                        // Set the selected flag
                        option.selected = option.key == defaultValue;
                    }
                }
            }
            // Set the options
            _this.setState({
                choices: _this.state.fieldInfo.choices
            });
        };
        /**
         * Methods
         */
        // Method to get the selected lookup items
        _this.getSelectedOptions = function (options, key) {
            var values = [];
            // Parse the options
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                // See if this option is selected
                if (option.selected) {
                    // Add the option
                    values.push(option[key]);
                }
            }
            // Return the values
            return values;
        };
        // Method to render the multi-lookup option
        _this.renderOption = function (option) {
            // Return a checkbox
            return (React.createElement(office_ui_fabric_react_1.Checkbox, { checked: option.selected, className: "ms-Choice-Checkbox", key: option.key, label: option.text, onChange: function () { _this.onChecked(option.key); } }));
        };
        // Method to render the multi-lookup display value
        _this.renderTitle = function () {
            // Return the title
            return (React.createElement("span", null, _this.getSelectedOptions(_this.state.choices, "text").join(", ")));
        };
        return _this;
    }
    // Render the field
    FieldChoice.prototype.renderField = function () {
        // Update the properties
        var props = this.props.props || {};
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.label = props.label || this.state.label;
        props.onChanged = this.onChanged;
        props.options = this.state.choices;
        props.required = props.required || this.state.fieldInfo.required;
        props.selectedKey = this.getFieldValue();
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        // See if this is a multi-choice field
        if (this.state.fieldInfo.multiChoice) {
            // Update the dropdown properties
            props.onRenderItem = this.renderOption;
            props.onRenderTitle = this.renderTitle;
        }
        // Return the dropdown
        return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props, { ref: "choice" })));
    };
    return FieldChoice;
}(common_1.BaseField));
exports.FieldChoice = FieldChoice;
//# sourceMappingURL=fieldChoice.js.map