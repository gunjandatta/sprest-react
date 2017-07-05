/// <reference types="react" />
import * as React from "react";
import { IWebPartCfg, IWebPartConfigurationProps, IWebPartConfigurationState } from "../definitions";
/**
 * Web Part Configuration
 */
export declare abstract class WebPartConfigurationPanel<Props extends IWebPartConfigurationProps, State extends IWebPartConfigurationState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Required Methods
     */
    abstract onRenderContents(cfg: IWebPartCfg): React.Component<any>;
    /**
     * Public Interface
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    protected saveConfiguration: (wpCfg: object) => void;
    private show;
}
