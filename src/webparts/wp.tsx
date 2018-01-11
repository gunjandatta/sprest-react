import * as React from "react";
import { render } from "react-dom";
import { Helper, Types } from "gd-sprest";
import { Fabric } from "office-ui-fabric-react";
import { IFabricWebPartInfo, IFabricWebPartProps } from "../definitions";

/**
 * Fabric Web Part
 */
export const FabricWebPart = (props: IFabricWebPartProps) => {
    let element = null;

    // The render display component
    let renderDisplay = (wp: Types.Helper.WebPart.IWebPart) => {
        let element = props.onRenderDisplayElement ? props.onRenderDisplayElement(wp) : null;
        if (element == null) {
            // Default the element
            element = props.displayElement ? <props.displayElement cfg={wp.cfg} /> : null;
        }

        // See if the element exists
        if (element) {
            // Render the element
            render(<Fabric>{element}</Fabric>, wp.el);
        }
    };

    // The render edit component
    let renderEdit = (wp: Types.Helper.WebPart.IWebPart) => {
        let element = props.onRenderEditElement ? props.onRenderEditElement(wp) : null;
        if (element) {
            // Default the element
            element = props.editElement ? <props.editElement cfg={wp.cfg} cfgElementId={props.cfgElementId} /> : null;
        }

        // See if the element exists
        if (element) {
            // Render the element
            render(<Fabric>{element}</Fabric>, wp.el);
        }
    };

    // Create an instance of the webpart
    new Helper.WebPart({
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
}