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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
/**
 * Base Panel
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    /**
     * Constructor
     */
    function BasePanel(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Public Interface
         */
        // Method to hide the panel
        _this.hide = function () {
            // Update the state
            _this.setState({ visible: false });
        };
        // Method to show the panel
        _this.show = function () {
            // Update the state
            _this.setState({ visible: true });
        };
        // Set the state
        _this.state = {
            visible: typeof (props.isOpen) === "boolean" ? props.isOpen : false
        };
        return _this;
    }
    // Method to render the component
    BasePanel.prototype.render = function () {
        return (React.createElement(office_ui_fabric_react_1.Panel, __assign({}, this.props, { isOpen: this.state.visible, onDismiss: this.hide }), this.props.children));
    };
    return BasePanel;
}(React.Component));
exports.BasePanel = BasePanel;
//# sourceMappingURL=basePanel.js.map