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
var common_1 = require("../common");
require("../../sass/fieldUser.scss");
/**
 * User Field
 */
var FieldUser = (function (_super) {
    __extends(FieldUser, _super);
    function FieldUser() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Events
         */
        // The change event
        _this.onChange = function (value) {
            // Get the field value
            var fieldValue = _this.refs["user"].state.fieldValue;
            // Update the field value
            _this.updateValue(fieldValue);
            // Call the change event
            _this.props.onChange ? _this.props.onChange(fieldValue) : null;
        };
        // The field initialized event
        _this.onFieldInit = function (field, state) {
            // Ensure this is a lookup field
            if (field.FieldTypeKind != gd_sprest_1.SPTypes.FieldType.User) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a user field.");
                return;
            }
            // Parse the default value to set the state's field value
            var defaultValue = field.AllowMultipleValues ? _this.props.defaultValue : [_this.props.defaultValue];
            if (defaultValue) {
                var userIDs = [];
                // Parse the users
                for (var i = 0; i < defaultValue.length; i++) {
                    var userValue = defaultValue[i];
                    if (userValue && userValue.ID > 0) {
                        // Add the user lookup id
                        userIDs.push(userValue.ID);
                    }
                }
                // Set the default value
                defaultValue = field.AllowMultipleValues ? { results: userIDs } : userIDs[0];
            }
            // Update the state
            state.fieldInfo.allowMultiple = field.AllowMultipleValues;
            state.value = defaultValue;
        };
        return _this;
    }
    // Method to render the field
    FieldUser.prototype.renderField = function () {
        // Update the label properties
        var lblProps = this.props.lblProps || {};
        lblProps.required = typeof (lblProps.required) === "boolean" ? lblProps.required : this.state.fieldInfo.required;
        // Get the field value
        var fieldValue = null;
        if (this.state.fieldInfo.allowMultiple) {
            // Set it to the results array
            fieldValue = this.props.defaultValue ? this.props.defaultValue.results : null;
        }
        else {
            // Set the value to an array
            fieldValue = this.props.defaultValue ? [this.props.defaultValue] : null;
        }
        // Render the component
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.Label, __assign({}, lblProps), lblProps.defaultValue || this.state.label),
            React.createElement(common_1.SPPeoplePicker, __assign({}, this.props.pickerProps, { allowMultiple: this.state.fieldInfo.allowMultiple, fieldValue: fieldValue, onChange: this.onChange, ref: "user" }))));
    };
    return FieldUser;
}(common_1.Field));
exports.FieldUser = FieldUser;
//# sourceMappingURL=fieldUser.js.map