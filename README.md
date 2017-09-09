[![Current Version](https://badge.fury.io/js/gd-sprest-react.svg)](https://www.npmjs.com/package/gd-sprest-react)
[![Downloads](https://img.shields.io/npm/dm/gd-sprest-react.svg)](https://www.npmjs.com/package/gd-sprest-react)
[![Total Downloads](https://img.shields.io/npm/dt/gd-sprest-react.svg)](https://www.npmjs.com/package/gd-sprest-react)

# SharePoint React Library
This library is an extension of the [gd-sprest](https://gunjandatta.github.io/sprest) framework. This library provides react components designed to work in SharePoint 2013. The Office Fabric-UI React framework is being used to keep a consistent OTB look and feel, similar to Office 365.
* [Overview](http://dattabase.com/sharepoint-react-components/)
* [SharePoint 2013 Modern WebPart](http://dattabase.com/sharepoint-2013-modern-webpart)
* [SharePoint 2013/Online REST Framework](https://gunjandatta.github.io/sprest)
* [SharePoint 2013 Project Deployment](http://dattabase.com/sharepoint-2013-project-deployment/)
* [WebPart Examples](https://github.com/gunjandatta/sprest-webparts)

## Components
* Field
* Item Form
* Panel
* SharePoint People Picker
* WebPart (2013/Online)

## Field Component
#### Supported Field Types
* Attachments
* Boolean
* Choice
* Date
* Date/Time
* Lookup
* Managed Metadata
* Multi-Choice
* Multi-User
* Note (Plain Text)
* Number
* Text
* Url
* User

#### Events
* onChange(value) - The change event for the field.
* onRender(fieldInfo) - Override the component render method.

## Code Examples
#### Field
The field component requires the list name and internal field name properties to be set. A query will be made to SharePoint and will render based on its properties.
```
<Field defaultValue={item.Title} listName={listName} name="Title" />
```


#### Item Form
The item form component requires the list name to be set. By default, the fields will be loaded from the default content type. An optional array of field information can be provided. The field information element allows you to specify:
* controlMode
    * Display - Displays the field value.
    * Edit - Does not default the value to the field's default value defined in SharePoint.
    * New - Defaults the value to the field's default value defined in SharePoint.
* name - The internal field name.
* onChange(value) - The change event for the field.
* onRender(fieldInfo) - Override the component render method.
```
<ItemForm
    item={this.state.item}
    listName={this.props.cfg.ListName}
    showAttachments={true}
/>
```

#### Panel
The panel extends the "Panel" component from the Office Fabric React framework, and adds the following methods:
* hide - Hides the panel.
* show - Shows the panel.
```
<Panel ref={panel => { this._panel = panel; }} />

// Hide the panel
hidePanel = () => { this._panel.hide(); }

// Show the panel
showPanel = () => { this._panel.show(); }
```

#### SharePoint People Picker
The people picker component will currently search the user information list. This will be enhanced to include a "Search Global" to allow the user to search all role providers.
```
<SPPeoplePicker allowMultiple={this.state.fieldInfo.allowMultiple} fieldValue={this.state.value} />
```


#### WebPart
The webpart component supports webpart and wiki pages. The component will auto detect the page mode (display or edit) and allow you to render a component based on the page state.

_Refer to this [blog post](http://dattabase.com/sharepoint-2013-modern-webpart/) for a guide to creating webparts in SharePoint 2013._
_Refer to this [GitHub project](https://github.com/gunjandatta/sprest-webparts) for examples of the webpart components available in this library._
```
import { WebPartListCfg } from "gd-sprest-react";

export class WebPartDemo {
    constructor() {
        new WebPart({
            cfgElementId: "wp-demoCfg",
            displayElement: DemoWebpart,
            editElement: WebPartListCfg,
            targetElementId: "wp-demo"
        });
    }
}
```