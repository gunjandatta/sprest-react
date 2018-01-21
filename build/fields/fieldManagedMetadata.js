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
 * Managed Metadata Field
 */
var FieldManagedMetadata = /** @class */ (function (_super) {
    __extends(FieldManagedMetadata, _super);
    function FieldManagedMetadata() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the field
         */
        _this.renderField = function () {
            // Ensure the options exist
            if (_this.state.options == null) {
                // Render a loading indicator
                return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the managed metadata data..." }));
            }
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
            props.multiSelect = _this.state.fieldInfo.multi;
            props.label = props.label ? props.label : _this.state.fieldInfo.title;
            props.onChanged = _this.onChanged;
            props.options = _this.state.options;
            props.required = props.required || _this.state.fieldInfo.required;
            // See if we are allowing multiple values
            if (props.multiSelect) {
                var keys = [];
                var results = (_this.state.value ? _this.state.value.results : null) || [];
                // Parse the results
                for (var i = 0; i < results.length; i++) {
                    // Add the key
                    keys.push(results[i].TermGuid);
                }
                // Set the selected keys
                props.defaultSelectedKeys = keys;
            }
            else {
                // Set the selected key
                props.defaultSelectedKey = _this.state.value ? _this.state.value.TermGuid : null;
            }
            // Return the component
            return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props)));
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
                    var result = fieldValue.results[i];
                    // Add the term
                    results.push(result.WssId + ";#" + result.Label + "|" + result.TermGuid);
                }
                // Update the field value
                fieldValue.results = results;
            }
            // Return the field value
            return fieldValue;
        };
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
                    fieldValue.results.push({
                        Label: option.data,
                        TermGuid: option.key,
                        WssId: -1
                    });
                }
                else {
                    // Parse the results
                    for (var i = 0; i < fieldValue.results.length; i++) {
                        if (fieldValue.results[i].TermGuid == option.key) {
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
                _this.updateValue(option && option.key ? {
                    __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
                    Label: option.data,
                    TermGuid: option.key,
                    WssId: -1
                } : null);
            }
        };
        /**
         * The field loaded event
         * @param info - The field information.
         * @param state - The current state.
         */
        _this.onFieldLoaded = function (info, state) {
            var fldInfo = info;
            // See if the default value exists
            if (_this.props.defaultValue) {
                // Set the value
                state.value = _this.props.defaultValue;
            }
            else if (_this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.New) {
                // Get the default values
                var values = (fldInfo.defaultValue || "").split(";#");
                var results = [];
                for (var i = 1; i < values.length; i += 2) {
                    var value = values[i].split("|");
                    if (value.length == 2) {
                        // Add the value
                        results.push({
                            Label: value[0],
                            TermGuid: value[1]
                        });
                    }
                }
                // See if results exist
                if (results.length > 0) {
                    // See if this is a multi value
                    if (fldInfo.multi) {
                        // Set the value
                        state.value = {
                            __metadata: { type: "Collection(SP.Taxonomy.TaxonomyFieldValue)" },
                            results: results
                        };
                    }
                    else {
                        // Set the value
                        state.value = results[0];
                        // Add the metadata
                        state.value.__metadata = { type: "SP.Taxonomy.TaxonomyFieldValue" };
                    }
                }
            }
            // Load the value field
            gd_sprest_1.Helper.ListFormField.loadMMSValueField(fldInfo).then(function (valueField) {
                // Load the terms
                gd_sprest_1.Helper.ListFormField.loadMMSData(fldInfo).then(function (terms) {
                    // Update the state
                    _this.setState({
                        options: _this.toOptions(terms),
                        valueField: valueField
                    });
                });
            });
        };
        /**
         * Method to convert the field value to options
         * @param terms - The managed metadata terms.
         */
        _this.toOptions = function (terms) {
            if (terms === void 0) { terms = []; }
            var options = [];
            var rootNodeText = null;
            // See if this is not a required multi-lookup field
            if (!_this.state.fieldInfo.required && !_this.state.fieldInfo.multi) {
                // Add a blank option
                options.push({
                    key: null,
                    text: ""
                });
            }
            // Parse the terms
            for (var i = 0; i < terms.length; i++) {
                var item = terms[i];
                // See if this is the root node
                var text = item.pathAsString.replace(/\;/g, "/");
                if (i == 0) {
                    // Set the text
                    rootNodeText = text + "/";
                }
                else {
                    // Trim the root node text
                    text = text.replace(rootNodeText, "");
                }
                // Add the option
                options.push({
                    data: item.name,
                    key: item.id,
                    text: text
                });
            }
            // Return the options
            return options;
        };
        return _this;
    }
    return FieldManagedMetadata;
}(_1.BaseField));
exports.FieldManagedMetadata = FieldManagedMetadata;
//# sourceMappingURL=fieldManagedMetadata.js.map