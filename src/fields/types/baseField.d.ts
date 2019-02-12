import { Helper, Types } from "gd-sprest";
import { Component } from "react";

/**
 * Base Field Properties
 */
export interface IBaseFieldProps {
    /** The class name. */
    className?: string;

    /** The field control mode. */
    controlMode?: number;

    /** The field information. */
    fieldInfo?: Helper.IListFormFieldInfo;

    /** The default field value. */
    defaultValue?: any;

    /** The field. */
    field: Types.SP.Field | Types.SP.IFieldQuery;

    /** The list name containing the field. */
    listName: string;

    /** The field name. */
    name: string;

    /** The on change event */
    onChange?: (value: any) => void;

    /** The field render event. */
    onFieldRender?: (fieldInfo: Helper.IListFormFieldInfo, field: JSX.Element) => any;

    /** The render event of the field component */
    onRender?: (fieldInfo: Helper.IListFormFieldInfo) => any;

    /** The max number of items to return for the lookup data queries. (Default: 500) */
    queryTop?: number;

    /** Flag to show a loading indicator. The default value is true. */
    showLoadingFl?: boolean;

    /** The relative url of the web containing the field. */
    webUrl?: string;
}

/**
 * BaseField State
 */
export interface IBaseFieldState {
    /** The field control mode. */
    controlMode?: number;

    /** The error message. */
    errorMessage?: string;

    /** The field information. */
    fieldInfo: Helper.IListFormFieldInfo;

    /** Flag to determine if the field is initialized. */
    initFl?: boolean;

    /** The change event */
    onChange?: (value: any) => void;

    /** The current field value. */
    value?: any;

    /** Flag to show the error message. */
    showErrorMessage?: boolean;
}

/**
 * Base Field
 */
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
     * Event triggered after loading the field information.
     */
    onFieldLoaded?: (info: any, state: IBaseFieldState) => void;

    /**
     * Method to update the value
     */
    updateValue: (value: any) => void;
}

/**
 * Base Field
 */
export abstract class BaseField<Props extends IBaseFieldProps = IBaseFieldProps, State extends IBaseFieldState = IBaseFieldState> extends Component<Props, State> implements IBaseField<Props, State> {
    /**
     * The render field event.
     */
    renderField: () => JSX.Element;

    /**
     * Method to get the field value.
     */
    getFieldValue: () => any;

    /**
     * Event triggered after loading the field information.
     */
    onFieldLoaded?: (info: any, state: IBaseFieldState) => void;

    /**
     * Method to update the value
     */
    updateValue: (value: any) => void;
}