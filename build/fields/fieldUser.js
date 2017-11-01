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
var __1 = require("..");
var _1 = require(".");
/**
 * User Field
 */
var FieldUser = /** @class */ (function (_super) {
    __extends(FieldUser, _super);
    function FieldUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the field
         */
        _this.renderField = function () {
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // Update the label properties
            var lblProps = _this.props.lblProps || {};
            lblProps.required = typeof (lblProps.required) === "boolean" ? lblProps.required : _this.state.fieldInfo.required;
            // Set the picker props
            var props = _this.props.pickerProps || {};
            props.disabled = _this.state.fieldInfo.readOnly || _this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            props.onChange = _this.onChange;
            // Render the component
            return (React.createElement("div", { className: _this.props.className },
                React.createElement(office_ui_fabric_react_1.Label, __assign({}, lblProps), lblProps.defaultValue || _this.state.label),
                React.createElement(__1.SPPeoplePicker, { allowMultiple: _this.state.fieldInfo.allowMultiple, fieldValue: _this.props.defaultValue ? _this.props.defaultValue.results || [_this.props.defaultValue] : null, props: props })));
        };
        /**
         * Events
         */
        /**
         * The change event
         * @param personas - The user personas.
         */
        _this.onChange = function (personas) {
            // Update the field value
            _this.updateValue(__1.SPPeoplePicker.convertToFieldValue(personas, _this.state.fieldInfo.allowMultiple));
        };
        /**
         * The field initialized event
         * @param field - The field.
         * @param state - The current state.
         */
        _this.onFieldInit = function (field, state) {
            var userField = field;
            // Ensure this is a lookup field
            if (userField.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.User) {
                // Log
                console.warn("[gd-sprest] The field '" + userField.InternalName + "' is not a user field.");
                return;
            }
            // Update the state
            state.fieldInfo.allowMultiple = userField.AllowMultipleValues;
            // See if this is a multi-lookup field
            if (state.fieldInfo.allowMultiple) {
                var results = [];
                // Parse the users
                var users = (_this.props.defaultValue ? _this.props.defaultValue.results : _this.props.defaultValue) || [];
                for (var i = 0; i < users.length; i++) {
                    // Add the item id
                    results.push(users[i].ID || users[i]);
                }
                // Set the value
                state.value = { results: results };
            }
            else {
                // Set the value
                state.value = _this.props.defaultValue ? _this.props.defaultValue.ID || _this.props.defaultValue : null;
            }
        };
        return _this;
    }
    return FieldUser;
}(_1.BaseField));
exports.FieldUser = FieldUser;
//# sourceMappingURL=fieldUser.js.map