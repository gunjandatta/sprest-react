"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var gd_sprest_1 = require("gd-sprest");
var DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var common_1 = require("../common");
var _1 = require(".");
/**
 * Date Time field
 */
var FieldDateTime = /** @class */ (function (_super) {
    __extends(FieldDateTime, _super);
    function FieldDateTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Reference to the date picker.
         */
        _this._datePicker = null;
        /**
         * Render the field
         */
        _this.renderField = function () {
            // See if a custom render method exists
            if (_this.props.onRender) {
                return _this.props.onRender(_this.state.fieldInfo);
            }
            // Update the date picker properties
            var props = _this.props.dtProps || {};
            props.disabled = _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
            props.firstDayOfWeek = props.firstDayOfWeek ? props.firstDayOfWeek : DatePicker_1.DayOfWeek.Sunday;
            props.isRequired = typeof (props.isRequired) === "boolean" ? props.isRequired : _this.state.fieldInfo.required;
            props.label = _this.state.fieldInfo.title;
            props.onSelectDate = _this.state.fieldInfo.showTime ? _this.onDateChanged : _this.updateValue;
            props.placeholder = props.placeholder || "Date";
            props.strings = props.strings || common_1.DatePickerStrings;
            props.value = _this.getValue();
            // Render the component
            return (React.createElement("div", { className: (_this.props.className || "") },
                React.createElement(DatePicker_1.DatePicker, __assign({}, props, { componentRef: function (datePicker) { _this._datePicker = datePicker; } })),
                _this.renderTime(props.value)));
        };
        /**
         * Methods
         */
        /**
         * Method to get the value
         */
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
            return value;
        };
        /**
         * The date changed event
         * @param date - The date value.
         */
        _this.onDateChanged = function (date) {
            // Clear the time
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            // Update the value
            _this.updateValue(date);
        };
        /**
         * The time changed event
         * @param option - The time dropdown option.
         */
        _this.onTimeChanged = function (option) {
            // Get the time
            var time = option ? option.key.toString().split("|") : "00";
            var hours = parseInt(time[0]);
            var minutes = parseInt(time[1]);
            // Update the selected date
            var date = _this._datePicker["state"].selectedDate;
            date.setHours(hours);
            date.setMinutes(minutes);
            // Update the value
            _this.updateValue(date);
        };
        /**
         * Method to render the time component
         * @param date - The date/time value
         */
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
                props.disabled = _this.state.fieldInfo.readOnly || _this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display;
                props.onChanged = _this.onTimeChanged;
                props.placeHolder = props.placeHolder || "Time";
                props.selectedKey = selectedHour + "|" + selectedMin;
                // Return the time
                return (React.createElement(Dropdown_1.Dropdown, __assign({}, props)));
            }
            // Render nothing
            return null;
        };
        return _this;
    }
    return FieldDateTime;
}(_1.BaseField));
exports.FieldDateTime = FieldDateTime;
