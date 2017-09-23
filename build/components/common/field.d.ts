/// <reference types="react" />
import { IBaseFieldInfo, IBaseFieldProps } from "../../definitions";
import { Fields } from "..";
/**
 * Field
 */
export declare class Field extends Fields.BaseField {
    private _field;
    /**
     * Constructor
     */
    constructor(props: IBaseFieldProps);
    readonly Info: IBaseFieldInfo;
    readonly Value: any;
    renderField: () => JSX.Element;
}
