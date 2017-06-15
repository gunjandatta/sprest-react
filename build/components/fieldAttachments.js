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
require("../../sass/fieldAttachments.scss");
/**
 * Attachments field
 */
var FieldAttachments = (function (_super) {
    __extends(FieldAttachments, _super);
    /**
     * Constructor
     */
    function FieldAttachments(props) {
        var _this = _super.call(this, props) || this;
        // Method to save the attachments to the item
        _this.save = function (itemId) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // Delete the attachments
                _this.deleteAttachments().then(function () {
                    // Save the attachments
                    _this.saveAttachments(itemId).then(function () {
                        // Resolve the promise
                        resolve();
                    });
                });
            });
        };
        /**
         * Events
         */
        // Event triggered by the user selecting a file to upload
        _this.addAttachment = function (ev) {
            // Get the file information
            var srcFile = ev.target.files[0];
            if (srcFile) {
                var reader = new FileReader();
                // Update the state
                _this.setState({
                    errorMessage: "",
                    loadingFl: true
                });
                // Set the file loaded event
                reader.onloadend = function (ev) {
                    var newFl = true;
                    var files = _this.state.files;
                    // Parse the attachments
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        // See if the file already exists
                        if (file.name.toLowerCase() == srcFile.name.toLowerCase()) {
                            // Set the flag
                            newFl = false;
                            // Update the file
                            file.data = ev.target.result;
                            file.deleteFl = false;
                            file.name = srcFile.name;
                            // Break from the loop
                            break;
                        }
                    }
                    // See if this is a new attachment
                    if (newFl) {
                        // Add the file
                        files.push({
                            data: ev.target.result,
                            deleteFl: false,
                            existsFl: false,
                            name: srcFile.name
                        });
                    }
                    // Update the state
                    _this.setState({
                        files: files,
                        loadingFl: false
                    });
                };
                // Set the error
                reader.onerror = function (ev) {
                    // Update the state
                    _this.setState({
                        errorMessage: ev.target.error,
                        loadingFl: false
                    });
                };
                // Read the file
                reader.readAsArrayBuffer(srcFile);
            }
        };
        // Event triggered by clicking on the attachment delete icon
        _this.removeAttachment = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Get the file name
            var fileName = ev.currentTarget.getAttribute("data-fileName");
            // Parse the attachments
            var files = _this.state.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                // See if this is the attachment to remove
                if (file.name.toLowerCase() == fileName) {
                    // See if this item exists
                    if (file.existsFl) {
                        // Set the delete flag
                        file.deleteFl = true;
                    }
                    else {
                        // Remove the file
                        files.splice(i, 1);
                    }
                }
            }
            // Update the state
            _this.setState({ files: files });
        };
        // Event triggered by clicking on the add attachment link
        _this.showFileDialog = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Show the file dialog
            _this.refs["file"].click();
        };
        /**
         * Methods
         */
        // Method to delete the attachments
        _this.deleteAttachments = function () {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // Get the web
                var web = new gd_sprest_1.Web(_this.props.webUrl);
                // Parse the files
                for (var i = 0; i < _this.state.files.length; i++) {
                    var file = _this.state.files[i];
                    // See if we are deleting the file
                    if (file.deleteFl) {
                        // Get the file
                        web.getFileByServerRelativeUrl(file.url)
                            .delete()
                            .execute(true);
                    }
                }
                // Wait for the requests to complete
                web.done(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // Resolve the proimse
                    resolve(args);
                });
            });
        };
        // Method to load the files
        _this.loadFiles = function (attachments) {
            var files = [];
            // Parse the attachments
            for (var i = 0; i < attachments.results.length; i++) {
                var attachment = attachments.results[i];
                // Add the file
                files.push({
                    data: null,
                    deleteFl: false,
                    existsFl: true,
                    name: attachment.FileName,
                    url: attachment.ServerRelativeUrl
                });
            }
            // Return the files
            return files;
        };
        // Method to render the attachments
        _this.renderAttachments = function () {
            var files = [];
            // Parse the files
            for (var i = 0; i < _this.state.files.length; i++) {
                var file = _this.state.files[i];
                // Ensure we are not deleting this fiel
                if (file.deleteFl) {
                    continue;
                }
                // Add the file
                files.push(React.createElement(office_ui_fabric_react_1.Link, { className: "ms-AttachmentLink", key: file.name, href: file.url, download: true },
                    React.createElement("span", { className: "ms-fontSize-m" }, file.name),
                    React.createElement("i", { className: "ms-Icon ms-Icon--Delete", "data-fileName": file.name.toLowerCase(), onClick: _this.removeAttachment })));
            }
            // Return the files
            return files;
        };
        // Method to save the attachments
        _this.saveAttachments = function (itemId) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // Get the list item
                var item = (new gd_sprest_1.Web(_this.props.webUrl))
                    .Lists(_this.props.listName)
                    .Items(itemId);
                // Parse the files
                for (var i = 0; i < _this.state.files.length; i++) {
                    var file = _this.state.files[i];
                    // See if we are deleting the file
                    if (file.deleteFl) {
                        continue;
                    }
                    // See if the binary data exists
                    if (file.data) {
                        // Get the item attachments
                        item.AttachmentFiles()
                            .add(file.name, file.data)
                            .execute(true);
                    }
                }
                // Wait for the requests to complete
                item.done(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // Resolve the promise
                    resolve(args);
                });
            });
        };
        // Update the state
        _this.state = {
            errorMessage: "",
            files: _this.loadFiles(props.files),
            loadingFl: false
        };
        return _this;
    }
    /**
     * Public Interface
     */
    // Method to render the component
    FieldAttachments.prototype.render = function () {
        return (React.createElement("div", null,
            this.renderAttachments(),
            this.state.loadingFl ?
                React.createElement(office_ui_fabric_react_1.Spinner, { label: "Uploading the file" })
                :
                    React.createElement(office_ui_fabric_react_1.Link, { onClick: this.showFileDialog }, "Add an attachment"),
            this.state.errorMessage == "" ? null :
                React.createElement("span", { className: "ms-fontSize-m ms-fontColor-redDark" }, this.state.errorMessage),
            React.createElement("input", { type: "file", hidden: true, onChange: this.addAttachment, ref: "file" })));
    };
    return FieldAttachments;
}(React.Component));
exports.FieldAttachments = FieldAttachments;
