import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from ".";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";

/**
 * Lookup Field Information
 */
export interface ILookupFieldInfo extends IFieldInfo {
    allowMultipleValues: boolean;
    lookupFieldName: string;
    lookupListName: string;
    lookupWebId: string;
    showField: string;
}

/**
 * Lookup Field Properties
 */
export interface IFieldLookupProps extends IFieldProps {
    /** Flag to determine if we should get all items. */
    getAllItemsFl?: boolean;

    /** Event triggered when the field value changes. */
    onChange?: (value: IDropdownOption | Array<string | number>) => void;

    /** The dropdown list properties. */
    props?: IDropdownProps;
}

/**
 * Lookup Field State
 */
export interface IFieldLookupState extends IFieldState {
    options?: Array<IDropdownOption>;
    fieldInfo: ILookupFieldInfo;
    selectedOptionsText?: string;
}

/**
 * Lookup Field
 */
export interface IFieldLookup extends IField<IFieldLookupProps, IFieldLookupState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldLookup, state: IFieldState) => void;
}