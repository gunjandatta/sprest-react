"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var gd_sprest_1 = require("gd-sprest");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
var common_1 = require("../../common");
/**
 * Date Time field
 */
var FieldDateTime = (function (_super) {
    __extends(FieldDateTime, _super);
    function FieldDateTime() {
        /**
         * Public Interface
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Events
         */
        // The field initialized event
        _this.onFieldInit = function (field, state) {
            // Update the state
            state.fieldInfo.showTime = field.DisplayFormat == gd_sprest_1.SPTypes.DateFormat.DateTime;
        };
        // The date changed event
        _this.onDateChanged = function (date) {
            // Clear the time
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            // Call the change event
            _this.props.onChange ? _this.props.onChange(date) : null;
            // Update the value
            _this.updateValue(date);
        };
        // The time changed event
        _this.onTimeChanged = function (option) {
            // Get the time
            var time = option ? option.key.toString().split("|") : "00";
            var hours = parseInt(time[0]);
            var minutes = parseInt(time[1]);
            // Update the selected date
            var date = _this.refs["date"].state.selectedDate;
            date.setHours(hours);
            date.setMinutes(minutes);
            // Call the change event
            _this.props.onChange ? _this.props.onChange(date) : null;
            // Update the value
            _this.updateValue(date);
        };
        /**
         * Methods
         */
        // Method to get the value
        _this.getValue = function () {
            // Get the value
            var value = _this.getFieldValue();
            if (value && typeof (value) === "string") {
                // See if the default value is set to today
                if (value == "[today]") {
                    // Return the current date/time
                    return new Date(Date.now());
                }
                else {
                    // Convert the value
                    return new Date(value);
                }
            }
            // Return the value
            return null;
        };
        // Method to render the time component
        _this.renderTime = function (date) {
            // Update the date value
            date = date ? date : _this.state.value;
            // See if we are showing the time component
            if (_this.state.fieldInfo.showTime) {
                var props = _this.props.timeProps || {};
                var selectedHour = date ? date.getHours() : null;
                var selectedMin = date ? date.getMinutes() : null;
                // Clear the options
                props.options = [];
                // Loop until the max
                for (var i = 0; i < 24; i++) {
                    // Set the hour
                    var hour = (i == 0 ? 12 : i);
                    hour -= hour > 12 ? 12 : 0;
                    // Add 15 minute increments
                    for (var j = 0; j < 4; j++) {
                        // Create the option
                        props.options.push({
                            key: i + "|" + j * 15,
                            selected: i == selectedHour && j == selectedMin,
                            text: hour + ":" + ("00" + (j * 15)).slice(-2) + " " + (i < 12 ? "AM" : "PM")
                        });
                    }
                }
                // Update the properties
                props.onChanged = _this.onTimeChanged;
                props.placeHolder = props.placeHolder || "Time";
                props.selectedKey = selectedHour + "|" + selectedMin;
                // Return the time
                return (React.createElement(office_ui_fabric_react_1.Dropdown, __assign({}, props, { ref: "time" })));
            }
            // Render nothing
            return null;
        };
        return _this;
    }
    // Render the field
    FieldDateTime.prototype.renderField = function () {
        // See if a custom render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.fieldInfo);
        }
        // See if this is the display mode
        if (this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display) {
            // Return the value
            var value = this.getValue();
            return (React.createElement("div", { className: this.props.className }, value ? (this.state.fieldInfo.showTime ? value.toLocaleString() : value.toLocaleDateString()) : ""));
        }
        // Update the date picker properties
        var props = this.props.dtProps || {};
        props.firstDayOfWeek = props.firstDayOfWeek ? props.firstDayOfWeek : office_ui_fabric_react_1.DayOfWeek.Sunday;
        props.isRequired = typeof (props.isRequired) === "boolean" ? props.isRequired : this.state.fieldInfo.required;
        props.label = this.state.label;
        props.onSelectDate = this.state.fieldInfo.showTime ? this.onDateChanged : this.updateValue;
        props.placeholder = props.placeholder || "Date";
        props.strings = props.strings || common_1.DatePickerStrings;
        props.value = this.getValue();
        // Render the component
        return (React.createElement("div", { className: this.props.className },
            React.createElement(office_ui_fabric_react_1.DatePicker, __assign({}, props, { ref: "date" })),
            this.renderTime(props.value)));
    };
    return FieldDateTime;
}(common_1.BaseField));
exports.FieldDateTime = FieldDateTime;
//# sourceMappingURL=fieldDateTime.js.map