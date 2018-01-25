/// <reference types="react" />
import { ITag } from "office-ui-fabric-react";
import { IWebPartSearchCfgProps, IWebPartSearchCfgState } from "./types";
import { WebPartFieldCfg } from ".";
/**
 * WebPart Search Configuration Panel
 */
export declare class WebPartSearchCfg<Props extends IWebPartSearchCfgProps = IWebPartSearchCfgProps, State extends IWebPartSearchCfgState = IWebPartSearchCfgState> extends WebPartFieldCfg<Props, State> {
    /**
     * Events
     */
    /**
     * The field picker display event
     * @param tags - An array of fields used for the field picker.
     */
    onFieldPickerDisplay: (tags: ITag[]) => void;
    /**
     * The render footer method
     */
    onRenderFooter: () => any;
    /**
     * Methods
     */
    /**
     * Method to render the picker checkbox
     */
    renderSearchPicker: () => JSX.Element;
    /**
     * Method to update the
     * @param ev - The checkbox click event.
     * @param checked - The value of the checkbox.
     */
    private updatePickerFlag;
}
