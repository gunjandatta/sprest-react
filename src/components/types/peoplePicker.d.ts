import { Types } from "gd-sprest";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
import { IPeoplePickerProps } from "@fluentui/react/lib/Pickers";
import { Component } from "react";

/**
 * SharePoint People Picker
 */
export class SPPeoplePicker extends Component<ISPPeoplePickerProps, ISPPeoplePickerState> { }

/**
 * Properties
 */
export interface ISPPeoplePickerProps {
    allowMultiple?: boolean;
    allowGroups?: boolean;
    fieldValue?: Array<Types.SP.Data.UserInfoItem> | Array<number>;
    props?: IPeoplePickerProps;
    webUrl?: string;
}

/**
 * State
 */
export interface ISPPeoplePickerState {
    allowGroups?: boolean;
    fieldValue?: number | Array<number>;
    personas?: Array<IPersonaProps>;
}
