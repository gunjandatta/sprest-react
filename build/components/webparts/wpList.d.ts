/// <reference types="react" />
import * as React from "react";
import { Promise } from "es6-promise";
import { Types } from "gd-sprest";
import { IWebPartListItem, IWebPartListProps, IWebPartListState } from "../../definitions";
/**
 * WebPart List
 */
export declare class WebPartList<Props extends IWebPartListProps = IWebPartListProps, State extends IWebPartListState = IWebPartListState> extends React.Component<Props, State> {
    /**
     * Global Variables
     */
    protected _caml: string;
    protected _query: Types.ODataQuery;
    /**
     * Constructor
     */
    constructor(props: Props);
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
    private loadCAML;
    private loadODATA;
    private onLoadData;
    protected refreshItem: (itemId: string | number) => Promise<{}>;
}
