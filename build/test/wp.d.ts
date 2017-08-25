/// <reference types="react" />
import * as React from "react";
import { IWebPartListCfg } from "../src";
import { DataSource, ITestItem } from "./data";
/**
 * Properties
 */
export interface Props {
    cfg: IWebPartListCfg;
}
/**
 * State
 */
export interface State {
    datasource: DataSource;
    item: ITestItem;
    items: Array<ITestItem>;
}
/**
 * Demo WebPart
 */
export declare class DemoWebpart extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Public Interface
     */
    render(): JSX.Element;
    /**
     * Events
     */
    private onClick;
    /**
     * Methods
     */
    private renderFooter;
    private save;
    private viewItem;
}
