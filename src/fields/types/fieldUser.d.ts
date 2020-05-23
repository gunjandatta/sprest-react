import { Helper } from "gd-sprest";
import { ILabelProps } from "@fluentui/react/lib/Label";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
import { IPeoplePickerProps } from "@fluentui/react/lib/Pickers";
import { BaseField, IBaseField, IBaseFieldProps, IBaseFieldState } from ".";

/**
 * User Field
 */
export class FieldUser extends BaseField<IFieldUserProps, IFieldUserState> { }

/**
 * User Field Properties
 */
export interface IFieldUserProps extends IBaseFieldProps {
    /** The properties for the user field label. */
    lblProps?: ILabelProps;

    /** Event triggered when the field value changes. */
    onChange?: (value: number | Array<number>) => void;

    /** The properties of the people picker. */
    pickerProps?: IPeoplePickerProps;
}

/**
 * User Field State
 */
export interface IFieldUserState extends IBaseFieldState {
    /** The field information */
    fieldInfo: Helper.IListFormUserFieldInfo;
}

/**
 * User Field
 */
export interface IFieldUser extends IBaseField<IFieldUserProps, IFieldUserState> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldLoaded?: (info: any, state: IBaseFieldState) => void;
}