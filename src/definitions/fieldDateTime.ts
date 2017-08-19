import { Types } from "gd-sprest";
import { IDatePickerProps, IDropdownOption, IDropdownProps } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldProps, IBaseFieldState, IBaseFieldInfo } from "../definitions";

/**
 * Date/Time Field Information
 */
export interface IDateTimeFieldInfo extends IBaseFieldInfo {
    showTime?: boolean;
}

/**
 * Date/Time Field Properties
 */
export interface IFieldDateTimeProps extends IBaseFieldProps {
    /** Date picker properties. */
    dtProps?: IDatePickerProps;

    /** Event triggered when the field value changes. */
    onChange?: (value:Date) => void;

    /** Time dropdown list properties. */
    timeProps?: IDropdownProps;
}

/**
 * Date/Time Field State
 */
export interface IFieldDateTimeState extends IBaseFieldState {
    fieldInfo: IDateTimeFieldInfo;
}

/**
 * Date/Time Field
 */
export interface IFieldDateTime extends IBaseField<IFieldDateTimeProps, IFieldDateTimeState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldDateTime, state: IBaseFieldState) => void;
}