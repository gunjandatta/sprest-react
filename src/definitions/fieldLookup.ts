import { Types } from "gd-sprest";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";

/**
 * Lookup Field Information
 */
export interface ILookupFieldInfo extends IBaseFieldInfo {
    /** Flag to allow multiple items to be selected. */
    allowMultipleValues: boolean;

    /** The lookup items. */
    items: Array<Types.IListItemQueryResult>;

    /** The lookup field name. */
    lookupFieldName: string;

    /** The lookup list name. */
    lookupListName: string;

    /** The lookup web id. */
    lookupWebId: string;
}

/**
 * Lookup Field Properties
 */
export interface IFieldLookupProps extends IBaseFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: IDropdownOption | Array<string | number>) => void;

    /** The dropdown list properties. */
    props?: IDropdownProps;
}

/**
 * Lookup Field State
 */
export interface IFieldLookupState extends IBaseFieldState {
    /** The field information */
    fieldInfo: ILookupFieldInfo;

    /** The dropdown options. */
    options?: Array<IDropdownOption>;
}

/**
 * Lookup Field
 */
export interface IFieldLookup extends IBaseField<IFieldLookupProps, IFieldLookupState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldLookup, state: IBaseFieldState) => void;
}