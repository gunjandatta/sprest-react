import * as React from "react";
import { Pivot, PivotItem, PivotLinkFormat } from "office-ui-fabric-react";
import { IWebPartTabsProps, IWebPartTabsState } from "../../definitions";

/**
 * WebPart Tabs
 */
export class WebPartTabs<Props extends IWebPartTabsProps = IWebPartTabsProps, State extends IWebPartTabsState = IWebPartTabsState> extends React.Component<Props, State> {
    /**
     * Flag to determine if the webpart is inside a content zone.
     */
    private _isContentZone: boolean = false;

    /**
     * Constructor
     * @param props - The webpart tabs properties.
     */
    constructor(props: Props) {
        super(props);

        // Get the webparts
        let webparts = this.getWebParts();

        // Parse the webparts
        let selectedTabId = 0;
        for (selectedTabId = 0; selectedTabId < webparts.length; selectedTabId++) {
            // Break if this webpart has a title
            if (webparts[selectedTabId].querySelector(".ms-webpart-titleText")) { break; }
        }

        // Set the state
        this.state = { selectedTabId, webparts } as State;
    }

    /**
     * Events
     */

    /**
     * Component initialized event
     */
    componentDidMount() {
        // Update the webpart visibility
        this.updateWebPartVisibility();
    }

    /**
     * Component updated event
     */
    componentDidUpdate() {
        // Update the webpart visibility
        this.updateWebPartVisibility();
    }

    /**
     * The render footer event
     */
    onRenderFooter = (): JSX.Element => { return null; }

    /**
     * The render header event
     */
    onRenderHeader = (): JSX.Element => { return null; }

    /**
     * Method to render the component
     */
    render() {
        return (
            <div className={this.props.className}>
                {this.onRenderHeader()}
                <Pivot onLinkClick={this.updateSelectedTab} linkFormat={this.props.linkFormat} linkSize={this.props.linkSize}>
                    {this.renderTabs()}
                </Pivot>
                {this.onRenderFooter()}
            </div>
        );
    }

    /**
     * Methods
     */

    /**
     * Methods to get the webparts
     */
    private getWebParts = () => {
        let wps = [];

        // Get the webpart element and zone
        let elWebPart = document.querySelector("div[webpartid='" + this.props.cfg.WebPartId + "']") as HTMLDivElement;
        let elWebPartZone = elWebPart ? this.getWebPartZone(elWebPart) : null;
        if (elWebPart && elWebPartZone) {
            // Parse the webparts in this zone
            let webparts = elWebPartZone.querySelectorAll(".ms-webpartzone-cell[id^='MSOZoneCell_WebPart']");
            for (let i = 0; i < webparts.length; i++) {
                let webpart = webparts[i];

                // Skip this webpart
                if (webpart.querySelector("div[webpartid='" + this.props.cfg.WebPartId + "']")) { continue; }

                // Skip hidden webparts
                if (webpart.querySelector(".ms-hide")) { continue; }

                // See if this is within a content zone
                if (this._isContentZone) {
                    // Get the parent webpart box
                    while (webpart.parentNode) {
                        // See if this is the webpart box element
                        if (webpart.className.indexOf("ms-rte-wpbox") >= 0) {
                            // Add this webpart and break from the loop
                            wps.push(webpart);
                            break;
                        }

                        // Check the parent element
                        webpart = webpart.parentNode as HTMLDivElement;
                    }
                } else {
                    // Add the webpart
                    wps.push(webpart);
                }
            }
        }

        // Return the webparts
        return wps;
    }

    /**
     * Method to get the webpart zone
     */
    private getWebPartZone = (el: HTMLDivElement) => {
        // Ensure the element exists
        if (el) {
            // See if this is the webpart zone element
            if (el.className.indexOf("ms-webpart-zone") >= 0) {
                // Return it
                return el;
            }

            // See if this is the inner page zone
            if (el.className.indexOf("ms-rte-layoutszone-inner") >= 0) {
                // Set the flag
                this._isContentZone = true;

                // Return it
                return el;
            }

            // Check the parent element
            return this.getWebPartZone(el.parentNode as HTMLDivElement);
        }

        // Return nothing
        return null;
    }

    /**
     * Method to render the tabs
     */
    private renderTabs = () => {
        let tabs = [];

        // Parse the webparts
        for (let i = 0; i < this.state.webparts.length; i++) {
            let webpart = this.state.webparts[i];

            // Get the webpart title
            let wpTitle: string | HTMLDivElement = webpart.querySelector(".ms-webpart-titleText") as HTMLDivElement;
            wpTitle = wpTitle ? wpTitle.innerText : null;
            if (wpTitle) {
                // Add the tab
                tabs.push(
                    <PivotItem
                        itemID={i.toString()}
                        linkText={wpTitle}
                        key={i}
                        onRenderItemLink={this.props.onRenderTab}
                    />
                )

                // Get the webpart title element
                let elWebPartTitle = webpart.querySelector(".ms-webpart-chrome-title") as HTMLDivElement;
                if (elWebPartTitle) {
                    // Hide the title element
                    elWebPartTitle.style.display = "none";
                }
            }
        }

        // Return the tabs
        return tabs;
    }

    /**
     * Method to update the
     * @param item - The pivot item.
     * @param ev - The tab click event.
     */
    private updateSelectedTab = (item: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        // Update the state
        this.setState({
            selectedTabId: parseInt(item.props.itemID)
        });
    }

    /**
     * Method to update the webpart visibility
     */
    private updateWebPartVisibility = () => {
        // Parse the webparts
        for (let i = 0; i < this.state.webparts.length; i++) {
            // Get the webpart
            let webpart = document.querySelector("#" + this.state.webparts[i].id) as HTMLDivElement;
            if (webpart) {
                // Update the visibility
                webpart.style.display = i == this.state.selectedTabId ? "" : "none";
            }
        }
    }
}