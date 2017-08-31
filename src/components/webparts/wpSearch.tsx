import * as React from "react";
import { SPTypes, Types, Web } from "gd-sprest";
import { Link, Spinner, TagPicker, ITag } from "office-ui-fabric-react";
import { IWebPartSearchItem, IWebPartSearchProps, IWebPartSearchState } from "../../definitions";
import { WebPartListCfg } from ".";

/**
 * WebPart Search
 */
export class WebPartSearch<Props extends IWebPartSearchProps = IWebPartSearchProps, State extends IWebPartSearchState = IWebPartSearchState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            items: null,
            searchTerms: [],
            selectedTags: [],
            tagMapper: {}
        } as State;

        // Set the query
        this._query = {
            Expand: [],
            GetAllItems: true,
            OrderBy: ["Title"],
            Select: [],
            Top: 500
        };
    }

    /**
     * Global Variables
     */

    protected _query: Types.ODataQuery = null;

    /**
     * Events
     */

    // The render container event
    onRenderContainer = (items: Array<IWebPartSearchItem>): JSX.Element => {
        let elItems = [];

        // Parse the items
        for (let i = 0; i < items.length; i++) {
            // Render the item
            let elItem = this.onRenderItem(items[i]);
            if (elItem) {
                // Set the unique key
                elItem.key = "item_" + i;

                // Add the item element
                elItems.push(elItem);
            }
        }

        // Render the item elements
        return <div>{elItems}</div>;
    }

    // The render item event
    onRenderItem = (item: IWebPartSearchItem): JSX.Element => { return <div /> }

    // Render the component
    render() {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Load the items
            this.load();

            // Return a spinner
            return (
                <Spinner label="Loading the items..." />
            );
        }

        // Return the items
        return (
            <div className={this.props.className}>
                <TagPicker
                    onChange={this.updateSelectedTags}
                    onResolveSuggestions={this.onResolveSuggestions}
                />
                {this.onRenderContainer(this.getItems())}
            </div>
        );
    }

    /**
     * Methods
     */

    // Method to generate the mapper
    private generateMapper = (items: Types.IResults<Types.IListItemQueryResult>) => {
        let searchTerms: Array<ITag> = [];
        let tagMapper = {};

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
                    fieldValue = fieldValues[k];

                    // Update the field value based on the type
                    switch (field.FieldTypeKind) {
                        case SPTypes.FieldType.Choice:
                        case SPTypes.FieldType.MultiChoice:
                            break;
                        case SPTypes.FieldType.Lookup:
                            // Update the field value
                            fieldValue = item[field.InternalName][(field as Types.IFieldLookup).LookupField];
                            break;
                        default:
                            // This is a managed metadata field
                            fieldValue = fieldValue.split("|")[0];
                            break;
                    }

                    // Ensure the field value exists
                    if (fieldValue == null || fieldValue == "") { continue; }

                    // Add the index
                    if (tagMapper[fieldValue] == null) {
                        // Add the value
                        tagMapper[fieldValue] = [item];

                        // Add the search term
                        searchTerms.push({
                            key: fieldValue.toLowerCase(),
                            name: fieldValue
                        });
                    } else {
                        // Add the value
                        tagMapper[fieldValue].push(item);
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
            items: items.results,
            searchTerms,
            selectedTags: [],
            tagMapper
        } as IWebPartSearchState);
    }

    // Method to get the items
    private getItems = () => {
        // Ensure tags exist
        if (this.state.selectedTags.length > 0) {
            let data = {};
            let items = [];

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

    // Method to load the documents
    private load = () => {
        // Parse the search fields
        for (let i = 0; i < this.props.cfg.Fields.length; i++) {
            let field = this.props.cfg.Fields[i];

            // Add the field, based on the type
            switch (field.FieldTypeKind) {
                case SPTypes.FieldType.Lookup:
                    // Select the lookup field value
                    this._query.Expand.push(field.InternalName);
                    this._query.Select.push(field.InternalName + "/" + (field as Types.IFieldLookup).LookupField);
                    break;
                default:
                    // Select the field
                    this._query.Select.push(field.InternalName);
                    break;
            }
        }

        // Load the documents
        (new Web(this.props.cfg.WebUrl))
            // Get the list
            .Lists(this.props.cfg.ListName)
            // Get the items
            .Items()
            // Query the list
            .query(this._query)
            // Execute the request
            .execute(this.generateMapper);
    }

    // Method to resolve the tag picker
    private onResolveSuggestions = (filterText: string, tagList: Array<ITag>) => {
        let tags: Array<ITag> = [];

        // Ensure the filter exists
        if (filterText) {
            filterText = filterText.toLowerCase();

            // Filter the search terms
            tags = this.state.searchTerms.filter((term: ITag) => {
                return term.key.indexOf(filterText) >= 0;
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

        // Return the tags
        return tags;
    }

    // Method to update the selected tags
    private updateSelectedTags = (tags) => {
        // Update the state
        this.setState({
            selectedTags: tags
        });
    }
}