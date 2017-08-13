/// <reference types="react" />
import * as React from "react";
import { Types } from "gd-sprest";
import { IPeoplePickerProps, IPersonaProps } from "office-ui-fabric-react";
/**
 * Properties
 */
export interface ISPPeoplePickerProps {
    allowMultiple?: boolean;
    fieldValue?: Array<Types.ComplexTypes.FieldUserValue>;
    props?: IPeoplePickerProps;
}
/**
 * State
 */
export interface ISPPeoplePickerState {
    fieldValue?: number | Array<number>;
    personas?: Array<IPersonaProps>;
}
/**
 * SharePoint People Picker
 */
export declare class SPPeoplePicker extends React.Component<ISPPeoplePickerProps, ISPPeoplePickerState> {
    /**
     * Global Variables
     */
    private _filterText;
    /**
     * Constructor
     */
    constructor(props: ISPPeoplePickerProps);
    render(): JSX.Element;
    /**
     * Methods
     */
    private convertToFieldValue;
    private convertToPersonas;
    private onChange;
    private search;
}
