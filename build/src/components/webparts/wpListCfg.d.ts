/// <reference types="react" />
import { IDropdownOption } from "office-ui-fabric-react";
import { IWebPartCfg, IWebPartConfigurationProps, IWebPartConfigurationState } from "../..";
import { WebPartConfigurationPanel } from ".";
/**
 * List Configuration
 */
export interface IWebPartListCfg extends IWebPartCfg {
    ListName: string;
    WebUrl: string;
}
/**
 * Properties
 */
export interface IWebPartListCfgProps extends IWebPartConfigurationProps {
    cfg: IWebPartListCfg;
}
/**
 * State
 */
export interface IWebPartListCfgState extends IWebPartConfigurationState {
    cfg: IWebPartListCfg;
    lists: Array<IDropdownOption>;
}
/**
 * WebPart List Configuration
 */
export declare class WebPartListCfg extends WebPartConfigurationPanel<IWebPartListCfgProps, IWebPartListCfgState> {
    private _webUrl;
    /**
     * Constructor
     */
    constructor(props: IWebPartListCfgProps);
    /**
     * Methods
     */
    private loadLists;
    onRenderContents: (cfg: IWebPartListCfg) => JSX.Element;
    private onRefresh;
    private onSave;
    private updateListName;
}
