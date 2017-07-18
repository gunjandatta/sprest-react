import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import { Page } from "../common";
import { IWebPartCfg, IWebPartConfigurationProps, IWebPartConfigurationState } from "../definitions";
import { Panel } from '.';
declare var SP;

/**
 * Web Part Configuration
 */
export abstract class WebPartConfigurationPanel<Props extends IWebPartConfigurationProps = IWebPartConfigurationProps, State extends IWebPartConfigurationState = IWebPartConfigurationState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            cfg: props.cfg || {}
        } as any;
    }

    /**
     * Required Methods
     */
    abstract onRenderContents: (cfg: IWebPartCfg) => any;

    /**
     * Public Interface
     */

    // Method to render the panel
    render() {
        return (
            <div>
                <PrimaryButton text="Edit Configuration" onClick={this.show} />
                <Panel headerText="Configuration" ref="panel">
                    <div ref="errorMessage" />
                    {this.onRenderContents(this.state.cfg)}
                </Panel>
            </div>
        )
    }

    /**
     * Methods
     */

    // Method to save the webpart configuration
    protected saveConfiguration = (wpCfg: any) => {
        // Clear the error message
        (this.refs["errorMessage"] as HTMLDivElement).innerText = "";

        // Update the webpart content elements
        if(this.updateWebPartContentElements(this.props.cfg.WebPartId, wpCfg)) {
            // Close the panel
            (this.refs["panel"] as Panel).hide();
            return;
        }

        // Get the target webpart
        Page.getWebPart(this.props.cfg.WebPartId).then((wpInfo) => {
            // Get the content
            let content = wpInfo && wpInfo.Properties.get_fieldValues()["Content"];
            if (content) {
                // Create an element so we can update the configuration
                let el = document.createElement("div");
                el.innerHTML = content;

                // Get the configuration element and update it
                let cfg = el.querySelector("#" + this.props.cfgElementId) as HTMLDivElement;
                cfg ? cfg.innerText = JSON.stringify(wpCfg) : null;

                // Update the webpart
                wpInfo.Properties.set_item("Content", el.innerHTML);
                wpInfo.WebPartDefinition.saveWebPartChanges();
                wpInfo.Context.load(wpInfo.WebPartDefinition);

                // Execute the request
                wpInfo.Context.executeQueryAsync(
                    // Success
                    () => {
                        // Disable the edit page warning
                        if (SP && SP.Ribbon && SP.Ribbon.PageState && SP.Ribbon.PageState.PageStateHandler) {
                            SP.Ribbon.PageState.PageStateHandler.ignoreNextUnload = true;
                        }

                        // Refresh the page
                        window.location.href = window.location.pathname + "?DisplayMode=Design";
                    },
                    // Error
                    (...args) => {
                        // Set the error message
                        (this.refs["errorMessage"] as HTMLDivElement).innerText = args[1].get_message();
                    }
                );
            }
        });
    }

    // Method to show the panel
    private show = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Show the panel
        (this.refs["panel"] as Panel).show();
    }

    // Method to update the webpart content elements
    private updateWebPartContentElements = (wpId: string, wpCfg): boolean => {
        // Get the webpart element
        let elWebPart = document.querySelector("div[webpartid='" + wpId + "']");
        if (elWebPart) {
            // Update the configuration
            var cfg = elWebPart.querySelector("#" + this.props.cfgElementId) as HTMLDivElement;
            cfg ? cfg.innerText = JSON.stringify(wpCfg) : null;

            // Get the associated webpart element id
            let wpId2 = elWebPart.getAttribute("webpartid2");
            let elWPContent = wpId2 ? document.querySelector(".aspNetHidden input[name='" + wpId2 + "scriptcontent']") as HTMLInputElement : null;
            if (elWPContent) {
                // Update the configuration in the webpart content element
                this.updateConfigurationInElement(elWPContent, wpCfg);
            }

            // Get the content for the page
            let elPageContent = document.querySelector("input[id$='TextField_spSave']") as HTMLInputElement;
            if(elPageContent) {
                // Update the configuration in the webpart content element
                this.updateConfigurationInElement(elPageContent, wpCfg);
            }

            // Return true, if the content element exists
            return elPageContent != null;
        }

        // Webpart is not in a content field
        return false;
    }

    // Method to update the configuration element
    private updateConfigurationInElement = (elTarget:HTMLInputElement, wpCfg) => {
        // Create an element so we can update the configuration
        let el = document.createElement("div");
        el.innerHTML = elTarget.value;

        // Get the configuration element and update it
        let cfg = el.querySelector("#" + this.props.cfgElementId) as HTMLDivElement;
        cfg ? cfg.innerText = JSON.stringify(wpCfg) : null;

        // Update the value
        elTarget.value = el.innerHTML;
    }
}