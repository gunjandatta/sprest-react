import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from "../common";
import {IPersonaProps,ILabelProps,IPeoplePickerProps} from "office-ui-fabric-react";

/**
 * User Field Information
 */
interface IUserFieldInfo extends IFieldInfo {
    allowMultiple?: boolean;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** The properties for the user field label. */
    lblProps?: ILabelProps;

    /** Event triggered when the field value changes. */
    onChange?: (value:Array<number>) => void;

    /** The properties of the people picker. */
    pickerProps?: IPeoplePickerProps;
}

/**
 * State
 */
interface State extends IFieldState {
    fieldInfo: IUserFieldInfo;
}

/**
 * User Field
 */
interface IFieldUser extends IField<Props, State> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldUser, state: IFieldState) => void;
}