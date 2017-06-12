import * as React from "react";
import {Types} from "gd-sprest";
import { DataSource, ITestItem } from "./data";
import {
    DetailsList, IColumn,
    PrimaryButton
} from "office-ui-fabric-react";

/**
 * Properties
 */
interface Props {
    viewItem?: (item: ITestItem) => void;
}

/**
 * State
 */
interface State {
    items: Array<ITestItem>;
}

/**
 * Test List
 */
export class TestList extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            items: []
        };

        // Load the items
        DataSource.load().then((items: Array<ITestItem>) => {
            // Update the state
            this.setState({ items });
        });
    }

    /**
     * Global Variables
     */

    // List Columns
    private _columns: Array<IColumn> = [
        { key: "Action", fieldName: "Id", name: "Action", minWidth: 100, maxWidth: 200 },
        { key: "Title", fieldName: "Title", name: "Title", minWidth: 100, maxWidth: 200 },
        { key: "TestBoolean", fieldName: "TestBoolean", name: "Boolean", minWidth: 100, maxWidth: 200 },
        { key: "TestChoice", fieldName: "TestChoice", name: "Choice", minWidth: 100, maxWidth: 200 },
        { key: "TestDate", fieldName: "TestDate", name: "Date", minWidth: 100, maxWidth: 200 },
        { key: "TestLookup", fieldName: "TestLookup", name: "Lookup", minWidth: 100, maxWidth: 200 },
        { key: "TestUrl", fieldName: "TestUrl", name: "URL", minWidth: 100, maxWidth: 200 }
    ];

    /**
     * Public Interface
     */

    // Render the component
    render() {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-md12">
                        <DetailsList
                            columns={this._columns}
                            items={this.state.items}
                            onRenderItemColumn={this.renderColumn}
                        />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Methods
     */

    // Method to render the column
    private renderColumn = (item?: ITestItem, index?: number, column?: IColumn) => {
        let value = item[column.fieldName];

        // Render the value, based on the key
        switch (column.key) {
            // ID Field
            case "Action":
                // Render a button
                return (
                    <PrimaryButton onClick={ev => this.viewItem(ev, item)} text="View" />
                );

            // Boolean Field
            case "TestBoolean":
                return (
                    <span>{value ? "Yes" : "No"}</span>
                );

            // Lookup Field
            case "TestLookup":
            let lookupValue:Types.ComplexTypes.FieldLookupValue = value;
                return (
                    <span>{lookupValue ? lookupValue.LookupValue : ""}</span>
                );

            // URL Field
            case "TestUrl":
                let urlValue:Types.ComplexTypes.FieldUrlValue = value;
                return (
                    <a href={urlValue.Url}>{urlValue.Description || urlValue.Url}</a>
                );

            // Default
            default:
                // Render the value
                return (
                    <span>{typeof(value) === "string" ? value : ""}</span>
                );
        }
    }

    // Method to view an item
    private viewItem = (ev: React.MouseEvent<any>, item?: ITestItem) => {
        // Prevent postback
        ev.preventDefault();

        // View the item
        this.props.viewItem ? this.props.viewItem(item) : null;
    }
}