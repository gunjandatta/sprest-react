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
    static getWebPart(wpId: string): PromiseLike<IWebPartInstance>;
    static getWebPartId(el: HTMLElement): string;
    static isEditMode(): boolean;
    static isWikiPage(): void;
}
