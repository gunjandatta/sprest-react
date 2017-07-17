/// <reference types="react" />
import { Field } from "../common";
import { IFieldDateTime, IFieldDateTimeProps, IFieldDateTimeState } from "../definitions";
/**
 * Date Time field
 */
export declare class FieldDateTime extends Field<IFieldDateTimeProps, IFieldDateTimeState> implements IFieldDateTime {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
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
