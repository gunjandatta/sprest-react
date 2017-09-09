import * as React from "react";
import { render } from "react-dom";
import { Page } from "../../common";
import { IWebPartCfg, IWebPartInfo, IWebPartProps, IWebPartTargetInfo } from "../../definitions";

/**
 * Web Part
 */
export class WebPart {
    private _props: IWebPartProps = null;

    /**
     * Constructor
     */
    constructor(props: IWebPartProps) {
        // Set the properties
        this._props = props;

        // Add a load event
        window.addEventListener("load", () => {
            // Render the component
            this.render();
        });
    }

    /**
     * Methods
     */

    // Method to add the help link
    private addHelpLink = (wpId: string) => {
        // Ensure the help url exists
        if (this._props.helpUrl) {
            // Get the webpart's "Snippet"
            let link = document.querySelector("div[webpartid='" + wpId + "'] a[title='Edit Snippet']");
            if (link) {
                // Create the help link
                let helpLink = document.createElement("a");
                helpLink.href = this._props.helpUrl;
                helpLink.style.paddingLeft = "10px";
                helpLink.setAttribute("role", "button");
                helpLink.title = this._props.helpTitle || "Help";
                helpLink.innerHTML = "<span class='ms-metadata'>" + helpLink.title + "</span>";
                helpLink.target = "_blank";

                // Append the link
                link.parentElement.appendChild(helpLink);
            }
        }
    }

    // Method to get the target information
    private getTargetInformation = (): IWebPartTargetInfo => {
        let targetInfo: IWebPartTargetInfo = {
            cfg: null,
            element: null
        }

        // Ensure the target element id exists
        if (this._props.targetElementId) {
            let cfg = {} as IWebPartCfg;
            let elTarget = null;

            // Get the elements
            let elements = document.querySelectorAll("#" + this._props.targetElementId);
            for (let i = 0; i < elements.length; i++) {
                let elWebPart = elements[i] as HTMLElement;

                // See if we have already configured this element
                if (elWebPart.getAttribute("data-isConfigured")) { continue; }

                // Get the webpart id
                let wpId = Page.getWebPartId(elWebPart);

                // See if the configuration element exists
                let elTargetCfg = (this._props.cfgElementId ? elWebPart.parentElement.querySelector("#" + this._props.cfgElementId) : null) as HTMLElement;
                if (elTargetCfg) {
                    try {
                        // Set the configuration
                        let wpCfg = elTargetCfg.innerText.trim().length == 0 ? {} : JSON.parse(elTargetCfg.innerText);

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
                        } else {
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
                        console.log("[gd-sprest-react] Error parsing the configuration for element '" + this._props.cfgElementId + "'.");
                    }
                } else {
                    // Set the configuration and target element
                    cfg.WebPartId = wpId;
                    elTarget = elWebPart;

                    // Break from the loop
                    break;
                }
            }

            // Set the target information
            targetInfo = {
                cfg,
                element: elTarget
            }

            // Ensure elements were found
            if (elements.length == 0) {
                // Log
                console.log("[gd-sprest-react] Error - Unable to find elements with id '" + this._props.targetElementId + "'.")
            }
        } else {
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
    }

    // Method to render the webpart
    private render = () => {
        let element = null;

        // Get the target information
        let targetInfo = this.getTargetInformation();

        // Ensure the target element exists
        if (targetInfo.element == null) {
            // Log
            console.log("[gd-sprest-react] The target element '" + this._props.targetElementId + "' was not found.");
            return;
        }

        // Ensure the configuration exists
        if (this._props.cfgElementId != null && targetInfo.cfg == null) {
            // Log
            console.log("[gd-sprest-react] The configuration element '" + this._props.cfgElementId + "' was not found.");
            return;
        }

        // See if the page is being edited
        if (Page.isEditMode()) {
            // Set the element
            element = this._props.editElement ? <this._props.editElement cfg={targetInfo.cfg} cfgElementId={this._props.cfgElementId} /> : null;
            element = this._props.onRenderEditElement ? this._props.onRenderEditElement(targetInfo) : element;

            // Add the help link
            targetInfo.cfg ? this.addHelpLink(targetInfo.cfg.WebPartId) : null;
        } else {
            // See if the configuration exists
            if (targetInfo.cfg || this._props.cfgElementId == null) {
                // Set the element
                element = this._props.displayElement ? <this._props.displayElement cfg={targetInfo.cfg} /> : null;
                element = this._props.onRenderDisplayElement ? this._props.onRenderDisplayElement(targetInfo) : element;
            } else {
                element = <div className="ms-fontSize-l">Please edit the page and configure the webpart.</div>;
            }
        }

        // See if the element exists
        if (element) {
            // Render the element
            render(element, targetInfo.element);
        }

        // Execute the post render event
        this._props.onPostRender ? this._props.onPostRender(targetInfo) : null;
    }
}