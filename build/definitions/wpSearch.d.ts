import { Types } from "gd-sprest";
import { ITag } from "office-ui-fabric-react";
import { IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState, IWebPartListItem, IWebPartListProps, IWebPartListState } from ".";
/**
 * Search Configuration
 */
export interface IWebPartSearchCfg extends IWebPartListCfg {
    Fields?: Array<Types.IFieldResult>;
    TagPickerFl?: boolean;
}
/**
 * Search Item
 */
export interface IWebPartSearchItem extends IWebPartListItem {
    DocIcon?: string;
    FileRef?: string;
    LinkFilename?: string;
}
/**
 * Search Configuration Properties
 */
export interface IWebPartSearchCfgProps extends IWebPartListCfgProps {
    cfg: IWebPartSearchCfg;
}
/**
 * Search Configuration State
 */
export interface IWebPartSearchCfgState extends IWebPartListCfgState {
    cfg: IWebPartSearchCfg;
    list: Types.IListQueryResult;
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
    tagMapper?: object;
}
