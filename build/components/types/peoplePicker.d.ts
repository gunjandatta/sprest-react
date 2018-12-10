import { SP } from "gd-sprest-def";
import { IPeoplePickerProps, IPersonaProps } from "office-ui-fabric-react";
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
