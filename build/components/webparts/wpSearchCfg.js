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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var gd_sprest_1 = require("gd-sprest");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var _1 = require(".");
/**
 * WebPart Search Configuration
 */
var WebPartSearchCfg = (function (_super) {
    __extends(WebPartSearchCfg, _super);
    /**
     * Constructor
     */
    function WebPartSearchCfg(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Events
         */
        // The list changed event
        _this.onListChanged = function (state) {
            // Ensure the list exists
            if (state.cfg.ListName) {
                // Parse the lists
                for (var i = 0; i < state.lists.length; i++) {
                    var list = state.lists[i];
                    // See if this is the list we are looking for
                    if (list.Title == state.cfg.ListName) {
                        // Set the list
                        state.list = list;
                        break;
                    }
                }
            }
        };
        // The lists loaded event
        _this.onListsLoaded = function (state) {
            // Call the change event
            _this.onListChanged(state);
        };
        // The render footer method
        _this.onRenderFooter = function () {
            var tags = [];
            // Parse the existing configuration
            if (_this.props.cfg && _this.props.cfg.Fields) {
                // Parse the fields
                for (var i = 0; i < _this.props.cfg.Fields.length; i++) {
                    var field = _this.props.cfg.Fields[i];
                    // Add the tag
                    tags.push({
                        key: field.InternalName,
                        name: field.Title + " [" + field.InternalName + "]",
                    });
                }
            }
            // Return the footer
            return (React.createElement("div", null,
                React.createElement("label", { className: "ms-Label ms-fontSize-m" }, "Searchable Fields:"),
                React.createElement(office_ui_fabric_react_1.TagPicker, { defaultSelectedItems: tags, onChange: _this.updateFields, onResolveSuggestions: _this.onResolveSuggestions, pickerSuggestionsProps: {
                        noResultsFoundText: "No fields found.",
                        suggestionsHeaderText: "Searchable Fields"
                    } }),
                React.createElement(office_ui_fabric_react_1.PrimaryButton, { onClick: _this.onSave, text: "Save" })));
        };
        // Method to resolve suggestions event
        _this.onResolveSuggestions = function (filterText, selectedItems) {
            var tags = [];
            // Ensure the list and filter exists
            if (_this.state.list && filterText) {
                var filter = filterText.toLowerCase();
                // Parse the fields
                for (var i = 0; i < _this.state.list.Fields.results.length; i++) {
                    var field = _this.state.list.Fields.results[i];
                    // Allow certain fields to be selected
                    switch (field.FieldTypeKind) {
                        // Searchable Fields
                        case gd_sprest_1.SPTypes.FieldType.Choice:
                        case gd_sprest_1.SPTypes.FieldType.MultiChoice:
                        case gd_sprest_1.SPTypes.FieldType.Lookup:
                        case gd_sprest_1.SPTypes.FieldType.Text:
                            break;
                        default:
                            // Allow managed metadata fields
                            if (field.TypeAsString.indexOf("TaxonomyFieldType") == 0) {
                                break;
                            }
                            else {
                                continue;
                            }
                    }
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
            // Return the tags
            return tags;
        };
        /**
         * Methods
         */
        // Method to update the state w/ the selected field(s)
        _this.updateFields = function (selectedFields) {
            // Update the configuration
            var cfg = _this.state.cfg;
            cfg.Fields = [];
            // Parse the selected fields
            for (var i = 0; i < selectedFields.length; i++) {
                var selectedField = selectedFields[i];
                // Parse the list fields
                for (var j = 0; j < _this.state.list.Fields.results.length; j++) {
                    var field = _this.state.list.Fields.results[j];
                    // See if this is the field we are looking for
                    if (field.InternalName == selectedField.key) {
                        // See if this is a taxonomy field
                        if (field.TypeAsString.indexOf("TaxonomyFieldType") == 0) {
                            // Parse the fields
                            for (var k = 0; k < _this.state.list.Fields.results.length; k++) {
                                var fld = _this.state.list.Fields.results[k];
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
            // Update the state
            _this.setState({ cfg: cfg });
        };
        // Update the query to expand the fields
        _this._query.Expand = ["Fields"];
        return _this;
    }
    return WebPartSearchCfg;
}(_1.WebPartListCfg));
exports.WebPartSearchCfg = WebPartSearchCfg;
//# sourceMappingURL=wpSearchCfg.js.map