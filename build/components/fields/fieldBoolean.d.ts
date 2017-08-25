/// <reference types="react" />
import { IFieldBoolean, IFieldBooleanProps, IFieldBooleanState } from "../../definitions";
import { BaseField } from ".";
/**
 * Boolean field
 */
export declare class FieldBoolean extends BaseField<IFieldBooleanProps, IFieldBooleanState> implements IFieldBoolean {
    renderField(): void | JSX.Element;
    private getValue;
    private onChange;
}
