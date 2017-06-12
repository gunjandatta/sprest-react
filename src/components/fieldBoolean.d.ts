import { IField, IFieldProps, IFieldState } from "../common";
import { ICheckboxProps } from "office-ui-fabric-react";

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: boolean) => void;

    /** The checkbox properties. */
    props?: ICheckboxProps;
}

/**
 * State
 */
interface State extends IFieldState { }

/**
 * Boolean Field
 */
interface IFieldBoolean extends IField<Props, State> {}