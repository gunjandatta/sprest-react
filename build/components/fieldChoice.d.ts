/// <reference types="react" />
import { IDropdownOption } from "office-ui-fabric-react";
import { Field } from "../common";
import { IFieldChoice, IFieldChoiceProps, IFieldChoiceState } from "../definitions";
/**
 * Boolean field
 */
export declare class FieldChoice extends Field<IFieldChoiceProps, IFieldChoiceState> implements IFieldChoice {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    protected onChange: (option: IDropdownOption) => void;
    onFieldInit: (field: any, state: IFieldChoiceState) => void;
    onFieldLoaded: () => void;
}
