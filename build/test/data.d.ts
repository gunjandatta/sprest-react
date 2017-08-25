import { Types } from "gd-sprest";
import { IWebPartListCfg } from "../src";
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
    TestMultiUser?: {
        results: Array<number>;
    };
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
export declare class DataSource {
    /**
     * Properties
     */
    private _cfg;
    private _listItemEntityTypeFullName;
    /**
     * Constructor
     */
    constructor(cfg: IWebPartListCfg);
    /**
     * Methods
     */
    load: (itemId?: number) => PromiseLike<ITestItem | ITestItem[]>;
    save: (item: ITestItem) => PromiseLike<ITestItem>;
}
