import { IFieldUserProps, IFieldUserState } from "../definitions";
import { BaseField } from ".";
/**
 * User Field
 */
export declare class FieldUser extends BaseField<IFieldUserProps, IFieldUserState> {
    /**
     * Render the field
     */
    renderField: () => any;
    /**
     * Methods
     */
    /**
     * The change event
     * @param personas - The user personas.
     */
    onChange: (personas: any) => void;
    /**
     * The field loaded event
     * @param info - The field information.
     * @param state - The current state.
     */
    onFieldLoaded: (info: any, state: IFieldUserState) => void;
}
