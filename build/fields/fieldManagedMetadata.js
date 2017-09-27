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
var es6_promise_1 = require("es6-promise");
var gd_sprest_1 = require("gd-sprest");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var _1 = require(".");
/**
 * Managed Metadata Field
 */
var FieldManagedMetadata = /** @class */ (function (_super) {
    __extends(FieldManagedMetadata, _super);
    function FieldManagedMetadata() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render the field
         */
        _this.renderField = function () {
            // Ensure the options exist
            if (_this.state.options == null) {
                // Render a loading indicator
                return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the managed metadata data..." }));
            }
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // Update the properties
            var props = _this.props.props || {};
            props.className = _this.props.className;
            props.disabled = _this.state.fieldInfo.readOnly || _this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            props.errorMessage = props.errorMessage ? props.errorMessage : _this.state.fieldInfo.errorMessage;
            props.errorMessage = _this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
            props.label = props.label ? props.label : _this.state.label;
            props.multiSelect = _this.state.fieldInfo.allowMultipleValues;
            props.onChanged = _this.onChanged;
            props.options = _this.state.options;
            props.required = props.required || _this.state.fieldInfo.required;
            // See if this is a multi-choice
            if (props.multiSelect) {
                var keys = [];
                // Parse the results
                for (var i = 0; i < _this.state.value.results.length; i++) {
                    // Add the key
                    keys.push(_this.state.value.results[i].TermGuid);
                }
                // Set the selected keys
                props.defaultSelectedKeys = keys;
            }
            else {
                // Set the selected key
                props.defaultSelectedKey = _this.state.value ? _this.state.value.TermGuid : null;
            }
            // Return the component
            return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props)));
        };
        /**
         * Events
         */
        /**
         * The change event for the dropdown list
         * @param option - The dropdown option.
         * @param idx - The dropdown option index.
         */
        _this.onChanged = function (option, idx) {
            // Call the change event
            _this.props.onChange ? _this.props.onChange(option) : null;
            // See if this is a multi-choice field
            if (_this.state.fieldInfo.allowMultipleValues) {
                var fieldValue = _this.state.value;
                // Append the option if it was selected
                if (option.isSelected || option.selected) {
                    fieldValue.results.push({
                        Label: option.data,
                        TermGuid: option.key,
                        WssId: -1
                    });
                }
                else {
                    // Parse the results
                    for (var i = 0; i < fieldValue.results.length; i++) {
                        if (fieldValue.results[i] == option.key) {
                            // Remove the selected option
                            fieldValue.results.splice(i, 1);
                            break;
                        }
                    }
                }
                // Update the field value
                _this.updateValue(fieldValue);
            }
            else {
                // Update the field value
                _this.updateValue(option.selected ? {
                    __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
                    Label: option.data,
                    TermGuid: option.key,
                    WssId: -1
                } : null);
            }
        };
        /**
         * The field initialized event
         * @param field - The field.
         * @param state - The current state.
         */
        _this.onFieldInit = function (field, state) {
            var mmsField = field;
            // Ensure this is a lookup field
            if (mmsField.TypeAsString != state.fieldInfo.typeAsString) {
                // Log
                console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a lookup field.");
                return;
            }
            // Update the field information
            state.fieldInfo.allowMultipleValues = mmsField.AllowMultipleValues;
            state.fieldInfo.termSetId = mmsField.TermSetId;
            state.fieldInfo.termStoreId = mmsField.SspId;
            // Load the hidden field
            _this.loadValueField(state.fieldInfo).then(function (fieldInfo) {
                // Load the value field
                _this.loadTerms(state.fieldInfo).then(function (fieldInfo) {
                    var value = null;
                    // See if this is a multi-lookup field and a value exists
                    if (fieldInfo.allowMultipleValues) {
                        var results = [];
                        // Parse the values
                        var values = _this.props.defaultValue ? _this.props.defaultValue.results : [];
                        for (var i = 0; i < values.length; i++) {
                            var result = values[i];
                            results.push({
                                Label: result.Label,
                                TermGuid: result.TermGuid,
                                WssId: result.WssId
                            });
                        }
                        // Set the default value
                        value = {
                            __metadata: { type: "Collection(SP.Taxonomy.TaxonomyFieldValue)" },
                            results: results
                        };
                    }
                    else {
                        // Set the default value
                        value = _this.props.defaultValue ? _this.props.defaultValue : null;
                    }
                    // Add the metadata
                    value ? value.__metadata = { type: "SP.Taxonomy.TaxonomyFieldValue" } : null;
                    // Update the state
                    _this.setState({
                        fieldInfo: fieldInfo,
                        options: _this.toOptions(fieldInfo.terms),
                        value: value
                    });
                });
            });
        };
        /**
         * Methods
         */
        /**
         * Method to load the value field
         * @param fieldInfo - The field information.
         */
        _this.loadValueField = function (fieldInfo) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // See if we are allowing multiple values
                if (fieldInfo.allowMultipleValues) {
                    // Get the web
                    (new gd_sprest_1.Web(fieldInfo.webUrl))
                        .Lists(fieldInfo.listName)
                        .Fields()
                        .getByInternalNameOrTitle(fieldInfo.name + "_0")
                        .execute(function (field) {
                        // See if the field exists
                        if (field.existsFl) {
                            // Set the value field
                            fieldInfo.valueField = field.InternalName;
                            // Resolve the promise
                            resolve(fieldInfo);
                        }
                        else {
                            // Log
                            console.log("[gd-sprest] Unable to find the hidden value field for '" + fieldInfo.name + "'.");
                        }
                    });
                }
                else {
                    // Resolve the promise
                    resolve(fieldInfo);
                }
            });
        };
        /**
         * Method to load the terms
         * @param fieldInfo - The field information.
         */
        _this.loadTerms = function (fieldInfo) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // Ensure the taxonomy script is loaded
                SP.SOD.registerSod("sp.taxonomy.js", SP.Utilities.Utility.getLayoutsPageUrl("sp.taxonomy.js"));
                SP.SOD.executeFunc("sp.taxonomy.js", "SP.Taxonomy.TaxonomySession", function () {
                    // Load the terms
                    var context = SP.ClientContext.get_current();
                    var session = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
                    var termStore = session.get_termStores().getById(fieldInfo.termStoreId);
                    var termSet = termStore.getTermSet(fieldInfo.termSetId);
                    var terms = termSet.getAllTerms();
                    context.load(terms);
                    // Execute the request
                    context.executeQueryAsync(
                    // Success
                    function () {
                        // Clear the terms
                        fieldInfo.terms = [];
                        // Parse the terms
                        var enumerator = terms.getEnumerator();
                        while (enumerator.moveNext()) {
                            var term = enumerator.get_current();
                            // Add the term information
                            fieldInfo.terms.push({
                                id: term.get_id().toString(),
                                name: term.get_name(),
                                path: term.get_pathOfTerm().replace(/;/g, "/")
                            });
                        }
                        // Sort the terms
                        fieldInfo.terms.sort(function (a, b) {
                            if (a.path < b.path) {
                                return -1;
                            }
                            if (a.path > b.path) {
                                return 1;
                            }
                            return 0;
                        });
                        // Resolve the request
                        resolve(fieldInfo);
                    }, 
                    // Error
                    function () {
                        // Log
                        console.log("[gd-sprest] Error getting the term set terms.");
                    });
                });
            });
        };
        /**
         * Method to convert the field value to options
         * @param terms - The managed metadata terms.
         */
        _this.toOptions = function (terms) {
            if (terms === void 0) { terms = []; }
            var options = [];
            // See if this is not a required multi-lookup field
            if (!_this.state.fieldInfo.required && !_this.state.fieldInfo.allowMultipleValues) {
                // Add a blank option
                options.push({
                    key: null,
                    text: ""
                });
            }
            // Parse the terms
            for (var i = 0; i < terms.length; i++) {
                var item = terms[i];
                // Add the option
                options.push({
                    data: item.name,
                    key: item.id,
                    text: item.path
                });
            }
            // Return the options
            return options;
        };
        return _this;
    }
    return FieldManagedMetadata;
}(_1.BaseField));
exports.FieldManagedMetadata = FieldManagedMetadata;
//# sourceMappingURL=fieldManagedMetadata.js.map