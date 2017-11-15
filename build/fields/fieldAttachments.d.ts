/// <reference types="react" />
import * as React from "react";
import { IFieldAttachment, IFieldAttachmentsProps, IFieldAttachmentsState } from "../definitions";
import "../../sass/fieldAttachments.scss";
/**
 * Attachments field
 */
export declare class FieldAttachments extends React.Component<IFieldAttachmentsProps, IFieldAttachmentsState> implements IFieldAttachment {
    private _file;
    /**
     * Constructor
     * @param props - The attachment field properties.
     */
    constructor(props: IFieldAttachmentsProps);
    /**
     * Method to render the component
     */
    render(): any;
    /**
     * Method to save the attachments to the item
     * @param itemId - The item id.
     */
    save: (itemId: number) => PromiseLike<any>;
    /**
     * Method to show the file dialog
     */
    showFileDialog: () => void;
    /**
     * Events
     */
    /**
     * Event triggered by the user selecting a file to upload
     * @param ev - The button click event.
     */
    private addAttachment;
    /**
     * The click event for the link.
     */
    private linkClick;
    /**
     * Event triggered by clicking on the attachment delete icon
     * @param ev - The button click event.
     */
    private removeAttachment;
    /**
     * Methods
     */
    /**
     * Method to delete the attachments
     */
    private deleteAttachments;
    /**
     * Method to load the files
     * @param attachments - The file attachments.
     */
    private loadFiles;
    /**
     * Method to render the attachments
     */
    private renderAttachments;
    /**
     * Method to save the attachments
     * @param itemId - The item id.
     */
    private saveAttachments;
}
