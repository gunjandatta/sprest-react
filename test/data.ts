import { Promise } from "es6-promise";
import { List, Types } from "gd-sprest";

/**
 * Test Item Information
 */
export interface ITestItem extends Types.IListItemResult {
    Attachments?: boolean;
    TestBoolean?: boolean;
    TestChoice?: string;
    TestDate?: string;
    TestDateTime?: string;
    TestLookup?: Types.ComplexTypes.FieldLookupValue;
    TestLookupId?: string | number;
    TestMultiChoice?: string;
    TestMultiLookup?: string;
    TestMultiLookupId?: string;
    TestMultiUser?: { results: Array<number> };
    TestMultiUserId?: Array<number>;
    TestNote?: string;
    TestNumberDecimal?: number;
    TestNumberInteger?: number;
    TestUrl?: string;
    TestUser?: Types.ComplexTypes.FieldUserValue;
    TestUserId?: string | number;
    Title?: string;
}

/**
 * Data source for the test project
 */
export class DataSource {
    /**
     * Properties
     */

    // List Name
    static ListName = "SPReact";

    // List Item Entity Type Name (Required for complex field item add operation)
    static ListItemEntityTypeFullName = "SP.Data.SPReactListItem";

    /**
     * Methods
     */

    // Method to load the test data
    static load = (itemId?:number): PromiseLike<ITestItem | Array<ITestItem>> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the list
            (new List(DataSource.ListName))
                // Get the items
                .Items()
                // Set the query
                .query({
                    Filter: itemId > 0 ? "ID eq " + itemId : "",
                    Expand: ["AttachmentFiles", "TestLookup", "TestMultiLookup", "TestMultiUser", "TestUser"],
                    OrderBy: ["Title"],
                    Select: ["*", "Attachments", "AttachmentFiles", "TestLookup/ID", "TestLookup/Title", "TestMultiLookup/ID", "TestMultiLookup/Title", "TestMultiUser/ID", "TestMultiUser/Title", "TestUser/ID", "TestUser/Title"],
                    Top: 50
                })
                // Execute the request
                .execute((items) => {
                    // Ensure the items exist
                    if (items.results) {
                        // Resolve the request
                        resolve(itemId > 0 ? items.results[0] : items.results);
                    } else {
                        // Reject the request
                        reject();
                    }
                });
        });
    }

    // Method to save a test item
    static save = (item: ITestItem): PromiseLike<ITestItem> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if this is an existing item
            if (item.update) {
                // Update the item
                item.update({
                    TestBoolean: item.TestBoolean,
                    TestChoice: item.TestChoice,
                    TestDate: item.TestDate,
                    TestDateTime: item.TestDateTime,
                    TestLookupId: item.TestLookupId,
                    TestMultiChoice: item.TestMultiChoice,
                    TestMultiLookupId: item.TestMultiLookupId,
                    TestMultiUserId: item.TestMultiUserId,
                    TestNote: item.TestNote,
                    TestNumberDecimal: item.TestNumberDecimal,
                    TestNumberInteger: item.TestNumberInteger,
                    TestUrl: item.TestUrl,
                    TestUserId: item.TestUserId
                } as ITestItem)
                    // Execute the request
                    .execute((request) => {
                        // Ensure the update was successful
                        if(request.response == "") {
                            // Resolve the request
                            resolve(item);
                        } else {
                            // Reject the request
                            reject(request.response);
                        }
                    });
            } else {
                // Set the item metadata - This is required for complex field updates
                item["__metadata"] = { type: DataSource.ListItemEntityTypeFullName };

                // Get the list
                (new List(DataSource.ListName))
                    // Get the items
                    .Items()
                    // Add the item
                    .add(item)
                    // Execute the request
                    .execute((item: ITestItem) => {
                        // Load the item again to get the expanded field values
                        DataSource.load(item.Id).then((item: ITestItem) => {
                            // Resolve the request
                            resolve(item);
                        })
                    });
            }
        });
    }
}