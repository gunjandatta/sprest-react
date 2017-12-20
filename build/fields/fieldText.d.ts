import { IFieldTextProps, IFieldTextState } from "../definitions";
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
     * Events
     */
    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
    onFieldInit: (field: any, state: IFieldTextState) => void;
    /**
     * The on change event
     * @param value - The field value.
     */
    private onChange;
}
