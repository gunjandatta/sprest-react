/// <reference types="react" />
import { BaseField } from "../../common";
import { IFieldTextProps, IFieldTextState } from "../../definitions";
/**
 * Text Field
 */
export declare class FieldText extends BaseField<IFieldTextProps, IFieldTextState> {
    /**
     * Public Interface
     */
    renderField(): void | JSX.Element;
    /**
     * Events
     */
    onFieldInit: (field: any, state: IFieldTextState) => void;
    private onChange;
}
