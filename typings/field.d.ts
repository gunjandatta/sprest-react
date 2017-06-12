/**
 * Field Information
 */
export interface IFieldInfo {
    /** The default value. */
    defaultValue?: any;

    /** The error message to display. This requires the "required" property to be set to true. */
    errorMessage?: string;

    /** The list name. */
    listName: string;

    /** The internal name of the field. */
    name: string;

    /** True indicates a required field type. */
    required?: boolean;

    /** The display name of the field. */
    title?: string;

    /** The relative web url containing the list. */
    webUrl?: string;
}