import { ICheckboxProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from "../definitions";
/**
 * Boolean Field Properties
 */
export interface IFieldBooleanProps extends IBaseFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: boolean) => void;
    /** The checkbox properties. */
    props?: ICheckboxProps;
}
/**
 * Boolean Field State
 */
export interface IFieldBooleanState extends IBaseFieldState {
}
/**
 * Boolean Field
 */
export interface IFieldBoolean extends IBaseField<IFieldBooleanProps, IFieldBooleanState> {
}
