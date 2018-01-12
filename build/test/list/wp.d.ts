/// <reference types="react" />
import { Types } from "gd-sprest";
import { WebPartSearch, IWebPartSearchProps, IWebPartSearchState } from "../../src";
/**
 * List Item Information
 */
export interface IListItem extends Types.IListItemQueryResult {
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
    TestUrl?: Types.ComplexTypes.FieldUrlValue;
    TestUser?: Types.ComplexTypes.FieldUserValue;
    TestUserId?: string | number;
    Title?: string;
}
/**
 * State
 */
export interface IListWebPartState extends IWebPartSearchState {
    controlMode?: number;
    errorMessage?: string;
    item?: IListItem;
}
/**
 * List WebPart
 */
export declare class ListWebpart extends WebPartSearch<IWebPartSearchProps, IListWebPartState> {
    private _itemForm;
    private _panel;
    /**
     * Constructor
     */
    constructor(props: any);
    onRenderContainer: (items: any) => JSX.Element;
    onRenderItem: (item: IListItem) => JSX.Element;
    /**
     * Methods
     */
    private editItem;
    private getItem;
    private renderFooter;
    private save;
    private viewItem;
}
