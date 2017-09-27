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
    /**
     * The filter text
     */
    private _filterText;
    /**
     * Constructor
     */
    constructor(props: ISPPeoplePickerProps);
    /**
     * Method to convert the personas to a field value
     * @param personas - The persona values.
     * @param allowMultiple - Flag to determine if multiple user selection is allowed.
     */
    static convertToFieldValue: (personas: IPersonaProps[], allowMultiple?: boolean) => any;
    render(): JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to convert the user to persona value
     * @param users - An array of field user values.
     */
    private convertToPersonas;
    /**
     * Method executed when the value changes
     * @param personas - The persona values.
     */
    private onChange;
    /**
     * Method to search for the user
     * @param filterText - The filtered text.
     * @param personas - The selected users.
     */
    private search;
}
