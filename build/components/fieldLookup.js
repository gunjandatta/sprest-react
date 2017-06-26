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
require("../../sass/fieldLookup.scss");
/**
 * Lookup Field
 */
var FieldLookup = (function (_super) {
    __extends(FieldLookup, _super);
    function FieldLookup() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Events
         */
        // The change event for the dropdown list
        _this.onChanged = function (option) {
            // Execute the change event
            _this.props.onChange ? _this.props.onChange(option) : null;
            // Update the field value
            _this.updateValue(option.key);
        };
        // The change event for selecting a multi-lookup item
        _this.onChecked = function (key) {
            var options = _this.state.options;
            // Parse the options
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                // See if this is the target option
                if (option.key == key) {
                    // Update the selection
                    option.selected = option.selected ? false : true;
                    break;
                }
            }
            // Update the state
            _this.setState({ options: options }, function () {
                var selectedOptions = _this.getSelectedOptions(options, "key");
                // Update the field value
                _this.updateValue({
                    __metadata: { type: "Collection(Edm.Int32)" },
                    results: selectedOptions
                });
                // Call the change event
                _this.props.onChange ? _this.props.onChange(selectedOptions) : null;
            });
        };
        // The field initialized event
        _this.onFieldInit = function (field, state) {
            // Clear the options
            state.options = [];
            // Ensure this is a lookup field
            if (field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Lookup) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a lookup field.");
                return;
            }
            // Update the state
            state.fieldInfo.allowMultipleValues = field.AllowMultipleValues;
            state.fieldInfo.lookupFieldName = field.LookupField;
            state.fieldInfo.lookupListName = field.LookupList;
            state.fieldInfo.lookupWebId = field.LookupWebId;
            // Update the value
            if (state.fieldInfo.allowMultipleValues) {
                var defaultValue = _this.props.defaultValue ? _this.props.defaultValue.results : [];
                var results = [];
                // Parse the default values
                for (var i = 0; i < defaultValue.length; i++) {
                    // Add the item id
                    results.push(defaultValue[i].ID);
                }
                // Set the value
                state.value = {
                    __metadata: { type: "Collection(Edm.Int32)" },
                    results: results
                };
            }
            else {
                // Set the value
                state.value = _this.props.defaultValue && _this.props.defaultValue.ID > 0 ? _this.props.defaultValue.ID : null;
            }
        };
        // The field loaded event
        _this.onFieldLoaded = function () {
            // Get the current site collection
            (new gd_sprest_1.Site())
                .openWebById(_this.state.fieldInfo.lookupWebId)
                .execute(function (web) {
                // Get the list
                web.Lists()
                    .getById(_this.state.fieldInfo.lookupListName)
                    .Items()
                    .query({
                    GetAllItems: _this.props.getAllItemsFl ? true : false,
                    Select: ["ID", _this.state.fieldInfo.lookupFieldName],
                    Top: 500
                })
                    .execute(function (items) {
                    var defaultValue = _this.props.defaultValue ? _this.props.defaultValue : 0;
                    var options = [];
                    // Add an empty option for single lookup fields
                    if (!_this.state.fieldInfo.allowMultipleValues) {
                        options.push({
                            key: null,
                            text: ""
                        });
                    }
                    // Parse the items
                    for (var i = 0; i < items.results.length; i++) {
                        var item = items.results[i];
                        var option = {
                            key: item.Id,
                            selected: item.Id == (defaultValue.ID ? defaultValue.ID : defaultValue),
                            text: item[_this.state.fieldInfo.lookupFieldName]
                        };
                        // See if this is a multi-lookup, and there is a default value
                        if (_this.state.fieldInfo.allowMultipleValues && defaultValue) {
                            var results = defaultValue ? defaultValue.results : [];
                            // Parse the default values
                            for (var j = 0; j < results.length; j++) {
                                var result = results[j];
                                var itemId = result.ID ? result.ID : result;
                                // See if this is the current option
                                if (option.key == itemId) {
                                    // Select this option
                                    option.selected = true;
                                    break;
                                }
                            }
                        }
                        // Add the option
                        options.push(option);
                    }
                    // Update the state
                    _this.setState({ options: options });
                });
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
            return (React.createElement(office_ui_fabric_react_1.Checkbox, { checked: option.selected, className: "ms-Lookup-Checkbox", key: option.key, label: option.text, onChange: function () { _this.onChecked(option.key); } }));
        };
        // Method to render the multi-lookup display value
        _this.renderTitle = function () {
            // Return the title
            return (React.createElement("span", null, _this.getSelectedOptions(_this.state.options, "text").join(", ")));
        };
        return _this;
    }
    // Render the field
    FieldLookup.prototype.renderField = function () {
        var props = this.props.props || {};
        // Update the properties
        props.selectedKey = this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        props.label = props.label ? props.label : this.state.label;
        props.onChanged = this.onChanged;
        props.options = this.state.options;
        // See if this is a multi-lookup field
        if (this.state.fieldInfo.allowMultipleValues) {
            // Update the dropdown properties
            props.onRenderItem = this.renderOption;
            props.onRenderTitle = this.renderTitle;
        }
        // Return the component
        return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props, { ref: "lookup" })));
    };
    return FieldLookup;
}(common_1.Field));
exports.FieldLookup = FieldLookup;
