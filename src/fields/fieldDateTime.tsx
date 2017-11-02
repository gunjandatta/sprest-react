import * as React from "react";
import { SPTypes, Types } from "gd-sprest";
import {
    DatePicker, DayOfWeek, IDatePickerProps,
    Dropdown, IDropdownOption, IDropdownProps,
    Label
} from "office-ui-fabric-react";
import { DatePickerStrings } from "../common";
import { IFieldDateTime, IFieldDateTimeProps, IFieldDateTimeState } from "../definitions";
import { BaseField } from ".";

/**
 * Date Time field
 */
export class FieldDateTime extends BaseField<IFieldDateTimeProps, IFieldDateTimeState> implements IFieldDateTime {
    /**
     * Reference to the date picker.
     */
    private _datePicker: DatePicker = null;

    /**
     * Render the field
     */
    renderField = () => {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }

        // Update the date picker properties
        let props: IDatePickerProps = this.props.dtProps || {};
        props.disabled = this.state.controlMode == SPTypes.ControlMode.Display;
        props.firstDayOfWeek = props.firstDayOfWeek ? props.firstDayOfWeek : DayOfWeek.Sunday;
        props.isRequired = typeof (props.isRequired) === "boolean" ? props.isRequired : this.state.fieldInfo.required;
        props.label = this.state.label;
        props.onSelectDate = this.state.fieldInfo.showTime ? this.onDateChanged : this.updateValue;
        props.placeholder = props.placeholder || "Date";
        props.strings = props.strings || DatePickerStrings;
        props.value = this.getValue();

        // Render the component
        return (
            <div className={(this.props.className || "")}>
                <DatePicker {...props} ref={datePicker => { this._datePicker = datePicker; }} />
                {this.renderTime(props.value)}
            </div>
        );
    }

    /**
     * Events
     */

    /**
     * The field initialized event
     * @param field - The field.
     * @param state - The current state.
     */
    onFieldInit = (field: any, state: IFieldDateTimeState) => {
        // Update the state
        state.fieldInfo.showTime = field.DisplayFormat == SPTypes.DateFormat.DateTime;
    }

    /**
     * The date changed event
     * @param date - The date value.
     */
    private onDateChanged = (date: Date) => {
        // Clear the time
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        // Update the value
        this.updateValue(date);
    }

    /**
     * The time changed event
     * @param option - The time dropdown option.
     */
    private onTimeChanged = (option: IDropdownOption) => {
        // Get the time
        let time = option ? option.key.toString().split("|") : "00";
        let hours = parseInt(time[0]);
        let minutes = parseInt(time[1]);

        // Update the selected date
        let date = this._datePicker.state.selectedDate;
        date.setHours(hours);
        date.setMinutes(minutes);

        // Update the value
        this.updateValue(date);
    }

    /**
     * Methods
     */

    /**
     * Method to get the value
     */
    private getValue = () => {
        // Get the value
        let value = this.getFieldValue();
        if (value && typeof (value) === "string") {
            // See if the default value is set to today
            if (value == "[today]") {
                // Return the current date/time
                return new Date(Date.now());
            } else {
                // Convert the value
                return new Date(value);
            }
        }

        // Return the value
        return value;
    }

    /**
     * Method to render the time component
     * @param date - The date/time value
     */
    private renderTime = (date: Date) => {
        // Update the date value
        date = date ? date : this.state.value;

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
            props.disabled = this.state.fieldInfo.readOnly || this.state.controlMode == SPTypes.ControlMode.Display;
            props.onChanged = this.onTimeChanged;
            props.placeHolder = props.placeHolder || "Time";
            props.selectedKey = selectedHour + "|" + selectedMin;

            // Return the time
            return (
                <Dropdown {...props} />
            );
        }

        // Render nothing
        return null;
    }
}