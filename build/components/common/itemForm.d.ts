/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IItemFormProps, IItemFormState } from "../../definitions";
import { Field, Fields } from "..";
/**
 * Item Form WebPart
 */
export declare class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    private _attachmentField;
    private _fields;
    private _list;
    /**
     * Properties
     */
    AttachmentField: Fields.FieldAttachments;
    FormFields: Array<Field>;
    readonly List: Types.IListResult;
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
