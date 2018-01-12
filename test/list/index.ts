import { initializeIcons } from "@uifabric/icons";
import { FabricWebPart, WebPartSearchCfg, WebPartTabs } from "../../src";
import { Configuration } from "./cfg";
import { ListWebpart } from "./wp";
import "./list.scss";

// Load the icons
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
        new FabricWebPart({
            cfgElementId: "wp-listCfg",
            displayElement: ListWebpart,
            editElement: WebPartSearchCfg,
            targetElementId: "wp-list",
        });

        // Create an instance of the webpart tabs
        new FabricWebPart({
            cfgElementId: "wp-tabsCfg",
            displayElement: WebPartTabs,
            targetElementId: "wp-tabs"
        });
    }
}
