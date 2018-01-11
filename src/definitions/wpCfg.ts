import { IWebPartCfg } from "gd-sp-webpart";
import { Panel } from "..";

/**
 * WebPart Configuration Panel
 */
export interface IWebPartCfgPanel {
    _errorMessage: HTMLDivElement;
    _panel: Panel;

    onRenderContents: (cfg: IWebPartCfg) => JSX.Element | Array<JSX.Element>;
    onRenderFooter: () => JSX.Element | Array<JSX.Element>;
    onRenderHeader: () => JSX.Element | Array<JSX.Element>;
    saveConfiguration: (wpCfg: IWebPartCfg) => void;
}

/**
 * WebPart Configuration Properties
 */
export interface IWebPartCfgProps {
    cfg?: IWebPartCfg;
    cfgElementId?: string;
}

/**
 * WebPart Configuration State
 */
export interface IWebPartCfgState {
    cfg?: IWebPartCfg;
}
