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
var fieldNumber_d_1 = require("./fieldNumber.d");
exports.FieldNumberTypes = fieldNumber_d_1.FieldNumberTypes;
var common_1 = require("../common");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * Number Field
 */
var FieldNumber = (function (_super) {
    __extends(FieldNumber, _super);
    function FieldNumber() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Methods
         */
        // Method to return the value
        _this.getValue = function () {
            var value = _this.getFieldValue();
            // Default the field type
            var fieldType = typeof (_this.props.type) === "number" ? _this.props.type : fieldNumber_d_1.FieldNumberTypes.Integer;
            // Ensure a value exists and need to convert it
            if (value && fieldType == fieldNumber_d_1.FieldNumberTypes.Integer) {
                // Convert the value to an integer
                var intValue = parseInt(value);
                value = intValue ? intValue.toString() : value;
            }
            // Return the value
            return value;
        };
        // The change event
        _this.onChange = function (value) {
            // Update the value
            _this.updateValue(value);
            // Call the change event
            _this.props.onChange ? _this.props.onChange(parseInt(value)) : null;
        };
        return _this;
    }
    // Method to render the component
    FieldNumber.prototype.renderField = function () {
        var props = this.props.props || {};
        // Update the properties
        props.defaultValue = this.getValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.defaultValue ? "" : props.errorMessage) : "";
        props.label = props.label ? props.label : this.state.label;
        props.onChanged = this.onChange;
        props.required = typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required;
        // Return the component
        return (React.createElement(office_ui_fabric_react_1.TextField, __assign({}, props, { ref: "number" })));
    };
    return FieldNumber;
}(common_1.Field));
exports.FieldNumber = FieldNumber;
