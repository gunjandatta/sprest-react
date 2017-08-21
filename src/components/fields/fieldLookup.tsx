import * as React from "react";
import { Promise } from "es6-promise";
import { SPTypes, Site, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, IDropdownProps, Spinner } from "office-ui-fabric-react";
import { BaseField } from "../../common";
import { IFieldLookup, IFieldLookupProps, IFieldLookupState, ILookupFieldInfo } from "../../definitions";

/**
 * Lookup Field
 */
export class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> implements IFieldLookup {
    /**
     * Public Interface
     */

    // Render the field
    renderField() {
        let props: IDropdownProps = this.props.props || {};

        // Ensure the options exist
        if(this.state.options == null) {
            // Render a loading indicator
            return (
                <Spinner label="Loading the lookup data..." />
            );
        }

        // Update the properties
        props.selectedKey = this.getFieldValue();
        props.errorMessage = props.errorMessage ? props.errorMessage : this.state.fieldInfo.errorMessage;
        props.errorMessage = this.state.showErrorMessage ? (props.selectedKey ? "" : props.errorMessage) : "";
        props.label = props.label ? props.label : this.state.label;
        props.multiSelect = this.state.fieldInfo.allowMultipleValues;
        props.onChanged = this.onChanged;
        props.options = this.state.options;
        props.required = props.required || this.state.fieldInfo.required;

        // See if this is a multi-choice
        if (props.multiSelect) {
            // Set the selected keys
            props.selectedKeys = this.state.value.results;
        } else {
            // Set the selected key
            props.selectedKey = this.state.value;
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
    protected onChanged = (option: IDropdownOption, idx: number) => {
        // See if this is a multi-choice field
        if (this.state.fieldInfo.allowMultipleValues) {
            let fieldValue = this.state.value;

            // Append the option if it was selected
            if (option.selected) {
                fieldValue.results.push(option.key);
            } else {
                // Remove the selected option
                fieldValue.results.splice(idx, 1);
            }

            // Update the field value
            this.updateValue(fieldValue);
        } else {
            // Update the field value
            this.updateValue(option.selected ? option.key : null);
        }
    }

    // The field initialized event
    onFieldInit = (field: any, state: IFieldLookupState) => {
        let lookupField = field as Types.IFieldLookup;

        // Ensure this is a lookup field
        if (lookupField.FieldTypeKind != SPTypes.FieldType.Lookup) {
            // Log
            console.warn("[gd-sprest] The field '" + field.InternalName + "' is not a lookup field.");
            return;
        }

        // Update the field information
        state.fieldInfo.allowMultipleValues = lookupField.AllowMultipleValues;
        state.fieldInfo.lookupFieldName = lookupField.LookupField;
        state.fieldInfo.lookupListName = lookupField.LookupList;
        state.fieldInfo.lookupWebId = lookupField.LookupWebId;

        // See if this is a multi-lookup field
        if (lookupField.AllowMultipleValues) {
            let results = [];
            let defaultValue = (this.props.defaultValue ? this.props.defaultValue.results : null) || [];

            // Parse the default values
            for (let i = 0; i < defaultValue.length; i++) {
                // Add the item id
                results.push(defaultValue[i].ID || defaultValue[i]);
            }

            // Set the value
            state.value = { results };
        } else {
            // Set the value
            state.value = this.props.defaultValue ? this.props.defaultValue.ID || this.props.defaultValue : null;
        }

        // Load the lookup data
        this.loadLookupItems(state.fieldInfo).then((fieldInfo: ILookupFieldInfo) => {
            // Update the state
            this.setState({
                fieldInfo,
                options: this.toOptions(fieldInfo.items, fieldInfo.lookupFieldName)
            });
        });
    }

    /**
     * Methods
     */

    // Method to load the lookup items
    private loadLookupItems = (fieldInfo: ILookupFieldInfo) => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the current site collection
            (new Site())
                // Get the web containing the lookup list
                .openWebById(fieldInfo.lookupWebId)
                // Execute the request
                .execute((web) => {
                    // Get the list
                    web.Lists()
                        // Get the list by id
                        .getById(fieldInfo.lookupListName)
                        // Get the items
                        .Items()
                        // Set the query
                        .query({
                            GetAllItems: true,
                            Select: ["ID", fieldInfo.lookupFieldName],
                            Top: 500
                        })
                        // Execute the request
                        .execute((items) => {
                            // Update the field information
                            fieldInfo.items = items.results || [];

                            // Resolve the promise
                            resolve(fieldInfo);
                        });
                });
        });
    }

    // Method to convert the options to a multi-choice field value
    private toFieldValue = (options: Array<IDropdownOption> = []) => {
        let results = [];

        // Parse the options
        for (let i = 0; i < options.length; i++) {
            let option = options[i];

            // See if this option is selected
            if (option.selected) {
                // Add the result
                results.push(option.key);
            }
        }

        // Return the field value
        return { results };
    }

    // Method to convert the field value to options
    private toOptions = (items: Array<Types.IListItemQueryResult> = [], fieldName) => {
        let options: Array<IDropdownOption> = [];

        // See if this is not a required multi-lookup field
        if (!this.state.fieldInfo.required && !this.state.fieldInfo.allowMultipleValues) {
            // Add a blank option
            options.push({
                key: null,
                text: ""
            });
        }

        // Parse the items
        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            // Add the option
            options.push({
                key: item.Id,
                text: item[fieldName]
            });
        }

        // Return the options
        return options;
    }
}