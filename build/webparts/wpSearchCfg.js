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
 * WebPart Search Configuration Panel
 */
var WebPartSearchCfg = /** @class */ (function (_super) {
    __extends(WebPartSearchCfg, _super);
    function WebPartSearchCfg() {
        /**
         * Events
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The field picker display event
         * @param tags - An array of fields used for the field picker.
         */
        _this.onFieldPickerDisplay = function (tags) {
            // Copy the tags
            var fieldTags = Object.create(tags);
            // Clear the tags
            tags = [];
            // Parse the tags
            for (var i = 0; i < fieldTags.length; i++) {
                var tag = fieldTags[i];
                // Parse the fields
                for (var j = 0; j < _this.state.selectedList.Fields.results.length; j++) {
                    var field = _this.state.selectedList.Fields.results[i];
                    // See if this is the field we are looking for
                    if (field.InternalName == tag.key) {
                        var addField = false;
                        // Allow certain fields to be selected
                        switch (field.FieldTypeKind) {
                            // Searchable Fields
                            case gd_sprest_1.SPTypes.FieldType.Choice:
                            case gd_sprest_1.SPTypes.FieldType.MultiChoice:
                            case gd_sprest_1.SPTypes.FieldType.Lookup:
                            case gd_sprest_1.SPTypes.FieldType.Text:
                            case gd_sprest_1.SPTypes.FieldType.URL:
                                addField = true;
                                break;
                            default:
                                // Allow managed metadata fields
                                addField = field.TypeAsString.indexOf("TaxonomyFieldType") == 0;
                                break;
                        }
                        // See if we are adding the field
                        if (addField) {
                            // Add this tag
                            tags.push(tag);
                        }
                        // Break from the loop
                        break;
                    }
                }
            }
        };
        /**
         * The render footer method
         */
        _this.onRenderFooter = function () {
            var footer = null;
            // See if the lists exists
            if (_this.state.lists != null) {
                footer = [_this.renderSearchPicker()];
                footer = footer.concat(_this.renderField());
                footer.push(_this.renderSaveButton());
            }
            // Render the footer
            return footer;
        };
        /**
         * Methods
         */
        /**
         * Method to render the picker checkbox
         */
        _this.renderSearchPicker = function () {
            return (React.createElement(office_ui_fabric_react_1.Checkbox, { defaultChecked: _this.state.cfg.TagPickerFl ? true : false, key: "searchPicker", label: "Use Tag Picker", onChange: _this.updatePickerFlag }));
        };
        /**
         * Method to update the
         * @param ev - The checkbox click event.
         * @param checked - The value of the checkbox.
         */
        _this.updatePickerFlag = function (ev, checked) {
            var cfg = _this.state.cfg;
            // Update the configuration
            cfg.TagPickerFl = checked;
            // Update the state
            _this.setState({ cfg: cfg });
        };
        return _this;
    }
    return WebPartSearchCfg;
}(_1.WebPartFieldCfg));
exports.WebPartSearchCfg = WebPartSearchCfg;
//# sourceMappingURL=wpSearchCfg.js.map