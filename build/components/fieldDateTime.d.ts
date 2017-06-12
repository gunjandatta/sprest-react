/// <reference types="react" />
import { IFieldDateTime, Props, State } from "./fieldDateTime.d";
import { Field } from "../common";
/**
 * Date Time field
 */
export declare class FieldDateTime extends Field<Props, State> implements IFieldDateTime {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    onFieldInit: (field: any, state: State) => void;
    private onDateChanged;
    private onTimeChanged;
    /**
     * Methods
     */
    private getValue;
    private getTime;
    private renderTime;
}
