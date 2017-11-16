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
    controlMode?: number | Types.SPTypes.ControlMode;
    /** The list name. */
    listName: string;
    /** The existing attachment files. */
    files?: any | Types.ComplexTypes.FieldAttachmentFiles;
    /** The attachment file added event. */
    onFileAdded?: (file: IAttachmentFile) => any;
    /** The attachment file render event. */
    onFileRender?: (file: IAttachmentFile) => any;
    /** The click event for the file link. */
    onLinkClick?: (file: IAttachmentFile) => void;
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
    /**
     * Displays the file upload dialog.
     */
    showFileDialog: () => void;
}
