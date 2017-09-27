import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Label, TagPicker, ITag, ITagPickerProps } from "office-ui-fabric-react";
import { IWebPartFieldCfgPanel, IWebPartFieldCfgProps, IWebPartFieldCfgState } from "../../definitions";
import { WebPartListCfg } from ".";

/**
 * WebPart Field Configuration Panel
 */
export class WebPartFieldCfg<Props extends IWebPartFieldCfgProps = IWebPartFieldCfgProps, State extends IWebPartFieldCfgState = IWebPartFieldCfgState> extends WebPartListCfg<Props, State> implements IWebPartFieldCfgPanel {
    _fieldLabel: Label = null;
    _fieldPicker: TagPicker = null;

    /**
     * Constructor
     * @param props - The webpart field configuration properties.
     */
    constructor(props: Props) {
        super(props);

        // Update the query to expand the fields
        this._query.Expand = ["Fields"];
    }

    /**
     * Events
     */

    /**
     * The on field picker display event
     * @param tags - The fields as an array of tags for the picker.
     */
    onFieldPickerDisplay = (tags: Array<ITag>) => { return; }

    /**
     * The render footer event
     */
    onRenderFooter = () => {
        let footer = null;

        // See if the lists exists
        if (this.state.lists != null) {
            footer = this.renderField();
            footer.push(this.renderSaveButton());
        }

        // Render the footer
        return footer;
    }

    /**
     * Method to resolve suggestions event
     * @param filterText - The filter text.
     * @param selectedItems - The selected tags.
     */
    private onResolveSuggestions = (filterText?: string, selectedItems?: Array<ITag>) => {
        let tags: Array<ITag> = [];

        // Ensure the list and filter exists
        if (this.state.list && filterText) {
            let filter = filterText.toLowerCase();

            // Parse the fields
            for (let i = 0; i < this.state.list.Fields.results.length; i++) {
                let field = this.state.list.Fields.results[i];

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

        // Call the field picker display event
        this.onFieldPickerDisplay(tags);

        // Return the tags
        return tags || [];
    }

    /**
     * Methods
     */

    /**
     * Method to render the field property
     */
    renderField = () => {
        let tags: Array<ITag> = [];

        // Parse the fields
        let fields = this.state.cfg.Fields || [];
        for (let i = 0; i < fields.length; i++) {
            let field = this.state.cfg.Fields[i];

            // Add the tag
            tags.push({
                key: field.InternalName,
                name: field.Title + " [" + field.InternalName + "]",
            });
        }

        // Set the label properties
        let lblProps = this.props.fieldLabel || {};

        // Set the picker properties
        let pickerProps = this.props.fieldPicker || {} as ITagPickerProps;
        pickerProps.defaultSelectedItems = tags;
        pickerProps.onChange = this.updateFields;
        pickerProps.onResolveSuggestions = this.onResolveSuggestions;
        pickerProps.pickerSuggestionsProps = pickerProps.pickerSuggestionsProps || {
            noResultsFoundText: "No fields found.",
            suggestionsHeaderText: "Fields"
        };

        // Return the footer
        return [
            <Label {...lblProps} ref={lbl => { this._fieldLabel = lbl; }} key="fieldLabel">{this.props.fieldLabel || "Fields"}:</Label>,
            <TagPicker {...pickerProps} ref={picker => { this._fieldPicker = picker; }} key="fieldPicker" />
        ];
    }

    /**
     * Method to update the state w/ the selected field(s)
     */
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
}