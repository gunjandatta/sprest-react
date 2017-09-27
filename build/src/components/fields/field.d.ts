/// <reference types="react" />
import { IBaseFieldInfo, IBaseFieldProps } from "../../definitions";
import { BaseField } from ".";
/**
 * Field
 */
export declare class Field extends BaseField {
    private _field;
    /**
     * Constructor
     */
    constructor(props: IBaseFieldProps);
    readonly Info: IBaseFieldInfo;
    readonly Value: any;
    renderField: () => JSX.Element;
}
