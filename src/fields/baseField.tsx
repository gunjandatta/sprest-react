import * as React from "react";
import { Helper, SPTypes } from "gd-sprest";
import { Label } from "@fluentui/react/lib/Label";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { IBaseField, IBaseFieldProps, IBaseFieldState } from "./types";

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
            fieldInfo: null,
            initFl: false,
            showErrorMessage: false,
            value: this.props.defaultValue
        } as State;
    }

    /**
     * Method to render the component
     */
    render() {
        // See if the field exists
        if (this.state.fieldInfo && this.state.fieldInfo.field) {
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

        // Load the field
        Helper.ListFormField.create({
            field: this.props.field,
            listName: this.props.listName,
            name: this.props.name,
            webUrl: this.props.webUrl
        }).then(fieldInfo => {
            // Call the field loaded event
            this.onFieldLoaded ? this.onFieldLoaded(fieldInfo, this.state) : null;

            // Update the state
            this.setState({ fieldInfo });
        });

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

    /**
     * Method to get the field value
     */
    getFieldValue = () => { return this.state.value; }

    /**
     * Event triggered after loading the field information
     */
    onFieldLoaded?: (info: Helper.IListFormFieldInfo, state: State) => void;

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
}