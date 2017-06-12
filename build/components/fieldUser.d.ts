/// <reference types="react" />
import { Props, State } from "./fieldUser.d";
import { Field } from "../common";
import "../../sass/fieldUser.scss";
/**
 * User Field
 */
export declare class FieldUser extends Field<Props, State> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Global Variables
     */
    private _filterText;
    private _promise;
    /**
     * Events
     */
    onChange: (value: any) => void;
    onFieldInit: (field: any, state: State) => void;
    /**
     * Methods
     */
    private getDefaultPersonas;
    private getValue;
    private search;
}
