/// <reference types="react" />
import * as React from "react";
import { IItemFormProps, IItemFormState } from "../definitions";
/**
 * Item Form WebPart
 */
export declare class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    private _list;
    /**
     * Constructor
     */
    constructor(props: IItemFormProps);
    render(): JSX.Element;
    save<IItem = any>(): PromiseLike<IItem>;
    /**
     * Methods
     */
    private getItem;
    private getList;
    private getValues<IItem>();
    private renderFields;
    private saveAttachments;
    private saveItem;
}
