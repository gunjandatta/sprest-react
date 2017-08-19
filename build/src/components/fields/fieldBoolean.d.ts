/// <reference types="react" />
import { BaseField } from "../../common";
import { IFieldBoolean, IFieldBooleanProps, IFieldBooleanState } from "../../definitions";
/**
 * Boolean field
 */
export declare class FieldBoolean extends BaseField<IFieldBooleanProps, IFieldBooleanState> implements IFieldBoolean {
    renderField(): JSX.Element;
    private getValue;
    private onChange;
}
