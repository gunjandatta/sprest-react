import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { IDatePickerProps, IDropdownOption, IDropdownProps } from "office-ui-fabric-react";

/**
 * Date/Time Field Information
 */
interface IDateTimeFieldInfo extends IFieldInfo {
    showTime?: boolean;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Date picker properties. */
    dtProps?: IDatePickerProps;

    /** Event triggered when the field value changes. */
    onChange?: (value:Date) => void;

    /** Time dropdown list properties. */
    timeProps?: IDropdownProps;
}

/**
 * State
 */
interface State extends IFieldState {
    fieldInfo: IDateTimeFieldInfo;
}

/**
 * Date/Time Field
 */
interface IFieldDateTime extends IField<Props, State> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldDateTime, state: IFieldState) => void;
}