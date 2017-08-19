/// <reference types="react" />
import { BaseField } from "../../common";
import { IFieldUserProps, IFieldUserState } from "../../definitions";
import "../../../sass/fieldUser.scss";
/**
 * User Field
 */
export declare class FieldUser extends BaseField<IFieldUserProps, IFieldUserState> {
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
