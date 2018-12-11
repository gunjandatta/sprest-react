import { Types } from "gd-sprest";
import { Component } from "react";
import { IBasePanel } from "../../components/Types";

/**
 * Web Part Configuration Panel
 */
export abstract class WebPartCfgPanel<Props extends IWebPartCfgProps = IWebPartCfgProps, State extends IWebPartCfgState = IWebPartCfgState> extends Component<Props, State> implements IWebPartCfgPanel {
    _errorMessage: HTMLDivElement;
    _panel: IBasePanel;

    onRenderContents: (cfg: Types.Helper.IWebPartCfg) => JSX.Element | Array<JSX.Element>;
    onRenderFooter: () => JSX.Element | Array<JSX.Element>;
    onRenderHeader: () => JSX.Element | Array<JSX.Element>;
    saveConfiguration: (wpCfg: Types.Helper.IWebPartCfg) => void;
}

/**
 * WebPart Configuration Panel
 */
export interface IWebPartCfgPanel {
    _errorMessage: HTMLDivElement;
    _panel: IBasePanel;

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
