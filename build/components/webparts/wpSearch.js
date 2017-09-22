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
var es6_promise_1 = require("es6-promise");
var gd_sprest_1 = require("gd-sprest");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var _1 = require(".");
/**
 * WebPart Search
 */
var WebPartSearch = /** @class */ (function (_super) {
    __extends(WebPartSearch, _super);
    /**
     * Constructor
     */
    function WebPartSearch(props) {
        var _this = _super.call(this, props) || this;
        _this._filterText = null;
        /**
         * Methods
         */
        // Method to generate the mapper
        _this.generateMapper = function (items) {
            var searchTerms = [];
            var tagMapper = {};
            // Ensure the items and fields exist
            if (items.results && _this.props.cfg.Fields) {
                // Parse the items
                for (var i = 0; i < items.results.length; i++) {
                    var item = items.results[i];
                    // Parse the searchable fields
                    for (var j = 0; j < _this.props.cfg.Fields.length; j++) {
                        var field = _this.props.cfg.Fields[j];
                        var fieldValue = item[field.InternalName];
                        // Ensure the field value exists
                        if (fieldValue == null || fieldValue == "") {
                            continue;
                        }
                        // Parse the field values
                        var fieldValues = fieldValue.results ? fieldValue.results : [fieldValue];
                        for (var k = 0; k < fieldValues.length; k++) {
                            var fldLookup = null;
                            fieldValue = fieldValues[k];
                            // Update the field value based on the type
                            switch (field.FieldTypeKind) {
                                case gd_sprest_1.SPTypes.FieldType.Choice:
                                case gd_sprest_1.SPTypes.FieldType.MultiChoice:
                                    break;
                                case gd_sprest_1.SPTypes.FieldType.Lookup:
                                    // Update the field
                                    fldLookup = field;
                                    break;
                                case gd_sprest_1.SPTypes.FieldType.URL:
                                    // Update the field value
                                    fieldValue = item[field.InternalName].Description;
                                    break;
                                default:
                                    // This is a managed metadata field
                                    fieldValue = fieldValue.split("|")[0];
                                    break;
                            }
                            // Parse the results
                            var results = fieldValue.results || [fieldValue];
                            for (var i_1 = 0; i_1 < results.length; i_1++) {
                                var result = results[i_1];
                                // Ensure a value exists
                                if (result == null || result == "") {
                                    continue;
                                }
                                // See if this is a lookup field
                                if (fldLookup) {
                                    // Update the value
                                    result = result[fldLookup.LookupField];
                                }
                                // Add the index
                                if (tagMapper[result] == null) {
                                    // Add the value
                                    tagMapper[result] = [item];
                                    // Add the search term
                                    searchTerms.push({
                                        key: result.toLowerCase(),
                                        name: result
                                    });
                                }
                                else {
                                    // Add the value
                                    tagMapper[result].push(item);
                                }
                            }
                        }
                    }
                }
            }
            // Sort the search terms
            searchTerms.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            // Update the state
            _this.setState({
                items: items.results,
                searchTerms: searchTerms,
                selectedTags: [],
                tagMapper: tagMapper
            });
        };
        // Method to get the items
        _this.getItems = function () {
            // Determine if we are using the picker
            if (_this.props.cfg.TagPickerFl) {
                // Return the items by the tags
                return _this.getItemsByTags();
            }
            // Return the items by the filter
            return _this.getItemsByFilter();
        };
        // Method to get the items by filter
        _this.getItemsByFilter = function () {
            // Ensure a filter exists
            if (_this.state.searchFilter) {
                var data = {};
                var filterText = _this.state.searchFilter.toLowerCase();
                var items = [];
                // Parse the tag names
                for (var tagName in _this.state.tagMapper) {
                    // See if this tag name contains this filter
                    if (tagName.toLowerCase().indexOf(filterText) >= 0) {
                        var tagItems = _this.state.tagMapper[tagName];
                        // Parse the items for this tag
                        for (var i = 0; i < tagItems.length; i++) {
                            var item = tagItems[i];
                            // Ensure we haven't already added this item
                            if (data[item.Id] == null) {
                                // Add the item
                                data[item.Id] = item;
                            }
                        }
                    }
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
        // Method to get the items by tags
        _this.getItemsByTags = function () {
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
            // Include the id field
            _this._query.Select.push("ID");
            // Ensure fields exist
            if (_this.props.cfg.Fields) {
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
            }
            // Ensure the list name exists
            if (_this.props.cfg.ListName) {
                // Load the documents
                (new gd_sprest_1.Web(_this.props.cfg.WebUrl))
                    .Lists(_this.props.cfg.ListName)
                    .Items()
                    .query(_this._query)
                    .execute(_this.generateMapper);
            }
        };
        // Method to resolve the tag picker
        _this.onResolveSuggestions = function (filterText, tagList) {
            // Save the filter
            _this._filterText = filterText ? filterText.toLowerCase() : filterText;
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // Wait for the user to finish typing
                setTimeout(function () {
                    var tags = [];
                    // See if the user is still typing
                    if (_this._filterText != filterText.toLowerCase()) {
                        return;
                    }
                    // Ensure the filter exists
                    if (_this._filterText) {
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
                    // Resolve the promise
                    resolve(tags);
                }, 500);
            });
        };
        // Method to update the search filter
        _this.updateSearchFilter = function (filter) {
            // Update the state
            _this.setState({
                searchFilter: filter
            });
        };
        // Method to update the selected tags
        _this.updateSelectedTags = function (tags) {
            // Update the state
            _this.setState({
                selectedTags: tags
            });
        };
        // Set the state
        _this.state = {
            items: null,
            searchFilter: "",
            searchTerms: [],
            selectedTags: [],
            tagMapper: {}
        };
        // Set the query
        _this._query = {
            Expand: [],
            GetAllItems: false,
            OrderBy: ["Title"],
            Select: [],
            Top: 500
        };
        return _this;
    }
    // Render the component
    WebPartSearch.prototype.render = function () {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Load the items
            this.load();
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the items..." }));
        }
        // Return the items
        return (React.createElement("div", { className: this.props.className },
            this.props.cfg.TagPickerFl ?
                React.createElement(office_ui_fabric_react_1.TagPicker, { onChange: this.updateSelectedTags, onResolveSuggestions: this.onResolveSuggestions, pickerSuggestionsProps: {
                        loadingText: "Loading the results",
                        noResultsFoundText: "No results were found"
                    } })
                :
                    React.createElement(office_ui_fabric_react_1.SearchBox, { onChange: this.updateSearchFilter, onSearch: this.updateSearchFilter }),
            this.onRenderContainer(this.getItems())));
    };
    return WebPartSearch;
}(_1.WebPartList));
exports.WebPartSearch = WebPartSearch;
//# sourceMappingURL=wpSearch.js.map