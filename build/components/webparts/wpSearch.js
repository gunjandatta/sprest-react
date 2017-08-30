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
/**
 * WebPart Search
 */
var WebPartSearch = (function (_super) {
    __extends(WebPartSearch, _super);
    /**
     * Constructor
     */
    function WebPartSearch(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        _this._query = null;
        /**
         * Events
         */
        // The render item event
        _this.onRenderItem = function (item) { };
        /**
         * Methods
         */
        // Method to generate the mapper
        _this.generateMapper = function (items) {
            var searchTerms = [];
            var tagMapper = {};
            // Parse the items
            for (var i = 0; i < items.results.length; i++) {
                var item = items.results[i];
                // Parse the searchable fields
                for (var j = 0; j < _this.props.cfg.Fields.length; j++) {
                    var field = _this.props.cfg.Fields[j];
                    var fieldValue = item[field.InternalName];
                    // Ensure the field value exists
                    if (fieldValue == null) {
                        continue;
                    }
                    // Parse the field values
                    var fieldValues = fieldValue.results ? fieldValue.results : [fieldValue];
                    for (var k = 0; k < fieldValues.length; k++) {
                        fieldValue = fieldValues[k];
                        // Update the field value based on the type
                        switch (field.FieldTypeKind) {
                            case gd_sprest_1.SPTypes.FieldType.Choice:
                            case gd_sprest_1.SPTypes.FieldType.MultiChoice:
                                break;
                            case gd_sprest_1.SPTypes.FieldType.Lookup:
                                // Update the field value
                                fieldValue = item[field.InternalName][field.LookupField];
                                break;
                            default:
                                // This is a managed metadata field
                                fieldValue = fieldValue.split("|")[0];
                                break;
                        }
                        // Add the index
                        if (tagMapper[fieldValue] == null) {
                            // Add the value
                            tagMapper[fieldValue] = [item];
                            // Add the search term
                            searchTerms.push({
                                key: fieldValue.toLowerCase(),
                                name: fieldValue
                            });
                        }
                        else {
                            // Add the value
                            tagMapper[fieldValue].push(item);
                        }
                    }
                }
            }
            // Update the state
            _this.setState({
                items: items.results,
                searchTerms: searchTerms,
                tagMapper: tagMapper
            });
        };
        // Method to get the items
        _this.getItems = function () {
            // Ensure tags exist
            if (_this.state.selectedTags.length > 0) {
                var data = {};
                var items = [];
                // Parse the selected tags
                for (var i = 0; i < _this.state.selectedTags.length; i++) {
                    var newData = {};
                    var tag = _this.state.selectedTags[i];
                    // Parse the items for this tag
                    for (var j = 0; j < _this.state.tagMapper[tag.name].length; j++) {
                        var item = _this.state.tagMapper[tag.name][j];
                        // See if this is the first tag, or if the data contains this item id
                        if (i == 0 || data[item.Id]) {
                            // Keep this item
                            newData[item.Id] = item;
                        }
                    }
                    // Update the documents
                    data = newData;
                }
                // Parse the data
                for (var id in data) {
                    // Add the item
                    items.push(data[id]);
                }
                // Return the items
                return items;
            }
            // Return the items
            return _this.state.items;
        };
        // Method to load the documents
        _this.load = function () {
            // Parse the search fields
            for (var i = 0; i < _this.props.cfg.Fields.length; i++) {
                var field = _this.props.cfg.Fields[i];
                // Add the field, based on the type
                switch (field.FieldTypeKind) {
                    case gd_sprest_1.SPTypes.FieldType.Lookup:
                        // Select the lookup field value
                        _this._query.Expand.push(field.InternalName);
                        _this._query.Select.push(field.InternalName + "/" + field.LookupField);
                        break;
                    default:
                        // Select the field
                        _this._query.Select.push(field.InternalName);
                        break;
                }
            }
            // Load the documents
            (new gd_sprest_1.Web(_this.props.cfg.WebUrl))
                .Lists(_this.props.cfg.ListName)
                .Items()
                .query(_this._query)
                .execute(_this.generateMapper);
        };
        // Method to resolve the tag picker
        _this.onResolveSuggestions = function (filterText, tagList) {
            var tags = [];
            // Ensure the filter exists
            if (filterText) {
                filterText = filterText.toLowerCase();
                // Filter the search terms
                tags = _this.state.searchTerms.filter(function (term) {
                    return term.key.indexOf(filterText) >= 0;
                });
                // Parse the tag list
                for (var i = 0; i < tagList.length; i++) {
                    var tag = tagList[i];
                    // Parse the tags
                    for (var j = 0; j < tags.length; j++) {
                        if (tag.key == tags[j].key) {
                            // Remove this tag
                            tags.splice(j, 1);
                            break;
                        }
                    }
                }
            }
            // Return the tags
            return tags;
        };
        // Method to update the selected tags
        _this.updateSelectedTags = function (tags) {
            // Update the state
            _this.setState({
                selectedTags: tags
            });
        };
        // Set the query
        _this._query = {
            Expand: [],
            GetAllItems: true,
            OrderBy: ["Title"],
            Top: 500
        };
        return _this;
    }
    // Render the component
    WebPartSearch.prototype.render = function () {
        // Ensure the items exist
        if (this.state.items == null) {
            // Load the items
            this.load();
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the items..." }));
        }
        // Get the items to render
        var elItems = this.getItems();
        for (var i = 0; i < this.state.items.length; i++) {
            // Render the item
            var elItem = this.onRenderItem(this.state.items[i]);
            if (elItem) {
                // Set the unique key
                elItem.key = "item_" + i;
                elItems.push(elItem);
            }
        }
        // Return the items
        return (React.createElement("div", { className: this.props.className },
            React.createElement(office_ui_fabric_react_1.TagPicker, { onChange: this.updateSelectedTags, onResolveSuggestions: this.onResolveSuggestions }),
            elItems));
    };
    return WebPartSearch;
}(React.Component));
exports.WebPartSearch = WebPartSearch;
//# sourceMappingURL=wpSearch.js.map