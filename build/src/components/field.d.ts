/// <reference types="react" />
import { IBaseFieldInfo, IBaseFieldProps } from "../definitions";
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
    readonly Info: IBaseFieldInfo;
    /**
     * Get the field value
     */
    readonly Value: any;
    /**
     * Method to render the field
     */
    renderField: () => JSX.Element;
}
