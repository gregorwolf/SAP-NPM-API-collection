
### Available Segments

* `#First` - Returns the first item. Only valid if the current context is a list control or an array.
* `#Last` - Returns the last item. Only valid if the current context is a list control or an array.
* `#Index:IndexNumber` - Returns the item specified by `IndexNumber`. Only valid if the current context is a list control or an array, the IndexNumber should be non-negative integer.
* `#Property:PropertyName` - Returns the property with name `PropertyName`. Only valid if the current context is an object.
* `#Application` - Returns the context of current application. `UserId` and [DeviceId](./DeviceId.md) are stored in its `AppData` object.
* `#Page:PageName` - Returns the page with name `PageName`.
* `#Page:-Current` - Returns the current page.
* `#Page:-Previous` - Returns the page that comes before the current page on the stack. These can be chained with other `Page` segments.
* `#Control:ControlName` - Returns the control with name `ControlName`. Only valid if the current context is a page.
* `#Section:SectionName` - Returns the section with name `SectionName`. Only valid if the current context is a page.
* `#Value` - Returns the value of a control. Only valid if the current context is a control.
* `#SelectedRow` - Returns the index of the current selection. Only valid if the current context is a list control.
* `#SelectedTarget` - Returns the data for the current selection. Only valid if the current context is a list control.
* `#SelectedDate` - Returns the selected date for the current calendar. Only valid if the current context is a calendar control.
* `#Count` - Returns the count. Only valid if the current context is a list control or an array.
* `#ClientData` - Returns the `ClientData` object associated with the current context. This may be modified in a rule to provide easy access to custom data. Only valid if the current context has a UI element, for example, a control or a page. See also the `getClientData` method of the `IClientAPI` interface.
* `#ActionResult:ActionResultName` - Returns the `ActionResult` object associated with the name.

If the property doesn't have available segment type, the default type is `#Property` when its value is not a non-negative integer. If its value is a non-negative integer, MDK treats it as `#Index` when it's binding to a list of objects; MDK treats it as `#Property` when it's binding to an object.

### Targeting a Page

This target path returns the page with name "WorkOrderDetails".

* `#Page:WorkOrderDetails` -> Returns a page with a specific name.

### Targeting a Control

To get a control from the "WorkOrderDetails" page:

* `#Page:WorkOrderDetails/#Control:ControlName`

To get the same control when the target path's context is the "WorkOrderDetails" page:

* `#Control:ControlName`

To get the same control when the context is a page that was navigated to from the "WorkOrderDetails" page:

* `#Page:-Previous/#Control:ControlName`

### Targeting the Value of a Control

To get the value of a control on a specified page:

* `#Page:PageName/#Control:ControlName/#Value`

To get the current page:

* `#Page:-Current`

To get a control on the current page:

* `#Page:-Current/#Control:ControlName`

To get the value of a control on the current page:

* `#Page:-Current/#Control:ControlName/#Value`

### Targeting Items in a List

The following target paths can be evaluated from a page which has a list picker control with name "ListPicker".

* `#Control:ListPicker/#Value/#First` -> Returns the first item in the control.
* `#Control:ListPicker/#Value/#Last` -> Returns the last item in the control.
* `#Control:ListPicker/#Value/5` -> Returns the 5th item in the control.
* `#Control:ListPicker/#Value/5/BindingObject` -> Returns the `BindingObject` property from the 5th item in the control if the `ListPicker` is bound to an EntitySet, which contains the full binding object.
* `#Control:ListPicker/#Value/5/DisplayValue` -> Returns the `DisplayValue` property from the 5th item in the control.
* `#Control:ListPicker/#SelectedTarget` -> Returns the data associated with the currently selected list item.
* `#Control:ListPicker/#SelectedRow` -> Returns the currently selected rows index.
* `#Control:ListPicker/#SelectedValue` -> Returns the selected value (`ReturnValue`) associated with the currently selected item from the `ListPicker` control (FormCell.ListPicker).
* `#Control:ListPicker/#FilterValue` -> Returns filter value to be used as FilterCriteria

### Targeting Properties on Application's `ClientData` Object

Accessing the read only application data through the Applicaiton ClientData is deprecated, and it is not read only now. Users should access the application data by Application AppData object instead.

* `#Application/#ClientData/UserId` -> Returns the `UserId` of current user.
* `#Application/#ClientData/DeviceId` -> Returns the [DeviceId](./DeviceId.md) of current device.
* `#Application/#ClientData/AvailableThemes` -> Returns the available Themes of application. The values return are without .dark or .less specifier even if the theme file is appearance specific.
* `#Application/#ClientData/MobileServiceEndpoint` -> Returns the Endpoint URL of application in SAP Mobile Services.
* `#Application/#ClientData/MobileServiceAppId` -> Returns the App ID of application in SAP Mobile Services.

### Targeting Properties on Application's `AppData` Object

* `#Application/#AppData/UserId` -> Returns the `UserId` of current user.
* `#Application/#AppData/DeviceId` -> Returns the [DeviceId](./DeviceId.md) of current device.
* `#Application/#AppData/AvailableThemes` -> Returns the available Themes of application. The values return are without .dark or .less specifier even if the theme file is appearance specific.
* `#Application/#AppData/MobileServiceEndpoint` -> Returns the Endpoint URL of application in SAP Mobile Services.
* `#Application/#AppData/MobileServiceAppId` -> Returns the App ID of application in SAP Mobile Services.
* `#Application/#AppData/AppName` -> Returns the value of _Name property for client application.

### Targeting Properties on a Page's `ClientData` Object

The following target path can be evaluated from a page whose `ClientData` object has an `items` property which is an array.

* `#ClientData/items/#First` -> Returns a the first item in the `items` property of `ClientData`.

### Targeting the Result Property in an `ActionResult` Object

The following target path can be evaluated while in an action chain having a previous action save off an `ActionResult` named 'CreateWorkOrder'.

* `#ActionResults:CreateWorkOrder/data/OrderDescription",` -> Returns the result's `OrderDescription`.

 Get an error object in an action execution if an error happens.
* `#ActionResults:CreateWorkOrder/error` -> Returns the error object.

### TargetPath for Result in Filter Page

```json
{
  "Result": [
    "{#Page:FilterPage/#Control:OrderBy/#Value}",
    "{#Page:FilterPage/#Control:Prio/#Value}",
    "{#Page:FilterPage/#Control:HeaderEquipment/#FilterValue}"
  ],
}
```
#### Escape TargetPath

Use \`(Backquote sign) to escape a string if you don't want it to be resolved as a TargetPath. For example, "\`{#ClientData/Data/Description}\`" will return the string of "{#ClientData/Data/Description}". 

```json
"ObjectCell": {
  "Description": "`{#ClientData/Data/Description}`",
  "Title": "`{#Application/#AppData/UserId}`"
}
```

### Get Application's ClientData or AppData Object in a Rule

You can evaluate the target path in your rule, for instance, to get the user id like below.

```js
export default function getUserId(context) {
  // get application clientData object by clientAPI
  let appClientData = context.getAppClientData();
  let myData = appClientData.MyData;

  // get UserId by Application AppData object
  let userId = context.evaluateTargetPath("#Application/#AppData/UserId");

}
```