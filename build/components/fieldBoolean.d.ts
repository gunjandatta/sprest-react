/// <reference types="react" />
import { IFieldBoolean, Props, State } from "./fieldBoolean.d";
import { Field } from "../common";
/**
 * Boolean field
 */
export declare class FieldBoolean extends Field<Props, State> implements IFieldBoolean {
    renderField(): JSX.Element;
    private getValue;
    private onChange;
}
