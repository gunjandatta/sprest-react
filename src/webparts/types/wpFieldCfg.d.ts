import { Types } from "gd-sprest";
import { ILabel, ILabelProps, TagPicker, IBasePicker, ITag, ITagPickerProps } from "office-ui-fabric-react";
import {
    WebPartListCfg, IWebPartListCfgPanel,
    IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState
} from ".";

/**
 * WebPart Field Configuration Panel
 */
export class WebPartFieldCfg<Props extends IWebPartFieldCfgProps = IWebPartFieldCfgProps, State extends IWebPartFieldCfgState = IWebPartFieldCfgState> extends WebPartListCfg<Props, State> implements IWebPartFieldCfgPanel {
    _fieldLabel: ILabel;
    _fieldPicker: IBasePicker<ITag>;

    onFieldPickerDisplay: (tags: Array<ITag>) => void;
    renderField: () => Array<JSX.Element>;
}

/**
 * Field Configuration Panel
 */
export interface IWebPartFieldCfgPanel extends IWebPartListCfgPanel {
    _fieldLabel: ILabel;
    _fieldPicker: IBasePicker<ITag>;

    onFieldPickerDisplay: (tags: Array<ITag>) => void;
    renderField: () => Array<JSX.Element>;
}

/**
 * Field Configuration
 */
export interface IWebPartFieldCfg extends IWebPartListCfg {
    Fields?: Array<Types.SP.Field>;
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