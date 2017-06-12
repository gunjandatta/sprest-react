import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { ITextFieldProps } from "office-ui-fabric-react";

/**
 * Number Types
 */
export enum FieldNumberTypes {
    Decimal = 0,
    Integer = 1
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: number) => void;

    /** The textfield properties. */
    props?: ITextFieldProps;

    /** The number type. */
    type?: FieldNumberTypes;
}

/**
 * State
 */
interface State extends IFieldState { }

/**
 * Number Field
 */
interface IFieldNumber extends IField<Props, State> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldCurrency | Types.IFieldNumber, state: IFieldState) => void;
}