/// <reference types="react" />
import * as React from "react";
import { IBasePanelProps, IBasePanelState } from "./types";
/**
 * Base Panel
 */
export declare class BasePanel<Props extends IBasePanelProps = IBasePanelProps, State extends IBasePanelState = IBasePanelState> extends React.Component<Props, State> {
    /**
     * Constructor
     * @param props - The base panel properties.
     */
    constructor(props: Props);
    /**
     * Public Interface
     */
    /**
     * Method to hide the panel
     */
    hide: () => void;
    /**
     * Method to render the component
     */
    render(): JSX.Element;
    /**
     * Method to show the panel
     */
    show: () => void;
}
