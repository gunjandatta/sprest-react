/**
 * WebPart Information
 */
export interface IWebPartInfo {
    Context: any;
    Properties: any;
    WebPart: any;
    WebPartDefinition: any;
}
/**
 * Page Common Methods
 */
export declare class Page {
    static getWebPart(wpId: string): PromiseLike<IWebPartInfo>;
    static getWebPartId(el: HTMLElement): string;
    static isEditMode(): boolean;
    static isWikiPage(): void;
}
