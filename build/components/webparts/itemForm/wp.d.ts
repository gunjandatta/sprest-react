/// <reference types="react" />
import * as React from "react";
import { IItemFormProps, IItemFormState } from "../../../definitions";
/**
 * Item Form WebPart
 */
export declare class ItemForm extends React.Component<IItemFormProps, IItemFormState> {
    /**
     * Constructor
     */
    constructor(props: IItemFormProps);
    render(): JSX.Element;
    /**
     * Methods
     */
    renderFields: () => any[];
}
