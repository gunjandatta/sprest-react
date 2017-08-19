import { Types } from "gd-sprest";
import { ITextFieldProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";
/**
 * Url Field Information
 */
export interface IUrlFieldInformation extends IBaseFieldInfo {
    multiline?: boolean;
    rows?: number;
}
/**
 * Url Field Properties
 */
export interface IFieldUrlProps extends IBaseFieldProps {
    /** The description textfield properties. */
    descProps?: ITextFieldProps;
    /** Event triggered when the field value changes. */
    onChange?: (value: Types.ComplexTypes.FieldUrlValue) => void;
    /** The url textfield properties. */
    urlProps?: ITextFieldProps;
}
/**
 * Url Field State
 */
export interface IFieldUrlState extends IBaseFieldState {
    fieldInfo: IUrlFieldInformation;
    value: Types.ComplexTypes.FieldUrlValue;
}
/**
 * Url Field
 */
export interface IFieldUrl extends IBaseField<IFieldUrlProps, IFieldUrlState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldUrl, state: IBaseFieldState) => void;
}
