import { Helper, List, SPTypes, Types } from "gd-sprest";

/**
 * Contact
 */
interface IContact extends Types.IListItemQueryResult {
    MCCategory: string;
    MCPhoneNumber: string;
    Title: string;
}

/**
 * Configuration
 */
export const Configuration = new Helper.SPConfig({
    // List Configuration
    ListCfg: [
        {
            // Custom fields for this list
            CustomFields: [
                {
                    choices: ["Business", "Family", "Personal"],
                    name: "MCCategory",
                    title: "Category",
                    type: Helper.Types.SPCfgFieldType.Choice
                } as Types.SPConfig.ISPConfigFieldInfoChoice,
                {
                    name: "MCPhoneNumber",
                    title: "Phone Number",
                    type: Helper.Types.SPCfgFieldType.Text
                }
            ],

            // The list creation information
            ListInformation: {
                BaseTemplate: SPTypes.ListTemplateType.GenericList,
                Title: "My Contacts"
            },

            // Update the 'Title' field's display name
            TitleFieldDisplayName: "Full Name",

            // Update the default 'All Items' view
            ViewInformation: [
                {
                    ViewFields: ["MCCategory", "LinkTitle", "MCPhoneNumber"],
                    ViewName: "All Items",
                    ViewQuery: "<OrderBy><FieldRef Name='MCCategory' /><FieldRef Name='Title' /></OrderBy>"
                }
            ]
        }
    ],

    // WebPart Configuration
    WebPartCfg: [
        {
            FileName: "wpContacts.webpart",
            Group: "Demo - Contacts",
            XML: `<?xml version="1.0" encoding="utf-8"?>
<webParts>
    <webPart xmlns="http://schemas.microsoft.com/WebPart/v3">
        <metaData>
            <type name="Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" />
            <importErrorMessage>$Resources:core,ImportantErrorMessage;</importErrorMessage>
        </metaData>
        <data>
            <properties>
                <property name="Title" type="string">My Contacts</property>
                <property name="Description" type="string">Demo displaying my contacts.</property>
                <property name="ChromeType" type="chrometype">None</property>
                <property name="Content" type="string">
                    &lt;script type="text/javascript" src="/sites/dev/siteassets/demo.js"&gt;&lt;/script&gt;
                    &lt;div id="wp-contacts"&gt;&lt;/div&gt;
                    &lt;script type="text/javascript"&gt;SP.SOD.executeOrDelayUntilScriptLoaded(function() { new (); }, 'demo.js');&lt;/script&gt;
                </property>
            </properties>
        </data>
    </webPart>
</webParts>`
        }
    ]
});

// Method to add test data
Configuration.addTestData = () => {
    // Get the list
    let list = new List("My Contacts");

    // Define the list of names
    let names = [
        "John A. Doe",
        "Jane B. Doe",
        "John C. Doe",
        "Jane D. Doe",
        "John E. Doe",
        "Jane F. Doe",
        "John G. Doe",
        "Jane H. Doe",
        "John I. Doe",
        "Jane J. Doe"
    ];

    // Loop 10 item
    for (let i = 0; i < 10; i++) {
        // Set the category
        let category = "";
        switch (i % 3) {
            case 0:
                category = "Business";
                break;
            case 1:
                category = "Family";
                break;
            case 2:
                category = "Personal";
                break;
        }


        // Add the item
        list.Items().add({
            MCCategory: category,
            MCPhoneNumber: "nnn-nnn-nnnn".replace(/n/g, i.toString()),
            Title: names[i]
        })
            // Execute the request, but wait for the previous request to complete
            .execute((item) => {
                // Log
                console.log("[WP Demo] Test item '" + item["Title"] + "' was created successfully.");
            }, true);
    }

    // Wait for the requests to complete
    list.done(() => {
        // Log
        console.log("[WP Demo] The test data has been added.");
    });
};
