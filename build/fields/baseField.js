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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var gd_sprest_1 = require("gd-sprest");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * Base Field
 * This is the base field class, inherited by all field types.
 */
var BaseField = /** @class */ (function (_super) {
    __extends(BaseField, _super);
    /**
     * Constructor
     * @param props - The base field properties.
     */
    function BaseField(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Methods
         */
        /**
         * Method to get the field value
         */
        _this.getFieldValue = function () { return _this.state.value; };
        /**
         * Method to render the field
         */
        _this.renderField = function () {
            // See if we are displaying the field
            if (_this.props.controlMode == gd_sprest_1.SPTypes.ControlMode.Display) {
                // Render the field name and value
                return (React.createElement(office_ui_fabric_react_1.Label, null, _this.state.fieldInfo.title + ": " + (_this.state.value || "")));
            }
            // Render nothing
            return null;
        };
        /**
         * Method to update the value
         * @param value - The field value.
         */
        _this.updateValue = function (value) {
            // Ensure a custom renderer doesn't exist, and call the on change event
            _this.props.onRender == null && _this.props.onChange ? _this.props.onChange(value) : null;
            // Update the state
            _this.setState({
                showErrorMessage: _this.state.fieldInfo.required ? (value ? false : true) : false,
                value: value
            });
        };
        // Set the state
        _this.state = {
            controlMode: _this.props.controlMode,
            fieldInfo: null,
            initFl: false,
            showErrorMessage: false,
            value: _this.props.defaultValue
        };
        return _this;
    }
    /**
     * Method to render the component
     */
    BaseField.prototype.render = function () {
        var _this = this;
        // See if the field exists
        if (this.state.fieldInfo && this.state.fieldInfo.field) {
            var elField = null;
            // See if there is a custom render event
            if (this.props.onRender) {
                // Call the event
                elField = this.props.onRender(this.state.fieldInfo);
            }
            else {
                // Render the field
                elField = this.renderField();
                // Call the field render event
                elField = this.props.onFieldRender ? this.props.onFieldRender(this.state.fieldInfo, elField) : elField;
            }
            // Return the field
            return elField;
        }
        // Load the field
        gd_sprest_1.Helper.ListFormField.create({
            field: this.props.field,
            listName: this.props.listName,
            name: this.props.name,
            webUrl: this.props.webUrl
        }).then(function (fieldInfo) {
            // Call the field loaded event
            _this.onFieldLoaded ? _this.onFieldLoaded(fieldInfo, _this.state) : null;
            // Update the state
            _this.setState({ fieldInfo: fieldInfo });
        });
        // Determine if we are showing a spinner
        var showFl = typeof (this.props.showLoadingFl) === "boolean" ? this.props.showLoadingFl : true;
        if (showFl) {
            // Return a loading spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the '" + this.props.name + "' field.", size: office_ui_fabric_react_1.SpinnerSize.small }));
        }
        // Show nothing by default
        return null;
    };
    return BaseField;
}(React.Component));
exports.BaseField = BaseField;
