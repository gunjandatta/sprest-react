import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from ".";
import { ITextFieldProps } from "office-ui-fabric-react";

/**
 * Text Field Information
 */
export interface ITextFieldInformation extends IFieldInfo {
    multiline?: boolean;
    rows?: number;
}

/**
 * Text Field Properties
 */
export interface IFieldTextProps extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: string) => void;

    /** The textfield properties. */
    props?: ITextFieldProps;
}

/**
 * Text Field State
 */
export interface IFieldTextState extends IFieldState {
    fieldInfo: ITextFieldInformation;
}

/**
 * Text Field
 */
export interface IFieldText extends IField<IFieldTextProps, IFieldTextState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldNote | Types.IFieldText, state: IFieldState) => void;
}