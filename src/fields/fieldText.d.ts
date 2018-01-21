import { Types } from "gd-sprest";
import { ITextFieldProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from ".";

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
    /** The field information */
    fieldInfo: Types.Helper.ListForm.IListFormTextFieldInfo;
}

/**
 * Text Field
 */
export interface IFieldText extends IBaseField<IFieldTextProps, IFieldTextState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldLoaded?: (info: any, state: IBaseFieldState) => void;
}