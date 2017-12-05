import { IWebPartProps } from "../definitions";
/**
 * Web Part
 */
export declare class WebPart {
    private _props;
    /**
     * Constructor
     * @param props - The webpart properties.
     */
    constructor(props: IWebPartProps);
    /**
     * Methods
     */
    /**
     * Method to add the help link
     * @wpId - The webpart id.
     */
    private addHelpLink;
    /**
     * Method to get the target information
     */
    private getTargetInformation;
    /**
     * Method to render the webpart
     */
    private render;
}
