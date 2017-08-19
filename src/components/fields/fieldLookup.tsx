import * as React from "react";
import { SPTypes, Site } from "gd-sprest";
import { IFieldLookupProps, IFieldLookupState } from "../../definitions";
import { BaseField } from "../../common";
import {
    Checkbox,
    Dropdown, IDropdownOption, IDropdownProps
} from "office-ui-fabric-react";
import "../../../sass/fieldLookup.scss";

/**
 * Lookup Field
 */
export class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> {
    /**
     * Public Interface
     */

    // Render the field
    renderField() {
        let props: IDropdownProps = this.props.props || {};

        // Update the properties
        props.selectedKey = this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        props.label = props.label ? props.label : this.state.label;
        props.onChanged = this.onChanged;
        props.options = this.state.options;

        // See if this is a multi-lookup field
        if (this.state.fieldInfo.allowMultipleValues) {
            // Update the dropdown properties
            props.onRenderItem = this.renderOption;
            props.onRenderTitle = this.renderTitle;
        }

        // Return the component
        return (
            <Dropdown {...props} ref="lookup" />
        );
    }

    /**
     * Events
     */

    // The change event for the dropdown list
    private onChanged = (option: IDropdownOption) => {
        // Execute the change event
        this.props.onChange ? this.props.onChange(option) : null;

        // Update the field value
        this.updateValue(option.key);
    }

    // The change event for selecting a multi-lookup item
    private onChecked = (key: string | number) => {
        let options = this.state.options;

        // Parse the options
        for (let i = 0; i < options.length; i++) {
            let option = options[i];

            // See if this is the target option
            if (option.key == key) {
                // Update the selection
                option.selected = option.selected ? false : true;
                break;
            }
        }

        // Update the state
        this.setState({ options }, () => {
            let selectedOptions = this.getSelectedOptions(options, "key");

            // Update the field value
            this.updateValue({
                __metadata: { type: "Collection(Edm.Int32)" },
                results: selectedOptions
            });

            // Call the change event
            this.props.onChange ? this.props.onChange(selectedOptions) : null;
        });
    }

    // The field initialized event
    onFieldInit = (field: any, state: IFieldLookupState) => {
        // Clear the options
        state.options = [];

        // Ensure this is a lookup field
        if (field.FieldTypeKind != SPTypes.FieldType.Lookup) {
            // Log
            console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a lookup field.");
            return;
        }

        // Update the state
        state.fieldInfo.allowMultipleValues = field.AllowMultipleValues;
        state.fieldInfo.lookupFieldName = field.LookupField;
        state.fieldInfo.lookupListName = field.LookupList;
        state.fieldInfo.lookupWebId = field.LookupWebId;

        // Update the value
        if (state.fieldInfo.allowMultipleValues) {
            let defaultValue = this.props.defaultValue ? this.props.defaultValue.results : [];
            let results = [];

            // Parse the default values
            for (let i = 0; i < defaultValue.length; i++) {
                // Add the item id
                results.push(defaultValue[i].ID);
            }

            // Set the value
            state.value = {
                __metadata: { type: "Collection(Edm.Int32)" },
                results
            };
        } else {
            // Set the value
            state.value = this.props.defaultValue ? this.props.defaultValue.ID || this.props.defaultValue : null;
        }
    }

    // The field loaded event
    onFieldLoaded = () => {
        // Get the current site collection
        (new Site())
            // Get the web containing the lookup list
            .openWebById(this.state.fieldInfo.lookupWebId)
            // Execute the request
            .execute((web) => {
                // Get the list
                web.Lists()
                    // Get the list by id
                    .getById(this.state.fieldInfo.lookupListName)
                    // Get the items
                    .Items()
                    // Set the query
                    .query({
                        GetAllItems: this.props.getAllItemsFl ? true : false,
                        Select: ["ID", this.state.fieldInfo.lookupFieldName],
                        Top: 500
                    })
                    // Execute the request
                    .execute((items) => {
                        let defaultValue = this.props.defaultValue ? this.props.defaultValue : 0;
                        let options: Array<IDropdownOption> = [];

                        // Add an empty option for single lookup fields
                        if (!this.state.fieldInfo.allowMultipleValues) {
                            options.push({
                                key: null,
                                text: ""
                            });
                        }

                        // Ensure items exists
                        if(items.results) {
                            // Parse the items
                            for (let i = 0; i < items.results.length; i++) {
                                let item = items.results[i];
                                let option = {
                                    key: item.Id,
                                    selected: item.Id == (defaultValue.ID || defaultValue),
                                    text: item[this.state.fieldInfo.lookupFieldName]
                                };

                                // See if this is a multi-lookup, and there is a default value
                                if (this.state.fieldInfo.allowMultipleValues && defaultValue) {
                                    let results = defaultValue ? defaultValue.results : [];

                                    // Parse the default values
                                    for (let j = 0; j < results.length; j++) {
                                        let result = results[j];
                                        let itemId = result.ID || result;

                                        // See if this is the current option
                                        if (option.key == itemId) {
                                            // Select this option
                                            option.selected = true;
                                            break;
                                        }
                                    }
                                }

                                // Add the option
                                options.push(option);
                            }
                        }

                        // Update the state
                        this.setState({ options });
                    });
            });

    }

    /**
     * Methods
     */

    // Method to get the selected lookup items
    private getSelectedOptions = (options: Array<IDropdownOption>, key: string): Array<string | number> => {
        let values = [];

        // Parse the options
        for (let i = 0; i < options.length; i++) {
            let option = options[i];

            // See if this option is selected
            if (option.selected) {
                // Add the option
                values.push(option[key]);
            }
        }

        // Return the values
        return values;
    }

    // Method to render the multi-lookup option
    private renderOption = (option?: IDropdownOption) => {
        // Return a checkbox
        return (
            <Checkbox
                checked={option.selected}
                className="ms-Lookup-Checkbox"
                key={option.key}
                label={option.text}
                onChange={() => { this.onChecked(option.key); }}
            />
        )
    }

    // Method to render the multi-lookup display value
    private renderTitle = () => {
        // Return the title
        return (
            <span>{this.getSelectedOptions(this.state.options, "text").join(", ")}</span>
        );
    }
}