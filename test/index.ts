import { WebPart } from "../src";
import { Configuration } from "./cfg";
import { DemoWebpart } from "./wp";
import { WebPartCfg } from "./wpCfg";
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
            cfgElementId: "wp-demoCfg",
            displayElement: DemoWebpart,
            editElement: WebPartCfg,
            targetElementId: "wp-demo"
        });
    }
}

// Create the global variable
window["Demo"] = Demo;

// Let SharePoint know the script has been loaded
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("demo.js");