/// <reference types="react" />
import * as React from "react";
import { IBasePanelProps, IBasePanelState } from "../../definitions";
/**
 * Base Panel
 */
export declare class BasePanel<Props extends IBasePanelProps = IBasePanelProps, State extends IBasePanelState = IBasePanelState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props);
    /**
     * Public Interface
     */
    hide: () => void;
    render(): JSX.Element;
    show: () => void;
}
