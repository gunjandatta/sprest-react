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
         * Method to get the field value
         */
        _this.getFieldValue = function () { return _this.state.value || _this.state.fieldInfo.defaultValue || ""; };
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
         * Methods
         */
        /**
         * Method to load the field information
         */
        _this.load = function () {
            var state = Object.create(_this.state);
            // See if the field exists
            if (_this.props.field) {
                // Load the field
                _this.loadField(state, _this.props.field);
                // Update the state
                _this.setState(state, function () {
                    // Call the field loaded event
                    _this.onFieldLoaded ? _this.onFieldLoaded() : null;
                });
            }
            else {
                // Get the web
                (new gd_sprest_1.Web(state.fieldInfo.webUrl))
                    .Lists(state.fieldInfo.listName)
                    .Fields()
                    .getByInternalNameOrTitle(state.fieldInfo.name)
                    .execute(function (field) {
                    // Load the field
                    _this.loadField(state, field);
                    // Update the state
                    _this.setState(state, function () {
                        // Call the on loaded event
                        _this.onFieldLoaded ? _this.onFieldLoaded() : null;
                    });
                });
            }
        };
        // Method to load the field
        _this.loadField = function (state, field) {
            // Update the field information
            state.fieldInfo.defaultValue = field.DefaultValue;
            state.fieldInfo.readOnly = field.ReadOnlyField;
            state.fieldInfo.required = field.Required ? true : false;
            state.fieldInfo.title = field.Title;
            state.fieldInfo.type = field.FieldTypeKind;
            state.fieldInfo.typeAsString = field.TypeAsString;
            state.initFl = true;
            state.label = (state.fieldInfo.title || state.fieldInfo.name) + ":";
            state.showErrorMessage = state.fieldInfo.required ? (state.fieldInfo.defaultValue ? false : true) : false;
            // Call the initialize event
            _this.onFieldInit ? _this.onFieldInit(field, state) : null;
        };
        // Set the state
        _this.state = {
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
        return _this;
    }
    /**
     * Component initialized event
     */
    BaseField.prototype.componentWillMount = function () {
        // Load the data
        this.load();
    };
    /**
     * Method to render the component
     */
    BaseField.prototype.render = function () {
        // See if the field is initialized
        if (this.state.initFl) {
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