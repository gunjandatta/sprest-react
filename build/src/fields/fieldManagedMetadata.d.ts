import { IDropdownOption } from "office-ui-fabric-react";
import { IFieldManagedMetadata, IFieldManagedMetadataProps, IFieldManagedMetadataState } from "../definitions";
import { BaseField } from ".";
/**
 * Managed Metadata Field
 */
export declare class FieldManagedMetadata extends BaseField<IFieldManagedMetadataProps, IFieldManagedMetadataState> implements IFieldManagedMetadata {
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
     * @param idx - The dropdown option index.
     */
    protected onChanged: (option: IDropdownOption, idx: number) => void;
    /**
     * The field loaded event
     * @param info - The field information.
     * @param state - The current state.
     */
    onFieldLoaded: (info: any, state: IFieldManagedMetadataState) => void;
    /**
     * Method to convert the field value to options
     * @param terms - The managed metadata terms.
     */
    private toOptions;
}
