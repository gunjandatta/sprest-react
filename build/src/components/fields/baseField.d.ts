/// <reference types="react" />
import * as React from "react";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from "../../definitions";
/**
 * Base Field
 */
export declare abstract class BaseField<Props extends IBaseFieldProps = IBaseFieldProps, State extends IBaseFieldState = IBaseFieldState> extends React.Component<Props, State> implements IBaseField<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Global Variables
     */
    private _sessionKey;
    /**
     * Public Interface
     */
    getFieldValue: () => any;
    onFieldInit: (field: any, state: State) => void;
    onFieldLoaded: () => void;
    updateValue: (value: any) => void;
    render(): JSX.Element;
    renderField: () => JSX.Element;
    /**
     * Methods
     */
    private load;
}
