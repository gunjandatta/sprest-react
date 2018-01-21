import { IDropdownOption } from "office-ui-fabric-react";
import { BaseField, IFieldLookup, IFieldLookupProps, IFieldLookupState } from ".";
/**
 * Lookup Field
 */
export declare class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> implements IFieldLookup {
    /**
     * Render the field
     */
    renderField: () => any;
    /**
     * Methods
     */
    /**
     * The get field value method
     */
    getFieldValue: () => any;
    /**
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option number.
     */
    protected onChanged: (option: IDropdownOption, idx: number) => void;
    /**
     * The field initialized event
     * @param field - The field information.
     * @param state - The current state.
     */
    onFieldLoaded: (info: any, state: IFieldLookupState) => void;
    /**
     * Method to convert the field value to options
     * @param items - The lookup items.
     * @param fieldName - The lookup field name.
     */
    private toOptions;
}
