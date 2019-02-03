import { SP } from "gd-sprest";
import { IPeoplePickerProps, IPersonaProps } from "office-ui-fabric-react";
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
    fieldValue?: Array<SP.Data.UserInfoItem> | Array<number>;
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
