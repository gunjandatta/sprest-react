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
 * WebPart List
 */
var WebPartList = /** @class */ (function (_super) {
    __extends(WebPartList, _super);
    /**
     * Constructor
     */
    function WebPartList(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Global Variables
         */
        _this._query = null;
        /**
         * Events
         */
        // The render container event
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
        // The render item event
        _this.onRenderItem = function (item) { return React.createElement("div", null); };
        /**
         * Methods
         */
        // Method to load the documents
        _this.load = function () {
            // Load the documents
            (new gd_sprest_1.Web(_this.props.cfg.WebUrl))
                .Lists(_this.props.cfg.ListName)
                .Items()
                .query(_this._query)
                .execute(function (items) {
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
            });
        };
        // Set the state
        _this.state = {
            items: null
        };
        // Set the query
        _this._query = {
            Expand: [],
            GetAllItems: false,
            OrderBy: ["Title"],
            Select: ["*"],
            Top: 500
        };
        return _this;
    }
    // Render the component
    WebPartList.prototype.render = function () {
        // Ensure the component has been initialized
        if (this.state.items == null) {
            // Load the items
            this.load();
            // Return a spinner
            return (React.createElement(office_ui_fabric_react_1.Spinner, { label: "Loading the items..." }));
        }
        // Return the items
        return (React.createElement("div", { className: this.props.className }, this.onRenderContainer(this.state.items)));
    };
    return WebPartList;
}(React.Component));
exports.WebPartList = WebPartList;
//# sourceMappingURL=wpList.js.map