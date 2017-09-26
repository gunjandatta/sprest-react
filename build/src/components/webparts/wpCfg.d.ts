/// <reference types="react" />
import * as React from "react";
import { IWebPartCfgPanel, IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from "../../definitions";
import { Panel } from '..';
/**
 * Web Part Configuration Panel
 */
export declare abstract class WebPartConfigurationPanel<Props extends IWebPartCfgProps = IWebPartCfgProps, State extends IWebPartCfgState = IWebPartCfgState> extends React.Component<Props, State> implements IWebPartCfgPanel {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Global Variables
     */
    _errorMessage: HTMLDivElement;
    _panel: Panel;
    /**
     * Required Methods
     */
    abstract onRenderContents: (cfg: IWebPartCfg) => any;
    /**
     * Events
     */
    onRenderFooter: () => any;
    onRenderHeader: () => any;
    render(): JSX.Element;
    /**
     * Methods
     */
    saveConfiguration: (wpCfg: any) => void;
    private show;
    private updateWebPartContentElements;
    private updateConfigurationInElement;
}
