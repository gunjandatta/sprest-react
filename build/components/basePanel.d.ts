/// <reference types="react" />
import * as React from "react";
import { IBasePanelProps, IBasePanelState } from "../definitions";
/**
 * Base Panel
 */
export declare class BasePanel extends React.Component<IBasePanelProps, IBasePanelState> {
    /**
     * Constructor
     */
    constructor(props: IBasePanelProps);
    /**
     * Public Interface
     */
    hide: () => void;
    render(): JSX.Element;
    show: () => void;
}
