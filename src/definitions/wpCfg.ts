import { Types } from "gd-sprest";
import { Panel } from "..";

/**
 * WebPart Configuration Panel
 */
export interface IWebPartCfgPanel {
    _errorMessage: HTMLDivElement;
    _panel: Panel;

    onRenderContents: (cfg: Types.Helper.WebPart.IWebPartCfg) => JSX.Element | Array<JSX.Element>;
    onRenderFooter: () => JSX.Element | Array<JSX.Element>;
    onRenderHeader: () => JSX.Element | Array<JSX.Element>;
    saveConfiguration: (wpCfg: Types.Helper.WebPart.IWebPartCfg) => void;
}

/**
 * WebPart Configuration Properties
 */
export interface IWebPartCfgProps {
    cfg?: Types.Helper.WebPart.IWebPartCfg;
    cfgElementId?: string;
}

/**
 * WebPart Configuration State
 */
export interface IWebPartCfgState {
    cfg?: Types.Helper.WebPart.IWebPartCfg;
}
