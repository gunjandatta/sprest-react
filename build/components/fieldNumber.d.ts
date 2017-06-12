/// <reference types="react" />
import { FieldNumberTypes, Props, State } from "./fieldNumber.d";
import { Field } from "../common";
export { FieldNumberTypes };
/**
 * Number Field
 */
export declare class FieldNumber extends Field<Props, State> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Methods
     */
    private getValue;
    private onChange;
}
