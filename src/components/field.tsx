import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import * as Fields from "../fields";

/**
 * Field
 * This is a generic field component.
 */
export class Field extends Fields.BaseField {
    private _field: Fields.BaseField = this;

    /**
     * Constructor
     * @param props - The field properties.
     */
    constructor(props: Fields.IBaseFieldProps) {
        super(props);

        // Set the state
        let state = this.state as Fields.IBaseFieldState;
        state.value = props.defaultValue;
    }

    /**
     * Get the field information
     */
    get Info(): Types.Helper.IListFormFieldInfo { return this._field.state.fieldInfo; }

    /**
     * Get the field value
     */
    get Value(): any { return this._field.getFieldValue(); }

    /**
     * Get the field
     */
    getField<T = Fields.BaseField>(): T { return this._field as any; }

    /**
     * Method to render the field
     */
    renderField = () => {
        let props: Fields.IBaseFieldProps = this.props || {} as any;
        let defaultValue = props.defaultValue;
        let fieldInfo = this.state.fieldInfo;

        // Return the field component, based on the type
        switch (fieldInfo.type) {
            // Boolean
            case SPTypes.FieldType.Boolean:
                return <Fields.FieldBoolean {...props} ref={field => { this._field = field; }} />;
            // Choice
            case SPTypes.FieldType.Choice:
            case SPTypes.FieldType.MultiChoice:
                return <Fields.FieldChoice {...props} ref={field => { this._field = field; }} />;
            // Date/Time
            case SPTypes.FieldType.DateTime:
                return <Fields.FieldDateTime {...props} ref={field => { this._field = field; }} />;
            // Lookup
            case SPTypes.FieldType.Lookup:
                return <Fields.FieldLookup {...props} defaultValue={defaultValue} ref={field => { this._field = field; }} />;
            // Number
            case SPTypes.FieldType.Currency:
            case SPTypes.FieldType.Number:
                return <Fields.FieldNumber {...props} ref={field => { this._field = field; }} />;
            // Text
            case SPTypes.FieldType.Note:
            case SPTypes.FieldType.Text:
                return <Fields.FieldText {...props} ref={field => { this._field = field; }} />;
            // URL
            case SPTypes.FieldType.URL:
                return <Fields.FieldUrl {...props} ref={field => { this._field = field; }} />;
            // User
            case SPTypes.FieldType.User:
                return <Fields.FieldUser {...props} defaultValue={defaultValue} ref={field => { this._field = field; }} />;
            // Default
            default:
                // Check the type as string value
                switch (fieldInfo.typeAsString) {
                    // Managed Metadata
                    case "TaxonomyFieldType":
                    case "TaxonomyFieldTypeMulti":
                        return <Fields.FieldManagedMetadata {...props} ref={field => { this._field = field; }} />;
                    // Default
                    default:
                        return (
                            <Fields.BaseField {...props} ref={field => { this._field = field; }} />
                        );
                }
        }
    }
}