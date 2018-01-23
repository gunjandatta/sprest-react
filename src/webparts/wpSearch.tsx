import * as React from "react";
import { Helper, SPTypes, Types, Web } from "gd-sprest";
import { Link, SearchBox, Spinner, TagPicker, ITag } from "office-ui-fabric-react";
import {
    WebPartList,
    IWebPartSearchItem, IWebPartSearchProps, IWebPartSearchState
} from ".";

/**
 * WebPart Search
 */
export class WebPartSearch<Props extends IWebPartSearchProps = IWebPartSearchProps, State extends IWebPartSearchState = IWebPartSearchState> extends WebPartList<Props, State> {
    private _filterText: string = null;

    /**
     * Constructor
     * @param props - The webpart search properties.
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            items: null,
            lastRefresh: new Date(Date.now()),
            searchFilter: "",
            searchTerms: [],
            selectedTags: [],
            tagMapper: {}
        } as State;

        // Set the query
        this._query = {
            Expand: [],
            GetAllItems: false,
            OrderBy: ["Title"],
            Select: [],
            Top: 500
        };
    }

    /**
     * Render the component
     */
    render() {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Return a spinner
            return (
                <Spinner label="Loading the items..." />
            );
        }

        // Return the items
        return (
            <div className={(this.props.className || "")}>
                {
                    this.props.cfg.TagPickerFl ?
                        <TagPicker
                            onChange={this.updateSelectedTags}
                            onResolveSuggestions={this.onResolveSuggestions}
                            pickerSuggestionsProps={{
                                loadingText: "Loading the results",
                                noResultsFoundText: "No results were found"
                            }}
                        />
                        :
                        <SearchBox
                            onChange={this.updateSearchFilter}
                            onSearch={this.updateSearchFilter}
                        />
                }
                {this.onRenderContainer(this.getItems())}
            </div>
        );
    }

    /**
     * Methods
     */

    /**
     * Method to generate the mapper
     */
    private generateMapper = (items: Types.IResults<Types.IListItemQueryResult>) => {
        let searchTerms: Array<ITag> = [];
        let tagMapper = {};

        // Ensure the items and fields exist
        if (items.results && this.props.cfg.Fields) {
            // Parse the items
            for (let i = 0; i < items.results.length; i++) {
                let item = items.results[i];

                // Parse the searchable fields
                for (let j = 0; j < this.props.cfg.Fields.length; j++) {
                    let field = this.props.cfg.Fields[j];
                    let fieldValue = item[field.InternalName];

                    // Ensure the field value exists
                    if (fieldValue == null || fieldValue == "") { continue; }

                    // Parse the field values
                    let fieldValues = fieldValue.results ? fieldValue.results : [fieldValue];
                    for (let k = 0; k < fieldValues.length; k++) {
                        let fldLookup: Types.IFieldLookup = null;
                        let fldUser: Types.IFieldUser = null;
                        fieldValue = fieldValues[k];

                        // Update the field value based on the type
                        if (fieldValue) {
                            switch (field.FieldTypeKind) {
                                case SPTypes.FieldType.Choice:
                                case SPTypes.FieldType.MultiChoice:
                                    break;
                                case SPTypes.FieldType.Lookup:
                                    // Set the field
                                    fldLookup = field as Types.IFieldLookup;
                                    break;
                                case SPTypes.FieldType.URL:
                                    // Update the field value
                                    fieldValue = (item[field.InternalName] as Types.ComplexTypes.FieldUrlValue).Description;
                                    break;
                                case SPTypes.FieldType.User:
                                    // Set the field
                                    fldUser = field as Types.IFieldUser;
                                    break;
                                default:
                                    // This is a managed metadata field
                                    fieldValue = fieldValue.split("|")[0];
                                    break;
                            }
                        }

                        // Parse the results
                        let results = fieldValue.results || [fieldValue];
                        for (let i = 0; i < results.length; i++) {
                            let result = results[i];

                            // See if this is a lookup field
                            if (fldLookup) {
                                // Update the value
                                result = result ? result[fldLookup.LookupField] : result;
                            }

                            // See if this is a user field
                            if (fldUser) {
                                // Update the value
                                result = result ? result["Title"] : result;
                            }

                            // Ensure a value exists
                            if (result == null || result == "") { continue; }

                            // Add the index
                            if (tagMapper[result] == null) {
                                // Add the value
                                tagMapper[result] = [item];

                                // Add the search term
                                searchTerms.push({
                                    key: result.toLowerCase(),
                                    name: result
                                });
                            } else {
                                // Add the value
                                tagMapper[result].push(item);
                            }
                        }
                    }
                }
            }
        }

        // Sort the search terms
        searchTerms.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });

        // Update the state
        this.setState({
            items: items.results || [],
            lastRefresh: new Date(Date.now()),
            searchTerms,
            selectedTags: [],
            tagMapper
        } as IWebPartSearchState);
    }

    /**
     * Method to get the items
     */
    private getItems = () => {
        // Determine if we are using the picker
        if (this.props.cfg.TagPickerFl) {
            // Return the items by the tags
            return this.getItemsByTags();
        }

        // Return the items by the filter
        return this.getItemsByFilter();
    }

    /**
     * Method to get the items by filter
     */
    private getItemsByFilter = () => {
        // Ensure a filter exists
        if (this.state.searchFilter) {
            let data = {};
            let filterText = this.state.searchFilter.toLowerCase();
            let items = [];

            // Parse the tag names
            for (let tagName in this.state.tagMapper) {
                // See if this tag name contains this filter
                if (tagName.toLowerCase().indexOf(filterText) >= 0) {
                    let tagItems = this.state.tagMapper[tagName] as Array<IWebPartSearchItem>;

                    // Parse the items for this tag
                    for (let i = 0; i < tagItems.length; i++) {
                        let item = tagItems[i];

                        // Ensure we haven't already added this item
                        if (data[item.Id] == null) {
                            // Add the item
                            data[item.Id] = item;
                        }
                    }
                }
            }

            // Parse the data
            for (let id in data) {
                // Add the item
                items.push(data[id]);
            }

            // Return the items
            return items;
        }

        // Return the items
        return this.state.items;
    }

    /**
     * Method to get the items by tags
     */
    private getItemsByTags = () => {
        // Ensure tags exist
        if (this.state.selectedTags.length > 0) {
            let data = {};
            let items: Array<IWebPartSearchItem> = [];

            // Parse the selected tags
            for (let i = 0; i < this.state.selectedTags.length; i++) {
                let newData = {};
                let tag = this.state.selectedTags[i];

                // Parse the items for this tag
                for (let j = 0; j < this.state.tagMapper[tag.name].length; j++) {
                    let item = this.state.tagMapper[tag.name][j] as IWebPartSearchItem;

                    // See if this is the first tag, or if the data contains this item id
                    if (i == 0 || data[item.Id]) {
                        // Keep this item
                        newData[item.Id] = item;
                    }
                }

                // Update the documents
                data = newData;
            }

            // Parse the data
            for (let id in data) {
                // Add the item
                items.push(data[id]);
            }

            // Return the items
            return items;
        }

        // Return the items
        return this.state.items;
    }

    /**
     * Method to load the documents
     */
    protected load = () => {
        // Include the id field
        this._query.Select.push("ID");

        // See if we are loading the items from cache
        if (this._cacheFl) {
            // See data from cache
            let cache = sessionStorage.getItem(this._key);
            if (cache) {
                // Convert the items back to an object
                let items = cache ? (Helper.parse(cache) as any) : null;
                items = items ? items.results : null;
                if (items) {
                    // Check the last refresh
                    let diff = Math.abs(((new Date(Date.now())).getTime() - this.state.lastRefresh.getTime()) / 1000);
                    if (diff < this._cacheTimeout) {
                        // Generate the mapper
                        this.generateMapper(items as any);
                        return;
                    }
                }

                // Clear the storage
                sessionStorage.removeItem(this._key);
            }
        }

        // Ensure fields exist
        if (this.props.cfg.Fields) {
            // Parse the search fields
            for (let i = 0; i < this.props.cfg.Fields.length; i++) {
                let field = this.props.cfg.Fields[i];

                // Add the field, based on the type
                switch (field.FieldTypeKind) {
                    case SPTypes.FieldType.Lookup:
                        // Expand the lookup information
                        this._query.Expand.push(field.InternalName);
                        this._query.Select.push(field.InternalName + "/" + (field as Types.IFieldLookup).LookupField);
                        break;
                    case SPTypes.FieldType.User:
                        // Expand the user information
                        this._query.Expand.push(field.InternalName);
                        this._query.Select.push(field.InternalName + "/ID");
                        this._query.Select.push(field.InternalName + "/Title");
                        break;
                    default:
                        // Select the field
                        this._query.Select.push(field.InternalName);
                        break;
                }
            }
        }

        // Ensure the list name exists
        if (this.props.cfg.ListName) {
            // Load the documents
            (new Web(this.props.cfg.WebUrl))
                // Get the list
                .Lists(this.props.cfg.ListName)
                // Get the items
                .Items()
                // Query the list
                .query(this._query)
                // Execute the request
                .execute(items => {
                    // See if we are caching the results
                    if (this._cacheFl) {
                        // Save the items to cache
                        sessionStorage.setItem(this._key, items.stringify());
                    }

                    // Generate the mapper
                    this.generateMapper(items);
                });
        }
    }

    /**
     * Method to resolve the tag picker
     * @param filterText - The filter text.
     * @param tagList - The selected fields.
     */
    private onResolveSuggestions = (filterText: string, tagList: Array<ITag>): PromiseLike<Array<ITag>> => {
        // Save the filter
        this._filterText = (filterText || "").toLowerCase();

        // Return a promise
        return new Promise((resolve, reject) => {
            // Wait for the user to finish typing
            setTimeout(() => {
                let tags: Array<ITag> = [];

                // See if the user is still typing
                if (this._filterText != filterText.toLowerCase()) { return; }

                // Ensure the filter exists
                if (this._filterText) {
                    // Filter the search terms
                    tags = this.state.searchTerms.filter((term: ITag) => {
                        return term.key.indexOf(this._filterText) >= 0;
                    });

                    // Parse the tag list
                    for (let i = 0; i < tagList.length; i++) {
                        let tag = tagList[i];

                        // Parse the tags
                        for (let j = 0; j < tags.length; j++) {
                            if (tag.key == tags[j].key) {
                                // Remove this tag
                                tags.splice(j, 1);
                                break;
                            }
                        }
                    }
                }

                // Resolve the promise
                resolve(tags);
            }, 500);
        });
    }

    /**
     * Method to update the search filter
     * @param - The search filter.
     */
    private updateSearchFilter = (filter: string) => {
        // Update the state
        this.setState({
            searchFilter: filter
        });
    }

    /**
     * Method to update the selected tags
     * @param tags - The selected fields.
     */
    private updateSelectedTags = (tags) => {
        // Update the state
        this.setState({
            selectedTags: tags
        });
    }
}