/**
 * WebPart Information
 */
export interface IWebPartInstance {
    Context: any;
    Properties: any;
    WebPart: any;
    WebPartDefinition: any;
}
/**
 * Page Common Methods
 */
export declare class Page {
    /**
     * Method to get the webpart
     * @param wpId - The webpart id.
     */
    static getWebPart(wpId: string): PromiseLike<IWebPartInstance>;
    /**
     * Method to get the webpart id for a specified element
     * @param el - The target element.
     */
    static getWebPartId(el: HTMLElement): string;
    /**
     * Method to detect if a page is being edited
     */
    static isEditMode(): boolean;
}
