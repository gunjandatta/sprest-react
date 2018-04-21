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
require("../../sass/fieldAttachments.css");
/**
 * Attachments field
 */
var FieldAttachments = /** @class */ (function (_super) {
    __extends(FieldAttachments, _super);
    /**
     * Constructor
     * @param props - The attachment field properties.
     */
    function FieldAttachments(props) {
        var _this = _super.call(this, props) || this;
        _this._file = null;
        /**
         * Methods
         */
        /**
         * Event triggered by the user selecting a file to upload
         * @param ev - The button click event.
         */
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
                    var attachment = null;
                    var state = _this.state;
                    // Parse the attachments
                    for (var i = 0; i < _this.state.files.Existing.length; i++) {
                        var file = _this.state.files.Existing[i];
                        // See if the file already exists
                        if (file.name.toLowerCase() == srcFile.name.toLowerCase()) {
                            var deleteFl = true;
                            // Set the flag
                            newFl = false;
                            // Delete the file
                            for (var j = 0; j < _this.state.files.Delete.length; j++) {
                                // See if this file is already flagged to be deleted
                                if (_this.state.files.Delete[j].name == file.name) {
                                    // Set the flag
                                    deleteFl = false;
                                }
                            }
                            // See if we are deleting the file
                            if (deleteFl) {
                                // Delete the file
                                _this.state.files.Delete.push(file);
                            }
                            else {
                                // Parse the files to add
                                for (var j = 0; j < _this.state.files.New.length; j++) {
                                    var newFile = _this.state.files.New[j];
                                    // See if this is the file
                                    if (newFile.name == file.name) {
                                        // Update the file
                                        newFile.data = ev.target.result;
                                        newFile.name = srcFile.name;
                                    }
                                }
                            }
                            // Break from the loop
                            break;
                        }
                    }
                    // See if this is a new attachment
                    if (newFl) {
                        var ext = srcFile.name.split(".");
                        ext = ext[ext.length - 1].toLowerCase();
                        // Add the attachment
                        state.files.New.push({
                            data: ev.target.result,
                            ext: ext,
                            name: srcFile.name
                        });
                    }
                    // Call the file added event
                    _this.props.onFileAdded ? _this.props.onFileAdded(attachment) : null;
                    // Update the state
                    _this.setState(state);
                };
                // Set the error
                reader.onerror = function (ev) {
                    // Update the state
                    _this.setState({
                        errorMessage: ev.target.error
                    });
                };
                // Read the file
                reader.readAsArrayBuffer(srcFile);
            }
        };
        /**
         * Method to delete the attachments
         */
        _this.deleteAttachments = function (state) {
            // Return a promise
            return new Promise(function (resolve, reject) {
                var files = [];
                // Parse the files to delete
                for (var i = 0; i < _this.state.files.Delete.length; i++) {
                    var file = _this.state.files.Delete[i];
                    // add the file
                    files.push({
                        FileName: file.name,
                        ServerRelativeUrl: file.url
                    });
                }
                // Ensure files exist
                if (files.length > 0) {
                    // Remove the attachments
                    _this.removeAttachments({
                        itemId: _this.props.itemId,
                        listName: _this.props.listName,
                        webUrl: _this.props.webUrl
                    }, files).then(function () {
                        // Clear the delete array
                        state.files.Delete = [];
                        // Resolve the promise
                        resolve(state);
                    });
                }
                else {
                    // Resolve the promise
                    resolve(state);
                }
            });
        };
        /**
         * Method to load the attachment files from the item.
         */
        _this.loadAttachments = function () {
            // Create the list information
            gd_sprest_1.Helper.ListForm.create({
                itemId: _this.props.itemId,
                listName: _this.props.listName,
                loadAttachments: true,
                webUrl: _this.props.webUrl
            }).then(function (listInfo) {
                // Update the state
                _this.setState({
                    files: {
                        Delete: [],
                        Existing: _this.toArray(listInfo.attachments),
                        New: []
                    },
                    listInfo: listInfo
                });
            });
        };
        /**
         * The click event for the link.
         */
        _this.linkClick = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Execute the event
            if (_this.props.onFileClick) {
                // Get the file name
                var fileName = ev.currentTarget.getAttribute("data-filename");
                // Parse the attachments
                for (var i = 0; i < _this.state.files.Existing.length; i++) {
                    var file = _this.state.files.Existing[i];
                    // See if this is the attachment to remove
                    if (file.name.toLowerCase() == fileName) {
                        // Execute the event
                        _this.props.onFileClick(file);
                        // Break from the loop
                        break;
                    }
                }
            }
        };
        // Refresh the attachments
        _this.refresh = function () {
            // Return a promise
            return new Promise(function (resolve, reject) {
                // Clear the existing items
                var state = _this.state;
                state.files.Existing = null;
                // Update the state
                _this.setState(state, function () {
                    // Resolve the promise
                    resolve();
                });
            });
        };
        /**
         * Event triggered by clicking on the attachment delete icon
         * @param ev - The button click event.
         */
        _this.removeAttachment = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Get the file name
            var fileName = ev.currentTarget.getAttribute("data-filename").toLowerCase();
            // Parse the attachments
            for (var i = 0; i < _this.state.files.Existing.length; i++) {
                var file = _this.state.files.Existing[i];
                // See if this is the attachment to remove
                if (file.name.toLowerCase() == fileName) {
                    var files = _this.state.files;
                    // Delete the attachment
                    files.Delete.push(file);
                    // Update the state
                    _this.setState({ files: files });
                    // Break from the loop
                    break;
                }
            }
        };
        /**
         * Method to remove the attachments.
         */
        _this.removeAttachments = function (info, attachments) {
            // Return a promise
            return new Promise(function (resolve, reject) {
                var web = new gd_sprest_1.Web(info.webUrl);
                // Parse the attachments
                for (var i = 0; i < attachments.length; i++) {
                    var attachment = attachments[i];
                    // Get the file
                    web.getFileByServerRelativeUrl(attachment.ServerRelativeUrl)
                        .delete()
                        .execute(true);
                }
                // Wait for the requests to complete
                web.done(function () {
                    // Resolve the request
                    resolve();
                });
            });
        };
        /**
         * Method to render the attachments
         */
        _this.renderAttachments = function () {
            var attachments = [];
            // Parse the files
            for (var i = 0; i < _this.state.files.Existing.length; i++) {
                var file = _this.state.files.Existing[i];
                // See if the file render event exists
                var attachment = null;
                if (_this.props.onFileRender) {
                    // Set the attachment
                    attachment = _this.props.onFileRender(file);
                    if (attachment) {
                        // Add the attachment
                        attachments.push(attachment);
                    }
                }
                else {
                    // Add the attachment
                    attachments.push(React.createElement(office_ui_fabric_react_1.Link, { className: "ms-AttachmentLink", key: file.name, href: file.url, "data-filename": file.name.toLowerCase(), download: true, onClick: _this.linkClick },
                        React.createElement("span", { className: "ms-fontSize-m" }, file.name),
                        _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display ? null :
                            React.createElement("i", { className: "ms-Icon ms-Icon--Delete", "data-filename": file.name.toLowerCase(), onClick: _this.removeAttachment })));
                }
            }
            // Return the attachments
            return attachments;
        };
        /**
         * Method to save the attachments to the item
         */
        _this.save = function () {
            // Return a promise
            return new Promise(function (resolve, reject) {
                // Update the state
                _this.setState({ loadingFl: true }, function () {
                    // Delete the attachments
                    _this.deleteAttachments(_this.state).then(function (state) {
                        // Save the attachments
                        _this.saveAttachments(state).then(function (state) {
                            // Set the loading flag
                            state.loadingFl = false;
                            // Update the state
                            _this.setState(state, function () {
                                // Resolve the promise
                                resolve();
                            });
                        });
                    });
                });
            });
        };
        /**
         * Method to save the attachments
         */
        _this.saveAttachments = function (state) {
            // Return a promise
            return new Promise(function (resolve, reject) {
                var files = [];
                // Parse the new files
                for (var i = 0; i < state.files.New.length; i++) {
                    var file = state.files.New[i];
                    // See if data exists
                    if (file.data) {
                        // add the file
                        files.push({
                            data: file.data,
                            name: file.name
                        });
                    }
                }
                // Clear the new items
                state.files.New = [];
                // Ensure files exist
                if (files.length > 0) {
                    // Save the attachments
                    gd_sprest_1.Helper.ListForm.saveAttachments({
                        itemId: _this.props.itemId,
                        listName: _this.props.listName,
                        webUrl: _this.props.webUrl
                    }, files).then(function (attachments) {
                        // Update the attachments
                        state.listInfo.attachments = attachments;
                        // Resolve the promise
                        resolve(state);
                    });
                }
                else {
                    // Resolve the promise
                    resolve(state);
                }
            });
        };
        /**
         * Method to show the file dialog
         */
        _this.showFileDialog = function () {
            // Show the file dialog
            _this._file.click();
        };
        /**
         * Method to convert the item value to the attachment file array
         * @param attachments - The file attachments.
         */
        _this.toArray = function (attachments) {
            var files = [];
            // Ensure attachments exist
            if (attachments) {
                // Parse the attachments
                for (var i = 0; i < attachments.length; i++) {
                    var attachment = attachments[i];
                    // Set the file extension
                    var ext = attachment.FileName.split(".");
                    ext = ext[ext.length - 1].toLowerCase();
                    // Add the file
                    files.push({
                        data: null,
                        ext: ext,
                        name: attachment.FileName,
                        url: attachment.ServerRelativeUrl
                    });
                }
            }
            // Return the files
            return files;
        };
        // Update the state
        _this.state = {
            errorMessage: "",
            files: {
                Delete: [],
                Existing: props.files && typeof (props.files) != "function" ? props.files : null,
                New: []
            },
            listInfo: null,
            loadingFl: false
        };
        return _this;
    }
    // Render the component
    FieldAttachments.prototype.render = function () {
        var _this = this;
        var elAttachments = null;
        var loadingFl = this.state.loadingFl;
        // Ensure the attachments have been loaded
        if (this.state.files.Existing == null) {
            // Load the attachments
            this.loadAttachments();
            // Set the flag
            loadingFl = true;
        }
        // See if we are loading the attachments
        if (loadingFl) {
            // Render a loading dialog
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading..." }));
        }
        // See if the render method exists
        if (this.props.onRender) {
            elAttachments = this.props.onRender(this.state.files.Existing);
        }
        else {
            // See if this is the display mode
            if (this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display) {
                // Render the attachments in display mode
                elAttachments = (React.createElement("div", { className: (this.props.className || "") }, this.renderAttachments()));
            }
            else {
                // Render the attachments in edit mode
                elAttachments = (React.createElement("div", { className: (this.props.className || "") },
                    this.renderAttachments(),
                    React.createElement(office_ui_fabric_react_1.Link, { className: "ms-AttachmentLink", onClick: this.showFileDialog }, "Add an attachment"),
                    this.state.errorMessage == "" ? null :
                        React.createElement("span", { className: "ms-fontSize-m ms-fontColor-redDark" }, this.state.errorMessage)));
            }
            // Call the render event
            elAttachments = this.props.onAttachmentsRender ? this.props.onAttachmentsRender(elAttachments) : elAttachments;
        }
        // Render the attachments
        return (React.createElement("div", null,
            elAttachments,
            React.createElement("input", { type: "file", hidden: true, onChange: this.addAttachment, ref: function (file) { _this._file = file; } })));
    };
    return FieldAttachments;
}(React.Component));
exports.FieldAttachments = FieldAttachments;
