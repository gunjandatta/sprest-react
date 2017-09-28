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
var es6_promise_1 = require("es6-promise");
var gd_sprest_1 = require("gd-sprest");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * WebPart List
 */
var WebPartList = /** @class */ (function (_super) {
    __extends(WebPartList, _super);
    /**
     * Constructor
     * @param props - The webpart list properties.
     */
    function WebPartList(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        /**
         * The CAML query
         */
        _this._caml = null;
        /**
         * The OData query (Default)
         */
        _this._query = null;
        /**
         * Events
         */
        /**
         * The render container event
         * @param items - An array of webpart list items.
         */
        _this.onRenderContainer = function (items) {
            var elItems = [];
            // Parse the items
            for (var i = 0; i < items.length; i++) {
                // Render the item
                var elItem = _this.onRenderItem(items[i]);
                if (elItem) {
                    // Add the item element
                    elItems.push(elItem);
                }
            }
            // Render the item elements
            return React.createElement("div", null, elItems);
        };
        /**
         * The render item event
         * @param item - The webpart list item.
         */
        _this.onRenderItem = function (item) { return React.createElement("div", null); };
        /**
         * Methods
         */
        /**
         * Method to load the list data
         */
        _this.load = function () {
            // See if we are using the CAML query
            if (_this._caml) {
                _this.loadCAML();
            }
            else {
                _this.loadODATA();
            }
        };
        /**
         * Method to load the list data using a CAML query
         */
        _this.loadCAML = function () {
            // See if we are targeting a different web
            if (_this.props.cfg.WebUrl) {
                // Get the context information for the destination web
                // Note - Since we are using a POST request, this would be required for cross-site collection requests
                gd_sprest_1.ContextInfo.getWeb(_this.props.cfg.WebUrl).execute(function (contextInfo) {
                    // Get the web
                    (new gd_sprest_1.Web(_this.props.cfg.WebUrl, { requestDigest: contextInfo.GetContextWebInformation.FormDigestValue }))
                        .Lists(_this.props.cfg.ListName)
                        .getItemsByQuery(_this._caml)
                        .execute(_this.onLoadData);
                });
            }
            else {
                // Get the web
                (new gd_sprest_1.Web(_this.props.cfg.WebUrl))
                    .Lists(_this.props.cfg.ListName)
                    .getItemsByQuery(_this._caml)
                    .execute(_this.onLoadData);
            }
        };
        /**
         * Method to load the list data using an ODATA query
         */
        _this.loadODATA = function () {
            // Get the web
            (new gd_sprest_1.Web(_this.props.cfg.WebUrl))
                .Lists(_this.props.cfg.ListName)
                .Items()
                .query(_this._query)
                .execute(_this.onLoadData);
        };
        /**
         * Method to update the state
         */
        _this.onLoadData = function (items) {
            // Ensure the items exist
            if (items.results) {
                // Update the state
                _this.setState({
                    items: items.results
                });
            }
            else {
                // Log
                console.log("[gd-sprest] Error: The list query failed.");
                console.log("[gd-sprest] " + items["response"]);
            }
        };
        /**
         * Method to refresh an item
         */
        _this.refreshItem = function (itemId) {
            // Return a promise
            return new es6_promise_1.Promise(function (resolve, reject) {
                // Copy the odata query
                var query = Object.create(_this._query);
                // Update the filter to query the item
                query.Filter = "ID eq " + itemId;
                // Get the web
                (new gd_sprest_1.Web(_this.props.cfg.WebUrl))
                    .Lists(_this.props.cfg.ListName)
                    .Items()
                    .query(query)
                    .execute(function (items) {
                    // Ensure the item exists
                    if (items.results && items.results[0]) {
                        // Resolve the promise
                        resolve(items.results[0]);
                    }
                    else {
                        // Reject the promise
                        reject(items["response"]);
                    }
                });
            });
        };
        // Set the state
        _this.state = {
            items: null
        };
        // Set the default query to use ODATA
        _this._query = {
            Expand: [],
            GetAllItems: false,
            OrderBy: ["Title"],
            Select: ["*"],
            Top: 500
        };
        return _this;
    }
    /**
     * Render the component
     */
    WebPartList.prototype.render = function () {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Ensure the list name exists
            if (this.props.cfg && this.props.cfg.ListName) {
                // Load the items
                this.load();
                // Return a spinner
                return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the items..." }));
            }
            // Render a message
            return (React.createElement("div", null, "Please edit the page and configure this webpart."));
        }
        // Return the items
        return (React.createElement("div", { className: this.props.className }, this.onRenderContainer(this.state.items)));
    };
    return WebPartList;
}(React.Component));
exports.WebPartList = WebPartList;
//# sourceMappingURL=wpList.js.map