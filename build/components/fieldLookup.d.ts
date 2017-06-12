/// <reference types="react" />
import { Props, State } from "./fieldLookup.d";
import { Field } from "../common";
import "../../sass/fieldLookup.scss";
/**
 * Lookup Field
 */
export declare class FieldLookup extends Field<Props, State> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    private onChanged;
    private onChecked;
    onFieldInit: (field: any, state: State) => void;
    onFieldLoaded: () => void;
    /**
     * Methods
     */
    private getSelectedOptions;
    private renderOption;
    private renderTitle;
}
