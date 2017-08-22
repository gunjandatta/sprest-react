/// <reference types="react" />
import { BaseField } from "../../common";
import { IFieldUserProps, IFieldUserState } from "../../definitions";
/**
 * User Field
 */
export declare class FieldUser extends BaseField<IFieldUserProps, IFieldUserState> {
    /**
     * Public Interface
     */
    renderField(): void | JSX.Element;
    /**
     * Events
     */
    onChange: (personas: any) => void;
    onFieldInit: (field: any, state: IFieldUserState) => void;
}
