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
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var common_1 = require("../common");
var _1 = require(".");
/**
 * Web Part Configuration
 */
var WebPartConfigurationPanel = (function (_super) {
    __extends(WebPartConfigurationPanel, _super);
    /**
     * Constructor
     */
    function WebPartConfigurationPanel(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Methods
         */
        // Method to save the webpart configuration
        _this.saveConfiguration = function (wpCfg) {
            // Clear the error message
            _this.refs["errorMessage"].innerText = "";
            // See if this webpart in the page content
            var wpContent = document.querySelector(".aspNetHidden input[name='" + _this.props.cfg.WebPartId + "scriptcontent']");
            if (wpContent) {
                // Create an element so we can update the configuration
                var el = document.createElement("div");
                el.innerHTML = wpContent.value;
                // Get the configuration element and update it
                var cfg = el.querySelector("#" + _this.props.cfgElementId);
                cfg.innerText = JSON.stringify(wpCfg);
                // Update the value
                wpContent.value = el.innerHTML;
                // Close the panel
                _this.refs["panel"].hide();
            }
            else {
                // Get the target webpart
                common_1.Page.getWebPart(_this.props.cfg.WebPartId).then(function (wpInfo) {
                    // Get the content
                    var content = wpInfo && wpInfo.Properties.get_fieldValues()["Content"];
                    if (content) {
                        // Create an element so we can update the configuration
                        var el = document.createElement("div");
                        el.innerHTML = content;
                        // Get the configuration element and update it
                        var cfg = el.querySelector("#" + _this.props.cfgElementId);
                        cfg.innerText = JSON.stringify(wpCfg);
                        // Update the webpart
                        wpInfo.Properties.set_item("Content", el.innerHTML);
                        wpInfo.WebPartDefinition.saveWebPartChanges();
                        wpInfo.Context.load(wpInfo.WebPartDefinition);
                        // Execute the request
                        wpInfo.Context.executeQueryAsync(
                        // Success
                        function () {
                            // Disable the edit page warning
                            if (SP && SP.Ribbon && SP.Ribbon.PageState && SP.Ribbon.PageState.PageStateHandler) {
                                SP.Ribbon.PageState.PageStateHandler.ignoreNextUnload = true;
                            }
                            // Refresh the page
                            window.location.href = window.location.href;
                        }, 
                        // Error
                        function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            // Set the error message
                            _this.refs["errorMessage"].innerText = args[1].get_message();
                        });
                    }
                });
            }
        };
        // Method to show the panel
        _this.show = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Show the panel
            _this.refs["panel"].show();
        };
        // Set the state
        _this.state = {
            cfg: props.cfg || {}
        };
        return _this;
    }
    /**
     * Public Interface
     */
    // Method to render the panel
    WebPartConfigurationPanel.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.PrimaryButton, { text: "Edit Configuration", onClick: this.show }),
            React.createElement(_1.Panel, { headerText: "Configuration", ref: "panel" },
                React.createElement("div", { ref: "errorMessage" }),
                this.onRenderContents(this.state.cfg))));
    };
    return WebPartConfigurationPanel;
}(React.Component));
exports.WebPartConfigurationPanel = WebPartConfigurationPanel;
