import { IPivotItemProps, PivotLinkFormat, PivotLinkSize } from "@fluentui/react/lib/Pivot";
import { IRenderFunction } from "@fluentui/react/lib/Utilities";
import { Component } from "react";
import { IWebPartCfgProps } from ".";

/**
 * WebPart Tabs
 */
export class WebPartTabs<Props extends IWebPartTabsProps = IWebPartTabsProps, State extends IWebPartTabsState = IWebPartTabsState> extends Component<Props, State> { }

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

