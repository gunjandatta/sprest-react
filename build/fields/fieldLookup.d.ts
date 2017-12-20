import { IDropdownOption } from "office-ui-fabric-react";
import { IFieldLookup, IFieldLookupProps, IFieldLookupState } from "../definitions";
import { BaseField } from ".";
/**
 * Lookup Field
 */
export declare class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> implements IFieldLookup {
    /**
     * Render the field
     */
    renderField: () => any;
    /**
     * Events
     */
    /**
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option number.
     */
    protected onChanged: (option: IDropdownOption, idx: number) => void;
    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
    onFieldInit: (field: any, state: IFieldLookupState) => void;
    /**
     * Methods
     */
    /**
     * Method to load the lookup items
     * @param fieldInfo - The field information.
     */
    private loadLookupItems;
    /**
     * Method to convert the field value to options
     * @param items - The lookup items.
     * @param fieldName - The lookup field name.
     */
    private toOptions;
}
