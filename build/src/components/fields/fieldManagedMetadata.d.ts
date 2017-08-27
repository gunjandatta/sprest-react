/// <reference types="react" />
import { IDropdownOption } from "office-ui-fabric-react";
import { IFieldManagedMetadata, IFieldManagedMetadataProps, IFieldManagedMetadataState } from "../../definitions";
import { BaseField } from ".";
/**
 * Managed Metadata Field
 */
export declare class FieldManagedMetadata extends BaseField<IFieldManagedMetadataProps, IFieldManagedMetadataState> implements IFieldManagedMetadata {
    /**
     * Public Interface
     */
    renderField(): void | JSX.Element;
    /**
     * Events
     */
    protected onChanged: (option: IDropdownOption, idx: number) => void;
    onFieldInit: (field: any, state: IFieldManagedMetadataState) => void;
    /**
     * Methods
     */
    private loadTerms;
    private toOptions;
}
