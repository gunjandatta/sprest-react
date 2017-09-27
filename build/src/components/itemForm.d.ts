/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IItemFormProps, IItemFormState } from "../definitions";
import { Fields } from ".";
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
    FormFields: {
        [key: string]: Fields.Field;
    };
    readonly List: Types.IListResult;
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
    private loadDefaultFields;
    private renderFields;
    private saveAttachments;
    private saveItem;
}
