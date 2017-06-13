import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from ".";
import { ITextFieldProps } from "office-ui-fabric-react";
/**
 * Url Field Information
 */
export interface IUrlFieldInformation extends IFieldInfo {
    multiline?: boolean;
    rows?: number;
}
/**
 * Url Field Properties
 */
export interface IFieldUrlProps extends IFieldProps {
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
export interface IFieldUrlState extends IFieldState {
    fieldInfo: IUrlFieldInformation;
    value: Types.ComplexTypes.FieldUrlValue;
}
/**
 * Url Field
 */
export interface IFieldUrl extends IField<IFieldUrlProps, IFieldUrlState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldUrl, state: IFieldState) => void;
}
