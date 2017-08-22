/// <reference types="react" />
import { IFieldNumberProps, IFieldNumberState } from "../../definitions";
import { BaseField } from "../../common";
/**
 * Number Field
 */
export declare class FieldNumber extends BaseField<IFieldNumberProps, IFieldNumberState> {
    /**
     * Public Interface
     */
    renderField(): void | JSX.Element;
    /**
     * Methods
     */
    private getValue;
    private onChange;
}
