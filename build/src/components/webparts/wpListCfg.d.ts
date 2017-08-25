/// <reference types="react" />
import { IDropdownOption } from "office-ui-fabric-react";
import { IWebPartCfg, IWebPartConfigurationProps, IWebPartConfigurationState } from "../..";
import { WebPartConfigurationPanel } from ".";
/**
 * List Configuration
 */
export interface IListCfg extends IWebPartCfg {
    ListName: string;
    WebUrl: string;
}
/**
 * Properties
 */
export interface Props extends IWebPartConfigurationProps {
    cfg: IListCfg;
}
/**
 * State
 */
export interface State extends IWebPartConfigurationState {
    cfg: IListCfg;
    lists: Array<IDropdownOption>;
}
/**
 * WebPart List Configuration
 */
export declare class WebPartListCfg extends WebPartConfigurationPanel<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Methods
     */
    private loadLists;
    onRenderContents: (cfg: IListCfg) => JSX.Element;
    private onRefresh;
    private onSave;
    private updateListName;
}
