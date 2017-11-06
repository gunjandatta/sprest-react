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
var _1 = require(".");
/**
 * WebPart List Configuration Panel
 */
var WebPartListCfg = /** @class */ (function (_super) {
    __extends(WebPartListCfg, _super);
    /**
     * Constructor
     * @param props - The webpart list configuration properties.
     */
    function WebPartListCfg(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        /**
         * The OData query.
         */
        _this._query = null;
        /**
         * Reference to the list dropdown.
         */
        _this._listDropdown = null;
        /**
         * Reference to the refresh button.
         */
        _this._refreshButton = null;
        /**
         * Reference to the save button.
         */
        _this._saveButton = null;
        /**
         * Reference to the web url text field.
         */
        _this._webUrl = null;
        /**
         * Events
         */
        /**
         * The list change event
         * @param state - The current state, updates to this object will be saved.
         * @param option - The dropdown option.
         * @param idx - The dropdown option index.
         */
        _this.onListChanged = function (state, option, idx) { };
        /**
         * The lists loaded event
         * @param newState - The new state, updates to this object will be saved.
         */
        _this.onListsLoaded = function (newState) { };
        /**
         * The refresh button click event
         * @param ev - The button click event.
         */
        _this.onRefresh = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Update the state
            _this.setState({ loadFl: true });
            // Update the configuration
            var cfg = _this.props.cfg;
            cfg.WebUrl = _this._webUrl.state.value;
            // Load the lists
            _this.loadLists(cfg);
        };
        /**
         * Overload Methods
         */
        /**
         * The render contents event
         * @param cfg - The webpart list configuration.
         */
        _this.onRenderContents = function (cfg) {
            // See if the lists exists
            if (_this.state.loadFl || _this.state.lists == null) {
                // Load the lists
                _this.loadLists(cfg);
                // Return a loading indicator
                return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the lists..." }));
            }
            // Render the component
            return (React.createElement("div", null,
                _this.renderWebUrl(),
                _this.renderList()));
        };
        /**
         * The render footer event
         */
        _this.onRenderFooter = function () {
            // See if the lists exists
            if (_this.state.lists != null) {
                return _this.renderSaveButton();
            }
            // Render nothing
            return null;
        };
        /**
         * Methods
         */
        // Method to get the list
        _this.getList = function (option) {
            var selectedList = null;
            // Parse the lists
            for (var i = 0; i < _this.state.lists.length; i++) {
                var list = _this.state.lists[i];
                // See if this is the target list
                if (list.Title == option.key) {
                    // Set the list
                    selectedList = list;
                    break;
                }
            }
            // Return the list
            return selectedList;
        };
        /**
         * Method to load the lists for the drop down
         */
        _this.loadLists = function (cfg) {
            // Get the web
            (new gd_sprest_1.Web(cfg.WebUrl))
                .Lists()
                .query(_this._query)
                .execute(function (lists) {
                var options = [];
                var selectedList = null;
                // Parse the lists
                for (var i = 0; i < lists.results.length; i++) {
                    var list = lists.results[i];
                    // See if this is the selected list
                    if (list.Title == cfg.ListName) {
                        // Set the list
                        selectedList = list;
                    }
                    // Add the option
                    options.push({
                        key: list.Title,
                        text: list.Title
                    });
                }
                // Set the new state
                var newState = {
                    cfg: cfg,
                    lists: lists.results,
                    loadFl: false,
                    options: options,
                    selectedList: selectedList
                };
                // Call the on lists loaded method
                _this.onListsLoaded(newState);
                // Set the state
                _this.setState(newState);
            });
        };
        /**
         * Method to save the webpart configuration
         */
        _this.onSave = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Save the webpart configuration
            _this.saveConfiguration(_this.state.cfg);
        };
        /**
         * Method to render the list property
         */
        _this.renderList = function () {
            return (React.createElement(office_ui_fabric_react_1.Dropdown, { key: "listDropdown", label: "List:", onChanged: _this.updateListName, ref: function (ddl) { _this._listDropdown = ddl; }, options: _this.state.options, selectedKey: _this.state.cfg.ListName || "" }));
        };
        /**
         * Method to render the save button
         */
        _this.renderSaveButton = function () {
            return (React.createElement(office_ui_fabric_react_1.PrimaryButton, { key: "saveButton", onClick: _this.onSave, ref: function (btn) { _this._refreshButton = btn; }, text: "Save" }));
        };
        /**
         * Method to render the web url property
         */
        _this.renderWebUrl = function () {
            return [
                React.createElement(office_ui_fabric_react_1.TextField, { label: "Relative Web Url:", key: "webUrlTextField", ref: function (webUrl) { _this._webUrl = webUrl; }, value: _this.state.cfg.WebUrl || "" }),
                React.createElement(office_ui_fabric_react_1.PrimaryButton, { key: "webUrlRefreshButton", onClick: _this.onRefresh, ref: function (btn) { _this._refreshButton = btn; }, text: "Refresh" })
            ];
        };
        /**
         * Method to update the list name
         */
        _this.updateListName = function (option, idx) {
            var newState = Object.create(_this.state);
            // Set the list name
            newState.cfg.ListName = option.text;
            newState.selectedList = _this.getList(option);
            // Call the change event
            _this.onListChanged(newState, option, idx);
            // Update the state
            _this.setState(newState);
        };
        // Set the query
        _this._query = {
            OrderBy: ["Title"],
            Top: 500
        };
        return _this;
    }
    return WebPartListCfg;
}(_1.WebPartCfgPanel));
exports.WebPartListCfg = WebPartListCfg;
//# sourceMappingURL=wpListCfg.js.map