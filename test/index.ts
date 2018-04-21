import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { WebParts } from "../src";
import { Configuration } from "./cfg";
import { ListWebpart } from "./wp";
import "./list.scss";
declare var SP;

// Register the icons and pull the fonts from the default SharePoint CDN
initializeIcons();

/**
 * SP-REST React Demo
 */
export class Demo {
    // The configuration for the demo
    static Configuration = Configuration;

    /**
     * Constructor
     */
    constructor() {
        // Create an instance of the list webpart
        new WebParts.FabricWebPart({
            cfgElementId: "wp-listCfg",
            displayElement: ListWebpart,
            editElement: WebParts.WebPartSearchCfg,
            targetElementId: "wp-list",
        });

        // Create an instance of the webpart tabs
        new WebParts.FabricWebPart({
            cfgElementId: "wp-tabsCfg",
            displayElement: WebParts.WebPartTabs,
            targetElementId: "wp-tabs"
        });
    }
}

// Create the global variables
window["Demo"] = Demo;

// Let SharePoint know the script has been loaded
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("demo.js");
