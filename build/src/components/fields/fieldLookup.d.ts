/// <reference types="react" />
import { IFieldLookupProps, IFieldLookupState } from "../../definitions";
import { BaseField } from "../../common";
import "../../../sass/fieldLookup.scss";
/**
 * Lookup Field
 */
export declare class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> {
    /**
     * Public Interface
     */
    renderField(): JSX.Element;
    /**
     * Events
     */
    private onChanged;
    private onChecked;
    onFieldInit: (field: any, state: IFieldLookupState) => void;
    onFieldLoaded: () => void;
    /**
     * Methods
     */
    private getSelectedOptions;
    private renderOption;
    private renderTitle;
}
