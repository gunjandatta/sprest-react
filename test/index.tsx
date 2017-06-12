import * as React from "react";
import {render} from "react-dom";
import {Configuration} from "./cfg";
import {Dashboard} from "./dashboard";
declare var SP;

// Create the global variable
window["gdSPRestReact"] = {
    // The test configuration
    Configuration,

    // The initialization method
    init: () => {
        // Get the target element
        let el = document.querySelector("#target");
        if(el) {
            // Render the dashboard to the target element
            render(<Dashboard />, el);
        }
    }
};

// Let SharePoint know the script has been loaded
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("test.js");