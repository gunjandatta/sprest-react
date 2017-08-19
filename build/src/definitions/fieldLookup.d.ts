import { Types } from "gd-sprest";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";
/**
 * Lookup Field Information
 */
export interface ILookupFieldInfo extends IBaseFieldInfo {
    allowMultipleValues: boolean;
    lookupFieldName: string;
    lookupListName: string;
    lookupWebId: string;
    showField: string;
}
/**
 * Lookup Field Properties
 */
export interface IFieldLookupProps extends IBaseFieldProps {
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
export interface IFieldLookupState extends IBaseFieldState {
    options?: Array<IDropdownOption>;
    fieldInfo: ILookupFieldInfo;
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
