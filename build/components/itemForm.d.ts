/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IItemFormProps, IItemFormState } from "../definitions";
import { Fields } from ".";
/**
 * Item Form WebPart
 */
export declare class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    /**
     * Reference to the attachments field
     */
    private _attachmentField;
    /**
     * Reference to the form fields
     */
    private _fields;
    /**
     * Reference to the list
     */
    private _list;
    /**
     * Get the attachment field
     */
    /**
     * Set the attachment field
     */
    AttachmentField: Fields.FieldAttachments;
    /**
     * Get the form fields
     */
    /**
     * Set the form fields
     */
    FormFields: {
        [key: string]: Fields.Field;
    };
    /**
     * Get the list
     */
    readonly List: Types.IListResult;
    /**
     * Constructor
     */
    constructor(props: IItemFormProps);
    /**
     * Render the component
     */
    render(): JSX.Element;
    /**
     * Method to save the item form
     */
    save<IItem = any>(): PromiseLike<IItem>;
    /**
     * Methods
     */
    /**
     * Method to get the item
     * @param itemId - The item id.
     */
    private getItem;
    /**
     * Method to get the list
     */
    private getList;
    /**
     * Method to get the form values
     */
    private getValues<IItem>();
    /**
     * Method to load the fields
     */
    private loadDefaultFields;
    /**
     * Method to render the fields
     */
    private renderFields;
    /**
     * Method to save the item attachments
     * @param itemId - The item id.
     */
    private saveAttachments;
    /**
     * Method to save the item
     */
    private saveItem;
}