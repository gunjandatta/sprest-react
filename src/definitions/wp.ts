import { IWebPart, IWebPartCfg } from "gd-sp-webpart";

/**
 * Fabric Web Part Information
 */
export interface IFabricWebPartInfo {
    cfg?: IWebPartCfg;
}

/**
 * Fabric Web Part Properties
 */
export interface IFabricWebPartProps {
    cfgElementId?: string;
    displayElement?: React.ComponentClass<any>;
    editElement?: React.ComponentClass<any>;
    helpTitle?: string;
    helpUrl?: string;
    onPostRender?: (targetInfo?: IWebPart) => void;
    onRenderDisplayElement?: (targetInfo: IWebPart) => any;
    onRenderEditElement?: (targetInfo: IWebPart) => any;
    targetElementId: string;
}
