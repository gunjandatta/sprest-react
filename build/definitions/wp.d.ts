/// <reference types="react" />
/**
 * Web Part Configuration
 */
export interface IWebPartCfg {
    WebPartId?: string;
}
/**
 * Web Part Information
 */
export interface IWebPartInfo {
    cfg?: IWebPartCfg;
}
/**
 * Web Part Properties
 */
export interface IWebPartProps {
    cfgElementId?: string;
    displayElement?: React.ComponentClass<any>;
    editElement?: React.ComponentClass<any>;
    helpTitle?: string;
    helpUrl?: string;
    onPostRender?: (targetInfo?: IWebPartTargetInfo) => void;
    onRenderDisplayElement?: (targetInfo: IWebPartTargetInfo) => any;
    onRenderEditElement?: (targetInfo: IWebPartTargetInfo) => any;
    targetElementId: string;
}
/**
 * Web Part Target Information
 */
export interface IWebPartTargetInfo {
    cfg?: IWebPartCfg;
    element: HTMLElement;
}
