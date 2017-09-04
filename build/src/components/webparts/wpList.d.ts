/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IWebPartListItem, IWebPartListProps, IWebPartListState } from "../../definitions";
/**
 * WebPart List
 */
export declare class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends React.Component<Props, State> {
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
    onRenderContainer: (items: IWebPartListItem[]) => JSX.Element;
    onRenderItem: (item: IWebPartListItem) => JSX.Element;
    render(): JSX.Element;
    /**
     * Methods
     */
    protected load: () => void;
}
