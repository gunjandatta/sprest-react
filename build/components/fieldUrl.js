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
 * URL Field
 */
var FieldUrl = (function (_super) {
    __extends(FieldUrl, _super);
    function FieldUrl() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Events
         */
        // The change event for the description field
        _this.onDescChanged = function (value) {
            // Get the value
            var fieldValue = _this.state.value || {};
            // Set the description
            fieldValue.Description = value;
            // Update the value
            _this.updateValue(_this.getValue(fieldValue));
            // Call the change event
            _this.props.onChange ? _this.props.onChange(fieldValue) : null;
        };
        // The change event for the url field
        _this.onUrlChanged = function (value) {
            // Get the value
            var fieldValue = _this.state.value || {};
            // Set the url
            fieldValue.Url = value;
            // Update the value
            _this.updateValue(_this.getValue(fieldValue));
            // Call the change event
            _this.props.onChange ? _this.props.onChange(fieldValue) : null;
        };
        /**
         * Methods
         */
        // Method to get the field value
        _this.getValue = function (value) {
            value = value ? value : _this.getFieldValue() || {};
            return {
                __metadata: value.__metadata ? value.__metadata : { type: "SP.FieldUrlValue" },
                Description: value.Description ? value.Description : "",
                Url: value.Url ? value.Url : ""
            };
        };
        return _this;
    }
    // Method to render the component
    FieldUrl.prototype.renderField = function () {
        var defaultValue = this.getValue();
        // Update the url properties
        var urlProps = this.props.urlProps || {};
        urlProps.defaultValue = defaultValue.Url;
        urlProps.placeholder = urlProps.placeholder ? urlProps.placeholder : "Url";
        urlProps.label = urlProps.label || this.state.label;
        urlProps.onChanged = this.onUrlChanged;
        urlProps.required = typeof (urlProps.required) === "boolean" ? urlProps.required : this.state.fieldInfo.required;
        // Update the description properties
        var descProps = this.props.descProps || {};
        descProps.defaultValue = defaultValue.Description;
        descProps.errorMessage = descProps.errorMessage ? descProps.errorMessage : this.state.fieldInfo.errorMessage;
        descProps.errorMessage = this.state.showErrorMessage ? (urlProps.defaultValue ? "" : descProps.errorMessage) : "";
        descProps.onChanged = this.onDescChanged;
        descProps.placeholder = descProps.placeholder ? descProps.placeholder : "Description";
        // Return the component
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.TextField, __assign({}, urlProps, { ref: "url" })),
            React.createElement(office_ui_fabric_react_1.TextField, __assign({}, descProps, { ref: "description" }))));
    };
    return FieldUrl;
}(common_1.Field));
exports.FieldUrl = FieldUrl;
//# sourceMappingURL=fieldUrl.js.map