import { Types } from "gd-sprest";
import { ITextFieldProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from "../definitions";
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
export interface IFieldNumberProps extends IBaseFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: number) => void;
    /** The type of number. */
    numberType?: FieldNumberTypes;
    /** The textfield properties. */
    props?: ITextFieldProps;
}
/**
 * Number Field State
 */
export interface IFieldNumberState extends IBaseFieldState {
}
/**
 * Number Field
 */
export interface IFieldNumber extends IBaseField<IFieldNumberProps, IFieldNumberState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldCurrency | Types.IFieldNumber, state: IBaseFieldState) => void;
}
