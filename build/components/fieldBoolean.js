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
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var common_1 = require("../common");
/**
 * Boolean field
 */
var FieldBoolean = (function (_super) {
    __extends(FieldBoolean, _super);
    function FieldBoolean() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Method to get the value
        _this.getValue = function () {
            // Get the field value
            var value = _this.getFieldValue();
            // Return a boolean value
            return typeof (value) === "boolean" ? value : false;
        };
        // The on change event
        _this.onChange = function () {
            var value = _this.refs["checkbox"].checked;
            // Update the value
            _this.updateValue(value);
            // Call the change event
            _this.props.onChange ? _this.props.onChange(value) : null;
        };
        return _this;
    }
    // Render the field
    FieldBoolean.prototype.renderField = function () {
        // Update the checkbox properties
        var props = this.props.props || {};
        props.checked = this.getValue();
        props.onChange = this.onChange;
        // Render the component
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.Label, { ref: "label", required: typeof (props.required) === "boolean" ? props.required : this.state.fieldInfo.required }, props.label || this.state.label),
            React.createElement(office_ui_fabric_react_1.Checkbox, __assign({}, props, { ref: "checkbox" }))));
    };
    return FieldBoolean;
}(common_1.Field));
exports.FieldBoolean = FieldBoolean;
//# sourceMappingURL=fieldBoolean.js.map