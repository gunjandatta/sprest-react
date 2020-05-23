"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var gd_sprest_1 = require("gd-sprest");
var Spinner_1 = require("@fluentui/react/lib/Spinner");
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
         * The key used for storing the data in cache.
         */
        _this._key = null;
        /**
         * The OData query (Default)
         */
        _this._query = null;
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
            // Else, load using the ODATA query
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
                    gd_sprest_1.Web(_this.props.cfg.WebUrl, { requestDigest: contextInfo.GetContextWebInformation.FormDigestValue })
                        // Get the list
                        .Lists(_this.props.cfg.ListName)
                        // Query the items
                        .getItemsByQuery(_this._caml)
                        // Execute the request
                        .execute(function (items) {
                        // Load the data
                        _this.onLoadData(items);
                    });
                });
            }
            else {
                // Get the web
                gd_sprest_1.Web(_this.props.cfg.WebUrl)
                    // Get the list
                    .Lists(_this.props.cfg.ListName)
                    // Query the items
                    .getItemsByQuery(_this._caml)
                    // Execute the request
                    .execute(function (items) {
                    // Load the data
                    _this.onLoadData(items);
                });
            }
        };
        /**
         * Method to load the list data using an ODATA query
         */
        _this.loadODATA = function () {
            // Get the web
            gd_sprest_1.Web(_this.props.cfg.WebUrl)
                // Get the list
                .Lists(_this.props.cfg.ListName)
                // Get the items
                .Items()
                // Query the list
                .query(_this._query)
                // Execute the request
                .execute(function (items) {
                // Load the data
                _this.onLoadData(items);
            });
        };
        /**
         * Method to update the state
         */
        _this.onLoadData = function (items) {
            // Ensure the items exist
            if (items.results) {
                // Update the state
                _this.setState({
                    items: items.results,
                    lastRefresh: new Date(Date.now())
                });
            }
            else {
                // Log
                console.log("[gd-sprest] Error: The list query failed.");
                console.log("[gd-sprest] " + items["response"]);
                // Update the state
                _this.setState({ items: [] });
            }
        };
        /**
         * Method to refresh an item
         */
        _this.refreshItem = function (itemId) {
            // Return a promise
            return new Promise(function (resolve, reject) {
                // Copy the odata query
                var query = Object.create(_this._query);
                // Update the filter to query the item
                query.Filter = "ID eq " + itemId;
                // Get the web
                gd_sprest_1.Web(_this.props.cfg.WebUrl)
                    // Get the list
                    .Lists(_this.props.cfg.ListName)
                    // Get the items
                    .Items()
                    // Query the list
                    .query(query)
                    // Execute the request
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
            items: null,
            lastRefresh: new Date(Date.now())
        };
        // Update the cache properties
        _this._key = _this.props.cfg.WebPartId || "gd-sprest-items";
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
     * Events
     */
    // Component initialized event
    WebPartList.prototype.componentDidMount = function () {
        // Load the items
        this.load();
    };
    /**
     * Render the component
     */
    WebPartList.prototype.render = function () {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Ensure the list name exists
            if (this.props.cfg && this.props.cfg.ListName) {
                // Return a spinner
                return (React.createElement(Spinner_1.Spinner, { label: "Loading the items..." }));
            }
            // Render a message
            return (React.createElement("div", null, "Please edit the page and configure this webpart."));
        }
        // Return the items
        return (React.createElement("div", { className: (this.props.className || "") }, this.onRenderContainer(this.state.items)));
    };
    return WebPartList;
}(React.Component));
exports.WebPartList = WebPartList;
