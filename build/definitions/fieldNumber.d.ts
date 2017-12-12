import { Types } from "gd-sprest";
import { ITextFieldProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";
/**
 * Number Field Types
 */
export declare enum FieldNumberTypes {
    Decimal = 0,
    Integer = 1,
    Percentage = 2,
}
/**
 * Number Field Information
 */
export interface INumberFieldInfo extends IBaseFieldInfo {
    /** The maximum value. */
    maxValue?: number;
    /** The minimum value. */
    minValue?: number;
    /** Flag to determine if the value is a percentage. */
    showAsPercentage?: boolean;
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
    /** The field information. */
    fieldInfo: INumberFieldInfo;
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
