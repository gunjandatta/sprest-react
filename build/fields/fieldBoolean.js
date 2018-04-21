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
 * Boolean field
 */
var FieldBoolean = /** @class */ (function (_super) {
    __extends(FieldBoolean, _super);
    function FieldBoolean() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the field
         */
        _this.renderField = function () {
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // Update the checkbox properties
            var props = _this.props.props || {};
            props.checked = _this.getValue();
            props.onChange = _this.onChange;
            // See if this is the display mode or a read-only field
            if (_this.state.fieldInfo.readOnly || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display) {
                // Return the value
                return (React.createElement("div", { className: (_this.props.className || "") },
                    React.createElement(office_ui_fabric_react_1.Label, null, props.label || _this.state.fieldInfo.title),
                    React.createElement("div", null, _this.getValue() ? "Yes" : "No")));
            }
            // Render the component
            return (React.createElement("div", { className: (_this.props.className || "") },
                React.createElement(office_ui_fabric_react_1.Label, null, props.label || _this.state.fieldInfo.title),
                React.createElement(office_ui_fabric_react_1.Checkbox, __assign({}, props))));
        };
        /**
         * Methods
         */
        /**
         * Method to get the value
         */
        _this.getValue = function () {
            // Get the field value
            var value = _this.getFieldValue();
            // Return a boolean value
            return typeof (value) === "boolean" ? value : false;
        };
        /**
         * The on change event
         */
        _this.onChange = function (ev, checked) {
            // Update the value
            _this.updateValue(checked);
        };
        return _this;
    }
    return FieldBoolean;
}(_1.BaseField));
exports.FieldBoolean = FieldBoolean;
