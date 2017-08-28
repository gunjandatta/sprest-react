/// <reference types="react" />
import * as React from "react";
import { IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from "../definitions";
/**
 * Web Part Configuration
 */
export declare abstract class WebPartConfigurationPanel<Props extends IWebPartCfgProps = IWebPartCfgProps, State extends IWebPartCfgState = IWebPartCfgState> extends React.Component<Props, State> {
    private _errorMessage;
    private _panel;
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Required Methods
     */
    abstract onRenderContents: (cfg: IWebPartCfg) => any;
    /**
     * Public Interface
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    protected saveConfiguration: (wpCfg: any) => void;
    private show;
    private updateWebPartContentElements;
    private updateConfigurationInElement;
}
