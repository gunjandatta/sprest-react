/// <reference types="react" />
import { ITag } from "office-ui-fabric-react";
import { IWebPartSearchCfgPanel, IWebPartSearchCfgProps, IWebPartSearchCfgState } from "../../definitions";
import { WebPartFieldCfg } from ".";
/**
 * WebPart Search Configuration Panel
 */
export declare class WebPartSearchCfg<Props extends IWebPartSearchCfgProps = IWebPartSearchCfgProps, State extends IWebPartSearchCfgState = IWebPartSearchCfgState> extends WebPartFieldCfg<Props, State> implements IWebPartSearchCfgPanel {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Events
     */
    onFieldPickerDisplay: (tags: ITag[]) => void;
    onRenderFooter: () => any;
    /**
     * Methods
     */
    renderSearchPicker: () => JSX.Element;
    private updatePickerFlag;
}
