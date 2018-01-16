import { IFieldBoolean, IFieldBooleanProps, IFieldBooleanState } from "../definitions";
import { BaseField } from ".";
/**
 * Boolean field
 */
export declare class FieldBoolean extends BaseField<IFieldBooleanProps, IFieldBooleanState> implements IFieldBoolean {
    /**
     * Render the field
     */
    renderField: () => any;
    /**
     * Methods
     */
    /**
     * Method to get the value
     */
    private getValue;
    /**
     * The on change event
     */
    private onChange;
}
