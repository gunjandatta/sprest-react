/// <reference types="react" />
import { IWebPartSearchCfgProps, IWebPartSearchCfgState } from "../../definitions";
import { WebPartListCfg } from ".";
/**
 * WebPart Search Configuration
 */
export declare class WebPartSearchCfg<Props extends IWebPartSearchCfgProps = IWebPartSearchCfgProps, State extends IWebPartSearchCfgState = IWebPartSearchCfgState> extends WebPartListCfg<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Events
     */
    onListChanged: (state: State) => void;
    onListsLoaded: (state: State) => void;
    onRenderFooter: () => JSX.Element;
    private onResolveSuggestions;
    /**
     * Methods
     */
    private updateFields;
    private updatePickerFlag;
}
