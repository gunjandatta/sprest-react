import { Types } from "gd-sprest";

/**
 * Fabric Web Part Information
 */
export interface IFabricWebPartInfo {
    cfg?: Types.Helper.WebPart.IWebPartCfg;
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
    onPostRender?: (targetInfo?: Types.Helper.WebPart.IWebPart) => void;
    onRenderDisplayElement?: (targetInfo: Types.Helper.WebPart.IWebPart) => any;
    onRenderEditElement?: (targetInfo: Types.Helper.WebPart.IWebPart) => any;
    targetElementId: string;
}
