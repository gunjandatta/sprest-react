import { ITag } from "@fluentui/react/lib/Pickers";
import {
    WebPartList, IWebPartListItem, IWebPartListProps, IWebPartListState,
    IWebPartSearchCfg
} from ".";

/**
 * WebPart Search
 */
export class WebPartSearch<Props extends IWebPartSearchProps = IWebPartSearchProps, State extends IWebPartSearchState = IWebPartSearchState> extends WebPartList<Props, State> { }

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
    tagMapper?: { [key: string]: Array<IWebPartSearchItem> };
}