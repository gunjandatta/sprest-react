import { Types } from "gd-sprest";
import { IAttachmentFile } from "../../fields/types";

/**
 * Field Information
 */
export interface IItemFormField {
    /** The form control mode. */
    controlMode?: number;

    /** The field name. */
    name: string;

    /** The on change event */
    onChange?: (value: any) => void;

    /** The on render method */
    onRender?: (fieldInfo: Types.Helper.IListFormFieldInfo) => JSX.Element;
}

/**
 * Properties
 */
export interface IItemFormProps {
    /** If defined, the form data will be cached to the session storage. */
    cacheKey?: string;

    /** The class name to apply to the item form element. */
    className?: string;

    /** The form control mode. */
    controlMode?: number;

    /** The form fields to exclude from the form. */
    excludeFields?: Array<string>;

    /** The field class name to apply to the field elements. */
    fieldClassName?: string;

    /** The form fields. */
    fields?: Array<IItemFormField>;

    /** The existing item. */
    item?: any;

    /** The item id */
    itemId?: number;

    /** The list display name. */
    listName: string;

    /** The attachment added event. */
    onAttachmentAdded?: (file: IAttachmentFile) => void;

    /** The click event for the attachment. */
    onAttachmentClick?: (file: IAttachmentFile, controlMode: number) => void;

    /** The render event for the attachment. */
    onAttachmentRender?: (file: IAttachmentFile, controlMode: number) => any;

    /** The field render event */
    onFieldRender?: (fieldInfo: Types.Helper.IListFormFieldInfo, field: JSX.Element) => any;

    /** The on form render event. */
    onRender?: (controlMode: number) => any;

    /** The on form render attachments event. */
    onRenderAttachments?: (files: Array<IAttachmentFile>, controlMode: number) => any;

    /** The item query, used when refreshing the item after a save. */
    query?: Types.SP.ODataQuery;

    /** The max number of items to return for the lookup data queries. (Default: 500) */
    queryTop?: number;

    /** The form fields to make read-only in the form. */
    readOnlyFields?: Array<string>;

    /** Flag to display the attachments. */
    showAttachments?: boolean;

    /** The relative web url containing the list. */
    webUrl?: string;
}

/**
 * State
 */
export interface IItemFormState {
    /** The form information */
    formInfo?: Types.Helper.IListFormResult;

    /** The item id. */
    itemId?: number;

    /** The form fields. */
    fields?: Array<IItemFormField>;

    /** The refresh flag. */
    refreshFl?: boolean;

    /** The save flag. */
    saveFl?: boolean;

    /** The update flag. */
    updateFl?: boolean;
}