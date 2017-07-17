/// <reference types="react" />
import * as React from "react";
import { ITestItem } from "./data";
/**
 * Properties
 */
export interface Props {
    item?: ITestItem;
    listName: string;
}
/**
 * Item Form
 */
export declare class ItemForm extends React.Component<Props, null> {
    /**
     * Public Interface
     */
    getValues: () => ITestItem;
    render(): JSX.Element;
    saveAttachments: (itemId: number) => PromiseLike<any>;
    /**
     * Methods
     */
    private renderForm;
}
