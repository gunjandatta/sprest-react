/// <reference types="react" />
import * as React from "react";
import { IField, IFieldInfo, IFieldProps, IFieldState } from "./field.d";
export { IField, IFieldInfo, IFieldProps, IFieldState };
/**
 * Base Field
 */
export declare abstract class Field<Props extends IFieldProps, State extends IFieldState> extends React.Component<Props, State> implements IField<Props, State> {
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
    abstract renderField(): any;
    getFieldValue: () => any;
    onFieldInit: (field: any, state: State) => void;
    onFieldLoaded: () => void;
    updateValue: (value: any) => void;
    render(): any;
    /**
     * Methods
     */
    private load;
}
