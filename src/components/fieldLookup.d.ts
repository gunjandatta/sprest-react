import { Types } from "gd-sprest";
import { IField, IFieldProps, IFieldState, IFieldInfo } from "../common";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react";

/**
 * Lookup Field Information
 */
interface ILookupFieldInfo extends IFieldInfo {
    allowMultipleValues: boolean;
    lookupFieldName: string;
    lookupListName: string;
    lookupWebId: string;
    showField: string;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Flag to determine if we should get all items. */
    getAllItemsFl?: boolean;

    /** Event triggered when the field value changes. */
    onChange?: (value: IDropdownOption | Array<string | number>) => void;

    /** The dropdown list properties. */
    props?: IDropdownProps;
}

/**
 * State
 */
interface State extends IFieldState {
    options?: Array<IDropdownOption>;
    fieldInfo: ILookupFieldInfo;
}

/**
 * Lookup Field
 */
interface IFieldLookup extends IField<Props, State> {
    /**
     * Event triggered after the field information is retrieved from SharePoint.
     */
    onFieldInit: (field: Types.IFieldLookup, state: IFieldState) => void;
}