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
var definitions_1 = require("../definitions");
var _1 = require(".");
/**
 * Number Field
 */
var FieldNumber = /** @class */ (function (_super) {
    __extends(FieldNumber, _super);
    function FieldNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the component
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
            props.errorMessage = props.errorMessage ? props.errorMessage : _this.state.fieldInfo.errorMessage;
            props.label = props.label ? props.label : _this.state.label;
            props.onChanged = _this.updateValue;
            props.required = typeof (props.required) === "boolean" ? props.required : _this.state.fieldInfo.required;
            props.value = _this.getValue();
            props.errorMessage = _this.state.showErrorMessage ? (props.value ? "" : props.errorMessage) : "";
            // See if this is a percentage
            if (_this.props.numberType == definitions_1.FieldNumberTypes.Percentage || _this.state.fieldInfo.showAsPercentage) {
                // Return a slider
                return (React.createElement(office_ui_fabric_react_1.Slider, { className: props.className, disabled: props.disabled, label: props.label, max: 100, min: 0, onChange: _this.onChange, step: 1, value: props.value || 0 }));
            }
            // Return the component
            return (React.createElement(office_ui_fabric_react_1.TextField, __assign({}, props)));
        };
        /**
         * Methods
         */
        /**
         * Method to return the value
         */
        _this.getValue = function () {
            var value = _this.getFieldValue();
            // Default the number type
            var numberType = typeof (_this.props.numberType) === "number" ? _this.props.numberType : -1;
            // See if this is a percentage
            if (_this.state.fieldInfo.showAsPercentage) {
                // Convert the value to an integer
                var floatValue = parseFloat(value);
                value = typeof (floatValue) === "number" ? floatValue * 100 : value;
            }
            else if (value && numberType == definitions_1.FieldNumberTypes.Integer) {
                // Convert the value to an integer
                var intValue = parseInt(value);
                value = typeof (intValue) === "number" ? intValue.toString() : value;
            }
            // Return the value
            return value;
        };
        /**
         * The on change event
         * @param value - The field value.
         */
        _this.onChange = function (value) {
            // See if this is a percentage
            if (_this.state.fieldInfo.showAsPercentage) {
                value = value != null ? value * .01 : value;
            }
            // Update the value
            _this.updateValue(value);
        };
        /**
         * The field initialized event
         * @param field - The field.
         * @param state - The current state.
         */
        _this.onFieldInit = function (field, state) {
            var numberField = field;
            // Ensure this is a number field
            if (numberField.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Number) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a number field.");
                return;
            }
            // Update the field information
            state.fieldInfo.maxValue = numberField.MaximumValue;
            state.fieldInfo.minValue = numberField.MinimumValue;
            // See if the show as percentage property exists
            if (numberField.ShowAsPercentage != undefined) {
                // Update the property
                state.fieldInfo.showAsPercentage = numberField.ShowAsPercentage;
            }
            else {
                // Check the schema xml
                state.fieldInfo.showAsPercentage = numberField.SchemaXml.indexOf('Percentage="TRUE"') > 0;
            }
        };
        return _this;
    }
    return FieldNumber;
}(_1.BaseField));
exports.FieldNumber = FieldNumber;
//# sourceMappingURL=fieldNumber.js.map