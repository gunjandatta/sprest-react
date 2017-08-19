/// <reference types="react" />
import { IDropdownOption } from "office-ui-fabric-react";
import { BaseField } from "../../common";
import { IFieldChoice, IFieldChoiceProps, IFieldChoiceState } from "../../definitions";
import "../../../sass/fieldChoice.scss";
/**
 * Boolean field
 */
export declare class FieldChoice extends BaseField<IFieldChoiceProps, IFieldChoiceState> implements IFieldChoice {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    protected onChanged: (option: IDropdownOption) => void;
    private onChecked;
    onFieldInit: (field: any, state: IFieldChoiceState) => void;
    onFieldLoaded: () => void;
    /**
     * Methods
     */
    private getSelectedOptions;
    private renderOption;
    private renderTitle;
}
