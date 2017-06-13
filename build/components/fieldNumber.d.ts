/// <reference types="react" />
import { IFieldNumberProps, IFieldNumberState } from "../definitions";
import { Field } from "../common";
/**
 * Number Field
 */
export declare class FieldNumber extends Field<IFieldNumberProps, IFieldNumberState> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Methods
     */
    private getValue;
    private onChange;
}
