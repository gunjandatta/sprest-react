import { IPivotItemProps, IRenderFunction, PivotLinkFormat, PivotLinkSize } from "office-ui-fabric-react";
import { IWebPartCfgProps } from ".";
/**
 * WebPart Tabs Props
 */
export interface IWebPartTabsProps extends IWebPartCfgProps {
    className?: string;
    linkFormat?: PivotLinkFormat;
    linkSize?: PivotLinkSize;
    onRenderTab?: IRenderFunction<IPivotItemProps>;
}
/**
 * WebPart Tabs State
 */
export interface IWebPartTabsState {
    selectedTabId: number;
    webparts: Array<HTMLDivElement>;
}
