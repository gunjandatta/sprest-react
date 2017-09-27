/// <reference types="react" />
import * as React from "react";
import { IWebPartTabsProps, IWebPartTabsState } from "../../definitions";
/**
 * WebPart Tabs
 */
export declare class WebPartTabs<Props extends IWebPartTabsProps = IWebPartTabsProps, State extends IWebPartTabsState = IWebPartTabsState> extends React.Component<Props, State> {
    /**
     * Flag to determine if the webpart is inside a content zone.
     */
    private _isContentZone;
    /**
     * Constructor
     * @param props - The webpart tabs properties.
     */
    constructor(props: Props);
    /**
     * Events
     */
    /**
     * Component initialized event
     */
    componentDidMount(): void;
    /**
     * Component updated event
     */
    componentDidUpdate(): void;
    /**
     * The render footer event
     */
    onRenderFooter: () => JSX.Element;
    /**
     * The render header event
     */
    onRenderHeader: () => JSX.Element;
    /**
     * Method to render the component
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    /**
     * Methods to get the webparts
     */
    private getWebParts;
    /**
     * Method to get the webpart zone
     */
    private getWebPartZone;
    /**
     * Method to render the tabs
     */
    private renderTabs;
    /**
     * Method to update the
     * @param item - The pivot item.
     * @param ev - The tab click event.
     */
    private updateSelectedTab;
    /**
     * Method to update the webpart visibility
     */
    private updateWebPartVisibility;
}
