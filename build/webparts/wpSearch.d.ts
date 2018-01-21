/// <reference types="react" />
import { WebPartList, IWebPartSearchProps, IWebPartSearchState } from ".";
/**
 * WebPart Search
 */
export declare class WebPartSearch<Props extends IWebPartSearchProps = IWebPartSearchProps, State extends IWebPartSearchState = IWebPartSearchState> extends WebPartList<Props, State> {
    private _filterText;
    /**
     * Constructor
     * @param props - The webpart search properties.
     */
    constructor(props: Props);
    /**
     * Render the component
     */
    render(): JSX.Element;
    /**
     * Methods
     */
    /**
     * Method to generate the mapper
     */
    private generateMapper;
    /**
     * Method to get the items
     */
    private getItems;
    /**
     * Method to get the items by filter
     */
    private getItemsByFilter;
    /**
     * Method to get the items by tags
     */
    private getItemsByTags;
    /**
     * Method to load the documents
     */
    protected load: () => void;
    /**
     * Method to resolve the tag picker
     * @param filterText - The filter text.
     * @param tagList - The selected fields.
     */
    private onResolveSuggestions;
    /**
     * Method to update the search filter
     * @param - The search filter.
     */
    private updateSearchFilter;
    /**
     * Method to update the selected tags
     * @param tags - The selected fields.
     */
    private updateSelectedTags;
}
