import {Types} from "gd-sprest";

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

/**
 * Field Properties
 */
export interface IFieldProps extends IFieldInfo {
    /** Flag to show a loading indicator. The default value is true. */
    showLoadingFl?: boolean;
}

/**
 * Field State
 */
export interface IFieldState {
    /** The field information. */
    fieldInfo: IFieldInfo;

    /** Flag to determine if the field is initialized. */
    initFl?: boolean;

    /** The field label. */
    label?: string;

    /** The change event */
    onChange?: (value: any) => void;

    /** The current field value. */
    value?: any;

    /** Flag to show the error message. */
    showErrorMessage?: boolean;
}

export interface IField<Props extends IFieldProps, State extends IFieldState> {
    /**
     * The render field event.
     */
    renderField():any;

    /**
     * Method to get the field value.
     */
    getFieldValue: () => any;

    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IField, state: IFieldState) => void;

    /**
     * Event triggered after loading the field information.
     */
    onFieldLoaded: () => void;

    /**
     * Method to update the value
     */
    updateValue: (value: any) => void;
}