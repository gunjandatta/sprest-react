import { IFieldNumberProps, IFieldNumberState } from "../definitions";
import { BaseField } from ".";
/**
 * Number Field
 */
export declare class FieldNumber extends BaseField<IFieldNumberProps, IFieldNumberState> {
    /**
     * Render the component
     */
    renderField: () => any;
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
    onChange: (value: number) => void;
    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
    onFieldInit: (field: any, state: IFieldNumberState) => void;
}
