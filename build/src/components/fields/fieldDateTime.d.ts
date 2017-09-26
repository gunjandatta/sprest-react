/// <reference types="react" />
import { IFieldDateTime, IFieldDateTimeProps, IFieldDateTimeState } from "../../definitions";
import { BaseField } from ".";
/**
 * Date Time field
 */
export declare class FieldDateTime extends BaseField<IFieldDateTimeProps, IFieldDateTimeState> implements IFieldDateTime {
    private _datePicker;
    /**
     * Public Interface
     */
    renderField: () => JSX.Element;
    /**
     * Events
     */
    onFieldInit: (field: any, state: IFieldDateTimeState) => void;
    private onDateChanged;
    private onTimeChanged;
    /**
     * Methods
     */
    private getValue;
    private renderTime;
}
