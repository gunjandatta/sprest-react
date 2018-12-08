import * as React from "react";
import { Types } from "gd-sprest";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from "./types";
/**
 * Base Field
 * This is the base field class, inherited by all field types.
 */
export declare abstract class BaseField<Props extends IBaseFieldProps = IBaseFieldProps, State extends IBaseFieldState = IBaseFieldState> extends React.Component<Props, State> implements IBaseField<Props, State> {
    /**
     * Constructor
     * @param props - The base field properties.
     */
    constructor(props: Props);
    /**
     * Method to render the component
     */
    render(): any;
    /**
     * Methods
     */
    /**
     * Method to get the field value
     */
    getFieldValue: () => State["value"];
    /**
     * Event triggered after loading the field information
     */
    onFieldLoaded?: (info: Types.Helper.IListFormFieldInfo, state: State) => void;
    /**
     * Method to render the field
     */
    renderField: () => JSX.Element;
    /**
     * Method to update the value
     * @param value - The field value.
     */
    updateValue: (value: any) => void;
}
