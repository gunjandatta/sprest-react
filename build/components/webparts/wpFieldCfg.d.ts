/// <reference types="react" />
import { Label, TagPicker, ITag } from "office-ui-fabric-react";
import { IWebPartFieldCfgPanel, IWebPartFieldCfgProps, IWebPartFieldCfgState } from "../../definitions";
import { WebPartListCfg } from ".";
/**
 * WebPart Field Configuration Panel
 */
export declare class WebPartFieldCfg<Props extends IWebPartFieldCfgProps = IWebPartFieldCfgProps, State extends IWebPartFieldCfgState = IWebPartFieldCfgState> extends WebPartListCfg<Props, State> implements IWebPartFieldCfgPanel {
    _fieldLabel: Label;
    _fieldPicker: TagPicker;
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Events
     */
    onFieldPickerDisplay: (tags: ITag[]) => void;
    onRenderFooter: () => any;
    private onResolveSuggestions;
    /**
     * Methods
     */
    renderField: () => JSX.Element[];
    private updateFields;
}
