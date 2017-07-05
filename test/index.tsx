import * as React from "react";
import { render } from "react-dom";
import { Configuration } from "./cfg";
import { Dashboard } from "./dashboard";
import { WebPart } from "../src";
declare var SP;

// Create the global variable
window["gdSPRestReact"] = {
    // The test configuration
    Configuration,

    // The initialization method
    init: () => {
        // Create the webpart
        new WebPart({
            displayElement: Dashboard,
            targetElementId: "target"
        });
    }
};

// Let SharePoint know the script has been loaded
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("test.js");