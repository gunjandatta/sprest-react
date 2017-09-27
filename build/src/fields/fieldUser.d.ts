/// <reference types="react" />
import { IFieldUserProps, IFieldUserState } from "../definitions";
import { BaseField } from ".";
/**
 * User Field
 */
export declare class FieldUser extends BaseField<IFieldUserProps, IFieldUserState> {
    /**
     * Render the field
     */
    renderField: () => JSX.Element;
    /**
     * Events
     */
    /**
     * The change event
     * @param personas - The user personas.
     */
    onChange: (personas: any) => void;
    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
    onFieldInit: (field: any, state: IFieldUserState) => void;
}
