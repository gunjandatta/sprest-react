/// <reference types="react" />
import { WebPartConfigurationPanel, IWebPartCfg, IWebPartConfigurationProps, IWebPartConfigurationState } from "../src";
import { IDropdownOption } from "office-ui-fabric-react";
/**
 * Demo Configuration
 */
export interface IDemoCfg extends IWebPartCfg {
    ListName: string;
    WebUrl: string;
}
/**
 * Properties
 */
export interface Props extends IWebPartConfigurationProps {
    cfg: IDemoCfg;
}
/**
 * State
 */
export interface State extends IWebPartConfigurationState {
    cfg: IDemoCfg;
    lists: Array<IDropdownOption>;
}
/**
 * WebPart Configuration
 */
export declare class WebPartCfg extends WebPartConfigurationPanel<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Methods
     */
    private loadLists;
    onRenderContents: (cfg: IDemoCfg) => JSX.Element;
    private onRefresh;
    private onSave;
    private updateListName;
}
