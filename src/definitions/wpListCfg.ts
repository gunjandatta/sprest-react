import { IWebPartCfg, IWebPartCfgProps, IWebPartCfgState } from ".";

/**
 * List Web Part Configuration Properties
 */
export interface IWebPartListCfgProps extends IWebPartCfgProps {
    cfg?: IWebPartCfg;
    cfgElementId: string;
}

/**
 * List Web Part Configuration State
 */
export interface IWebPartListCfgState extends IWebPartCfgState {
    cfg?: IWebPartCfg;
}