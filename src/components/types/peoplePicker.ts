import { Types } from "gd-sprest";
import { IPeoplePickerProps, IPersonaProps } from "office-ui-fabric-react";

/**
 * Properties
 */
export interface ISPPeoplePickerProps {
    allowMultiple?: boolean;
    allowGroups?: boolean;
    fieldValue?: Array<Types.SP.ComplexTypes.FieldUserValue | number>;
    props?: IPeoplePickerProps;
}

/**
 * State
 */
export interface ISPPeoplePickerState {
    allowGroups?: boolean;
    fieldValue?: number | Array<number>;
    personas?: Array<IPersonaProps>;
}
