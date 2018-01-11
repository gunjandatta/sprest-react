"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var gd_sp_webpart_1 = require("gd-sp-webpart");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * Fabric Web Part
 */
exports.FabricWebPart = function (props) {
    var element = null;
    // The render display component
    var renderDisplay = function (wp) {
        var element = props.onRenderDisplayElement ? props.onRenderDisplayElement(wp) : null;
        if (element == null) {
            // Default the element
            element = props.displayElement ? React.createElement(props.displayElement, { cfg: wp.cfg }) : null;
        }
        // See if the element exists
        if (element) {
            // Render the element
            react_dom_1.render(React.createElement(office_ui_fabric_react_1.Fabric, null, element), wp.el);
        }
    };
    // The render edit component
    var renderEdit = function (wp) {
        var element = props.onRenderEditElement ? props.onRenderEditElement(wp) : null;
        if (element) {
            // Default the element
            element = props.editElement ? React.createElement(props.editElement, { cfg: wp.cfg, cfgElementId: props.cfgElementId }) : null;
        }
        // See if the element exists
        if (element) {
            // Render the element
            react_dom_1.render(React.createElement(office_ui_fabric_react_1.Fabric, null, element), wp.el);
        }
    };
    // Create an instance of the webpart
    new gd_sp_webpart_1.WebPart({
        cfgElementId: props.cfgElementId,
        elementId: props.targetElementId,
        helpProps: {
            title: props.helpTitle,
            url: props.helpUrl
        },
        onPostRender: props.onPostRender,
        onRenderDisplay: renderDisplay,
        onRenderEditElement: renderEdit
    });
};
//# sourceMappingURL=wp.js.map