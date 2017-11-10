import { Types } from "gd-sprest";
import { IPersonaProps, ILabelProps, IPeoplePickerProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";

/**
 * User Field Information
 */
export interface IUserFieldInfo extends IBaseFieldInfo {
    allowGroups?: boolean;
    allowMultiple?: boolean;
}

/**
 * User Field Properties
 */
export interface IFieldUserProps extends IBaseFieldProps {
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
export interface IFieldUserState extends IBaseFieldState {
    fieldInfo: IUserFieldInfo;
}

/**
 * User Field
 */
export interface IFieldUser extends IBaseField<IFieldUserProps, IFieldUserState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldUser, state: IBaseFieldState) => void;
}