import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Checkbox, PrimaryButton, TagPicker, ITag } from "office-ui-fabric-react";
import { IWebPartSearchCfgProps, IWebPartSearchCfgState } from "../../definitions";
import { WebPartListCfg } from ".";

/**
 * WebPart Search Configuration
 */
export class WebPartSearchCfg<Props extends IWebPartSearchCfgProps = IWebPartSearchCfgProps, State extends IWebPartSearchCfgState = IWebPartSearchCfgState> extends WebPartListCfg<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Update the query to expand the fields
        this._query.Expand = ["Fields"];
    }

    /**
     * Events
     */

    // The list changed event
    onListChanged = (state: State) => {
        // Ensure the list exists
        if (state.cfg.ListName) {
            // Parse the lists
            for (let i = 0; i < state.lists.length; i++) {
                let list = state.lists[i];

                // See if this is the list we are looking for
                if (list.Title == state.cfg.ListName) {
                    // Set the list
                    state.list = list;
                    break;
                }
            }
        }
    }

    // The lists loaded event
    onListsLoaded = (state: State) => {
        // Call the change event
        this.onListChanged(state);
    }

    // The render footer method
    onRenderFooter = () => {
        let tags: Array<ITag> = [];

        // See if the lists and configuration fields exists
        if (this.state.lists) {
            let fields = this.state.cfg.Fields || [];

            // Parse the fields
            for (let i = 0; i < fields.length; i++) {
                let field = this.state.cfg.Fields[i];

                // Add the tag
                tags.push({
                    key: field.InternalName,
                    name: field.Title + " [" + field.InternalName + "]",
                });
            }

            // Return the footer
            return (
                <div>
                    <Checkbox
                        defaultChecked={this.state.cfg.TagPickerFl ? true : false}
                        label="Use Tag Picker"
                        onChange={this.updatePickerFlag}
                    />
                    <label className="ms-Label ms-fontSize-m">Searchable Fields:</label>
                    <TagPicker
                        defaultSelectedItems={tags}
                        onChange={this.updateFields}
                        onResolveSuggestions={this.onResolveSuggestions}
                        pickerSuggestionsProps={{
                            noResultsFoundText: "No fields found.",
                            suggestionsHeaderText: "Searchable Fields"
                        }}
                    />
                    <PrimaryButton
                        onClick={this.onSave}
                        text="Save"
                    />
                </div>
            );
        }

        // Render nothing
        return null;
    }

    // Method to resolve suggestions event
    private onResolveSuggestions = (filterText?: string, selectedItems?: Array<ITag>) => {
        let tags: Array<ITag> = [];

        // Ensure the list and filter exists
        if (this.state.list && filterText) {
            let filter = filterText.toLowerCase();

            // Parse the fields
            for (let i = 0; i < this.state.list.Fields.results.length; i++) {
                let field = this.state.list.Fields.results[i];

                // Allow certain fields to be selected
                switch (field.FieldTypeKind) {
                    // Searchable Fields
                    case SPTypes.FieldType.Choice:
                    case SPTypes.FieldType.MultiChoice:
                    case SPTypes.FieldType.Lookup:
                    case SPTypes.FieldType.Text:
                    case SPTypes.FieldType.URL:
                        break;
                    default:
                        // Allow managed metadata fields
                        if (field.TypeAsString.indexOf("TaxonomyFieldType") == 0) { break; }
                        // Skip this field
                        else { continue; }
                }

                // See if the internal or title contain this value
                if (field.InternalName.toLowerCase().indexOf(filter) >= 0 ||
                    field.Title.toLowerCase().indexOf(filter) >= 0) {
                    let existsFl = false;

                    // Parse the selected items
                    for (let j = 0; j < selectedItems.length; j++) {
                        if (existsFl = (selectedItems[j].key == field.InternalName)) {
                            // Break from the loop
                            break;
                        }
                    }

                    // See if the tag is already selected
                    if (existsFl) { continue; }

                    // Add the tag
                    tags.push({
                        key: field.InternalName,
                        name: field.Title + " [" + field.InternalName + "]",
                    });
                }
            }
        }

        // Return the tags
        return tags;
    }

    /**
     * Methods
     */

    // Method to update the state w/ the selected field(s)
    private updateFields = (selectedFields: Array<ITag>) => {
        // Update the configuration
        let cfg = this.state.cfg;
        cfg.Fields = [];

        // Parse the selected fields
        for (let i = 0; i < selectedFields.length; i++) {
            let selectedField = selectedFields[i];

            // Parse the list fields
            for (let j = 0; j < this.state.list.Fields.results.length; j++) {
                let field = this.state.list.Fields.results[j];

                // See if this is the field we are looking for
                if (field.InternalName == selectedField.key) {
                    // See if this is a taxonomy field
                    if (field.TypeAsString.indexOf("TaxonomyFieldType") == 0) {
                        // Parse the fields
                        for (let k = 0; k < this.state.list.Fields.results.length; k++) {
                            let fld = this.state.list.Fields.results[k];

                            // See if this is the hidden value field
                            if (fld.Title == field.Title + "_0") {
                                // Add the hidden value field
                                cfg.Fields.push(fld);
                                break;
                            }
                        }
                    } else {
                        // Add the field
                        cfg.Fields.push(field);
                    }

                    // Break from the loop
                    break;
                }
            }
        }

        // Sort the fields
        cfg.Fields = cfg.Fields.sort((a, b) => {
            if (a.Title < b.Title) { return -1; }
            if (a.Title > b.Title) { return 1; }
            return 0;
        });

        // Update the state
        this.setState({ cfg });
    }

    // Method to update the
    private updatePickerFlag = (ev: React.MouseEvent<HTMLInputElement>, checked: boolean) => {
        let cfg = this.state.cfg;

        // Update the configuration
        cfg.TagPickerFl = checked;

        // Update the state
        this.setState({ cfg });
    }
}