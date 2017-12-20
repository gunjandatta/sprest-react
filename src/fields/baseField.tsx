import * as React from "react";
import { SPTypes, Types, Web } from "gd-sprest";
import { Label, Spinner, SpinnerSize } from "office-ui-fabric-react";
import { IBaseField, IBaseFieldInfo, IBaseFieldProps, IBaseFieldState } from "../definitions";

/**
 * Base Field
 * This is the base field class, inherited by all field types.
 */
export abstract class BaseField<Props extends IBaseFieldProps = IBaseFieldProps, State extends IBaseFieldState = IBaseFieldState> extends React.Component<Props, State> implements IBaseField<Props, State> {
    /**
     * Constructor
     * @param props - The base field properties.
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
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
    }

    /**
     * Component initialized event
     */
    componentWillMount() {
        // Load the data
        this.load();
    }

    /**
     * Method to get the field value
     */
    getFieldValue = () => { return this.state.value || this.state.fieldInfo.defaultValue || ""; }

    /**
     * Event triggered after the field information is retrieved from SharePoint
     */
    onFieldInit?: (field: any, state: State) => void;

    /**
     * Event triggered after loading the field information
     */
    onFieldLoaded?: () => void;

    /**
     * Method to update the value
     * @param value - The field value.
     */
    updateValue = (value: any) => {
        // Ensure a custom renderer doesn't exist, and call the on change event
        this.props.onRender == null && this.props.onChange ? this.props.onChange(value) : null;

        // Update the state
        this.setState({
            showErrorMessage: this.state.fieldInfo.required ? (value ? false : true) : false,
            value: value
        });
    }

    /**
     * Method to render the component
     */
    render() {
        // See if the field is initialized
        if (this.state.initFl) {
            let elField = null;

            // See if there is a custom render event
            if (this.props.onRender) {
                // Call the event
                elField = this.props.onRender(this.state.fieldInfo);
            } else {
                // Render the field
                elField = this.renderField();

                // Call the field render event
                elField = this.props.onFieldRender ? this.props.onFieldRender(this.state.fieldInfo, elField) : elField;
            }

            // Return the field
            return elField;
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
     * Method to render the field
     */
    renderField = () => {
        // See if we are displaying the field
        if (this.props.controlMode == SPTypes.ControlMode.Display) {
            // Render the field name and value
            return (
                <Label>{this.state.fieldInfo.title + ": " + (this.state.value || "")}</Label>
            );
        }

        // Render nothing
        return null;
    }

    /**
     * Methods
     */

    /**
     * Method to load the field information
     */
    private load = () => {
        let state: State = Object.create(this.state);

        // See if the field exists
        if (this.props.field) {
            // Load the field
            this.loadField(state, this.props.field);

            // Update the state
            this.setState(state, () => {
                // Call the field loaded event
                this.onFieldLoaded ? this.onFieldLoaded() : null;
            });
        } else {
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
                    // Load the field
                    this.loadField(state, field);

                    // Update the state
                    this.setState(state, () => {
                        // Call the on loaded event
                        this.onFieldLoaded ? this.onFieldLoaded() : null;
                    });
                });
        }
    }

    // Method to load the field
    private loadField = (state: State, field: Types.IFieldResult | Types.IFieldQueryResult) => {
        // Update the field information
        state.fieldInfo.defaultValue = field.DefaultValue;
        state.fieldInfo.readOnly = field.ReadOnlyField;
        state.fieldInfo.required = field.Required ? true : false;
        state.fieldInfo.title = field.Title;
        state.fieldInfo.type = field.FieldTypeKind as number;
        state.fieldInfo.typeAsString = field.TypeAsString;
        state.initFl = true;
        state.label = (state.fieldInfo.title || state.fieldInfo.name) + ":";
        state.showErrorMessage = state.fieldInfo.required ? (state.fieldInfo.defaultValue ? false : true) : false;

        // Call the initialize event
        this.onFieldInit ? this.onFieldInit(field, state) : null;
    }
}