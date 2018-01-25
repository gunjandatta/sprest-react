import { Types } from "gd-sprest";

/**
 * Fabric Web Part Information
 */
export interface IFabricWebPartInfo {
    cfg?: Types.Helper.IWebPartCfg;
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
    onPostRender?: (targetInfo?: Types.Helper.IWebPartInfo) => void;
    onRenderDisplayElement?: (targetInfo: Types.Helper.IWebPartInfo) => any;
    onRenderEditElement?: (targetInfo: Types.Helper.IWebPartInfo) => any;
    targetElementId: string;
}
