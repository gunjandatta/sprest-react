import { Types } from "gd-sprest";
import { ITextFieldProps } from "@fluentui/react/lib/TextField";
import { BaseField, IBaseField, IBaseFieldProps, IBaseFieldState } from ".";

/**
 * URL Field
 */
export class FieldUrl extends BaseField<IFieldUrlProps, IFieldUrlState> { }

/**
 * Url Field Properties
 */
export interface IFieldUrlProps extends IBaseFieldProps {
    /** The description textfield properties. */
    descProps?: ITextFieldProps;

    /** Event triggered when the field value changes. */
    onChange?: (value: Types.SP.FieldUrlValue) => void;

    /** The url textfield properties. */
    urlProps?: ITextFieldProps;
}

/**
 * Url Field State
 */
export interface IFieldUrlState extends IBaseFieldState {
    /** The field value */
    value: Types.SP.FieldUrlValue;
}

/**
 * Url Field
 */
export interface IFieldUrl extends IBaseField<IFieldUrlProps, IFieldUrlState> { }