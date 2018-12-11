import { IPanelProps } from "office-ui-fabric-react";
import { Component } from "react";

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

/**
 * Base Panel
 */
export interface IBasePanel<Props extends IBasePanelProps = IBasePanelProps, State extends IBasePanelState = IBasePanelState> { }

/**
 * Base Panel
 */
export class BasePanel<Props extends IBasePanelProps = IBasePanelProps, State extends IBasePanelState = IBasePanelState> extends Component<Props, State> implements IBasePanel<Props, State> { }