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
var common_1 = require("../../common");
var __1 = require("..");
/**
 * Web Part Configuration
 */
var WebPartConfigurationPanel = /** @class */ (function (_super) {
    __extends(WebPartConfigurationPanel, _super);
    /**
     * Constructor
     */
    function WebPartConfigurationPanel(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        _this._errorMessage = null;
        _this._panel = null;
        /**
         * Events
         */
        // The render footer event
        _this.onRenderFooter = function () { return React.createElement("div", null); };
        // The render header event
        _this.onRenderHeader = function () { return React.createElement("div", null); };
        /**
         * Methods
         */
        // Method to save the webpart configuration
        _this.saveConfiguration = function (wpCfg) {
            // Clear the error message
            _this._errorMessage.innerText = "";
            // Update the webpart content elements
            if (_this.updateWebPartContentElements(_this.props.cfg.WebPartId, wpCfg)) {
                // Close the panel
                _this._panel.hide();
                return;
            }
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
                    cfg ? cfg.innerText = JSON.stringify(wpCfg) : null;
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
                        window.location.href = window.location.pathname + "?DisplayMode=Design";
                    }, 
                    // Error
                    function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        // Set the error message
                        _this._errorMessage.innerText = args[1].get_message();
                    });
                }
            });
        };
        // Method to show the panel
        _this.show = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Show the panel
            _this._panel.show();
        };
        // Method to update the webpart content elements
        _this.updateWebPartContentElements = function (wpId, wpCfg) {
            // Get the webpart element
            var elWebPart = document.querySelector("div[webpartid='" + wpId + "']");
            if (elWebPart) {
                var wpContent = null;
                var wpPageContent = null;
                // Get the associated webpart id
                var wpId2 = elWebPart.getAttribute("webpartid2");
                // Update the configuration
                var cfg = elWebPart.querySelector("#" + _this.props.cfgElementId);
                cfg ? cfg.innerText = JSON.stringify(wpCfg) : null;
                // Parse the hidden elements on the page
                var hiddenElements = document.querySelectorAll("input[type='hidden']");
                for (var i = 0; i < hiddenElements.length; i++) {
                    var elHidden = hiddenElements[i];
                    // See if we have found the webpart content and page content hidden elements
                    if (wpContent && wpPageContent) {
                        continue;
                    }
                    // See if this is a hidden webpart content element
                    if (elHidden.name && elHidden.name.indexOf("scriptcontent") == elHidden.name.length - 13) {
                        // See if it's for this webpart
                        if (elHidden.name.indexOf(wpId2) == 0) {
                            // Set the webpart content element
                            wpContent = elHidden;
                            // Update the configuration in the webpart content element
                            _this.updateConfigurationInElement(wpContent, wpCfg);
                        }
                        // Continue the loop
                        continue;
                    }
                    // Create an element and set the inner html to the value
                    var el = document.createElement("div");
                    el.innerHTML = elHidden.value;
                    // See if this is a hidden field element
                    if (el.querySelector("#" + _this.props.cfgElementId)) {
                        // Set the webpart page content
                        wpPageContent = elHidden;
                        // Update the configuration in the webpart content element
                        _this.updateConfigurationInElement(wpPageContent, wpCfg);
                        // Continue the loop
                        continue;
                    }
                }
                // Return true, if the page content exists
                return wpPageContent != null;
            }
            // Webpart is not in a content field
            return false;
        };
        // Method to update the configuration element
        _this.updateConfigurationInElement = function (elTarget, wpCfg) {
            // Create an element so we can update the configuration
            var el = document.createElement("div");
            el.innerHTML = elTarget.value;
            // Get the configuration element and update it
            var cfg = el.querySelector("#" + _this.props.cfgElementId);
            cfg ? cfg.innerText = JSON.stringify(wpCfg) : null;
            // Update the value
            elTarget.value = el.innerHTML;
        };
        // Set the state
        _this.state = {
            cfg: props.cfg || {}
        };
        return _this;
    }
    // Method to render the panel
    WebPartConfigurationPanel.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.PrimaryButton, { text: "Edit Configuration", onClick: this.show }),
            React.createElement(__1.Panel, { headerText: "Configuration", ref: function (panel) { _this._panel = panel; } },
                React.createElement("div", { ref: function (errorMessage) { _this._errorMessage = errorMessage; } }),
                this.onRenderHeader(),
                this.onRenderContents(this.state.cfg),
                this.onRenderFooter())));
    };
    return WebPartConfigurationPanel;
}(React.Component));
exports.WebPartConfigurationPanel = WebPartConfigurationPanel;
//# sourceMappingURL=wpCfg.js.map