import { Helper, SPTypes, Types } from "gd-sprest";

/**
 * Test Configuration
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        /** Test List */
        {
            CustomFields: [
                {
                    defaultValue: "0",
                    name: "TestBoolean",
                    title: "Boolean",
                    type: Helper.SPCfgFieldType.Boolean
                },
                {
                    defaultValue: "Choice 3",
                    name: "TestChoice",
                    title: "Choice",
                    type: Helper.SPCfgFieldType.Choice,
                    choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5"]
                } as Types.Helper.IFieldInfoChoice,
                {
                    name: "TestComments",
                    title: "Comments",
                    type: Helper.SPCfgFieldType.Note
                },
                {
                    format: SPTypes.DateFormat.DateOnly,
                    name: "TestDate",
                    title: "Date Only",
                    type: Helper.SPCfgFieldType.Date
                } as Types.Helper.IFieldInfoDate,
                {
                    format: SPTypes.DateFormat.DateTime,
                    name: "TestDateTime",
                    title: "Date/Time",
                    type: Helper.SPCfgFieldType.Date
                } as Types.Helper.IFieldInfoDate,
                {
                    listName: "SPReact",
                    name: "TestLookup",
                    title: "Lookup",
                    showField: "Title",
                    type: Helper.SPCfgFieldType.Lookup
                } as Types.Helper.IFieldInfoLookup,
                {
                    name: "TestMMS",
                    title: "MMS",
                    type: Helper.SPCfgFieldType.MMS
                },
                {
                    defaultValue: "Choice 3",
                    multi: true,
                    name: "TestMultiChoice",
                    title: "Multi-Choice",
                    type: Helper.SPCfgFieldType.Choice,
                    choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5"]
                } as Types.Helper.IFieldInfoChoice,
                {
                    listName: "SPReact",
                    multi: true,
                    name: "TestMultiLookup",
                    title: "Multi-Lookup",
                    showField: "Title",
                    type: Helper.SPCfgFieldType.Lookup
                } as Types.Helper.IFieldInfoLookup,
                {
                    multi: true,
                    name: "TestMultiUser",
                    title: "Multi-User",
                    type: Helper.SPCfgFieldType.User,
                    selectionMode: SPTypes.FieldUserSelectionType.PeopleAndGroups
                } as Types.Helper.IFieldInfoUser,
                {
                    name: "TestNote",
                    title: "Note",
                    type: Helper.SPCfgFieldType.Note
                } as Types.Helper.IFieldInfoNote,
                {
                    decimals: 2,
                    numberType: SPTypes.FieldNumberType.Decimal,
                    name: "TestNumberDecimal",
                    title: "Decimal",
                    type: Helper.SPCfgFieldType.Number
                } as Types.Helper.IFieldInfoNumber,
                {
                    numberType: SPTypes.FieldNumberType.Integer,
                    name: "TestNumberInteger",
                    title: "Integer",
                    type: Helper.SPCfgFieldType.Number
                } as Types.Helper.IFieldInfoNumber,
                {
                    numberType: SPTypes.FieldNumberType.Percentage,
                    name: "TestNumberPercentage",
                    title: "Percentage",
                    type: Helper.SPCfgFieldType.Number
                } as Types.Helper.IFieldInfoNumber,
                {
                    name: "TestUrl",
                    title: "Url",
                    type: Helper.SPCfgFieldType.Url
                },
                {
                    name: "TestUser",
                    title: "User",
                    type: Helper.SPCfgFieldType.User,
                    selectionMode: SPTypes.FieldUserSelectionType.PeopleAndGroups
                } as Types.Helper.IFieldInfoUser
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