import { Types } from "gd-sprest";
import { ITextFieldProps } from "office-ui-fabric-react";
import { BaseField, IBaseField, IBaseFieldProps, IBaseFieldState } from ".";

/**
 * Number Field
 */
export class FieldNumber extends BaseField<IFieldNumberProps, IFieldNumberState> { }

/**
 * Number Field Properties
 */
export interface IFieldNumberProps extends IBaseFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: number) => void;

    /** The type of number. */
    numberType?: number;

    /** The textfield properties. */
    props?: ITextFieldProps;
}

/**
 * Number Field State
 */
export interface IFieldNumberState extends IBaseFieldState {
    /** The field information. */
    fieldInfo: Types.Helper.IListFormNumberFieldInfo;
}

/**
 * Number Field
 */
export interface IFieldNumber extends IBaseField<IFieldNumberProps, IFieldNumberState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldLoaded?: (info: any, state: IBaseFieldState) => void;
}