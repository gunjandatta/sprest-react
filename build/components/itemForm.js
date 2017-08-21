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
var _1 = require(".");
/**
 * Item Form WebPart
 */
var ItemForm = (function (_super) {
    __extends(ItemForm, _super);
    /**
     * Constructor
     */
    function ItemForm(props) {
        var _this = _super.call(this, props) || this;
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
                // Parse the fields
                for (var i = 0; i < _this.props.fields.length; i++) {
                    var field = _this.props.fields[i];
                    // See if this is the attachments field
                    if (field.name == "Attachments") {
                        // Expand the attachment files
                        query.Expand = ["AttachmentFiles"];
                        // Get the attachment files
                        query.Select.push("Attachments");
                        query.Select.push("AttachmentFiles");
                        // Break from the loop
                        break;
                    }
                }
                // Get the list
                _this.getList().then(function (list) {
                    // Get the item
                    list.Items().query(query)
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
        // Method to render the fields
        _this.renderFields = function () {
            var formFields = [];
            var item = _this.state.item;
            // Parse the fields
            for (var i = 0; i < _this.props.fields.length; i++) {
                var field = _this.props.fields[i];
                // Add the form field, based on the name
                switch (field.name) {
                    // Attachment Field
                    case "Attachments":
                        formFields.push(React.createElement("div", { className: "ms-Grid-row", key: "row_" + field.name },
                            React.createElement("div", { className: "ms-Grid-col ms-u-md12" },
                                React.createElement(_1.Fields.FieldAttachments, { files: item.AttachmentFiles, key: field.name, listName: _this.props.listName, ref: "attachments" }))));
                        break;
                    // Default
                    default:
                        formFields.push(React.createElement("div", { className: "ms-Grid-row", key: "row_" + field.name },
                            React.createElement("div", { className: "ms-Grid-col ms-u-md12" },
                                React.createElement(_1.Field, { controlMode: item == null ? gd_sprest_1.SPTypes.ControlMode.New : gd_sprest_1.SPTypes.ControlMode.Edit || _this.props.controlMode, defaultValue: item[field.name], listName: _this.props.listName, key: field.name, name: field.name, onChange: field.onChange, onRender: field.onRender, ref: field.name }))));
                        break;
                }
            }
            // Return the form fields
            return formFields;
        };
        // Method to save the item attachments
        _this.saveAttachments = function (itemId) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // See if attachments exist
                var attachments = _this.refs["attachments"];
                if (attachments) {
                    // Save the attachments
                    attachments.save(itemId).then(function () {
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
                    _this.getList().then(function (list) {
                        // Set the metadata type
                        formValues["__metadata"] = { type: list.ListItemEntityTypeFullName };
                        // Get the items
                        list.Items()
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
            item: props.item || {}
        };
        return _this;
    }
    // Render the component
    ItemForm.prototype.render = function () {
        return (React.createElement("div", { className: "ms-Grid " + this.props.className }, this.renderFields()));
    };
    // Method to save the item form
    ItemForm.prototype.save = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            // Save the item
            _this.saveItem()
                .then(_this.saveAttachments)
                .then(_this.getItem)
                .then(function (item) { resolve(item); });
        });
    };
    // Method to get the form values
    ItemForm.prototype.getValues = function () {
        var formValues = {};
        // Parse the references
        for (var fieldName in this.refs) {
            var ref = this.refs[fieldName];
            // Skip the attachments
            if (fieldName == "attachments") {
                continue;
            }
            // See if this is a field
            if (ref instanceof _1.Field) {
                var field = ref;
                // See if this is a lookup or user field
                if (field.state.fieldInfo.type == gd_sprest_1.SPTypes.FieldType.Lookup ||
                    field.state.fieldInfo.type == gd_sprest_1.SPTypes.FieldType.User) {
                    // Ensure the field name is the "Id" field
                    fieldName += fieldName.lastIndexOf("Id") == fieldName.length - 2 ? "" : "Id";
                }
                // Get the field value
                var fieldValue = ref.state.value;
                if (fieldValue) {
                    // See if this is a multi-value field
                    if (fieldValue.results) {
                        var results = [];
                        // Parse the results
                        for (var i = 0; i < fieldValue.results.length; i++) {
                            var lookupValue = fieldValue.results[i];
                            // Add the lookup id if it exists
                            results.push(lookupValue.ID || lookupValue);
                        }
                        // Set the field value
                        fieldValue = { results: results };
                    }
                    else if (field.state.fieldInfo.type == gd_sprest_1.SPTypes.FieldType.Lookup ||
                        field.state.fieldInfo.type == gd_sprest_1.SPTypes.FieldType.User) {
                        // Clear the value if it doesn't exist
                        fieldValue = fieldValue > 0 ? fieldValue : null;
                    }
                }
                else if (field.state.fieldInfo.type == gd_sprest_1.SPTypes.FieldType.MultiChoice) {
                    // Default the value
                    fieldValue = { results: [] };
                }
                // Set the field value
                formValues[fieldName] = fieldValue;
            }
        }
        // Return the form values
        return formValues;
    };
    return ItemForm;
}(React.Component));
exports.ItemForm = ItemForm;
//# sourceMappingURL=itemForm.js.map