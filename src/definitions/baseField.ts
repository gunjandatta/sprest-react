import { Types } from "gd-sprest";

/**
 * Base Field Information
 */
export interface IBaseFieldInfo {
    /** The default value. */
    defaultValue?: any;

    /** The error message to display. This requires the "required" property to be set to true. */
    errorMessage?: string;

    /** The list item. */
    item?: object;

    /** The list name. */
    listName: string;

    /** The internal name of the field. */
    name: string;

    /** Flag indicating if the field is read-only. */
    readOnly?: boolean;

    /** True indicates a required field type. */
    required?: boolean;

    /** The display name of the field. */
    title?: string;

    /** The field type. */
    type?: number;

    /** The field type as a string. */
    typeAsString?: string;

    /** The relative web url containing the list. */
    webUrl?: string;
}

/**
 * Base Field Properties
 */
export interface IBaseFieldProps extends IBaseFieldInfo {
    /** The class name. */
    className?: string;

    /** The field control mode. */
    controlMode?: number | Types.SPTypes.ControlMode;

    /** The list field. */
    field?: Types.IFieldResult | Types.IFieldQueryResult;

    /** The on change event */
    onChange?: (value: any) => void;

    /** The on render method */
    onRender?: (fieldInfo: IBaseFieldInfo) => JSX.Element;

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
    renderField: () => JSX.Element;

    /**
     * Method to get the field value.
     */
    getFieldValue: () => any;

    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit?: (field: Types.IField, state: IBaseFieldState) => void;

    /**
     * Event triggered after loading the field information.
     */
    onFieldLoaded?: () => void;

    /**
     * Method to update the value
     */
    updateValue: (value: any) => void;
}