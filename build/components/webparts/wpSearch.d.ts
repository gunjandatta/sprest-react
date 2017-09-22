/// <reference types="react" />
import { IWebPartSearchProps, IWebPartSearchState } from "../../definitions";
import { WebPartList } from ".";
/**
 * WebPart Search
 */
export declare class WebPartSearch<Props extends IWebPartSearchProps = IWebPartSearchProps, State extends IWebPartSearchState = IWebPartSearchState> extends WebPartList<Props, State> {
    private _filterText;
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
    private getItemsByFilter;
    private getItemsByTags;
    protected load: () => void;
    private onResolveSuggestions;
    private updateSearchFilter;
    private updateSelectedTags;
}
