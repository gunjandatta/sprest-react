import { Types } from "gd-sprest";
import { ITextFieldProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";

/**
 * Text Field Information
 */
export interface ITextFieldInformation extends IBaseFieldInfo {
    multiline?: boolean;
    richText?: boolean;
    rows?: number;
}

/**
 * Text Field Properties
 */
export interface IFieldTextProps extends IBaseFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: string) => void;

    /** The textfield properties. */
    props?: ITextFieldProps;
}

/**
 * Text Field State
 */
export interface IFieldTextState extends IBaseFieldState {
    fieldInfo: ITextFieldInformation;
}

/**
 * Text Field
 */
export interface IFieldText extends IBaseField<IFieldTextProps, IFieldTextState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldNote | Types.IFieldText, state: IBaseFieldState) => void;
}