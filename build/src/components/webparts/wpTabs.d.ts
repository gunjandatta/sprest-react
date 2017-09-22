/// <reference types="react" />
import * as React from "react";
import { IWebPartTabsProps, IWebPartTabsState } from "../../definitions";
/**
 * WebPart Tabs
 */
export declare class WebPartTabs<Props extends IWebPartTabsProps = IWebPartTabsProps, State extends IWebPartTabsState = IWebPartTabsState> extends React.Component<Props, State> {
    private _isContentZone;
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Events
     */
    componentDidMount(): void;
    componentDidUpdate(): void;
    onRenderFooter: () => JSX.Element;
    onRenderHeader: () => JSX.Element;
    render(): JSX.Element;
    /**
     * Methods
     */
    private getWebParts;
    private getWebPartZone;
    private renderTabs;
    private updateSelectedTab;
    private updateWebPartVisibility;
}
