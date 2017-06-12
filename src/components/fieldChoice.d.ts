import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";

/**
 * Choice Field Information
 */
interface IChoiceFieldInfo extends IFieldInfo {
    /** The dropdown choices. */
    choices: Array<IDropdownOption>;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Event triggered when the field value changes. */
    onChange?: (value: IDropdownOption) => void;

    /** The dropdown properties. */
    props?: IDropdownProps;
}

/**
 * State
 */
interface State extends IFieldState {
    /** The dropdown choices. */
    choices?: Array<IDropdownOption>;

    /** The field information */
    fieldInfo: IChoiceFieldInfo;
}

/**
 * Choice Field
 */
interface IFieldChoice extends IField<Props, State> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldChoice | Types.IFieldMultiChoice, state: IFieldState) => void;
}