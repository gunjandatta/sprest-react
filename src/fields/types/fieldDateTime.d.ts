import { Helper } from "gd-sprest";
import { IDatePickerProps } from "@fluentui/react/lib/DatePicker";
import { IDropdownOption, IDropdownProps } from "@fluentui/react/lib/Dropdown";
import { BaseField, IBaseField, IBaseFieldProps, IBaseFieldState } from ".";

/**
 * Date Time field
 */
export class FieldDateTime extends BaseField<IFieldDateTimeProps, IFieldDateTimeState> implements IFieldDateTime { }

/**
 * Date/Time Field Properties
 */
export interface IFieldDateTimeProps extends IBaseFieldProps {
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
export interface IFieldDateTimeState extends IBaseFieldState {
    /** The field information */
    fieldInfo: Helper.IListFormDateFieldInfo;
}

/**
 * Date/Time Field
 */
export interface IFieldDateTime extends IBaseField<IFieldDateTimeProps, IFieldDateTimeState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldLoaded?: (info: any, state: IBaseFieldState) => void;
}