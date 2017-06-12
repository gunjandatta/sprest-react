/// <reference types="react" />
import { IFieldChoice, Props, State } from "./fieldChoice.d";
import { Field } from "../common";
import { IDropdownOption } from "office-ui-fabric-react";
/**
 * Boolean field
 */
export declare class FieldChoice extends Field<Props, State> implements IFieldChoice {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    protected onChange: (option: IDropdownOption) => void;
    onFieldInit: (field: any, state: State) => void;
    onFieldLoaded: () => void;
}
