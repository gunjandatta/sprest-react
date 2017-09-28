/// <reference types="react" />
import { IFieldNumberProps, IFieldNumberState } from "../definitions";
import { BaseField } from ".";
/**
 * Number Field
 */
export declare class FieldNumber extends BaseField<IFieldNumberProps, IFieldNumberState> {
    /**
     * Render the component
     */
    renderField: () => JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to return the value
     */
    private getValue;
    /**
     * The on change event
     * @param value - The field value.
     */
    private onChange;
}
