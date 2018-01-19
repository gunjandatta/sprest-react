/// <reference types="react" />
import { Types } from "gd-sprest";
import { IBaseFieldProps } from "../definitions";
import { Fields } from "..";
/**
 * Field
 * This is a generic field component.
 */
export declare class Field extends Fields.BaseField {
    private _field;
    /**
     * Constructor
     * @param props - The field properties.
     */
    constructor(props: IBaseFieldProps);
    /**
     * Get the field information
     */
    readonly Info: Types.Helper.ListForm.IListFormFieldInfo;
    /**
     * Get the field value
     */
    readonly Value: any;
    /**
     * Get the field
     */
    getField<T = Fields.BaseField>(): T;
    /**
     * Method to render the field
     */
    renderField: () => JSX.Element;
}
