import * as React from "react";
import { SPTypes } from "gd-sprest";
import { BaseField } from "../common";
import * as Fields from "./fields";

/**
 * Field
 */
export class Field extends BaseField {
    renderField(): any {
        let props: any = this.props || {};
        let fieldInfo = this.state.fieldInfo;

        // Return the field component, based on the type
        switch (fieldInfo.type) {
            // Boolean
            case SPTypes.FieldType.Boolean:
                return <Fields.FieldBoolean {...props} />;
            // Choice
            case SPTypes.FieldType.Choice:
            case SPTypes.FieldType.MultiChoice:
                return <Fields.FieldChoice {...props} />;
            // Date/Time
            case SPTypes.FieldType.DateTime:
                return <Fields.FieldDateTime {...props} />;
            // Lookup
            case SPTypes.FieldType.Lookup:
                return <Fields.FieldLookup {...props} />;
            // Number
            case SPTypes.FieldType.Currency:
            case SPTypes.FieldType.Number:
                return <Fields.FieldNumber {...props} />;
            // Text
            case SPTypes.FieldType.Note:
            case SPTypes.FieldType.Text:
                return <Fields.FieldText {...props} />;
            // URL
            case SPTypes.FieldType.URL:
                return <Fields.FieldUrl {...props} />;
            // User
            case SPTypes.FieldType.User:
                return <Fields.FieldUser {...props} />;
            // Default
            default:
                return (
                    <div>{this.state.value}</div>
                );
        }
    }
}