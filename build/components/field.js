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
var Fields = require("./fields");
/**
 * Field
 */
var Field = (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.renderField = function () {
        var props = this.props || {};
        var fieldInfo = this.state.fieldInfo;
        // Return the field component, based on the type
        switch (fieldInfo.type) {
            // Boolean
            case gd_sprest_1.SPTypes.FieldType.Boolean:
                return React.createElement(Fields.FieldBoolean, __assign({}, props));
            // Choice
            case gd_sprest_1.SPTypes.FieldType.Choice:
            case gd_sprest_1.SPTypes.FieldType.MultiChoice:
                return React.createElement(Fields.FieldChoice, __assign({}, props));
            // Date/Time
            case gd_sprest_1.SPTypes.FieldType.DateTime:
                return React.createElement(Fields.FieldDateTime, __assign({}, props));
            // Lookup
            case gd_sprest_1.SPTypes.FieldType.Lookup:
                return React.createElement(Fields.FieldLookup, __assign({}, props));
            // Number
            case gd_sprest_1.SPTypes.FieldType.Currency:
            case gd_sprest_1.SPTypes.FieldType.Number:
                return React.createElement(Fields.FieldNumber, __assign({}, props));
            // Text
            case gd_sprest_1.SPTypes.FieldType.Note:
            case gd_sprest_1.SPTypes.FieldType.Text:
                return React.createElement(Fields.FieldText, __assign({}, props));
            // URL
            case gd_sprest_1.SPTypes.FieldType.URL:
                return React.createElement(Fields.FieldUrl, __assign({}, props));
            // User
            case gd_sprest_1.SPTypes.FieldType.User:
                return React.createElement(Fields.FieldUser, __assign({}, props));
            // Default
            default:
                return (React.createElement("div", null, this.state.value));
        }
    };
    return Field;
}(common_1.BaseField));
exports.Field = Field;
//# sourceMappingURL=field.js.map