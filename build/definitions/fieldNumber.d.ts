import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState } from ".";
import { ITextFieldProps } from "office-ui-fabric-react";
/**
 * Number Field Types
 */
export declare enum FieldNumberTypes {
    Decimal = 0,
    Integer = 1,
}
/**
 * Number Field Properties
 */
export interface IFieldNumberProps extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: number) => void;
    /** The textfield properties. */
    props?: ITextFieldProps;
    /** The number type. */
    type?: FieldNumberTypes;
}
/**
 * Number Field State
 */
export interface IFieldNumberState extends IFieldState {
}
/**
 * Number Field
 */
export interface IFieldNumber extends IField<IFieldNumberProps, IFieldNumberState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldCurrency | Types.IFieldNumber, state: IFieldState) => void;
}
