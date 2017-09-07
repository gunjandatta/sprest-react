/// <reference types="react" />
import { IDropdownOption } from "office-ui-fabric-react";
import { IFieldLookup, IFieldLookupProps, IFieldLookupState } from "../../definitions";
import { BaseField } from ".";
/**
 * Lookup Field
 */
export declare class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> implements IFieldLookup {
    /**
     * Public Interface
     */
    renderField: () => JSX.Element;
    /**
     * Events
     */
    protected onChanged: (option: IDropdownOption, idx: number) => void;
    onFieldInit: (field: any, state: IFieldLookupState) => void;
    /**
     * Methods
     */
    private loadLookupItems;
    private toOptions;
}
