import { Types } from "gd-sprest";
import { Label, ILabelProps, TagPicker, ITag, ITagPickerProps } from "office-ui-fabric-react";
import {
    IWebPartListCfgPanel,
    IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState,
    IWebPartListItem, IWebPartListProps, IWebPartListState
} from ".";

/**
 * Field Configuration
 */
export interface IWebPartFieldCfg extends IWebPartListCfg {
    Fields?: Array<Types.IFieldResult>;
}

/**
 * Field Configuration Panel
 */
export interface IWebPartFieldCfgPanel extends IWebPartListCfgPanel {
    _fieldLabel?: Label;
    _fieldPicker?: TagPicker;

    onFieldPickerDisplay?: (tags: Array<ITag>) => void;
    renderField?: () => Array<JSX.Element>;
}

/**
 * Field Configuration Properties
 */
export interface IWebPartFieldCfgProps extends IWebPartListCfgProps {
    cfg: IWebPartFieldCfg;
    fieldLabel?: ILabelProps;
    fieldPicker?: ITagPickerProps;
}

/**
 * Field Configuration State
 */
export interface IWebPartFieldCfgState extends IWebPartListCfgState {
    cfg: IWebPartFieldCfg;
    list: Types.IListQueryResult;
}

/**
 * Field Properties
 */
export interface IWebPartFieldProps extends IWebPartListProps {
    cfg: IWebPartFieldCfg;
}

/**
 * Field State
 */
export interface IWebPartFieldState extends IWebPartListState {
    items?: Array<IWebPartListItem>;
}
