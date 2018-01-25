/// <reference types="react" />
import { Types } from "gd-sprest";
import { Panel } from "../components";
/**
 * WebPart Configuration Panel
 */
export interface IWebPartCfgPanel {
    _errorMessage: HTMLDivElement;
    _panel: Panel;
    onRenderContents: (cfg: Types.Helper.IWebPartCfg) => JSX.Element | Array<JSX.Element>;
    onRenderFooter: () => JSX.Element | Array<JSX.Element>;
    onRenderHeader: () => JSX.Element | Array<JSX.Element>;
    saveConfiguration: (wpCfg: Types.Helper.IWebPartCfg) => void;
}
/**
 * WebPart Configuration Properties
 */
export interface IWebPartCfgProps {
    cfg?: Types.Helper.IWebPartCfg;
    cfgElementId?: string;
}
/**
 * WebPart Configuration State
 */
export interface IWebPartCfgState {
    cfg?: Types.Helper.IWebPartCfg;
}
