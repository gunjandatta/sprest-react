/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IItemFormProps, IItemFormState } from "../../definitions";
import { Field } from "..";
/**
 * Item Form WebPart
 */
export declare class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    protected _attachmentField: any;
    protected _fields: Array<Field>;
    protected _list: Types.IListResult;
    /**
     * Constructor
     */
    constructor(props: IItemFormProps);
    render(): any;
    save<IItem = any>(): PromiseLike<IItem>;
    /**
     * Methods
     */
    private getItem;
    private getList;
    private getValues<IItem>();
    private loadDefaultFields;
    private renderFields;
    private saveAttachments;
    private saveItem;
}
