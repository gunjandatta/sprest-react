"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var gd_sprest_1 = require("gd-sprest");
var Fabric_1 = require("office-ui-fabric-react/lib/Fabric");
/**
 * Fabric Web Part
 */
exports.FabricWebPart = function (props) {
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
            react_dom_1.render(React.createElement(Fabric_1.Fabric, null, element), wp.el);
        }
    };
    // The render edit component
    var renderEdit = function (wp) {
        var element = props.onRenderEditElement ? props.onRenderEditElement(wp) : null;
        if (element == null) {
            // Default the element
            element = props.editElement ? React.createElement(props.editElement, { cfg: wp.cfg, cfgElementId: props.cfgElementId }) : null;
        }
        // See if the element exists
        if (element) {
            // Render the element
            react_dom_1.render(React.createElement(Fabric_1.Fabric, null, element), wp.el);
        }
    };
    // Create an instance of the webpart
    new gd_sprest_1.Helper.WebPart({
        cfgElementId: props.cfgElementId,
        elementId: props.targetElementId,
        helpProps: {
            title: props.helpTitle,
            url: props.helpUrl
        },
        onPostRender: props.onPostRender,
        onRenderDisplay: renderDisplay,
        onRenderEdit: renderEdit
    });
};
