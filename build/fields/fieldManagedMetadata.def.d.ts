import { Types } from "gd-sprest";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from ".";
/**
 * Managed Metadata Term Information
 */
export interface IManagedMetadataTermInfo {
    id: string;
    name: string;
    path: string;
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
    fieldInfo: Types.Helper.IListFormMMSFieldInfo;
    /** The dropdown options. */
    options?: Array<IDropdownOption>;
    /** The hidden value field. */
    valueField?: Types.SP.IFieldNote;
}
/**
 * Lookup Field
 */
export interface IFieldManagedMetadata extends IBaseField<IFieldManagedMetadataProps, IFieldManagedMetadataState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldLoaded?: (info: any, state: IBaseFieldState) => void;
}
