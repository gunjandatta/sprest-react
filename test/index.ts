import "core-js/es6/map";
import "core-js/es6/promise";
import "core-js/es6/set";
import { WebPart, WebPartSearchCfg, WebPartTabs } from "../src";
import { Configuration } from "./cfg";
import { ListWebpart } from "./wp";
import "./list.scss";
declare var SP;
/**
 * SP-REST React Demo
 */
class Demo {
    // The configuration for the demo
    static Configuration = Configuration;

    /**
     * Constructor
     */
    constructor() {
        // Create an instance of the webpart
        new WebPart({
            cfgElementId: "wp-listCfg",
            displayElement: ListWebpart,
            editElement: WebPartSearchCfg,
            targetElementId: "wp-list",
        });

        // Create an instance of the webpart tabs
        new WebPart({
            cfgElementId: "wp-tabsCfg",
            displayElement: WebPartTabs,
            targetElementId: "wp-tabs"
        });
    }
}

// Create the global variable
window["Demo"] = Demo;

// Let SharePoint know the script has been loaded
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("demo.js");