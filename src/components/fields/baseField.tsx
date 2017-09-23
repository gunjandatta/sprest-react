import * as React from "react";
import { SPTypes, Types, Web } from "gd-sprest";
import { Label, Spinner, SpinnerSize } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldInfo, IBaseFieldProps, IBaseFieldState } from "../../definitions";

/**
 * Base Field
 */
export abstract class BaseField<Props extends IBaseFieldProps = IBaseFieldProps, State extends IBaseFieldState = IBaseFieldState> extends React.Component<Props, State> implements IBaseField<Props, State> {
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

    // Method to get the field value
    getFieldValue = () => { return this.state.value || this.state.fieldInfo.defaultValue || ""; }

    // Event triggered after the field information is retrieved from SharePoint.
    onFieldInit = (field: any, state: State) => { };

    // Event triggered after loading the field information.
    onFieldLoaded = () => { };

    // Method to update the value
    updateValue = (value: any) => {
        // Ensure a custom renderer doesn't exist, and call the on change event
        this.props.onRender == null && this.props.onChange ? this.props.onChange(value) : null;

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
            return this.props.onRender ? this.props.onRender(this.state.fieldInfo) : this.renderField();
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

    // Method to render the field
    renderField = () => {
        // See if we are displaying the field
        if(this.state.controlMode == SPTypes.ControlMode.Display) {
            // Render the field name and value
            return (
                <Label>{this.state.fieldInfo.title + ": " + this.state.value}</Label>
            );
        }

        // Render nothing
        return null;
    }

    /**
     * Methods
     */

    // Method to load the field information.
    private load = (): State => {
        // Default the state
        let state: State = {
            controlMode: this.props.controlMode,
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
                let field: IBaseFieldInfo = list.Fields ? list.Fields[state.fieldInfo.name] : null;

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
            .execute((field) => {
                // Update the field information
                state.fieldInfo.defaultValue = field.DefaultValue;
                state.fieldInfo.required = field.Required ? true : false;
                state.fieldInfo.title = field.Title;
                state.fieldInfo.type = field.FieldTypeKind as number;
                state.fieldInfo.typeAsString = field.TypeAsString;
                state.initFl = true;
                state.label = (state.fieldInfo.title || state.fieldInfo.name) + ":";
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