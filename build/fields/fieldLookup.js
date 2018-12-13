"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var gd_sprest_1 = require("gd-sprest");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var _1 = require(".");
/**
 * Lookup Field
 */
var FieldLookup = /** @class */ (function (_super) {
    __extends(FieldLookup, _super);
    function FieldLookup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the field
         */
        _this.renderField = function () {
            // Ensure the options exist
            if (_this.state.options == null) {
                // Render a loading indicator
                return (React.createElement(Spinner_1.Spinner, { label: "Loading the lookup data..." }));
            }
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // See if this is an associated lookup field and we are creating or editing the field
            if (_this.state.fieldInfo.readOnly &&
                (_this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Edit || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.New)) {
                // Don't render this field
                return null;
            }
            // Update the properties
            var props = _this.props.props || {};
            props.className = (_this.props.className || "");
            props.disabled = _this.state.fieldInfo.readOnly || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            props.errorMessage = props.errorMessage ? props.errorMessage : _this.state.errorMessage;
            props.errorMessage = _this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
            props.label = props.label ? props.label : _this.state.fieldInfo.title;
            props.multiSelect = _this.state.fieldInfo.multi;
            props.onChanged = _this.onChanged;
            props.options = _this.state.options;
            props.required = props.required || _this.state.fieldInfo.required;
            // See if we are allowing multiple values
            if (props.multiSelect) {
                // Set the selected keys
                props.defaultSelectedKeys = _this.state.value ? _this.state.value.results : null;
            }
            else {
                // Set the selected key
                props.defaultSelectedKey = _this.state.value;
            }
            // Return the component
            return (React.createElement(Dropdown_1.Dropdown, __assign({}, props)));
        };
        /**
         * Methods
         */
        /**
         * The get field value method
         */
        _this.getFieldValue = function () {
            var fieldValue = _this.state.value;
            // See if results exist
            if (fieldValue && fieldValue.results) {
                var results = [];
                // Parse the results
                for (var i = 0; i < fieldValue.results.length; i++) {
                    var lookupValue = fieldValue.results[i];
                    // Add the lookup id
                    results.push(lookupValue.ID || lookupValue);
                }
                // Update the field value
                fieldValue = { results: results };
            }
            else {
                // See if this is a multi value
                if (_this.state.fieldInfo.multi) {
                    // Ensure a value exists
                    fieldValue = fieldValue || { results: [] };
                }
                else {
                    // Ensure the value is valid
                    var itemId = fieldValue.ID || fieldValue;
                    fieldValue = itemId > 0 ? itemId : null;
                }
            }
            // Return the field value
            return fieldValue;
        };
        /**
         * The change event for the dropdown list
         * @param option - The dropdown option.
         * @param idx - The dropdown option number.
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
         * The field initialized event
         * @param field - The field information.
         * @param state - The current state.
         */
        _this.onFieldLoaded = function (info, state) {
            var fldInfo = info;
            // Set the value
            state.value = _this.props.defaultValue || fldInfo.defaultValue;
            // See if this is an associated lookup field
            if (fldInfo.readOnly) {
                // Set the options
                state.options = [];
            }
            else {
                // Load the lookup data
                gd_sprest_1.Helper.ListFormField.loadLookupData(fldInfo).then(function (items) {
                    // Update the state
                    _this.setState({
                        options: _this.toOptions(items, fldInfo.lookupField)
                    });
                });
            }
        };
        /**
         * Method to convert the field value to options
         * @param items - The lookup items.
         * @param fieldName - The lookup field name.
         */
        _this.toOptions = function (items, fieldName) {
            if (items === void 0) { items = []; }
            var options = [];
            // See if this is not a required multi-lookup field
            if (!_this.state.fieldInfo.required && !_this.state.fieldInfo.multi) {
                // Add a blank option
                options.push({
                    key: null,
                    text: ""
                });
            }
            // Parse the items
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                // Add the option
                options.push({
                    key: item.Id,
                    text: item[fieldName]
                });
            }
            // Return the options
            return options;
        };
        return _this;
    }
    return FieldLookup;
}(_1.BaseField));
exports.FieldLookup = FieldLookup;
