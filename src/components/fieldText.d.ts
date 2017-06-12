import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { ITextFieldProps } from "office-ui-fabric-react";

/**
 * Text Field Information
 */
interface ITextFieldInformation extends IFieldInfo {
    multiline?: boolean;
    rows?: number;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: string) => void;

    /** The textfield properties. */
    props?: ITextFieldProps;
}

/**
 * State
 */
interface State extends IFieldState {
    fieldInfo: ITextFieldInformation;
}

/**
 * Text Field
 */
interface IFieldText extends IField<Props, State> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldNote | Types.IFieldText, state: IFieldState) => void;
}