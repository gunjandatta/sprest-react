import { Helper, SPTypes, Types } from "gd-sprest";

/**
 * Test Configuration
 */
export const Configuration = new Helper.SPConfig({
    ListCfg: [
        /** Test List */
        {
            CustomFields: [
                {
                    FieldInfo: {
                        defaultValue: "0",
                        name: "TestBoolean",
                        title: "Boolean",
                        type: Helper.Types.SPCfgFieldType.Boolean
                    },
                    Name: "TestBoolean"
                },
                {
                    FieldInfo: {
                        defaultValue: "Choice 3",
                        name: "TestChoice",
                        title: "Choice",
                        type: Helper.Types.SPCfgFieldType.Choice,
                        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5"]
                    } as Types.SPConfig.ISPConfigFieldInfoChoice,
                    Name: "TestChoice"
                },
                {
                    FieldInfo: {
                        name: "TestComments",
                        title: "Comments",
                        type: Helper.Types.SPCfgFieldType.Note
                    },
                    Name: "TestComments"
                },
                {
                    FieldInfo: {
                        format: SPTypes.DateFormat.DateOnly,
                        name: "TestDate",
                        title: "Date Only",
                        type: Helper.Types.SPCfgFieldType.Date
                    } as Types.SPConfig.ISPConfigFieldInfoDate,
                    Name: "TestDate"
                },
                {
                    FieldInfo: {
                        format: SPTypes.DateFormat.DateTime,
                        name: "TestDateTime",
                        title: "Date/Time",
                        type: Helper.Types.SPCfgFieldType.Date
                    } as Types.SPConfig.ISPConfigFieldInfoDate,
                    Name: "TestDateTime"
                },
                {
                    FieldInfo: {
                        listName: "SPReact",
                        name: "TestLookup",
                        title: "Lookup",
                        showField: "Title",
                        type: Helper.Types.SPCfgFieldType.Lookup
                    } as Types.SPConfig.ISPConfigFieldInfoLookup,
                    Name: "TestLookup"
                },
                {
                    FieldInfo: {
                        defaultValue: "Choice 3",
                        multi: true,
                        name: "TestMultiChoice",
                        title: "Multi-Choice",
                        type: Helper.Types.SPCfgFieldType.Choice,
                        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5"]
                    } as Types.SPConfig.ISPConfigFieldInfoChoice,
                    Name: "TestMultiChoice"
                },
                {
                    FieldInfo: {
                        listName: "SPReact",
                        multi: true,
                        name: "TestMultiLookup",
                        title: "Multi-Lookup",
                        showField: "Title",
                        type: Helper.Types.SPCfgFieldType.Lookup
                    } as Types.SPConfig.ISPConfigFieldInfoLookup,
                    Name: "TestMultiLookup"
                },
                {
                    FieldInfo: {
                        multi: true,
                        name: "TestMultiUser",
                        title: "Multi-User",
                        type: Helper.Types.SPCfgFieldType.User,
                        selectionMode: SPTypes.FieldUserSelectionType.PeopleAndGroups
                    } as Types.SPConfig.ISPConfigFieldInfoUser,
                    Name: "TestMultiUser"
                },
                {
                    FieldInfo: {
                        name: "TestNote",
                        title: "Note",
                        type: Helper.Types.SPCfgFieldType.Note
                    } as Types.SPConfig.ISPConfigFieldInfoNote,
                    Name: "TestNote"
                },
                {
                    FieldInfo: {
                        decimals: 2,
                        numberType: SPTypes.FieldNumberType.Decimal,
                        name: "TestNumberDecimal",
                        title: "Decimal",
                        type: Helper.Types.SPCfgFieldType.Number
                    } as Types.SPConfig.ISPConfigFieldInfoNumber,
                    Name: "TestNumberDecimal"
                },
                {
                    FieldInfo: {
                        numberType: SPTypes.FieldNumberType.Integer,
                        name: "TestNumberInteger",
                        title: "Integer",
                        type: Helper.Types.SPCfgFieldType.Number
                    } as Types.SPConfig.ISPConfigFieldInfoNumber,
                    Name: "TestNumberInteger"
                },
                {
                    FieldInfo: {
                        numberType: SPTypes.FieldNumberType.Percentage,
                        name: "TestNumberPercentage",
                        title: "Percentage",
                        type: Helper.Types.SPCfgFieldType.Number
                    } as Types.SPConfig.ISPConfigFieldInfoNumber,
                    Name: "TestNumberPercentage"
                },
                {
                    FieldInfo: {
                        name: "TestUrl",
                        title: "Url",
                        type: Helper.Types.SPCfgFieldType.Url
                    },
                    Name: "TestUrl"
                },
                {
                    FieldInfo: {
                        name: "TestUser",
                        title: "User",
                        type: Helper.Types.SPCfgFieldType.User,
                        selectionMode: SPTypes.FieldUserSelectionType.PeopleAndGroups
                    } as Types.SPConfig.ISPConfigFieldInfoUser,
                    Name: "TestUser"
                },
            ],
            ListInformation: {
                BaseTemplate: SPTypes.ListTemplateType.GenericList,
                Title: "SPReact"
            },
            ViewInformation: [
                {
                    ViewFields: [
                        "LinkTitle", "TestBoolean", "TestChoice", "TestDate", "TestDateTime",
                        "TestLookup", "TestMultiChoice", "TestMultiLookup", "TestMultiUser",
                        "TestNote", "TestNumberDecimal", "TestNumberInteger", "TestUrl", "TestUser"
                    ],
                    ViewName: "All Items"
                }
            ]
        }
    ],

    WebPartCfg: [
        {
            FileName: "wp_test.webpart",
            Group: "Dattabase",
            XML:
            `<?xml version="1.0" encoding="utf-8"?>
<webParts>
    <webPart xmlns="http://schemas.microsoft.com/WebPart/v3">
        <metaData>
            <type name="Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" />
            <importErrorMessage>$Resources:core,ImportantErrorMessage;</importErrorMessage>
        </metaData>
        <data>
            <properties>
                <property name="Title" type="string">Test List Item Form</property>
                <property name="Description" type="string">A test for the gd-sprest-react library.</property>
                <property name="ChromeType" type="chrometype">TitleOnly</property>
                <property name="Content" type="string">
                    &lt;script type="text/javascript" src="/sites/dev/siteassets/sprest-react/webparts.js"&gt;&lt;/script&gt;
                    &lt;div id="wp-list"&gt;&lt;/div&gt;
                    &lt;div id="wp-listCfg" style="display:none"&gt;&lt;/div&gt;
                    &lt;script type="text/javascript"&gt;SP.SOD.executeOrDelayUntilScriptLoaded(function() { new DemoWebParts.List(); }, 'webparts.js');&lt;/script&gt;
                </property>
            </properties>
        </data>
    </webPart>
</webParts>`
        }
    ]
});