import { Types } from "gd-sprest";
/**
 * Attachment File
 */
export interface IAttachmentFile {
    data?: any;
    deleteFl?: boolean;
    existsFl?: boolean;
    name: string;
    url?: string;
}
/**
 * Attachments Field Properties
 */
export interface IFieldAttachmentsProps {
    /** The list name. */
    listName: string;
    /** The existing attachment files. */
    files?: any | Types.ComplexTypes.FieldAttachmentFiles;
    /** The relative web url containing the list. */
    webUrl?: string;
}
/**
 * Attachments Field State
 */
export interface IFieldAttachmentsState {
    /** Error Message */
    errorMessage?: string;
    /** The file attachments. */
    files: Array<IAttachmentFile>;
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
}
