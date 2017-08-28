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
 * WebPart List Configuration
 */
var WebPartListCfg = (function (_super) {
    __extends(WebPartListCfg, _super);
    /**
     * Constructor
     */
    function WebPartListCfg(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        _this._query = null;
        _this._listDropdown = null;
        /**
         * Events
         */
        // The list change event
        _this.onListChanged = function (state, option, idx) { };
        // The lists loaded event
        _this.onListsLoaded = function (newState) { };
        // Render the save button
        _this.onRenderFooter = function () {
            return (React.createElement(office_ui_fabric_react_1.PrimaryButton, { onClick: _this.onSave, ref: function (btn) { _this._refreshButton = btn; }, text: "Save" }));
        };
        /**
         * Methods
         */
        // Method to load the lists for the drop down
        _this.loadLists = function (cfg) {
            // Get the web
            (new gd_sprest_1.Web(cfg.WebUrl))
                .Lists()
                .query(_this._query)
                .execute(function (lists) {
                var options = [];
                // Parse the lists
                for (var i = 0; i < lists.results.length; i++) {
                    var list = lists.results[i];
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
                    options: options
                };
                // Call the on lists loaded method
                _this.onListsLoaded(newState);
                // Set the state
                _this.setState(newState);
            });
        };
        // The render contents event
        _this.onRenderContents = function (cfg) {
            return (React.createElement("div", null,
                React.createElement(office_ui_fabric_react_1.TextField, { label: "Relative Web Url:", ref: function (webUrl) { _this._webUrl = webUrl; }, value: cfg ? cfg.WebUrl : "" }),
                React.createElement(office_ui_fabric_react_1.PrimaryButton, { onClick: _this.onRefresh, ref: function (btn) { _this._refreshButton = btn; }, text: "Refresh" }),
                React.createElement(office_ui_fabric_react_1.Dropdown, { label: "List:", onChanged: _this.updateListName, ref: function (ddl) { _this._listDropdown = ddl; }, options: _this.state.lists, selectedKey: cfg ? cfg.ListName : "" })));
        };
        // The refresh button click event
        _this.onRefresh = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Update the configuration
            var cfg = _this.props.cfg;
            cfg.WebUrl = _this._webUrl.state.value;
            // Load the lists
            _this.loadLists(cfg);
        };
        // The save button click event
        _this.onSave = function (ev) {
            // Prevent postback
            ev.preventDefault();
            // Get the configuration
            var cfg = _this.state.cfg;
            // Save the webpart configuration
            _this.saveConfiguration(cfg);
        };
        // Method to update the list name
        _this.updateListName = function (option, idx) {
            var newState = _this.state;
            // Set the list name
            newState.cfg.ListName = option.text;
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
        // Load the lists
        _this.loadLists(props.cfg);
        return _this;
    }
    return WebPartListCfg;
}(_1.WebPartConfigurationPanel));
exports.WebPartListCfg = WebPartListCfg;
//# sourceMappingURL=wpListCfg.js.map