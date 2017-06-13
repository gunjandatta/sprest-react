import * as React from "react";
import { Types, Web } from "gd-sprest";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import { IField, IFieldInfo, IFieldProps, IFieldState } from "../definitions";

/**
 * Base Field
 */
export abstract class Field<Props extends IFieldProps, State extends IFieldState> extends React.Component<Props, State> implements IField<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = this.load();
    }

    /**
     * Global Variables
     */

    // Session Key
    private _sessionKey = "gd-sprest";

    /**
     * Public Interface
     */

    // Required method
    abstract renderField(): any;

    // Method to get the field value
    getFieldValue = () => { return this.state.value || this.state.fieldInfo.defaultValue || ""; }

    // Event triggered after the field information is retrieved from SharePoint.
    onFieldInit = (field: any, state: State) => { };

    // Event triggered after loading the field information.
    onFieldLoaded = () => { };

    // Method to update the value
    updateValue = (value: any) => {
        // Update the state
        this.setState({
            showErrorMessage: this.state.fieldInfo.required ? (value ? false : true) : false,
            value: value
        });
    }

    // Method to render the component
    render() {
        // See if the field is initialized
        if (this.state.initFl) {
            // Render the field
            return this.renderField();
        }

        // Determine if we are showing a spinner
        let showFl = typeof (this.props.showLoadingFl) === "boolean" ? this.props.showLoadingFl : true;
        if (showFl) {
            // Return a loading spinner
            return (
                <Spinner
                    label={"Loading the '" + this.props.name + "' field."}
                    size={SpinnerSize.small}
                />
            );
        }

        // Show nothing by default
        return null;
    }

    /**
     * Methods
     */

    // Method to load the field information.
    private load = (): State => {
        // Default the state
        let state: State = {
            fieldInfo: {
                defaultValue: "",
                errorMessage: this.props.errorMessage || "This field requires a value.",
                listName: this.props.listName,
                name: this.props.name,
                required: this.props.required ? true : false,
                title: this.props.title,
                webUrl: this.props.webUrl
            },
            initFl: false,
            showErrorMessage: false,
            value: this.props.defaultValue
        } as State;

        // See if the session data exists
        let sessionData = sessionStorage.getItem(this._sessionKey);
        if (sessionData) {
            // Try to parse the data
            try {
                let data = JSON.parse(sessionData);
                let list = data[state.fieldInfo.listName] || {};
                let field: IFieldInfo = list.Fields ? list.Fields[state.fieldInfo.name] : null;

                // See if fields exist
                if (field) {
                    // Update the field information
                    state.fieldInfo.defaultValue = field.defaultValue;
                    state.fieldInfo.required = field.required;
                    state.fieldInfo.title = field.title;
                    state.initFl = true;
                    state.label = field.title + ":";
                    state.showErrorMessage = state.fieldInfo.required ? (state.fieldInfo.defaultValue ? false : true) : false;


                    // Call the on loaded event
                    this.onFieldLoaded ? this.onFieldLoaded() : null;

                    // Return the field information
                    return state;
                }
            }
            // Do nothing
            catch (ex) { }
        }

        // Get the web
        (new Web(state.fieldInfo.webUrl))
            // Get the list
            .Lists(state.fieldInfo.listName)
            // Get the fields
            .Fields()
            // Get the field by its internal name
            .getByInternalNameOrTitle(state.fieldInfo.name)
            // Execute the request
            .execute((field: Types.IField) => {
                // Update the field information
                state.fieldInfo.defaultValue = field.DefaultValue;
                state.fieldInfo.required = field.Required;
                state.fieldInfo.title = field.Title;
                state.initFl = true;
                state.label = state.fieldInfo.title + ":";
                state.showErrorMessage = state.fieldInfo.required ? (state.fieldInfo.defaultValue ? false : true) : false;

                // Call the on initialized event
                this.onFieldInit ? this.onFieldInit(field, state) : null;

                // Update the state
                this.setState(state, () => {
                    // Call the on loaded event
                    this.onFieldLoaded ? this.onFieldLoaded() : null;
                });
            });

        // Return the state
        return state;
    }
}