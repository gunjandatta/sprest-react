/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IItemFormProps, IItemFormState } from "../definitions";
import { Fields } from "..";
import { Field } from ".";
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
    /** The list form */
    private _listForm;
    /**
     * Reference to the form fields
     */
    private _formFields;
    /**
     * Reference to the query used to refresh the item
     */
    private _query;
    /**
     * Get the attachment field
     */
    /**
     * Set the attachment field
     */
    AttachmentField: Fields.FieldAttachments;
    /**
     * Get the control mode
     */
    readonly ControlMode: number;
    /**
     * Get the form fields
     */
    readonly FormFields: {
        [key: string]: Field;
    };
    /**
     * The list item
     */
    readonly Item: Types.IListItemQueryResult;
    /**
     * Get the list
     */
    readonly List: Types.IListResult;
    /**
     * Get the item query
     */
    /**
     * Set the item query
     */
    ItemQuery: Types.ODataQuery;
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
