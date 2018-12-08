import { IPanelProps } from "office-ui-fabric-react";

/**
 * Base Panel Properties
 */
export interface IBasePanelProps extends IPanelProps {
    ref?: (panel: any) => void;
}

/**
 * Base Panel State
 */
export interface IBasePanelState {
    visible?: boolean;
}

