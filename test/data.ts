import { Types, Web } from "gd-sprest";
import { WebParts } from "../src";

/**
 * Test Item Information
 */
export interface ITestItem extends Types.SP.IListItemQueryResult {
    Attachments?: boolean;
    TestBoolean?: boolean;
    TestChoice?: string;
    TestDate?: string;
    TestDateTime?: string;
    TestLookup?: Types.SP.ComplexTypes.FieldLookupValue;
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
    TestUser?: Types.SP.ComplexTypes.FieldUserValue;
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

    // Configuration
    private _cfg: WebParts.IWebPartListCfg = null;

    // List Item Entity Type Name (Required for complex field item add operation)
    private _listItemEntityTypeFullName = "";

    /**
     * Constructor
     */
    constructor(cfg: WebParts.IWebPartListCfg) {
        // Save the configuration
        this._cfg = cfg;

        // Get the web
        (new Web(cfg.WebUrl))
            // Get the list
            .Lists(cfg.ListName)
            // Execute the request
            .execute((list) => {
                // Save the list entiry full name
                this._listItemEntityTypeFullName = list.ListItemEntityTypeFullName;
            });
    }

    /**
     * Methods
     */

    // Method to load the test data
    load = (): PromiseLike<Array<ITestItem>> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the web
            (new Web(this._cfg.WebUrl))
                // Get the list
                .Lists(this._cfg.ListName)
                // Get the items
                .Items()
                // Set the query
                .query({
                    OrderBy: ["Title"],
                    Select: ["TestBoolean", "TestChoice", "TestDate", "TestLookup", "TestUrl", "Title"],
                    Top: 50
                })
                // Execute the request
                .execute((items) => {
                    // Ensure the items exist
                    if (items.results) {
                        // Resolve the request
                        resolve(items.results);
                    } else {
                        // Reject the request
                        reject();
                    }
                });
        });
    }
}