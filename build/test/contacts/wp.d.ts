/// <reference types="react" />
import { Types } from "gd-sprest";
import { WebPartList } from "../../src";
/**
 * Contact Item
 */
export interface IContactItem extends Types.IListItemQueryResult {
    MCCategory: string;
    MCPhoneNumber: string;
    Title: string;
}
/**
 * Contacts WebPart
 */
export declare class ContactsWebPart extends WebPartList {
    onRenderItem: (item: IContactItem) => JSX.Element;
}
