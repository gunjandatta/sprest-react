import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from ".";
import { IDatePickerProps, IDropdownProps } from "office-ui-fabric-react";
/**
 * Date/Time Field Information
 */
export interface IDateTimeFieldInfo extends IFieldInfo {
    showTime?: boolean;
}
/**
 * Date/Time Field Properties
 */
export interface IFieldDateTimeProps extends IFieldProps {
    /** Date picker properties. */
    dtProps?: IDatePickerProps;
    /** Event triggered when the field value changes. */
    onChange?: (value: Date) => void;
    /** Time dropdown list properties. */
    timeProps?: IDropdownProps;
}
/**
 * Date/Time Field State
 */
export interface IFieldDateTimeState extends IFieldState {
    fieldInfo: IDateTimeFieldInfo;
}
/**
 * Date/Time Field
 */
export interface IFieldDateTime extends IField<IFieldDateTimeProps, IFieldDateTimeState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldDateTime, state: IFieldState) => void;
}
