/// <reference types="react" />
import { Field } from "../common";
import { IFieldTextProps, IFieldTextState } from "../definitions";
/**
 * Text Field
 */
export declare class FieldText extends Field<IFieldTextProps, IFieldTextState> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    onFieldInit: (field: any, state: IFieldTextState) => void;
    private onChange;
}
