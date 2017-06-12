/// <reference types="react" />
import { Props, State } from "./fieldUrl.d";
import { Field } from "../common";
/**
 * URL Field
 */
export declare class FieldUrl extends Field<Props, State> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    private onDescChanged;
    private onUrlChanged;
    /**
     * Methods
     */
    private getValue;
}
