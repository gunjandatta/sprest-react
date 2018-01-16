import { IFieldDateTime, IFieldDateTimeProps, IFieldDateTimeState } from "../definitions";
import { BaseField } from ".";
/**
 * Date Time field
 */
export declare class FieldDateTime extends BaseField<IFieldDateTimeProps, IFieldDateTimeState> implements IFieldDateTime {
    /**
     * Reference to the date picker.
     */
    private _datePicker;
    /**
     * Render the field
     */
    renderField: () => any;
    /**
     * Methods
     */
    /**
     * Method to get the value
     */
    private getValue;
    /**
     * The date changed event
     * @param date - The date value.
     */
    private onDateChanged;
    /**
     * The time changed event
     * @param option - The time dropdown option.
     */
    private onTimeChanged;
    /**
     * Method to render the time component
     * @param date - The date/time value
     */
    private renderTime;
}
