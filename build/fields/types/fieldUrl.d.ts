import { SP } from "gd-sprest-def";
import { ITextFieldProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from ".";
/**
 * Url Field Properties
 */
export interface IFieldUrlProps extends IBaseFieldProps {
    /** The description textfield properties. */
    descProps?: ITextFieldProps;
    /** Event triggered when the field value changes. */
    onChange?: (value: SP.FieldUrlValue) => void;
    /** The url textfield properties. */
    urlProps?: ITextFieldProps;
}
/**
 * Url Field State
 */
export interface IFieldUrlState extends IBaseFieldState {
    /** The field value */
    value: SP.FieldUrlValue;
}
/**
 * Url Field
 */
export interface IFieldUrl extends IBaseField<IFieldUrlProps, IFieldUrlState> {
}
