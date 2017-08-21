import { Types } from "gd-sprest";
import { IBaseFieldInfo } from ".";

/**
 * Field Information
 */
export interface IItemFormField {
    /** The form control mode. */
    controlMode?: number | Types.SPTypes.ControlMode;

    /** The internal field name. */
    name: string;

    /** The on change event */
    onChange?: (value: any) => void;

    /** The on render method */
    onRender?: (fieldInfo: IBaseFieldInfo) => void;
}

/**
 * Properties
 */
export interface IItemFormProps {
    /** The class name to apply to the item form element. */
    className?: string;

    /** The form control mode. */
    controlMode?: number | Types.SPTypes.ControlMode;

    /** The form fields. */
    fields: Array<IItemFormField>;

    /** The existing item. */
    item?: any;

    /** The list display name. */
    listName: string;

    /** The relative web url containing the list. */
    webUrl?: string;
}

/**
 * State
 */
export interface IItemFormState {
    item?: any;
}
