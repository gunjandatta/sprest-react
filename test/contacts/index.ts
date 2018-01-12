import { Configuration } from "./cfg";
import { FabricWebPart, WebPartListCfg } from "../../src";
import { ContactsWebPart } from "./wp";

/**
 * Contacts Demo
 */
export class Contacts {
    // The configuration for the demo
    static Configuration = Configuration;

    /**
     * Constructor
     */
    constructor() {
        // Create an instance of the contacts webpart
        new FabricWebPart({
            cfgElementId: "wp-contactsCfg",
            displayElement: ContactsWebPart,
            editElement: WebPartListCfg,
            targetElementId: "wp-contacts",
        });
    }
}
