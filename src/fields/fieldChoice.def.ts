import { Types } from "gd-sprest";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from ".";

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
    fieldInfo: Types.Helper.ListForm.IListFormChoiceFieldInfo;

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
    onFieldLoaded: (fieldInfo: Types.Helper.ListForm.IListFormChoiceFieldInfo, state: IFieldChoiceState) => void;
}