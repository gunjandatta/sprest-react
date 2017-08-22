/// <reference types="react" />
import { BaseField } from "../../common";
import { IFieldUrlProps, IFieldUrlState } from "../../definitions";
/**
 * URL Field
 */
export declare class FieldUrl extends BaseField<IFieldUrlProps, IFieldUrlState> {
    /**
     * Public Interface
     */
    renderField(): void | JSX.Element;
    /**
     * Events
     */
    private onDescChanged;
    private onUrlChanged;
}
