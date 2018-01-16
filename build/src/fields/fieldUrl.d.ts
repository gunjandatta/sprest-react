import { IFieldUrlProps, IFieldUrlState } from "../definitions";
import { BaseField } from ".";
/**
 * URL Field
 */
export declare class FieldUrl extends BaseField<IFieldUrlProps, IFieldUrlState> {
    /**
     * Render the component
     */
    renderField: () => any;
    /**
     * Methods
     */
    /**
     * The change event for the description field
     * @param value - The description.
     */
    private onDescChanged;
    /**
     * The change event for the url field
     * @param value - The url.
     */
    private onUrlChanged;
}
