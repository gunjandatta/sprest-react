/// <reference types="react" />
import * as React from "react";
import { Props, State } from "./basePanel.d";
/**
 * Base Panel
 */
export declare class BasePanel extends React.Component<Props, State> {
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
