import * as React from "react";
import { SPTypes } from "gd-sprest";
import { Fields } from "..";

/**
 * Field
 */
export class Field extends Fields.BaseField {
    // Method to render the field
    renderField(): any {
        let props: any = this.props || {};
        let fieldInfo = this.state.fieldInfo;

        // Return the field component, based on the type
        switch (fieldInfo.type) {
            // Boolean
            case SPTypes.FieldType.Boolean:
                return <Fields.FieldBoolean {...props} onChange={this.onChange} />;
            // Choice
            case SPTypes.FieldType.Choice:
            case SPTypes.FieldType.MultiChoice:
                return <Fields.FieldChoice {...props} onChange={this.onChange} />;
            // Date/Time
            case SPTypes.FieldType.DateTime:
                return <Fields.FieldDateTime {...props} onChange={this.onChange} />;
            // Lookup
            case SPTypes.FieldType.Lookup:
                return <Fields.FieldLookup {...props} onChange={this.onChange} />;
            // Number
            case SPTypes.FieldType.Currency:
            case SPTypes.FieldType.Number:
                return <Fields.FieldNumber {...props} onChange={this.onChange} />;
            // Text
            case SPTypes.FieldType.Note:
            case SPTypes.FieldType.Text:
                return <Fields.FieldText {...props} onChange={this.onChange} />;
            // URL
            case SPTypes.FieldType.URL:
                return <Fields.FieldUrl {...props} onChange={this.onChange} />;
            // User
            case SPTypes.FieldType.User:
                return <Fields.FieldUser {...props} onChange={this.onChange} />;
            // Default
            default:
                return (
                    <div>{this.state.value}</div>
                );
        }
    }

    /**
     * Methods
     */

    // The on change event
    private onChange = (value) => {
        // Update the state
        this.setState({ value });
    }
}