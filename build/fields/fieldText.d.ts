import { IFieldTextProps, IFieldTextState } from "./types";
import { BaseField } from ".";
/**
 * Text Field
 */
export declare class FieldText extends BaseField<IFieldTextProps, IFieldTextState> {
    /**
     * Render the component
     */
    renderField: () => any;
    /**
     * Methods
     */
    /**
     * The on change event
     * @param value - The field value.
     */
    private onChange;
}
