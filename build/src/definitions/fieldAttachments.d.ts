/// <reference types="react" />
import { Types } from "gd-sprest";
/**
 * Attachment File
 */
export interface IAttachmentFile {
    data?: any;
    deleteFl?: boolean;
    existsFl?: boolean;
    ext: string;
    name: string;
    url?: string;
}
/**
 * Attachments Field Properties
 */
export interface IFieldAttachmentsProps {
    /** The class name. */
    className?: string;
    /** The field control mode. */
    controlMode?: number;
    /** The item id. */
    itemId?: number;
    /** The list name. */
    listName: string;
    /** The existing attachment files. */
    files?: any | Types.IAttachmentFiles;
    /** The attachments render event. */
    onAttachmentsRender?: (attachments: JSX.Element) => any;
    /** The attachment file added event. */
    onFileAdded?: (file: IAttachmentFile) => any;
    /** The click event for the file link. */
    onFileClick?: (file: IAttachmentFile) => void;
    /** The attachment file render event. */
    onFileRender?: (file: IAttachmentFile) => any;
    /** The on form render event. */
    onRender?: (files: Array<IAttachmentFile>) => any;
    /** The relative web url containing the list. */
    webUrl?: string;
}
/**
 * Attachments Field State
 */
export interface IFieldAttachmentsState {
    /** Error Message */
    errorMessage?: string;
    /** The file attachments */
    files: Array<IAttachmentFile>;
    /** The list information */
    listInfo: Types.Helper.ListForm.IListFormProps;
    /** Loading Flag */
    loadingFl?: boolean;
}
/**
 * Attachments Field
 */
export interface IFieldAttachment {
    /**
     * Saves the item attachments.
     * @param itemId - The item id.
    */
    save: (itemId: number) => PromiseLike<any>;
    /**
     * Displays the file upload dialog.
     */
    showFileDialog: () => void;
}
