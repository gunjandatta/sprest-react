/// <reference types="react" />
import * as React from "react";
import { ITestItem } from "./data";
/**
 * Properties
 */
export interface Props {
    items: Array<ITestItem>;
    viewItem?: (item: ITestItem) => void;
}
/**
 * Test List
 */
export declare class TestList extends React.Component<Props, null> {
    /**
     * Global Variables
     */
    private _columns;
    /**
     * Public Interface
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    private renderColumn;
    private viewItem;
}
