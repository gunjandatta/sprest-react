/// <reference types="react" />
import * as React from "react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from "../definitions";
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
     * Component initialized event
     */
    componentWillMount(): void;
    /**
     * Method to get the field value
     */
    getFieldValue: () => any;
    /**
     * Event triggered after the field information is retrieved from SharePoint
     */
    onFieldInit?: (field: any, state: State) => void;
    /**
     * Event triggered after loading the field information
     */
    onFieldLoaded?: () => void;
    /**
     * Method to update the value
     * @param value - The field value.
     */
    updateValue: (value: any) => void;
    /**
     * Method to render the component
     */
    render(): JSX.Element;
    /**
     * Method to render the field
     */
    renderField: () => JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to load the field information
     */
    private load;
    private loadField;
}
