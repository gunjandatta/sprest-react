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
 */
var BaseField = /** @class */ (function (_super) {
    __extends(BaseField, _super);
    /**
     * Constructor
     */
    function BaseField(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        // Session Key
        _this._sessionKey = "gd-sprest";
        /**
         * Public Interface
         */
        // Method to get the field value
        _this.getFieldValue = function () { return _this.state.value || _this.state.fieldInfo.defaultValue || ""; };
        // Event triggered after the field information is retrieved from SharePoint.
        _this.onFieldInit = function (field, state) { };
        // Event triggered after loading the field information.
        _this.onFieldLoaded = function () { };
        // Method to update the value
        _this.updateValue = function (value) {
            // Call the on change event
            _this.props.onChange ? _this.props.onChange(value) : null;
            // Update the state
            _this.setState({
                showErrorMessage: _this.state.fieldInfo.required ? (value ? false : true) : false,
                value: value
            });
        };
        // Method to render the field
        _this.renderField = function () {
            // See if we are displaying the field
            if (_this.state.controlMode == gd_sprest_1.SPTypes.ControlMode.Display) {
                // Render the field name and value
                return (React.createElement(office_ui_fabric_react_1.Label, null, _this.state.fieldInfo.title + ": " + _this.state.value));
            }
            // Render nothing
            return null;
        };
        /**
         * Methods
         */
        // Method to load the field information.
        _this.load = function () {
            // Default the state
            var state = {
                controlMode: _this.props.controlMode,
                fieldInfo: {
                    defaultValue: "",
                    errorMessage: _this.props.errorMessage || "This field requires a value.",
                    listName: _this.props.listName,
                    name: _this.props.name,
                    required: _this.props.required ? true : false,
                    title: _this.props.title,
                    webUrl: _this.props.webUrl
                },
                initFl: false,
                showErrorMessage: false,
                value: _this.props.defaultValue
            };
            // See if the session data exists
            var sessionData = sessionStorage.getItem(_this._sessionKey);
            if (sessionData) {
                // Try to parse the data
                try {
                    var data = JSON.parse(sessionData);
                    var list = data[state.fieldInfo.listName] || {};
                    var field = list.Fields ? list.Fields[state.fieldInfo.name] : null;
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
                        _this.onFieldLoaded ? _this.onFieldLoaded() : null;
                        // Return the field information
                        return state;
                    }
                }
                // Do nothing
                catch (ex) { }
            }
            // Get the web
            (new gd_sprest_1.Web(state.fieldInfo.webUrl))
                .Lists(state.fieldInfo.listName)
                .Fields()
                .getByInternalNameOrTitle(state.fieldInfo.name)
                .execute(function (field) {
                // Update the field information
                state.fieldInfo.defaultValue = field.DefaultValue;
                state.fieldInfo.required = field.Required ? true : false;
                state.fieldInfo.title = field.Title;
                state.fieldInfo.type = field.FieldTypeKind;
                state.fieldInfo.typeAsString = field.TypeAsString;
                state.initFl = true;
                state.label = (state.fieldInfo.title || state.fieldInfo.name) + ":";
                state.showErrorMessage = state.fieldInfo.required ? (state.fieldInfo.defaultValue ? false : true) : false;
                // Call the on initialized event
                _this.onFieldInit ? _this.onFieldInit(field, state) : null;
                // Update the state
                _this.setState(state, function () {
                    // Call the on loaded event
                    _this.onFieldLoaded ? _this.onFieldLoaded() : null;
                });
            });
            // Return the state
            return state;
        };
        // Set the state
        _this.state = _this.load();
        return _this;
    }
    // Method to render the component
    BaseField.prototype.render = function () {
        // See if the field is initialized
        if (this.state.initFl) {
            // Render the field
            return this.props.onRender ? this.props.onRender(this.state.fieldInfo) : this.renderField();
        }
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
//# sourceMappingURL=baseField.js.map