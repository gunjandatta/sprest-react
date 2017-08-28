/// <reference types="react" />
import * as React from "react";
import { PrimaryButton, TextField } from "office-ui-fabric-react";
import { IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from "../../definitions";
/**
 * Web Part Configuration
 */
export declare abstract class WebPartConfigurationPanel<Props extends IWebPartCfgProps = IWebPartCfgProps, State extends IWebPartCfgState = IWebPartCfgState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Global Variables
     */
    private _errorMessage;
    private _panel;
    protected _refreshButton: PrimaryButton;
    protected _saveButton: PrimaryButton;
    protected _webUrl: TextField;
    /**
     * Required Methods
     */
    abstract onRenderContents: (cfg: IWebPartCfg) => any;
    /**
     * Events
     */
    onRenderFooter: () => void;
    onRenderHeader: () => void;
    render(): JSX.Element;
    /**
     * Methods
     */
    protected saveConfiguration: (wpCfg: any) => void;
    private show;
    private updateWebPartContentElements;
    private updateConfigurationInElement;
}
