/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IItemFormProps, IItemFormState } from "./types";
import { Fields } from "..";
/**
 * Item Form
 */
export declare class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    /**
     * Constructor
     */
    constructor(props: IItemFormProps);
    /**
     * Reference to the attachments field
     */
    private _attachmentField;
    /**
     * Reference to the form fields
     */
    private _formFields;
    /**
     * Attachments Field
     */
    readonly AttachmentsField: Fields.FieldAttachments;
    /**
     * Form Control Mode
     */
    readonly ControlMode: number;
    /**
     * Get the form information
     */
    readonly FormInfo: Types.Helper.IListFormResult;
    /**
     * Render the component
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to get the form values
     */
    getFormValues<IItem = any>(): any;
    /**
     * Method to load the list information
     */
    private loadformInfo;
    /**
     * Method to refresh the item
     */
    refresh(): void;
    /**
     * Method to refresh the item
     */
    private refreshItem;
    /**
     * Method to render the attachments field
     */
    private renderAttachmentsField;
    /**
     * Method to render the fields
     */
    private renderFields;
    /**
     * Method to save the item form
     */
    save<IItem = any>(): PromiseLike<IItem>;
    /**
     * Method to save the item attachments
     * @param itemId - The item id.
     */
    private saveAttachments;
    /**
     * Method to update the item.
     */
    updateItem<IItem = any>(fieldValues: any): PromiseLike<IItem>;
}
