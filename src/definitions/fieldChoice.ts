import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from ".";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";

/**
 * Choice Field Information
 */
export interface IChoiceFieldInfo extends IFieldInfo {
    /** The dropdown choices. */
    choices: Array<IDropdownOption>;

    /** Flag to determine if this is a multi-choice field. */
    multiChoice?: boolean;
}

/**
 * Choice Field Properties
 */
export interface IFieldChoiceProps extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: IDropdownOption | Array<string | number>) => void;

    /** The dropdown properties. */
    props?: IDropdownProps;
}

/**
 * Choice Field State
 */
export interface IFieldChoiceState extends IFieldState {
    /** The dropdown choices. */
    choices?: Array<IDropdownOption>;

    /** The field information */
    fieldInfo: IChoiceFieldInfo;
}

/**
 * Choice Field
 */
export interface IFieldChoice extends IField<IFieldChoiceProps, IFieldChoiceState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldChoice | Types.IFieldMultiChoice, state: IFieldState) => void;
}