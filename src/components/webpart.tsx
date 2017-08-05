import * as React from "react";
import { render } from "react-dom";
import { Page } from "../common";
import { IWebPartCfg, IWebPartInfo, IWebPartProps, IWebPartTargetInfo } from "../definitions";

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
    private addHelpLink = (wpId:string) => {
        // Ensure the help url exists
        if(this._props.helpUrl) {
            // Get the webpart's "Snippet"
            let link = document.querySelector("div[webpartid='" + wpId + "'] a[title='Edit Snippet']");
            if(link) {
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

        // See if the configuration element exists
        if (this._props.cfgElementId) {
            // Get the elements
            let elements = document.querySelectorAll("#" + this._props.targetElementId);
            for (let i = 0; i < elements.length; i++) {
                let elTarget: HTMLElement = elements[i] as any;
                let elTargetCfg: HTMLElement = elTarget.parentElement.querySelector("#" + this._props.cfgElementId) as any;

                // See if we have already configured this element
                if (elTarget.getAttribute("data-isConfigured")) { continue; }

                // Ensure data exists
                if (elTargetCfg) {
                    try {
                        // Set the configuration
                        let cfg: IWebPartCfg = elTargetCfg.innerText.trim().length == 0 ? {} : JSON.parse(elTargetCfg.innerText);
                        let wpId = Page.getWebPartId(elTarget);

                        // See if the webaprt id exists
                        if (cfg.WebPartId) {
                            // Ensure this element is for this webpart
                            if (cfg.WebPartId == wpId) {
                                // Set the target information
                                targetInfo = {
                                    cfg,
                                    element: elTarget
                                };
                                break;
                            }
                        } else {
                            // Set the webpart id
                            cfg.WebPartId = wpId;

                            // Set the target information
                            targetInfo = {
                                cfg,
                                element: elTarget
                            }
                        }
                    }
                    catch (ex) {
                        // Log
                        console.log("[gd-sprest-react] Error parsing the configuration for element '" + this._props.cfgElementId + "'.");
                    }
                }
            }

            // Ensure elements were found
            if (elements.length == 0) {
                // Log
                console.log("[gd-sprest-react] Error - Unable to find elements with id '" + this._props.targetElementId + "'.")
            }
        } else {
            // Set the element
            targetInfo.element = document.querySelector("#" + this._props.targetElementId) as any;
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
            element = this._props.onRenderEditElement ? this._props.onRenderEditElement(targetInfo) : <this._props.editElement cfg={targetInfo.cfg} cfgElementId={this._props.cfgElementId} />;

            // Add the help link
            this.addHelpLink(targetInfo.cfg.WebPartId);
        } else {
            // See if the configuration exists
            if (targetInfo.cfg || this._props.cfgElementId == null) {
                // Set the element
                element = this._props.onRenderDisplayElement ? this._props.onRenderDisplayElement(targetInfo) : <this._props.displayElement cfg={targetInfo.cfg} />;
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