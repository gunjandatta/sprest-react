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
 * Text Field
 */
var FieldText = /** @class */ (function (_super) {
    __extends(FieldText, _super);
    function FieldText() {
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
            props.errorMessage = props.errorMessage ? props.errorMessage : _this.state.fieldInfo.errorMessage;
            props.label = props.label || _this.state.label;
            props.multiline = typeof (props.label) === "boolean" ? props.label : _this.state.fieldInfo.multiline;
            props.onChanged = _this.onChange;
            props.required = typeof (props.required) === "boolean" ? props.required : _this.state.fieldInfo.required;
            props.rows = props.rows ? props.rows : _this.state.fieldInfo.rows;
            props.value = _this.getFieldValue();
            props.errorMessage = _this.state.showErrorMessage ? (props.value ? "" : props.errorMessage) : "";
            // See if we are displaying the value
            if (_this.state.fieldInfo.readOnly || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display) {
                // Render the value
                return (React.createElement("div", null,
                    React.createElement(office_ui_fabric_react_1.Label, null, props.label),
                    React.createElement("div", { dangerouslySetInnerHTML: { __html: _this.props.defaultValue || "" } })));
            }
            // Return the component
            return (React.createElement(office_ui_fabric_react_1.TextField, __assign({}, props)));
        };
        /**
         * Events
         */
        /**
         * The field initialized event
         * @param field - The field.
         * @param state - The current state.
         */
        _this.onFieldInit = function (field, state) {
            // Ensure this is a lookup field
            if (field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Note && field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.Text) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a text field.");
                return;
            }
            // Update the state
            state.fieldInfo.multiline = field.FieldTypeKind == gd_sprest_1.SPTypes.FieldType.Note;
            state.fieldInfo.rows = field.NumberOfLines;
        };
        /**
         * The on change event
         * @param value - The field value.
         */
        _this.onChange = function (value) {
            // Update the value
            _this.updateValue(value);
        };
        return _this;
    }
    return FieldText;
}(_1.BaseField));
exports.FieldText = FieldText;
//# sourceMappingURL=fieldText.js.map