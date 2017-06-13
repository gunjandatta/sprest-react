/// <reference types="react" />
import { Field } from "../common";
import { IFieldBoolean, IFieldBooleanProps, IFieldBooleanState } from "../definitions";
/**
 * Boolean field
 */
export declare class FieldBoolean extends Field<IFieldBooleanProps, IFieldBooleanState> implements IFieldBoolean {
    renderField(): JSX.Element;
    private getValue;
    private onChange;
}
