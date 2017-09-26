/// <reference types="react" />
import { ITag } from "office-ui-fabric-react";
import { IWebPartFieldCfg, IWebPartFieldCfgPanel, IWebPartFieldCfgProps, IWebPartFieldCfgState, IWebPartListItem, IWebPartListProps, IWebPartListState } from ".";
/**
 * Search Configuration
 */
export interface IWebPartSearchCfg extends IWebPartFieldCfg {
    TagPickerFl?: boolean;
}
/**
 * Search Configuration Panel
 */
export interface IWebPartSearchCfgPanel extends IWebPartFieldCfgPanel {
    renderSearchPicker: () => JSX.Element;
}
/**
 * Search Configuration Properties
 */
export interface IWebPartSearchCfgProps extends IWebPartFieldCfgProps {
    cfg: IWebPartSearchCfg;
}
/**
 * Search Configuration State
 */
export interface IWebPartSearchCfgState extends IWebPartFieldCfgState {
    cfg: IWebPartSearchCfg;
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
