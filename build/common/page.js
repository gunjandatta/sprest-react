"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gd_sprest_1 = require("gd-sprest");
var es6_promise_1 = require("es6-promise");
/**
 * Page Common Methods
 */
var Page = /** @class */ (function () {
    function Page() {
    }
    // Method to get the webpart
    Page.getWebPart = function (wpId) {
        // Return a promise
        return new es6_promise_1.Promise(function (resolve, reject) {
            // Get the current context
            var context = SP.ClientContext.get_current();
            // Get the webpart from the current page
            var page = context.get_web().getFileByServerRelativeUrl(gd_sprest_1.ContextInfo.serverRequestPath);
            var wpMgr = page.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
            var wpDef = wpMgr.get_webParts().getById(wpId);
            var wp = wpDef.get_webPart();
            context.load(wp, "Properties");
            // Execute the request
            context.executeQueryAsync(
            // Success
            function () {
                // Resolve the promise
                resolve({
                    Context: context,
                    Properties: wp.get_properties(),
                    WebPart: wp,
                    WebPartDefinition: wpDef
                });
            }, 
            // Error
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // Reject the promise
                reject(args[1] ? args[1].get_message() : "");
            });
        });
    };
    // Method to get the webpart id for a specified element
    Page.getWebPartId = function (el) {
        // Loop until we find the webpart id
        while (el) {
            // See if this element contains the webpart id
            var wpId = el.getAttribute("webpartid");
            if (wpId) {
                // Return the webpart id
                return wpId;
            }
            // Check the parent
            el = el.parentElement;
        }
        // Unable to detect
        return "";
    };
    // Method to detect if a page is being edited
    Page.isEditMode = function () {
        var formName = MSOWebPartPageFormName ? MSOWebPartPageFormName : "";
        // Get the form
        var form = document.forms[MSOWebPartPageFormName];
        if (form) {
            // Get the wiki page mode
            var wikiPageMode = form._wikiPageMode ? form._wikiPageMode.value : null;
            // Get the webpart page mode
            var wpPageMode = form.MSOLayout_InDesignMode ? form.MSOLayout_InDesignMode.value : null;
            // Determine if the page is being edited
            return wikiPageMode == "Edit" || wpPageMode == "1";
        }
        // Unable to determine
        return false;
    };
    // Method to detect if the page is a wiki page.
    Page.isWikiPage = function () {
    };
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=page.js.map