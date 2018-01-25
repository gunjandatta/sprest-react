/// <reference types="react" />
import { Types } from "gd-sprest";
import { Label, ILabelProps, TagPicker, ITag, ITagPickerProps } from "office-ui-fabric-react";
import { IWebPartListCfgPanel, IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState } from ".";
/**
 * Field Configuration
 */
export interface IWebPartFieldCfg extends IWebPartListCfg {
    Fields?: Array<Types.SP.IFieldResult>;
}
/**
 * Field Configuration Panel
 */
export interface IWebPartFieldCfgPanel extends IWebPartListCfgPanel {
    _fieldLabel: Label;
    _fieldPicker: TagPicker;
    onFieldPickerDisplay: (tags: Array<ITag>) => void;
    renderField: () => Array<JSX.Element>;
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
}
