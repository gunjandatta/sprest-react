/// <reference types="react" />
import { IFieldUrlProps, IFieldUrlState } from "../../definitions";
import { BaseField } from ".";
/**
 * URL Field
 */
export declare class FieldUrl extends BaseField<IFieldUrlProps, IFieldUrlState> {
    /**
     * Public Interface
     */
    renderField: () => JSX.Element;
    /**
     * Events
     */
    private onDescChanged;
    private onUrlChanged;
}
