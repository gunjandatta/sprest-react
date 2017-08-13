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
     * Events
     */
    onChange: () => void;
    onFieldInit: (field: any, state: IFieldUserState) => void;
}
