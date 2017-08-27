import { Types } from "gd-sprest";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";

/**
 * Managed Metadata Term Information
 */
export interface IManagedMetadataTermInfo {
    id: string;
    name: string;
    path: string;
}

/**
 * Managed Metadata Field Information
 */
export interface IManagedMetadataFieldInfo extends IBaseFieldInfo {
    /** Flag to allow multiple items to be selected. */
    allowMultipleValues: boolean;

    /** The terms. */
    terms: Array<IManagedMetadataTermInfo>;

    /** The term set id. */
    termSetId: string;

    /** The term store id. */
    termStoreId: string;
}

/**
 * Lookup Field Properties
 */
export interface IFieldManagedMetadataProps extends IBaseFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: IDropdownOption | Array<string | number>) => void;

    /** The dropdown list properties. */
    props?: IDropdownProps;
}

/**
 * Lookup Field State
 */
export interface IFieldManagedMetadataState extends IBaseFieldState {
    /** The field information */
    fieldInfo: IManagedMetadataFieldInfo;

    /** The dropdown options. */
    options?: Array<IDropdownOption>;
}

/**
 * Lookup Field
 */
export interface IFieldManagedMetadata extends IBaseField<IFieldManagedMetadataProps, IFieldManagedMetadataState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldManagedMetadata, state: IFieldManagedMetadataState) => void;
}