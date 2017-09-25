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
 * URL Field
 */
var FieldUrl = /** @class */ (function (_super) {
    __extends(FieldUrl, _super);
    function FieldUrl() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Method to render the component
        _this.renderField = function () {
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // Get the default value
            var defaultValue = _this.getFieldValue();
            // Update the url properties
            var urlProps = _this.props.urlProps || {};
            urlProps.defaultValue = defaultValue ? defaultValue.Url : "";
            urlProps.disabled = _this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            urlProps.placeholder = urlProps.placeholder ? urlProps.placeholder : "Url";
            urlProps.label = urlProps.label || _this.state.label;
            urlProps.onChanged = _this.onUrlChanged;
            urlProps.required = typeof (urlProps.required) === "boolean" ? urlProps.required : _this.state.fieldInfo.required;
            // Update the description properties
            var descProps = _this.props.descProps || {};
            descProps.defaultValue = defaultValue ? defaultValue.Description : "";
            descProps.disabled = _this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            descProps.errorMessage = descProps.errorMessage ? descProps.errorMessage : _this.state.fieldInfo.errorMessage;
            descProps.errorMessage = _this.state.showErrorMessage ? (urlProps.defaultValue ? "" : descProps.errorMessage) : "";
            descProps.onChanged = _this.onDescChanged;
            descProps.placeholder = descProps.placeholder ? descProps.placeholder : "Description";
            // See if this is the display mode
            if (_this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display) {
                // Return the value
                return (React.createElement(office_ui_fabric_react_1.Link, { className: _this.props.className, href: defaultValue.Url, label: urlProps.label }, descProps.defaultValue || urlProps.defaultValue));
            }
            // Return the component
            return (React.createElement("div", { className: _this.props.className },
                React.createElement(office_ui_fabric_react_1.TextField, __assign({}, urlProps)),
                React.createElement(office_ui_fabric_react_1.TextField, __assign({}, descProps))));
        };
        /**
         * Events
         */
        // The change event for the description field
        _this.onDescChanged = function (value) {
            // Get the value
            var fieldValue = _this.state.value || {};
            // Set the description
            fieldValue.Description = value;
            // Ensure the metadata type exists
            fieldValue.__metadata = fieldValue.__metadata || { type: "SP.FieldUrlValue" };
            // Call the change event
            _this.props.onChange ? _this.props.onChange(fieldValue) : null;
            // Update the value
            _this.updateValue(fieldValue);
        };
        // The change event for the url field
        _this.onUrlChanged = function (value) {
            // Get the value
            var fieldValue = _this.state.value || {};
            // Set the url
            fieldValue.Url = value;
            // Ensure the metadata type exists
            fieldValue.__metadata = fieldValue.__metadata || { type: "SP.FieldUrlValue" };
            // Call the change event
            _this.props.onChange ? _this.props.onChange(fieldValue) : null;
            // Update the value
            _this.updateValue(fieldValue);
        };
        return _this;
    }
    return FieldUrl;
}(_1.BaseField));
exports.FieldUrl = FieldUrl;
//# sourceMappingURL=fieldUrl.js.map