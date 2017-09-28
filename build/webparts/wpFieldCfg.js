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
var _1 = require(".");
/**
 * WebPart Field Configuration Panel
 */
var WebPartFieldCfg = /** @class */ (function (_super) {
    __extends(WebPartFieldCfg, _super);
    /**
     * Constructor
     * @param props - The webpart field configuration properties.
     */
    function WebPartFieldCfg(props) {
        var _this = _super.call(this, props) || this;
        _this._fieldLabel = null;
        _this._fieldPicker = null;
        /**
         * Events
         */
        /**
         * The on field picker display event
         * @param tags - The fields as an array of tags for the picker.
         */
        _this.onFieldPickerDisplay = function (tags) { return; };
        /**
         * The render footer event
         */
        _this.onRenderFooter = function () {
            var footer = null;
            // See if the lists exists
            if (_this.state.lists != null) {
                footer = _this.renderField();
                footer.push(_this.renderSaveButton());
            }
            // Render the footer
            return footer;
        };
        /**
         * Method to resolve suggestions event
         * @param filterText - The filter text.
         * @param selectedItems - The selected tags.
         */
        _this.onResolveSuggestions = function (filterText, selectedItems) {
            var tags = [];
            // Ensure the list and filter exists
            if (_this.state.selectedList && filterText) {
                var filter = filterText.toLowerCase();
                // Parse the fields
                for (var i = 0; i < _this.state.selectedList.Fields.results.length; i++) {
                    var field = _this.state.selectedList.Fields.results[i];
                    // See if the internal or title contain this value
                    if (field.InternalName.toLowerCase().indexOf(filter) >= 0 ||
                        field.Title.toLowerCase().indexOf(filter) >= 0) {
                        var existsFl = false;
                        // Parse the selected items
                        for (var j = 0; j < selectedItems.length; j++) {
                            if (existsFl = (selectedItems[j].key == field.InternalName)) {
                                // Break from the loop
                                break;
                            }
                        }
                        // See if the tag is already selected
                        if (existsFl) {
                            continue;
                        }
                        // Add the tag
                        tags.push({
                            key: field.InternalName,
                            name: field.Title + " [" + field.InternalName + "]",
                        });
                    }
                }
            }
            // Call the field picker display event
            _this.onFieldPickerDisplay(tags);
            // Return the tags
            return tags || [];
        };
        /**
         * Methods
         */
        /**
         * Method to render the field property
         */
        _this.renderField = function () {
            var tags = [];
            // Parse the fields
            var fields = _this.state.cfg.Fields || [];
            for (var i = 0; i < fields.length; i++) {
                var field = _this.state.cfg.Fields[i];
                // Add the tag
                tags.push({
                    key: field.InternalName,
                    name: field.Title + " [" + field.InternalName + "]",
                });
            }
            // Set the label properties
            var lblProps = _this.props.fieldLabel || {};
            // Set the picker properties
            var pickerProps = _this.props.fieldPicker || {};
            pickerProps.defaultSelectedItems = tags;
            pickerProps.onChange = _this.updateFields;
            pickerProps.onResolveSuggestions = _this.onResolveSuggestions;
            pickerProps.pickerSuggestionsProps = pickerProps.pickerSuggestionsProps || {
                noResultsFoundText: "No fields found.",
                suggestionsHeaderText: "Fields"
            };
            // Return the footer
            return [
                React.createElement(office_ui_fabric_react_1.Label, __assign({}, lblProps, { ref: function (lbl) { _this._fieldLabel = lbl; }, key: "fieldLabel" }),
                    _this.props.fieldLabel || "Fields",
                    ":"),
                React.createElement(office_ui_fabric_react_1.TagPicker, __assign({}, pickerProps, { ref: function (picker) { _this._fieldPicker = picker; }, key: "fieldPicker" }))
            ];
        };
        /**
         * Method to update the state w/ the selected field(s)
         */
        _this.updateFields = function (selectedFields) {
            // Update the configuration
            var cfg = _this.state.cfg;
            cfg.Fields = [];
            // Parse the selected fields
            for (var i = 0; i < selectedFields.length; i++) {
                var selectedField = selectedFields[i];
                // Parse the list fields
                for (var j = 0; j < _this.state.selectedList.Fields.results.length; j++) {
                    var field = _this.state.selectedList.Fields.results[j];
                    // See if this is the field we are looking for
                    if (field.InternalName == selectedField.key) {
                        // See if this is a taxonomy field
                        if (field.TypeAsString.indexOf("TaxonomyFieldType") == 0) {
                            // Parse the fields
                            for (var k = 0; k < _this.state.selectedList.Fields.results.length; k++) {
                                var fld = _this.state.selectedList.Fields.results[k];
                                // See if this is the hidden value field
                                if (fld.Title == field.Title + "_0") {
                                    // Add the hidden value field
                                    cfg.Fields.push(fld);
                                    break;
                                }
                            }
                        }
                        else {
                            // Add the field
                            cfg.Fields.push(field);
                        }
                        // Break from the loop
                        break;
                    }
                }
            }
            // Sort the fields
            cfg.Fields = cfg.Fields.sort(function (a, b) {
                if (a.Title < b.Title) {
                    return -1;
                }
                if (a.Title > b.Title) {
                    return 1;
                }
                return 0;
            });
            // Update the state
            _this.setState({ cfg: cfg });
        };
        // Update the query to expand the fields
        _this._query.Expand = ["Fields"];
        return _this;
    }
    return WebPartFieldCfg;
}(_1.WebPartListCfg));
exports.WebPartFieldCfg = WebPartFieldCfg;
//# sourceMappingURL=wpFieldCfg.js.map