import * as React from "react";
import { Promise } from "es6-promise";
import { SPTypes, Site, Types } from "gd-sprest";
import { Dropdown, IDropdownOption, IDropdownProps, Spinner } from "office-ui-fabric-react";
import { IFieldLookup, IFieldLookupProps, IFieldLookupState, ILookupFieldInfo } from "../definitions";
import { BaseField } from ".";

/**
 * Lookup Field
 */
export class FieldLookup extends BaseField<IFieldLookupProps, IFieldLookupState> implements IFieldLookup {
    /**
     * Render the field
     */
    renderField = () => {
        // Ensure the options exist
        if (this.state.options == null) {
            // Render a loading indicator
            return (
                <Spinner label="Loading the lookup data..." />
            );
        }

        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // See if this is an associated lookup field and we are creating or editing the field
        if (this.state.fieldInfo.readOnly &&
            (this.state.controlMode == SPTypes.ControlMode.Edit || this.state.controlMode == SPTypes.ControlMode.New)) {
            // Don't render this field in 
            return null;
        }

        // Update the properties
        let props: IDropdownProps = this.props.props || {};
        props.className = this.props.className;
        props.disabled = this.state.fieldInfo.readOnly || this.state.controlMode == SPTypes.ControlMode.Display;
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
            props.defaultSelectedKeys = this.state.value.results;
        } else {
            // Set the selected key
            props.defaultSelectedKey = this.state.value;
        }

        // Return the component
        return (
            <Dropdown {...props} />
        );
    }

    /**
     * Events
     */

    /**
     * The change event for the dropdown list
     * @param option - The dropdown option.
     * @param idx - The dropdown option number.
     */
    protected onChanged = (option: IDropdownOption, idx: number) => {
        // Call the change event
        this.props.onChange ? this.props.onChange(option) : null;

        // See if this is a multi-choice field
        if (this.state.fieldInfo.allowMultipleValues) {
            let fieldValue = this.state.value;

            // Append the option if it was selected
            if (option.isSelected || option.selected) {
                fieldValue.results.push(option.key);
            } else {
                // Parse the results
                for (let i = 0; i < fieldValue.results.length; i++) {
                    if (fieldValue.results[i] == option.key) {
                        // Remove the selected option
                        fieldValue.results.splice(i, 1);
                        break;
                    }
                }
            }

            // Update the field value
            this.updateValue(fieldValue);
        } else {
            // Update the field value
            this.updateValue(option.selected ? option.key : null);
        }
    }

    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
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

        // Load the lookup data
        this.loadLookupItems(state.fieldInfo).then((fieldInfo: ILookupFieldInfo) => {
            let value = null;

            // See if this is a multi-lookup field and a value exists
            if (fieldInfo.allowMultipleValues) {
                let results = [];

                // Parse the values
                let values = this.props.defaultValue ? this.props.defaultValue.results : [];
                for (let i = 0; i < values.length; i++) {
                    // Add the item id
                    results.push(values[i].ID || values[i]);
                }

                // Set the default value
                value = { results };
            } else {
                // Set the default value
                value = this.props.defaultValue ? this.props.defaultValue.ID || this.props.defaultValue : null;
            }

            // Update the state
            this.setState({
                fieldInfo,
                options: this.toOptions(fieldInfo.items, fieldInfo.lookupFieldName),
                value
            });
        });
    }

    /**
     * Methods
     */

    /**
     * Method to load the lookup items
     * @param fieldInfo - The field information.
     */
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

    /**
     * Method to convert the field value to options
     * @param items - The lookup items.
     * @param fieldName - The lookup field name.
     */
    private toOptions = (items: Array<Types.IListItemQueryResult> = [], fieldName: string) => {
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