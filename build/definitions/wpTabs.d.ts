import { IPivotItemProps, IRenderFunction } from "office-ui-fabric-react";
import { IWebPartCfgProps } from ".";
/**
 * WebPart Tabs Props
 */
export interface IWebPartTabsProps extends IWebPartCfgProps {
    className?: string;
    onRenderTab: IRenderFunction<IPivotItemProps>;
}
/**
 * WebPart Tabs State
 */
export interface IWebPartTabsState {
    selectedTabId: number;
    webparts: Array<HTMLDivElement>;
}
