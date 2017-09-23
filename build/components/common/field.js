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
var __1 = require("..");
/**
 * Field
 */
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    /**
     * Constructor
     */
    function Field(props) {
        var _this = _super.call(this, props) || this;
        _this._field = _this;
        // Method to render the field
        _this.renderField = function () {
            var props = _this.props || {};
            var fieldInfo = _this.state.fieldInfo;
            // Return the field component, based on the type
            switch (fieldInfo.type) {
                // Boolean
                case gd_sprest_1.SPTypes.FieldType.Boolean:
                    return React.createElement(__1.Fields.FieldBoolean, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // Choice
                case gd_sprest_1.SPTypes.FieldType.Choice:
                case gd_sprest_1.SPTypes.FieldType.MultiChoice:
                    return React.createElement(__1.Fields.FieldChoice, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // Date/Time
                case gd_sprest_1.SPTypes.FieldType.DateTime:
                    return React.createElement(__1.Fields.FieldDateTime, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // Lookup
                case gd_sprest_1.SPTypes.FieldType.Lookup:
                    return React.createElement(__1.Fields.FieldLookup, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // Number
                case gd_sprest_1.SPTypes.FieldType.Currency:
                case gd_sprest_1.SPTypes.FieldType.Number:
                    return React.createElement(__1.Fields.FieldNumber, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // Text
                case gd_sprest_1.SPTypes.FieldType.Note:
                case gd_sprest_1.SPTypes.FieldType.Text:
                    return React.createElement(__1.Fields.FieldText, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // URL
                case gd_sprest_1.SPTypes.FieldType.URL:
                    return React.createElement(__1.Fields.FieldUrl, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // User
                case gd_sprest_1.SPTypes.FieldType.User:
                    return React.createElement(__1.Fields.FieldUser, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                // Default
                default:
                    // Check the type as string value
                    switch (fieldInfo.typeAsString) {
                        // Managed Metadata
                        case "TaxonomyFieldType":
                        case "TaxonomyFieldTypeMulti":
                            return React.createElement(__1.Fields.FieldManagedMetadata, __assign({}, props, { ref: function (field) { _this._field = field; } }));
                        // Default
                        default:
                            return (React.createElement(__1.Fields.BaseField, __assign({}, props, { ref: function (field) { _this._field = field; } })));
                    }
            }
        };
        // Set the state
        var state = _this.state;
        state.value = props.defaultValue;
        return _this;
    }
    Object.defineProperty(Field.prototype, "Info", {
        // The field information
        get: function () { return this._field.state.fieldInfo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "Value", {
        // The field value
        get: function () { return this._field.state.value; },
        enumerable: true,
        configurable: true
    });
    return Field;
}(__1.Fields.BaseField));
exports.Field = Field;
//# sourceMappingURL=field.js.map