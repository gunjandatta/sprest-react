/// <reference types="react" />
import { IFieldTextProps, IFieldTextState } from "../../definitions";
import { BaseField } from ".";
/**
 * Text Field
 */
export declare class FieldText extends BaseField<IFieldTextProps, IFieldTextState> {
    /**
     * Public Interface
     */
    renderField: () => JSX.Element;
    /**
     * Events
     */
    onFieldInit: (field: any, state: IFieldTextState) => void;
    private onChange;
}
