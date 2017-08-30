/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IWebPartSearchItem, IWebPartSearchProps, IWebPartSearchState } from "../../definitions";
/**
 * WebPart Search
 */
export declare class WebPartSearch<Props extends IWebPartSearchProps = IWebPartSearchProps, State extends IWebPartSearchState = IWebPartSearchState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Global Variables
     */
    protected _query: Types.ODataQuery;
    /**
     * Events
     */
    onRenderContainer: (items: IWebPartSearchItem[]) => JSX.Element;
    onRenderItem: (item: IWebPartSearchItem) => JSX.Element;
    render(): JSX.Element;
    /**
     * Methods
     */
    private generateMapper;
    private getItems;
    private load;
    private onResolveSuggestions;
    private updateSelectedTags;
}
