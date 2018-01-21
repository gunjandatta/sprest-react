import { BaseField, IFieldNumberProps, IFieldNumberState } from ".";
/**
 * Number Field Types
 */
export declare enum FieldNumberTypes {
    Decimal = 0,
    Integer = 1,
    Percentage = 2,
}
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
}
