/// <reference types="react" />
import { Label, TagPicker, ITag } from "office-ui-fabric-react";
import { IWebPartFieldCfgPanel, IWebPartFieldCfgProps, IWebPartFieldCfgState } from "./types";
import { WebPartListCfg } from ".";
/**
 * WebPart Field Configuration Panel
 */
export declare class WebPartFieldCfg<Props extends IWebPartFieldCfgProps = IWebPartFieldCfgProps, State extends IWebPartFieldCfgState = IWebPartFieldCfgState> extends WebPartListCfg<Props, State> implements IWebPartFieldCfgPanel {
    _fieldLabel: Label;
    _fieldPicker: TagPicker;
    /**
     * Constructor
     * @param props - The webpart field configuration properties.
     */
    constructor(props: Props);
    /**
     * Events
     */
    /**
     * The on field picker display event
     * @param tags - The fields as an array of tags for the picker.
     */
    onFieldPickerDisplay: (tags: ITag[]) => void;
    /**
     * The render footer event
     */
    onRenderFooter: () => any;
    /**
     * Method to resolve suggestions event
     * @param filterText - The filter text.
     * @param selectedItems - The selected tags.
     */
    private onResolveSuggestions;
    /**
     * Methods
     */
    /**
     * Method to render the field property
     */
    renderField: () => JSX.Element[];
    /**
     * Method to update the state w/ the selected field(s)
     */
    private updateFields;
}
