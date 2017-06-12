/// <reference types="react" />
import { Props, State } from "./fieldText.d";
import { Field } from "../common";
/**
 * Text Field
 */
export declare class FieldText extends Field<Props, State> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    onFieldInit: (field: any, state: State) => void;
    private onChange;
}
