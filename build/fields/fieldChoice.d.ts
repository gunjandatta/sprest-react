import { IDropdownOption } from "office-ui-fabric-react";
import { IFieldChoice, IFieldChoiceProps, IFieldChoiceState } from "./types";
import { BaseField } from ".";
/**
 * Choice field
 */
export declare class FieldChoice extends BaseField<IFieldChoiceProps, IFieldChoiceState> implements IFieldChoice {
    /**
     * Render the field
     */
    renderField: () => any;
    /**
     * Methods
     */
    /**
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option index.
     */
    protected onChanged: (option: IDropdownOption, idx: number) => void;
    /**
     * The field loaded
     * @param field - The field information.
     * @param state - The current state.
     */
    onFieldLoaded: (info: any, state: IFieldChoiceState) => void;
    /**
     * Method to convert the field value to options
     */
    private toOptions;
}
