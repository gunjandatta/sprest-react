import { ITag } from "office-ui-fabric-react";
import { IWebPartListItem, IWebPartListProps, IWebPartListState, IWebPartSearchCfg } from ".";
/**
 * Search Item
 */
export interface IWebPartSearchItem extends IWebPartListItem {
    DocIcon?: string;
    FileRef?: string;
    LinkFilename?: string;
}
/**
 * Search Properties
 */
export interface IWebPartSearchProps extends IWebPartListProps {
    cfg: IWebPartSearchCfg;
}
/**
 * Search State
 */
export interface IWebPartSearchState extends IWebPartListState {
    items?: Array<IWebPartSearchItem>;
    searchFilter?: string;
    searchTerms?: Array<ITag>;
    selectedTags?: Array<ITag>;
    tagMapper?: {
        [key: string]: Array<IWebPartSearchItem>;
    };
}
