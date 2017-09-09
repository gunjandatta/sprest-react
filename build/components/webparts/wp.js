"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var common_1 = require("../../common");
/**
 * Web Part
 */
var WebPart = /** @class */ (function () {
    /**
     * Constructor
     */
    function WebPart(props) {
        var _this = this;
        this._props = null;
        /**
         * Methods
         */
        // Method to add the help link
        this.addHelpLink = function (wpId) {
            // Ensure the help url exists
            if (_this._props.helpUrl) {
                // Get the webpart's "Snippet"
                var link = document.querySelector("div[webpartid='" + wpId + "'] a[title='Edit Snippet']");
                if (link) {
                    // Create the help link
                    var helpLink = document.createElement("a");
                    helpLink.href = _this._props.helpUrl;
                    helpLink.style.paddingLeft = "10px";
                    helpLink.setAttribute("role", "button");
                    helpLink.title = _this._props.helpTitle || "Help";
                    helpLink.innerHTML = "<span class='ms-metadata'>" + helpLink.title + "</span>";
                    helpLink.target = "_blank";
                    // Append the link
                    link.parentElement.appendChild(helpLink);
                }
            }
        };
        // Method to get the target information
        this.getTargetInformation = function () {
            var targetInfo = {
                cfg: null,
                element: null
            };
            // Ensure the target element id exists
            if (_this._props.targetElementId) {
                var cfg = {};
                var elTarget = null;
                // Get the elements
                var elements = document.querySelectorAll("#" + _this._props.targetElementId);
                for (var i = 0; i < elements.length; i++) {
                    var elWebPart = elements[i];
                    // See if we have already configured this element
                    if (elWebPart.getAttribute("data-isConfigured")) {
                        continue;
                    }
                    // Get the webpart id
                    var wpId = common_1.Page.getWebPartId(elWebPart);
                    // See if the configuration element exists
                    var elTargetCfg = (_this._props.cfgElementId ? elWebPart.parentElement.querySelector("#" + _this._props.cfgElementId) : null);
                    if (elTargetCfg) {
                        try {
                            // Set the configuration
                            var wpCfg = elTargetCfg.innerText.trim().length == 0 ? {} : JSON.parse(elTargetCfg.innerText);
                            // See if the webaprt id exists
                            if (wpCfg.WebPartId) {
                                // See if it's for this webpart
                                if (wpCfg.WebPartId == wpId) {
                                    // Set the configuration and target element
                                    cfg = wpCfg;
                                    elTarget = elWebPart;
                                    // Break from the loop
                                    break;
                                }
                            }
                            else {
                                // Set the configuration and target element
                                cfg = wpCfg;
                                cfg.WebPartId = wpId;
                                elTarget = elWebPart;
                                // Break from the loop
                                break;
                            }
                        }
                        catch (ex) {
                            // Log
                            console.log("[gd-sprest-react] Error parsing the configuration for element '" + _this._props.cfgElementId + "'.");
                        }
                    }
                    else {
                        // Set the configuration and target element
                        cfg.WebPartId = wpId;
                        elTarget = elWebPart;
                        // Break from the loop
                        break;
                    }
                }
                // Set the target information
                targetInfo = {
                    cfg: cfg,
                    element: elTarget
                };
                // Ensure elements were found
                if (elements.length == 0) {
                    // Log
                    console.log("[gd-sprest-react] Error - Unable to find elements with id '" + _this._props.targetElementId + "'.");
                }
            }
            else {
                // Log
                console.log("[gd-sprest-react] The target element id is not defined.");
            }
            // Ensure the target element exists
            if (targetInfo.element) {
                // Set the configuration flag
                targetInfo.element.setAttribute("data-isConfigured", "true");
            }
            // Return the target information
            return targetInfo;
        };
        // Method to render the webpart
        this.render = function () {
            var element = null;
            // Get the target information
            var targetInfo = _this.getTargetInformation();
            // Ensure the target element exists
            if (targetInfo.element == null) {
                // Log
                console.log("[gd-sprest-react] The target element '" + _this._props.targetElementId + "' was not found.");
                return;
            }
            // Ensure the configuration exists
            if (_this._props.cfgElementId != null && targetInfo.cfg == null) {
                // Log
                console.log("[gd-sprest-react] The configuration element '" + _this._props.cfgElementId + "' was not found.");
                return;
            }
            // See if the page is being edited
            if (common_1.Page.isEditMode()) {
                // Set the element
                element = _this._props.editElement ? React.createElement(_this._props.editElement, { cfg: targetInfo.cfg, cfgElementId: _this._props.cfgElementId }) : null;
                element = _this._props.onRenderEditElement ? _this._props.onRenderEditElement(targetInfo) : element;
                // Add the help link
                targetInfo.cfg ? _this.addHelpLink(targetInfo.cfg.WebPartId) : null;
            }
            else {
                // See if the configuration exists
                if (targetInfo.cfg || _this._props.cfgElementId == null) {
                    // Set the element
                    element = _this._props.displayElement ? React.createElement(_this._props.displayElement, { cfg: targetInfo.cfg }) : null;
                    element = _this._props.onRenderDisplayElement ? _this._props.onRenderDisplayElement(targetInfo) : element;
                }
                else {
                    element = React.createElement("div", { className: "ms-fontSize-l" }, "Please edit the page and configure the webpart.");
                }
            }
            // See if the element exists
            if (element) {
                // Render the element
                react_dom_1.render(element, targetInfo.element);
            }
            // Execute the post render event
            _this._props.onPostRender ? _this._props.onPostRender(targetInfo) : null;
        };
        // Set the properties
        this._props = props;
        // Add a load event
        window.addEventListener("load", function () {
            // Render the component
            _this.render();
        });
    }
    return WebPart;
}());
exports.WebPart = WebPart;
//# sourceMappingURL=wp.js.map