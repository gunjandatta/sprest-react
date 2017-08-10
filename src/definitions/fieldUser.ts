import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from ".";
import { IPersonaProps, ILabelProps, IPeoplePickerProps } from "office-ui-fabric-react";

/**
 * User Field Information
 */
export interface IUserFieldInfo extends IFieldInfo {
    allowMultiple?: boolean;
}

/**
 * User Field Properties
 */
export interface IFieldUserProps extends IFieldProps {
    /** The properties for the user field label. */
    lblProps?: ILabelProps;

    /** Event triggered when the field value changes. */
    onChange?: (value: number | Array<number>) => void;

    /** The properties of the people picker. */
    pickerProps?: IPeoplePickerProps;
}

/**
 * User Field State
 */
export interface IFieldUserState extends IFieldState {
    fieldInfo: IUserFieldInfo;
}

/**
 * User Field
 */
export interface IFieldUser extends IField<IFieldUserProps, IFieldUserState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldUser, state: IFieldState) => void;
}