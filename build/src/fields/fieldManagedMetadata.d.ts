/// <reference types="react" />
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
    renderField: () => JSX.Element;
    /**
     * Events
     */
    /**
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option index.
     */
    protected onChanged: (option: IDropdownOption, idx: number) => void;
    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
    onFieldInit: (field: any, state: IFieldManagedMetadataState) => void;
    /**
     * Methods
     */
    /**
     * Method to load the value field
     * @param fieldInfo - The field information.
     */
    private loadValueField;
    /**
     * Method to load the terms
     * @param fieldInfo - The field information.
     */
    private loadTerms;
    /**
     * Method to convert the field value to options
     * @param terms - The managed metadata terms.
     */
    private toOptions;
}
