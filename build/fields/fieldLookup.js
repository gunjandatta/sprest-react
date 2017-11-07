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
                return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the lookup data..." }));
            }
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // See if this is an associated lookup field and we are creating or editing the field
            if (_this.state.fieldInfo.readOnly &&
                (_this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Edit || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.New)) {
                // Don't render this field in 
                return null;
            }
            // Update the properties
            var props = _this.props.props || {};
            props.className = (_this.props.className || "");
            props.disabled = _this.state.fieldInfo.readOnly || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            props.errorMessage = props.errorMessage ? props.errorMessage : _this.state.fieldInfo.errorMessage;
            props.errorMessage = _this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
            props.label = props.label ? props.label : _this.state.label;
            props.multiSelect = _this.state.fieldInfo.allowMultipleValues;
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
            // Return the component
            return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props)));
        };
        /**
         * Events
         */
        /**
         * The change event for the dropdown list
         * @param option - The dropdown option.
         * @param idx - The dropdown option number.
         */
        _this.onChanged = function (option, idx) {
            // See if this is a multi-choice field
            if (_this.state.fieldInfo.allowMultipleValues) {
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
            var lookupField = field;
            // Ensure this is a lookup field
            if (lookupField.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Lookup) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a lookup field.");
                return;
            }
            // Update the field information
            state.fieldInfo.allowMultipleValues = lookupField.AllowMultipleValues;
            state.fieldInfo.lookupFieldName = lookupField.LookupField;
            state.fieldInfo.lookupListName = lookupField.LookupList;
            state.fieldInfo.lookupWebId = lookupField.LookupWebId;
            // Load the lookup data
            _this.loadLookupItems(state.fieldInfo).then(function (fieldInfo) {
                var value = null;
                // See if this is a multi-lookup field and a value exists
                if (fieldInfo.allowMultipleValues) {
                    var results = [];
                    // Parse the values
                    var values = _this.props.defaultValue ? _this.props.defaultValue.results : [];
                    for (var i = 0; i < values.length; i++) {
                        // Add the item id
                        results.push(values[i].ID || values[i]);
                    }
                    // Set the default value
                    value = { results: results };
                }
                else {
                    // Set the default value
                    value = _this.props.defaultValue ? _this.props.defaultValue.ID || _this.props.defaultValue : null;
                }
                // Update the state
                _this.setState({
                    fieldInfo: fieldInfo,
                    options: _this.toOptions(fieldInfo.items, fieldInfo.lookupFieldName),
                    value: value
                });
            });
        };
        /**
         * Methods
         */
        /**
         * Method to load the lookup items
         * @param fieldInfo - The field information.
         */
        _this.loadLookupItems = function (fieldInfo) {
            // Return a promise
            return new Promise(function (resolve, reject) {
                // Get the current site collection
                (new gd_sprest_1.Site())
                    .openWebById(fieldInfo.lookupWebId)
                    .execute(function (web) {
                    // Get the list
                    web.Lists()
                        .getById(fieldInfo.lookupListName)
                        .Items()
                        .query({
                        GetAllItems: true,
                        Select: ["ID", fieldInfo.lookupFieldName],
                        Top: 500
                    })
                        .execute(function (items) {
                        // Update the field information
                        fieldInfo.items = items.results || [];
                        // Resolve the promise
                        resolve(fieldInfo);
                    });
                });
            });
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
            if (!_this.state.fieldInfo.required && !_this.state.fieldInfo.allowMultipleValues) {
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
//# sourceMappingURL=fieldLookup.js.map