/// <reference types="react" />
import { IWebPartSearchProps, IWebPartSearchState } from "../../definitions";
import { WebPartList } from ".";
/**
 * WebPart Search
 */
export declare class WebPartSearch<Props extends IWebPartSearchProps = IWebPartSearchProps, State extends IWebPartSearchState = IWebPartSearchState> extends WebPartList<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    render(): JSX.Element;
    /**
     * Methods
     */
    private generateMapper;
    private getItems;
    protected load: () => void;
    private onResolveSuggestions;
    private updateSelectedTags;
}
