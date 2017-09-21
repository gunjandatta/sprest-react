/**
 * Web Part Configuration
 */
export interface IWebPartCfg {
    WebPartId?: string;
}

/**
 * Web Part Configuration Properties
 */
export interface IWebPartCfgProps {
    cfg?: IWebPartCfg;
    cfgElementId?: string;
}

/**
 * Web Part Configuration State
 */
export interface IWebPartCfgState {
    cfg?: IWebPartCfg;
}