import { Helper } from "gd-sprest";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { BaseField, IBaseField, IBaseFieldProps, IBaseFieldState } from ".";

/**
 * Choice field
 */
export class FieldChoice extends BaseField<IFieldChoiceProps, IFieldChoiceState> implements IFieldChoice {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldLoaded: (fieldInfo: Helper.IListFormChoiceFieldInfo, state: IFieldChoiceState) => void;
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
    fieldInfo: Helper.IListFormChoiceFieldInfo;

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
    onFieldLoaded: (fieldInfo: Helper.IListFormChoiceFieldInfo, state: IFieldChoiceState) => void;
}