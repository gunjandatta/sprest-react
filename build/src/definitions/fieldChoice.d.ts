import { Types } from "gd-sprest";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";
/**
 * Choice Field Information
 */
export interface IChoiceFieldInfo extends IBaseFieldInfo {
    /** The dropdown choices. */
    choices: Types.ComplexTypes.FieldMultiChoiceValue;
    /** Flag to determine if this is a multi-choice field. */
    multiChoice?: boolean;
}
/**
 * Choice Field Properties
 */
export interface IFieldChoiceProps extends IBaseFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: IDropdownOption | Array<string | number>) => void;
    /** The dropdown properties. */
    props?: IDropdownProps;
}
/**
 * Choice Field State
 */
export interface IFieldChoiceState extends IBaseFieldState {
    /** The field information */
    fieldInfo: IChoiceFieldInfo;
    /** The dropdown options. */
    options?: Array<IDropdownOption>;
}
/**
 * Choice Field
 */
export interface IFieldChoice extends IBaseField<IFieldChoiceProps, IFieldChoiceState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldChoice | Types.IFieldMultiChoice, state: IBaseFieldState) => void;
}
