import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { ITextFieldProps } from "office-ui-fabric-react";

/**
 * URL Field Information
 */
interface ITextFieldInformation extends IFieldInfo {
    multiline?: boolean;
    rows?: number;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** The description textfield properties. */
    descProps?: ITextFieldProps;

    /** Event triggered when the field value changes. */
    onChange?: (value:Types.ComplexTypes.FieldUrlValue) => void;

    /** The url textfield properties. */
    urlProps?: ITextFieldProps;
}

/**
 * State
 */
interface State extends IFieldState {
    fieldInfo: ITextFieldInformation;
    value: Types.ComplexTypes.FieldUrlValue;
}

/**
 * Url Field
 */
interface IFieldUrl extends IField<Props, State> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldUrl, state: IFieldState) => void;
}