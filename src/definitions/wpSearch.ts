import { Types } from "gd-sprest";
import { ITag } from "office-ui-fabric-react";
import { IWebPartListCfg, IWebPartListCfgProps, IWebPartListCfgState } from ".";

/**
 * Search Configuration
 */
export interface IWebPartSearchCfg extends IWebPartListCfg {
    Fields: Array<Types.IFieldResult>;
}

/**
 * Search Item
 */
export interface IWebPartSearchItem extends Types.IListItemQueryResult {
    DocIcon: string;
    FileRef: string;
    LinkFilename: string;
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
export interface IWebPartSearchProps {
    cfg: IWebPartSearchCfg;
    className?: string;
}

/**
 * Search State
 */
export interface IWebPartSearchState {
    items?: Array<IWebPartSearchItem>;
    searchTerms?: Array<ITag>;
    selectedTags?: Array<ITag>;
    tagMapper?: object;
}
