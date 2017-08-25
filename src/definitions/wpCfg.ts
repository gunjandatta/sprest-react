import { IWebPartCfg } from ".";

/**
 * Web Part Configuration Properties
 */
export interface IWebPartConfigurationProps {
    cfg?: IWebPartCfg;
    cfgElementId: string;
}

/**
 * Web Part Configuration State
 */
export interface IWebPartConfigurationState {
    cfg?: IWebPartCfg;
}