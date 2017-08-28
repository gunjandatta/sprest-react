import { IBaseFieldInfo } from "../../definitions";
import { Fields } from "..";
/**
 * Field
 */
export declare class Field extends Fields.BaseField {
    private _field;
    readonly Info: IBaseFieldInfo;
    readonly Value: any;
    renderField(): any;
}
