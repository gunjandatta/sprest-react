import * as React from "react";
import {SPTypes, Types} from "gd-sprest";
import { DatePickerStrings, Field, IFieldProps, IFieldState, IFieldInfo } from "../common";
import {
    DatePicker, DayOfWeek, IDatePickerProps,
    Dropdown, IDropdownOption, IDropdownProps,
    Label
} from "office-ui-fabric-react";

/**
 * Date/Time Field Information
 */
interface IDateTimeFieldInfo extends IFieldInfo {
    showTime?: boolean;
}

/**
 * Properties
 */
interface Props extends IFieldProps {
    /** Date picker properties. */
    dtProps?: IDatePickerProps;

    /** Event triggered when the field value changes. */
    onChange?: (value:Date) => void;

    /** Time dropdown list properties. */
    timeProps?: IDropdownProps;
}

/**
 * State
 */
interface State extends IFieldState {
    fieldInfo: IDateTimeFieldInfo;
}

/**
 * Date Time field
 */
export class FieldDateTime extends Field<Props, State> {
    /**
     * Public Interface
     */

    // Render the field
    renderField() {
        // Update the date picker properties
        let props:IDatePickerProps = this.props.dtProps || {};
        props.firstDayOfWeek = props.firstDayOfWeek ? props.firstDayOfWeek : DayOfWeek.Sunday;
        props.isRequired = typeof (props.isRequired) === "boolean" ? props.isRequired : this.state.fieldInfo.required;
        props.label = this.state.label;
        props.onSelectDate = this.state.fieldInfo.showTime ? this.onDateChanged : this.updateValue;
        props.placeholder = props.placeholder || "Date";
        props.strings = props.strings || DatePickerStrings;
        props.value = this.getValue();

        // Render the component
        return (
            <div>
                <DatePicker {...props} ref="date" />
                {this.renderTime(props.value)}
            </div>
        );
    }

    /**
     * Events
     */

    // The field initialized event
    onFieldInit = (field:Types.IFieldDateTime, state:State) => {
        // Update the state
        state.fieldInfo.showTime = field.DisplayFormat == SPTypes.DateFormat.DateTime;
    }

    // The date changed event
    private onDateChanged = (date: Date) => {
        // Get the time
        let time = this.getTime();

        // Update the date
        date.setHours(time.Hours);
        date.setMinutes(time.Minutes);

        // Update the value
        this.updateValue(date);

        // Call the change event
        this.props.onChange ? this.props.onChange(date) : null;
    }

    // The time changed event
    private onTimeChanged = (option: IDropdownOption) => {
        // Get the time
        let time = this.getTime(option);

        // Update the selected date
        let date = (this.refs["date"] as DatePicker).state.selectedDate;
        date.setHours(time.Hours);
        date.setMinutes(time.Minutes);

        // Update the value
        this.updateValue(date);

        // Call the change event
        this.props.onChange ? this.props.onChange(date) : null;
    }

    /**
     * Methods
     */

    // Method to get the value
    private getValue = () => {
        // Get the value
        let value = this.getFieldValue();
        if (value && typeof (value) === "string") {
            // Convert the value
            return new Date(value);
        }

        // Return the value
        return null;
    }

    // Method to get the time
    private getTime = (option?: IDropdownOption) => {
        // Ensure the option exists
        if (option == null) {
            let ddl = this.refs["time"] as Dropdown;

            // Get the selected option
            option = ddl.props.options[ddl.state.selectedIndex];
        }

        // Get the time
        let time = option ? option.key.toString().split("|") : "00";

        // Return the time
        return {
            Hours: parseInt(time[0]),
            Minutes: parseInt(time[1])
        };
    }

    // Method to render the time component
    private renderTime = (date:Date) => {
        // See if we are showing the time component
        if (this.state.fieldInfo.showTime) {
            let props: IDropdownProps = this.props.timeProps || {};
            let selectedHour = date ? date.getHours() : null;
            let selectedMin = date ? date.getMinutes() : null;

            // Clear the options
            props.options = [];

            // Loop until the max
            for (let i = 0; i < 24; i++) {
                // Set the hour
                let hour = (i == 0 ? 12 : i);
                hour -= hour > 12 ? 12 : 0;

                // Add 15 minute increments
                for (let j = 0; j < 4; j++) {
                    // Create the option
                    props.options.push({
                        key: i + "|" + j * 15,
                        selected: i == selectedHour && j == selectedMin,
                        text: hour + ":" + ("00" + (j * 15)).slice(-2) + " " + (i < 12 ? "AM" : "PM")
                    });
                }
            }

            // Update the properties
            props.onChanged = this.onTimeChanged;
            props.placeHolder = props.placeHolder || "Time";
            props.selectedKey = selectedHour + "|" + selectedMin;

            // Return the time
            return (
                <Dropdown {...props} ref="time" />
            );
        }

        // Render nothing
        return null;
    }
}