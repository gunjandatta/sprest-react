/// <reference types="react" />
import { Field } from "../common";
import { IFieldUserProps, IFieldUserState } from "../definitions";
import "../../sass/fieldUser.scss";
/**
 * User Field
 */
export declare class FieldUser extends Field<IFieldUserProps, IFieldUserState> {
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
    onFieldInit: (field: any, state: IFieldUserState) => void;
    /**
     * Methods
     */
    private getDefaultPersonas;
    private getValue;
    private search;
}
