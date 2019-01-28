import { Helper } from "gd-sprest";

/**
 * Fabric Web Part
 */
export const FabricWebPart: (props: IFabricWebPartProps) => {};

/**
 * Fabric Web Part Information
 */
export interface IFabricWebPartInfo {
    cfg?: Helper.IWebPartCfg;
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
    onPostRender?: (targetInfo?: Helper.IWebPartInfo) => void;
    onRenderDisplayElement?: (targetInfo: Helper.IWebPartInfo) => any;
    onRenderEditElement?: (targetInfo: Helper.IWebPartInfo) => any;
    targetElementId: string;
}
