import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import { Checkbox, ITag } from "office-ui-fabric-react";
import { IWebPartSearchCfgPanel, IWebPartSearchCfgProps, IWebPartSearchCfgState } from "../definitions";
import { WebPartFieldCfg } from ".";

/**
 * WebPart Search Configuration Panel
 */
export class WebPartSearchCfg<Props extends IWebPartSearchCfgProps = IWebPartSearchCfgProps, State extends IWebPartSearchCfgState = IWebPartSearchCfgState> extends WebPartFieldCfg<Props, State> {
    /**
     * Events
     */

    /**
     * The field picker display event
     * @param tags - An array of fields used for the field picker.
     */
    onFieldPickerDisplay = (tags: Array<ITag>) => {
        // Copy the tags
        let fieldTags = Object.create(tags);

        // Clear the tags
        tags = [];

        // Parse the tags
        for (let i = 0; i < fieldTags.length; i++) {
            let tag = fieldTags[i];

            // Parse the fields
            for (let j = 0; j < this.state.list.Fields.results.length; j++) {
                let field = this.state.list.Fields.results[i];

                // See if this is the field we are looking for
                if (field.InternalName == tag.key) {
                    let addField = false;

                    // Allow certain fields to be selected
                    switch (field.FieldTypeKind) {
                        // Searchable Fields
                        case SPTypes.FieldType.Choice:
                        case SPTypes.FieldType.MultiChoice:
                        case SPTypes.FieldType.Lookup:
                        case SPTypes.FieldType.Text:
                        case SPTypes.FieldType.URL:
                            addField = true;
                            break;
                        default:
                            // Allow managed metadata fields
                            addField = field.TypeAsString.indexOf("TaxonomyFieldType") == 0;
                            break;
                    }

                    // See if we are adding the field
                    if (addField) {
                        // Add this tag
                        tags.push(tag);
                    }

                    // Break from the loop
                    break;
                }
            }
        }
    }

    /**
     * The render footer method
     */
    onRenderFooter = () => {
        let footer = null;

        // See if the lists exists
        if (this.state.lists != null) {
            footer = [this.renderSearchPicker()];
            footer.join(this.renderField());
            footer.push(this.renderSaveButton());
        }

        // Render the footer
        return footer;
    }

    /**
     * Methods
     */

    /**
     * Method to render the picker checkbox
     */
    renderSearchPicker = () => {
        return (
            <Checkbox
                defaultChecked={this.state.cfg.TagPickerFl ? true : false}
                key="searchPicker"
                label="Use Tag Picker"
                onChange={this.updatePickerFlag}
            />
        );
    }

    /**
     * Method to update the
     * @param ev - The checkbox click event.
     * @param checked - The value of the checkbox.
     */
    private updatePickerFlag = (ev: React.MouseEvent<HTMLInputElement>, checked: boolean) => {
        let cfg = this.state.cfg;

        // Update the configuration
        cfg.TagPickerFl = checked;

        // Update the state
        this.setState({ cfg });
    }
}