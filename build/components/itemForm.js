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
var __1 = require("..");
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
        /**
         * Reference to the attachments field
         */
        _this._attachmentField = null;
        /**
         * Reference to the form fields
         */
        _this._fields = {};
        /**
         * Reference to the query used to refresh the item
         */
        _this._query = null;
        /**
         * Methods
         */
        /**
         * Method to get the item
         * @param itemId - The item id.
         */
        _this.getItem = function (itemId) {
            // Return a promise
            return new Promise(function (resolve, reject) {
                // Set the filter
                _this._query.Filter = "ID eq " + itemId;
                // Get the item
                _this.state.list.Items().query(_this._query)
                    .execute(function (items) {
                    // Resolve the promise
                    resolve(items.results ? items.results[0] : null);
                });
            });
        };
        /**
         * Method to load the fields
         */
        _this.loadDefaultFields = function () {
            // Get the web
            var list = new gd_sprest_1.Web(_this.props.webUrl)
                .Lists(_this.props.listName);
            // Get the default content type
            list.ContentTypes()
                .query({
                Expand: ["FieldLinks"],
                Top: 1
            })
                .execute(function (contentTypes) {
                // Ensure the content types exist
                if (contentTypes.results) {
                    var formFields_1 = [];
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
                        // Add the field name
                        formFields_1.push(field.Name);
                    }
                    // Get the fields
                    list.Fields().execute(function (listFields) {
                        var fields = [];
                        // Parse the form fields
                        for (var i = 0; i < formFields_1.length; i++) {
                            var formField = formFields_1[i];
                            // Parse the list fields
                            for (var j = 0; j < listFields.results.length; j++) {
                                var field = listFields.results[j];
                                // See if this is the target field
                                if (field.InternalName == formField) {
                                    continue;
                                }
                                // Skip hidden fields
                                if (field.Hidden) {
                                    continue;
                                }
                                // Add the field
                                fields.push({ name: field.InternalName });
                                // Break from the loop
                                break;
                            }
                        }
                        // Update the state
                        _this.setState({ fields: fields });
                    });
                }
                else {
                    console.log("[gd-sprest] Error getting default fields.");
                    console.log("[gd-sprest] " + contentTypes["response"]);
                }
            }, true);
        };
        /**
         * Method to load the list
         */
        _this.loadList = function () {
            // Get the web
            (new gd_sprest_1.Web(_this.props.webUrl))
                .Lists(_this.props.listName)
                .execute(function (list) {
                // Update the state
                _this.setState({ list: list }, function () {
                    // See if the item id was passed in
                    if (typeof (_this.state.item) === "number") {
                        // Get the item
                        _this.getItem(_this.state.item).then(function (item) {
                            // Update the state
                            _this.setState({ item: item });
                        });
                    }
                });
            })
                .Fields()
                .execute(function (fields) {
                var listFields = {};
                // Parse the fields
                for (var i = 0; i < fields.results.length; i++) {
                    var field = fields.results[i];
                    // Add the list field
                    listFields[field.InternalName] = field;
                }
                // Update the state
                _this.setState({ listFields: listFields });
            });
        };
        /**
         * Method to render the fields
         */
        _this.renderFields = function () {
            var formFields = [];
            var item = _this.state.item;
            // See if we are displaying attachments
            if (_this.props.showAttachments) {
                formFields.push(React.createElement("div", { className: "ms-Grid-row", key: "row_Attachments" },
                    React.createElement("div", { className: "ms-Grid-col-md12" },
                        React.createElement(__1.Fields.FieldAttachments, { controlMode: _this.ControlMode, files: item.AttachmentFiles, key: "Attachments", itemId: item.Id, listName: _this.props.listName, onFileAdded: _this.props.onAttachmentAdded, onFileClick: _this.props.onAttachmentClick ? function (file) { return _this.props.onAttachmentClick(file, _this.ControlMode); } : null, onFileRender: _this.props.onAttachmentRender ? function (file) { return _this.props.onAttachmentRender(file, _this.ControlMode); } : null, onRender: _this.props.onRenderAttachments ? function (files) { return _this.props.onRenderAttachments(files, _this.ControlMode); } : null, ref: function (field) { _this._attachmentField = field; }, webUrl: _this.props.webUrl }))));
            }
            // Parse the fields
            for (var i = 0; i < _this.state.fields.length; i++) {
                var fieldInfo = _this.state.fields[i];
                var readOnly = false;
                // See if we are excluding this field
                if (_this.props.excludeFields && _this.props.excludeFields.indexOf(fieldInfo.name) >= 0) {
                    continue;
                }
                // See if this is a read-only field
                if (_this.props.readOnlyFields && _this.props.readOnlyFields.indexOf(fieldInfo.name) >= 0) {
                    // Set the flag
                    readOnly = true;
                }
                // Add the form field
                formFields.push(React.createElement("div", { className: "ms-Grid-row", key: "row_" + fieldInfo.name },
                    React.createElement("div", { className: "ms-Grid-col ms-md12" },
                        React.createElement(_1.Field, { controlMode: readOnly ? gd_sprest_1.SPTypes.ControlMode.Display : _this.ControlMode, defaultValue: item[fieldInfo.name], field: _this.state.listFields && _this.state.listFields[fieldInfo.name], item: item, listName: _this.props.listName, key: fieldInfo.name, name: fieldInfo.name, onChange: fieldInfo.onChange, onRender: fieldInfo.onRender, queryTop: _this.props.queryTop, ref: function (field) { field ? _this._fields[field.props.name] = field : null; }, webUrl: _this.props.webUrl }))));
            }
            // Return the form fields
            return formFields;
        };
        /**
         * Method to save the item attachments
         * @param itemId - The item id.
         */
        _this.saveAttachments = function (itemId) {
            // Return a promise
            return new Promise(function (resolve, reject) {
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
        /**
         * Method to save the item
         */
        _this.saveItem = function () {
            // Return a promise
            return new Promise(function (resolve, reject) {
                var item = _this.state.item;
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
                    // Set the metadata type
                    formValues["__metadata"] = { type: _this.state.list.ListItemEntityTypeFullName };
                    // Get the items
                    _this.state.list.Items()
                        .add(formValues)
                        .execute(function (item) {
                        // Resolve the request
                        resolve(item.Id);
                    });
                }
            });
        };
        // Set the state
        _this.state = {
            fields: props.fields,
            item: props.item || {},
            refreshFl: false,
            saveFl: false,
            updateFl: false
        };
        // Default the query
        _this._query = props.query || {
            Select: ["*"]
        };
        // See if we are showing attachments
        if (props.showAttachments) {
            // Expand the attachment files
            _this._query.Expand = _this._query.Expand || [];
            _this._query.Expand.push("AttachmentFiles");
            // Get the attachment files
            _this._query.Select = _this._query.Select || [];
            _this._query.Select.push("Attachments");
            _this._query.Select.push("AttachmentFiles");
        }
        return _this;
    }
    Object.defineProperty(ItemForm.prototype, "AttachmentField", {
        /**
         * Get the attachment field
         */
        get: function () { return this._attachmentField; },
        /**
         * Set the attachment field
         */
        set: function (field) { this._attachmentField = field; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemForm.prototype, "ControlMode", {
        /**
         * Get the control mode
         */
        get: function () {
            var controlMode = this.props.controlMode;
            // Default the value
            if (typeof (this.props.controlMode) !== "number") {
                controlMode = gd_sprest_1.SPTypes.ControlMode.Display;
            }
            // See if we are editing the form
            if (controlMode == gd_sprest_1.SPTypes.ControlMode.Edit) {
                // Ensure the item exists
                controlMode = this.state.item && this.state.item.Id > 0 ? gd_sprest_1.SPTypes.ControlMode.Edit : gd_sprest_1.SPTypes.ControlMode.New;
            }
            // Return the control mode
            return controlMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemForm.prototype, "FormFields", {
        /**
         * Get the form fields
         */
        get: function () { return this._fields; },
        /**
         * Set the form fields
         */
        set: function (fields) { this._fields = fields; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemForm.prototype, "List", {
        /**
         * Get the list
         */
        get: function () { return this.state.list; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemForm.prototype, "ItemQuery", {
        /**
         * Get the item query
         */
        get: function () { return this._query; },
        /**
         * Set the item query
         */
        set: function (query) { this._query = query; },
        enumerable: true,
        configurable: true
    });
    /**
     * Method to get the form values
     */
    ItemForm.prototype.getFormValues = function () { return this.getValues(); };
    /**
     * Method to refresh the item
     */
    ItemForm.prototype.refresh = function () {
        var _this = this;
        // Update the state
        this.setState({ refreshFl: true });
        // Get the item
        this.getItem(this.state.item.Id).then(function (item) {
            // Update the state
            _this.setState({ item: item, refreshFl: false });
        });
    };
    /**
     * Render the component
     */
    ItemForm.prototype.render = function () {
        // See if the list exists
        if (this.state.list == null) {
            // Load the list
            this.loadList();
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the list..." }));
        }
        // Ensure the fields are loaded
        if (this.state.listFields == null) {
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the list fields..." }));
        }
        // Ensure the item is loaded
        if (typeof (this.state.item) === "number") {
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the item..." }));
        }
        // See if we are refreshing the item
        if (this.state.refreshFl) {
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Refreshing the Item", size: office_ui_fabric_react_1.SpinnerSize.large }));
        }
        // See if we are updating the item
        if (this.state.updateFl) {
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Updating the Item", size: office_ui_fabric_react_1.SpinnerSize.large }));
        }
        // See if there is a custom renderer
        if (this.props.onRender) {
            // Render the custom event
            return (React.createElement("div", null,
                !this.state.saveFl ? null :
                    React.createElement(office_ui_fabric_react_1.Spinner, { label: "Saving the Item", size: office_ui_fabric_react_1.SpinnerSize.large }),
                React.createElement("div", { hidden: this.state.saveFl }, this.props.onRender(this.ControlMode))));
        }
        // See if the fields have been defined
        if (this.state.fields == null) {
            // Load the default fields
            this.loadDefaultFields();
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the fields..." }));
        }
        // Render the fields
        return (React.createElement("div", { className: "ms-Grid " + (this.props.className || "") },
            !this.state.saveFl ? null :
                React.createElement(office_ui_fabric_react_1.Spinner, { label: "Saving the Item", size: office_ui_fabric_react_1.SpinnerSize.large }),
            React.createElement("div", { hidden: this.state.saveFl }, this.renderFields())));
    };
    /**
     * Method to save the item form
     */
    ItemForm.prototype.save = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Set the state
            _this.setState({ saveFl: true }, function () {
                // Save the item
                _this.saveItem()
                    .then(_this.saveAttachments)
                    .then(_this.getItem)
                    .then(function (item) {
                    // Update the state
                    _this.setState({ item: item, saveFl: false }, function () {
                        // Resolve the promise
                        resolve(item);
                    });
                });
            });
        });
    };
    /**
     * Method to update the item.
     */
    ItemForm.prototype.updateItem = function (fieldValues) {
        var _this = this;
        // Return a promise
        return new Promise(function (resolve, reject) {
            // Set the state
            _this.setState({ updateFl: true }, function () {
                var item = _this.state.item;
                // Update the item
                item.update(fieldValues).execute(function (response) {
                    // Get the item
                    _this.getItem(item.Id).then(function (item) {
                        // Update the state
                        _this.setState({ item: item, updateFl: false }, function () {
                            // Resolve the promise
                            resolve(item);
                        });
                    });
                });
            });
        });
    };
    /**
     * Method to get the form values
     */
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