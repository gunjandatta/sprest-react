import * as React from "react";
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
export class ContactsWebPart extends WebPartList {
    // Render item event
    onRenderItem = (item: IContactItem) => {
        // Return the item template
        return (
            <div key={item.Id} className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md4">{item.MCCategory}</div>
                    <div className="ms-Grid-col ms-md4">{item.Title}</div>
                    <div className="ms-Grid-col ms-md4">{item.MCPhoneNumber}</div>
                </div>
            </div>
        );
    }
}