/// <reference types="react" />
import * as React from "react";
import { DataSource, ITestItem } from "./data";
import { IDemoCfg } from "./wpCfg";
/**
 * Properties
 */
export interface Props {
    cfg: IDemoCfg;
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
