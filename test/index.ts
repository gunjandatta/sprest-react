import { Contacts } from "./contacts";
import { Demo } from "./list";
declare var SP;

// Create the global variables
window["Contacts"] = Contacts;
window["Demo"] = Demo;

// Let SharePoint know the script has been loaded
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("demo.js");