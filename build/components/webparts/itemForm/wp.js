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
var __1 = require("../..");
/**
 * Item Form WebPart
 */
var ItemForm = (function (_super) {
    __extends(ItemForm, _super);
    /**
     * Constructor
     */
    function ItemForm(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Methods
         */
        // Method to render the fields
        _this.renderFields = function () {
            var formFields = [];
            var item = _this.state.item;
            // Parse the fields
            for (var i = 0; i < _this.props.fields.length; i++) {
                var field = _this.props.fields[i];
                // Add the form field
                formFields.push(React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-u-md12" },
                        React.createElement(__1.Field, { listName: _this.props.listName, name: field.name, onChange: field.onChange, onRender: field.onRender }))));
            }
            // Return the form fields
            return formFields;
        };
        // Set the state
        _this.state = {
            item: props.item || {}
        };
        return _this;
    }
    // Render the component
    ItemForm.prototype.render = function () {
        return (React.createElement("div", { className: "ms-Grid " + this.props.className }, this.renderFields()));
    };
    return ItemForm;
}(React.Component));
exports.ItemForm = ItemForm;
//# sourceMappingURL=wp.js.map