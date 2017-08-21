import { Types } from "gd-sprest";

/**
 * Base Field Information
 */
export interface IBaseFieldInfo {
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

    /** The field type. */
    type?: number;

    /** The relative web url containing the list. */
    webUrl?: string;
}

/**
 * Base Field Properties
 */
export interface IBaseFieldProps extends IBaseFieldInfo {
    /** The field control mode. */
    controlMode?: number | Types.SPTypes.ControlMode;

    /** The on change event */
    onChange?: (value: any) => void;

    /** The on render method */
    onRender?: (fieldInfo: IBaseFieldInfo) => void;

    /** Flag to show a loading indicator. The default value is true. */
    showLoadingFl?: boolean;
}

/**
 * BaseField State
 */
export interface IBaseFieldState {
    /** The field control mode. */
    controlMode?: number | Types.SPTypes.ControlMode;

    /** The field information. */
    fieldInfo: IBaseFieldInfo;

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

export interface IBaseField<Props extends IBaseFieldProps, State extends IBaseFieldState> {
    /**
     * The render field event.
     */
    renderField(): any;

    /**
     * Method to get the field value.
     */
    getFieldValue: () => any;

    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IField, state: IBaseFieldState) => void;

    /**
     * Event triggered after loading the field information.
     */
    onFieldLoaded: () => void;

    /**
     * Method to update the value
     */
    updateValue: (value: any) => void;
}