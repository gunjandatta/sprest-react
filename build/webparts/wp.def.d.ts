/// <reference types="react" />
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
    onPostRender?: (targetInfo?: Types.Helper.WebPart.IWebPartInfo) => void;
    onRenderDisplayElement?: (targetInfo: Types.Helper.WebPart.IWebPartInfo) => any;
    onRenderEditElement?: (targetInfo: Types.Helper.WebPart.IWebPartInfo) => any;
    targetElementId: string;
}
