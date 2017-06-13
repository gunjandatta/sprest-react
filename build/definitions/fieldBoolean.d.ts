import { IField, IFieldProps, IFieldState } from ".";
import { ICheckboxProps } from "office-ui-fabric-react";
/**
 * Boolean Field Properties
 */
export interface IFieldBooleanProps extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: boolean) => void;
    /** The checkbox properties. */
    props?: ICheckboxProps;
}
/**
 * Boolean Field State
 */
export interface IFieldBooleanState extends IFieldState {
}
/**
 * Boolean Field
 */
export interface IFieldBoolean extends IField<IFieldBooleanProps, IFieldBooleanState> {
}
