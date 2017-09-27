/// <reference types="react" />
import * as React from "react";
import { IWebPartCfgPanel, IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from "../../definitions";
import { Panel } from '..';
/**
 * Web Part Configuration Panel
 */
export declare abstract class WebPartCfgPanel<Props extends IWebPartCfgProps = IWebPartCfgProps, State extends IWebPartCfgState = IWebPartCfgState> extends React.Component<Props, State> implements IWebPartCfgPanel {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Global Variables
     */
    /**
     * Reference to the error message.
     */
    _errorMessage: HTMLDivElement;
    /**
     * Reference to the panel.
     */
    _panel: Panel;
    /**
     * Required Methods
     */
    abstract onRenderContents: (cfg: IWebPartCfg) => any;
    /**
     * Events
     */
    /**
     * The render footer event
     */
    onRenderFooter: () => any;
    /**
     * The render header event
     */
    onRenderHeader: () => any;
    /**
     * Method to render the panel
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to save the webpart configuration
     * @param wpCfg - The webpart configuration.
     */
    saveConfiguration: (wpCfg: any) => void;
    /**
     * Method to show the panel
     * @param ev - The button event.
     */
    private show;
    /**
     * Method to update the webpart content elements
     * @param wpId - The webpart id.
     * @param wpCfg - The webpart configuration.
     */
    private updateWebPartContentElements;
    /**
     * Method to update the configuration element
     * @param elTarget - The target element.
     * @param wpCfg - The webpart configuration.
     */
    private updateConfigurationInElement;
}
