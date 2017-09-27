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
 * Item Form WebPart
 */
var ItemForm = /** @class */ (function (_super) {
    __extends(ItemForm, _super);
    /**
     * Constructor
     */
    function ItemForm(props) {
        var _this = _super.call(this, props) || this;
        _this._attachmentField = null;
        _this._fields = {};
        _this._list = null;
        /**
         * Methods
         */
        // Method to get the item
        _this.getItem = function (itemId) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                var query = {
                    Filter: "ID eq " + itemId,
                    Select: ["*"]
                };
                // See if we are rendering the attachments field
                if (_this._attachmentField) {
                    // Expand the attachment files
                    query.Expand = ["AttachmentFiles"];
                    // Get the attachment files
                    query.Select.push("Attachments");
                    query.Select.push("AttachmentFiles");
                }
                // Get the list
                _this.getList().then(function () {
                    // Get the item
                    _this._list.Items().query(query)
                        .execute(function (items) {
                        // Resolve the promise
                        resolve(items.results ? items.results[0] : null);
                    });
                });
            });
        };
        // Method to get the list
        _this.getList = function () {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // See if we have already queried the list
                if (_this._list) {
                    // Resolve the promise
                    resolve(_this._list);
                }
                else {
                    // Get the web
                    (new gd_sprest_1.Web(_this.props.webUrl))
                        .Lists(_this.props.listName)
                        .execute(function (list) {
                        // Save the list
                        _this._list = list;
                        // Resolve the promise
                        resolve(list);
                    });
                }
            });
        };
        // Method to load the fields
        _this.loadDefaultFields = function () {
            // Load the web
            (new gd_sprest_1.Web(_this.props.webUrl))
                .Lists(_this.props.listName)
                .ContentTypes()
                .query({
                Expand: ["FieldLinks"]
            })
                .execute(function (contentTypes) {
                // Ensure the content types exist
                if (contentTypes.results) {
                    var fields = [];
                    // Parse the default content type
                    for (var i = 0; i < contentTypes.results[0].FieldLinks.results.length; i++) {
                        var field = contentTypes.results[0].FieldLinks.results[i];
                        // Skip the content type field
                        if (field.Name == "ContentType") {
                            continue;
                        }
                        // Skip hidden fields
                        if (field.Hidden) {
                            continue;
                        }
                        // Add the field
                        fields.push({ name: field.Name });
                    }
                    // Update the state
                    _this.setState({ fields: fields });
                }
                else {
                    console.log("[gd-sprest] Error getting default fields.");
                    console.log("[gd-sprest] " + contentTypes["response"]);
                }
            });
        };
        // Method to render the fields
        _this.renderFields = function () {
            var formFields = [];
            var item = _this.state.item;
            // See if we are displaying attachments
            if (_this.props.showAttachments) {
                formFields.push(React.createElement("div", { className: "ms-Grid-row", key: "row_Attachments" },
                    React.createElement("div", { className: "ms-Grid-col-md12" },
                        React.createElement(_1.Fields.FieldAttachments, { files: item.AttachmentFiles, key: "Attachments", listName: _this.props.listName, ref: function (field) { _this._attachmentField = field; }, webUrl: _this.props.webUrl }))));
            }
            // Parse the fields
            for (var i = 0; i < _this.state.fields.length; i++) {
                var fieldInfo = _this.state.fields[i];
                // Add the form field
                formFields.push(React.createElement("div", { className: "ms-Grid-row", key: "row_" + fieldInfo.name },
                    React.createElement("div", { className: "ms-Grid-col ms-md12" },
                        React.createElement(_1.Fields.Field, { controlMode: _this.props.controlMode || (_this.props.item && _this.props.item.Id > 0 ? gd_sprest_1.SPTypes.ControlMode.Edit : gd_sprest_1.SPTypes.ControlMode.New), defaultValue: item[fieldInfo.name], listName: _this.props.listName, key: fieldInfo.name, name: fieldInfo.name, onChange: fieldInfo.onChange, onRender: fieldInfo.onRender, ref: function (field) { field ? _this._fields[field.props.name] = field : null; }, webUrl: _this.props.webUrl }))));
            }
            // Return the form fields
            return formFields;
        };
        // Method to save the item attachments
        _this.saveAttachments = function (itemId) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // See if attachments exist
                if (_this._attachmentField) {
                    // Save the attachments
                    _this._attachmentField.save(itemId).then(function () {
                        // Resolve the promise
                        resolve(itemId);
                    });
                }
                else {
                    // Resolve the promise
                    resolve(itemId);
                }
            });
        };
        // Method to save the item
        _this.saveItem = function () {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                var item = _this.props.item;
                // Get the item
                var formValues = _this.getValues();
                // See if this is an existing item
                if (item && item.update) {
                    // Update the item
                    item.update(formValues).execute(function (response) {
                        // Resolve the request
                        resolve(item.Id);
                    });
                }
                else {
                    // Get the list
                    _this.getList().then(function () {
                        // Set the metadata type
                        formValues["__metadata"] = { type: _this._list.ListItemEntityTypeFullName };
                        // Get the items
                        _this._list.Items()
                            .add(formValues)
                            .execute(function (item) {
                            // Resolve the request
                            resolve(item.Id);
                        });
                    });
                }
            });
        };
        // Set the state
        _this.state = {
            fields: props.fields,
            item: props.item || {},
            saveFl: false
        };
        return _this;
    }
    Object.defineProperty(ItemForm.prototype, "AttachmentField", {
        /**
         * Properties
         */
        // Attachment Field
        get: function () { return this._attachmentField; },
        set: function (field) { this._attachmentField = field; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemForm.prototype, "FormFields", {
        // Form Fields
        get: function () { return this._fields; },
        set: function (fields) { this._fields = fields; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemForm.prototype, "List", {
        // List
        get: function () { return this._list; },
        enumerable: true,
        configurable: true
    });
    // Render the component
    ItemForm.prototype.render = function () {
        // See if there is a custom renderer
        if (this.props.onRender) {
            // Execute the render event
            return (React.createElement("div", null,
                this.state.saveFl ?
                    React.createElement(office_ui_fabric_react_1.Spinner, { label: "Saving the Item", size: office_ui_fabric_react_1.SpinnerSize.large })
                    :
                        null,
                React.createElement("div", { hidden: this.state.saveFl }, this.props.onRender())));
        }
        // See if the fields have been defined
        if (this.state.fields == null) {
            // Load the default fields
            this.loadDefaultFields();
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the fields..." }));
        }
        // Render the fields
        return (React.createElement("div", null,
            this.state.saveFl ?
                React.createElement(office_ui_fabric_react_1.Spinner, { label: "Saving the Item", size: office_ui_fabric_react_1.SpinnerSize.large })
                :
                    null,
            React.createElement("div", { className: "ms-Grid " + this.props.className, hidden: this.state.saveFl }, this.renderFields())));
    };
    // Method to save the item form
    ItemForm.prototype.save = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            // Set the state
            _this.setState({ saveFl: true }, function () {
                // Save the item
                _this.saveItem()
                    .then(_this.saveAttachments)
                    .then(_this.getItem)
                    .then(function (item) {
                    // Update the state
                    _this.setState({ saveFl: false }, function () {
                        // Resolve the promise
                        resolve(item);
                    });
                });
            });
        });
    };
    // Method to get the form values
    ItemForm.prototype.getValues = function () {
        var formValues = {};
        // Parse the fields
        for (var fieldName in this._fields) {
            var field = this._fields[fieldName];
            // Ensure the field exists
            if (field == null) {
                continue;
            }
            // See if this is a lookup or user field
            if (field.Info.type == gd_sprest_1.SPTypes.FieldType.Lookup ||
                field.Info.type == gd_sprest_1.SPTypes.FieldType.User) {
                // Ensure the field name is the "Id" field
                fieldName += fieldName.lastIndexOf("Id") == fieldName.length - 2 ? "" : "Id";
            }
            // Get the field value
            var fieldValue = field.Value;
            if (fieldValue) {
                // See if this is a multi-value field
                if (fieldValue.results) {
                    var results = [];
                    // Parse the results
                    for (var i = 0; i < fieldValue.results.length; i++) {
                        var result = fieldValue.results[i];
                        // See if this is a taxonomy field with multiple values
                        if (field.Info.typeAsString == "TaxonomyFieldTypeMulti") {
                            // Add the term
                            results.push(result.WssId + ";#" + result.Label + "|" + result.TermGuid);
                        }
                        else {
                            // Add the lookup id if it exists
                            results.push(result.ID || result);
                        }
                    }
                    // See if this is a taxonomy field with multiple values
                    if (field.Info.typeAsString == "TaxonomyFieldTypeMulti") {
                        // Set the hidden field name
                        formValues[field.Info.valueField] = results.join(";#");
                        // Continue the loop
                        continue;
                    }
                    else {
                        // Set the field value
                        fieldValue = { results: results };
                    }
                }
                else if (field.Info.type == gd_sprest_1.SPTypes.FieldType.Lookup ||
                    field.Info.type == gd_sprest_1.SPTypes.FieldType.User) {
                    // Clear the value if it doesn't exist
                    fieldValue = fieldValue > 0 ? fieldValue : null;
                }
            }
            else if (field.Info.type == gd_sprest_1.SPTypes.FieldType.MultiChoice) {
                // Default the value
                fieldValue = { results: [] };
            }
            // Set the field value
            formValues[fieldName] = fieldValue;
        }
        // Return the form values
        return formValues;
    };
    return ItemForm;
}(React.Component));
exports.ItemForm = ItemForm;
//# sourceMappingURL=itemForm.js.map