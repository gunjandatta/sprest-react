import { Types } from "gd-sprest";
import { IDropdownOption } from "office-ui-fabric-react";
import { IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from ".";
/**
 * List Configuration
 */
export interface IWebPartListCfg extends IWebPartCfg {
    ListName: string;
    WebUrl: string;
}
/**
 * List Configuration Properties
 */
export interface IWebPartListCfgProps extends IWebPartCfgProps {
    cfg: IWebPartListCfg;
}
/**
 * List Configuration State
 */
export interface IWebPartListCfgState extends IWebPartCfgState {
    cfg: IWebPartListCfg;
    lists?: Array<Types.IListQueryResult>;
    options?: Array<IDropdownOption>;
}
