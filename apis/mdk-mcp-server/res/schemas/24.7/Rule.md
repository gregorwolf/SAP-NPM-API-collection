# Rules

Rules are JavaScript modules that can be used to add application functionality using ES5 or ES6 syntax.

## Syntax

### ES5 Syntax

Only ES5 default exports are supported.
For example, this module exports two functions `AlwaysFalse` and `AlwaysFalse2`.  `AlwaysFalse` is the default export and `AlwaysFalse2` is a named export.  Currently only `AlwaysFalse` is available directly to the application.

```js
function AlwaysFalse() {
  return false;
}

function AlwaysFalse2() {
  return false;
}

// export option #1 using default ES5 syntax
module.exports.default = {AlwaysFalse};
// export option #2 using named ES5 syntax
module.exports.AlwaysFalse2 = {AlwaysFalse2};
```

### ES6 Syntax

Only ES6 default exports are supported.
For example, this module exports two functions `AlwaysTrue` and `AlwaysTrue2`.  `AlwaysTrue` is the default export and `AlwaysTrue2` is a named export.  Currently only `AlwaysTrue` is available directly to the application.

```js
// export option #1 using default es6 syntax
export default function AlwaysTrue() {
  return true;
}

// export option #2 using named es6 syntax
export function AlwaysTrue2() {
   return true;
}
```

----
## NativeScript Framework Modules

MDK provides a set of NativeScript Framework Modules that can be accessed on any Client API object using a well known property name.  Each Client API property maps to a NativesScript Framework Module.

Use the provided links to view NativeScript Framework details.

| ClientAPI Property Name           | NativeScript Module|
| ----------------------------------|--------------------|
| nativescript.appSettingsModule    | [ApplicationSettings](https://v6.docs.nativescript.org/ns-framework-modules/application-settings)|
| nativescript.connectivityModule   | [Connectivity](https://v6.docs.nativescript.org/ns-framework-modules/connectivity)|
| nativescript.fileSystemModule     | [FileSystem](https://v6.docs.nativescript.org/ns-framework-modules/file-system)|
| nativescript.platformModule       | [Platform](https://v6.docs.nativescript.org/ns-framework-modules/platform)|
| nativescript.uiDialogsModule      | [Dialogs](https://v6.docs.nativescript.org/ui/dialogs)|
| nativescript.utilsModule          | [Utils](https://v6.docs.nativescript.org/core-concepts/utils)|
| nativescript.applicationModule    | [Application](https://v6.docs.nativescript.org/ns-framework-modules/application)|

#### Example

```js
export default function SomeRuleFunction(anyClientAPI) {
  // Obtain a reference to the NativeScript Platform Module
  const platformModule = anyClientAPI.nativescript.platformModule;
  if (platformModule.isAndroid) {
      console.log("You are using Android device");
  }
  const applicationModule = anyClientAPI.nativescript.applicationModule;
  console.log("Current device appearance: " + applicationModule.systemAppearance());
  // return value: "dark" | "light" | null
  // For Android, the value returned would be based on device settings. When the app is in force light UI mode, and the device appearance is in 'dark' theme, the value returned on Android for this  `applicationModule.systemAppearance()` is still 'dark'.
  // To get the current appearance of the app, please refer to getAppearanceMode client API.
}
```

----
## The ClientAPI objects

The exported rule function will be given a [ClientAPI](../../reference/apidoc/classes/clientapi.html) object as an argument. Through this object, the rule function can query application state and data.

The `ClientAPI` object implements the [IClientAPI](../../reference/apidoc/interfaces/iclientapi.html) interface or one of its sub-interfaces (or Proxies). The specific interface type will depend on the context the rule is executed from. For example, if the rule is executed in the context of a Page (as is the case for an "OnPageLoaded" rule), it will receive a [PageProxy](../../reference/apidoc/classes/pageproxy.html) instance as its ClientAPI object. (Note that [IPageProxy](../../reference/apidoc/interfaces/ipageproxy.html) extends [IControlContainerProxy](../../reference/apidoc/interfaces/icontrolcontainerproxy.html) which in turns extends [IClientAPI](../../reference/apidoc/interfaces/iclientapi.html)).

#### Example

```js
export default function OnPageLoaded(pageProxy) {
  // The rule function can use the pageProxy object here. This
  // object will have all of its APIs ...
  pageProxy.setCaption('A new page caption');
  // ... as well as all of the IClientAPI methods
  pageProxy.executeAction('/App/Actions/SomeAction.action');
  // ... can set the action bar item #2 to hidden.
  pageProxy.setActionBarItemVisible(1, false);
}
```

### `IClientAPI`

The [IClientAPI](../../reference/apidoc/interfaces/iclientapi.html) is the base interface for all objects passed to rule functions.

### `IControlProxy`

The [IControlProxy](../../reference/apidoc/interfaces/icontrolproxy.html) is the interface of the object passed to a rule function, when the rule is ran in the context of a control.

### `IControlContainerProxy`

The [IControlContainerProxy](../../reference/apidoc/interfaces/icontrolcontainerproxy.html) is the interface of the object passed to a rule function, when the rule is ran in the context of a control container.

### `IFormCellProxy`

The [IFormCellProxy](../../reference/apidoc/interfaces/iformcellproxy.html) is the interface of the object passed to a rule function, when the rule is ran in the context of a Form Cell.

### `IFormCellTargetProxy`

The [IFormCellTargetProxy](../../reference/apidoc/interfaces/iformcelltargetproxy.html) is the interface of the object returned to a rule function, when the rule executes the `IFormCellProxy::getTargetSpecifier()` method.

### `IPageProxy`

The [IPageProxy](../../reference/apidoc/interfaces/ipageproxy.html) is the interface of the object passed to a rule function, when the rule is ran in the context of a Page.

### `ISectionedTableProxy`

The [ISectionedTableProxy](../../reference/apidoc/interfaces/isectionedtableproxy.html) is the interface of the object passed to a rule function, when the rule is ran in the context of a Sectioned Table.

### `ISectionProxy`

The [ISectionProxy](../../reference/apidoc/interfaces/isectionproxy.html) is the interface of Sections.

### `ILinkSpecifierProxy`

The [ILinkSpecifierProxy](../../reference/apidoc/interfaces/ilinkspecifierproxy.html) is the nterface of the object returned to a rule function, when the rule executes the [IClientAPI::createLinkSpecifierProxy()](../../reference/apidoc/interfaces/iclientapi.html#createlinkspecifierproxy) method.

### `ILoggerManager`

The interface of the object returned to a rule function when the rule executes the `IClientAPI::getLogger()` method.

```js
export interface ILoggerManager {
  // Toggles the state of the Logger "on"/"off"
  toggle(): Promise<any>;
  // Turns logging "on"
  on(): Promise<any>;
  // Turns logging "off"
  off(): Promise<any>;
  // Returns whether the logger is turned on
  isTurnedOn(): boolean;
  // Gets the logging level. See below for values
  getLevel(): string;
  // Sets the logging
  // Valid logging levels are:
  // 'Trace', 'Debug', 'Info', 'Warn', and 'Error' 
  public setLevel(logLevel: string): Promise<any>;
  // Logs a message.
  // Severity is one of the logging levels mentioned above.
  public log(message: string, severity: string): Promise<any>;
  // Uploads the log file
  public uploadLogFile(backendURL: string, applicationID: string): Promise<any>;
}
```

### `IToolbarProxy`

The [IToolbarProxy](../../reference/apidoc/interfaces/itoolbarproxy.html) is the interface of the object passed to a rule function when the rule is ran in the context of a Toolbar container.

### `IToolbarItemProxy`

The [IToolbarItemProxy](../../reference/apidoc/interfaces/itoolbaritemproxy.html) is the interface of the object passed to a rule function when the rule is ran in the context of a Toolbar Item.

### `IActionResult`

The [IActionResult](../../reference/apidoc/interfaces/iactionresult.html) is the interface of the object passed to a rule function when the rule is ran in the context of an Action.

----
## Rules Examples

### Getting the value of a collection based control

This example uses the `IControlProxy.getValue()` interface in a `Control.Type.FormCell.SegmentedControl` control.

```js
// Control definition
{
  "_Name": "SegmentedFormCell",
  "_Type": "Control.Type.FormCell.SegmentedControl",
  "Caption": "Priorities",
  "OnValueChange": "/MDKApp/Rules/SegmentControlChange.js",
  "Segments": [
    "Low",
    "Medium",
    "High"
  ],
  "Value": "Low"
}

// Whenever a new selection is made
// "/MDKApp/Rules/FormCell/SegmentControlChange.js" is called:

// SegmentControlChange.js
export default function FormCellSegmentedChangeHandler(controlProxy) {
  let selections = "";
  // getValue returns an array of Objects in the form:
  // [{SelectedIndex:value, ReturnValue:value}, ...]
  controlProxy.getValue().forEach((selectedItem) => {
    selections += selectedItem.ReturnValue + '\n';
  })
  console.log(selections); // Log all selections to the control

  alert(controlProxy.getValue()[0].ReturnValue); // Alert with the first selection
}
```

### Changing PickerItems programmatically

This example uses the `IFormCellProxy.setTargetSpecifier()` interface to change
picker items programatically.

```json
// Control definition
{
  "_Name": "SegmentedFormCell",
  "_Type": "Control.Type.FormCell.SegmentedControl",
  "Caption": "high via rule",
  "Segments": [
    "Low",
    "Medium",
    "High"
  ],
  "Value": "Low",
  "OnValueChange": "/MDKApp/Rules/FormCell/UpdateListPickerItems.js"
}
```

```js
// Whenever the a new segmented button is selected
// "/MDKApp/Rules/FormCell/UpdateListPickerItems.js" is called

export default function UpdateListPickerItems(controlProxy) {
  // selection is the selected SegmentedControl value
  let selection = controlProxy.getValue()[0].ReturnValue;
  let containerProxy = controlProxy.getPageProxy().getControl('FormCellContainer');
  if (containerProxy.isContainer()) {
    // get a proxy to the Control.Type.FormCell.ListPicker instance
    let listPickerProxy = containerProxy.getControl('ListPickerFormCellSingle');
    let specifier = listPickerProxy.getTargetSpecifier();
    specifier.setDisplayValue("{OrderDescription}");
    specifier.setEntitySet("MyWorkOrderHeaders");
    specifier.setReturnValue("{OrderId}");
    specifier.setService("/MDKApp/Services/Amw.service");
    // set the query options for the list picker based on SegmentedControl Value
    switch (selection) {
      case 'Low':
        specifier.setQueryOptions("$top=5");
        break;
      case 'Medium':
        specifier.setQueryOptions("$top=10");
        break;
      case 'High':
        specifier.setQueryOptions("$top=15");
        break;
    }
  }

  listPickerProxy.setTargetSpecifier(specifier);
}
```

### Changing ObjectCell PickerItems programmatically

This example uses the `IFormCellProxy.setTargetSpecifier()` interface to change
picker items ([ObjectCell](Page/Common/ObjectCellEntitySetTarget.schema.md)) programatically.

```json
// Control definition
{
  "_Name": "SegmentedFormCell",
  "_Type": "Control.Type.FormCell.SegmentedControl",
  "Caption": "high via rule for ObjectCell",
  "Segments": [
    "Low",
    "Medium",
    "High"
  ],
  "Value": "Low",
  "OnValueChange": "/MDKApp/Rules/FormCell/UpdateListPickerObjectCellItems.js"
}
```

```js
// Whenever the a new segmented button is selected
// "/MDKApp/Rules/FormCell/UpdateListPickerObjectCellItems.js" is called

export default function UpdateListPickerObjectCellItems(controlProxy) {
  let selection = controlProxy.getValue()[0].ReturnValue;
  let containerProxy = controlProxy.getPageProxy().getControl('FormCellContainer');
  if (!containerProxy.isContainer()) {
    return;
  }
  let listPickerProxy = containerProxy.getControl('ListPickerFormCellObjectCellSingle2');
  let specifier = listPickerProxy.getTargetSpecifier();
  specifier.setObjectCell({
    Title: "{OrderDescription}",
    Subhead: "{OrderId}",
    DetailImage: "/MDKApp/Images/workorder.png"
  });
  specifier.setReturnValue("{OrderId}");
  specifier.setEntitySet("MyWorkOrderHeaders");
  specifier.setService("/MDKApp/Services/Amw.service");

  switch (selection) {
    case 'Low':
      specifier.setQueryOptions("$top=5");
      break;
    case 'Medium':
      specifier.setQueryOptions("$top=10");
      break;
    case 'High':
      specifier.setQueryOptions("$top=15");
      break;
  }

  listPickerProxy.setTargetSpecifier(specifier).then(() => {
    listPickerProxy.setValue(['4000189']);
  })
}
```

### Logging Examples

These examples show how to use the logging interfaces inside the rules.

```js
// Initialize logger by rule
// Ideally used when the application starts
export default function InitializeLoggerRule(clientAPI) {

  const logFileName = 'LogFile.txt';
  const maxFileSizeInMegaBytes = 8;
  // If the logger has already been initialized, it has no effect.
  // FileName and fileSize are optional values, if not specified, default values will be used.
  clientAPI.initializeLogger(logFileName, maxFileSizeInMegaBytes);

  // You can even initialize logger state and level
  let logger = clientAPI.getLogger();
  logger.on();
  logger.setLevel('Info');
}

// Or you can even use this
// Initialize logger by rule which calls an action
export default function InitializeLoggerWithCallingAnAction(clientAPI) {
  return clientAPI.executeAction('/MDKApp/Actions/Logger/SetState.action');
}

// Use the logger by rule (it should have been already initialized)
// Available functionality:
// Log a message, Edit log level, Edit state (turn on/off), Get current logger state,
// Get current root log level, Upload log file
export default function UseLoggerRule(clientAPI) {

  // Get logger instance
  let logger = clientAPI.getLogger();

  // Returns a boolean according to current logger state (on=true, off=false)
  logger.isTurnedOn();

  // Turns off the logger
  logger.off();

  // Turns on the logger
  logger.on();

  // Toggles the logger state (on/off)
  logger.toggle();

  // Returns the current logger root level. Possible values: Debug, Info, Warn, Error, Off
  logger.getLevel();

  // Sets the logger root log level. Possible values: Debug, Info, Warn, Error, Off
  logger.setLevel('Info');

  // Logs a message with the specified log level.
  // If log level is not specified, the root log level will be used.
  const optionalLogMessageLogLevel = 'Debug';
  logger.log('This is a test message', optionalLogMessageLogLevel);

  //Log uploading works only after successful authentication
  // Upload the log file according to client settings
  clientAPI.executeAction('/MDKApp/Actions/Logger/Upload.action');

  // Upload log file according to own settings
  logger.uploadLogFile(backendURL, applicationID);
}
```

### Setting links using rule

This example shows how to use the `ClientAPI.createLinkSpecifierProxy()` interface to set links.

```json
// Definition
{
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MDKApp/Services/Amw.service",
    "ReadLink": "{@odata.readLink}"
  },
  "Properties": {
    "OrderDescription": "#Control:OrderDescription/#Value",
  },
  "UpdateLinks": "/MDKApp/Rules/OData/UpdateLinkRule.js"
}
```

```js
export default function UpdateLinkRule(ClientAPI) {
  let containerProxy = ClientAPI.getControl('PageOneFormCell');
  let listPickerProxy = containerProxy.getControl('EquipmentList');
  let queryOption = '';
  // odata action expects link array
  let links = [];
  if (listPickerProxy.getValue().length > 0) {
      let selectedValue = listPickerProxy.getValue()[0].ReturnValue;
      queryOption = `$filter=EquipId eq '${selectedValue}'`;
      let link = ClientAPI.createLinkSpecifierProxy('EquipmentHeader', 'MyEquipments', queryOption, '');
      links.push(link.getSpecifier());
  }
  return links;
}
```

### Setting Toolbar item property value using rule

This example shows how to use the `IToolbarItemProxy.getParent().getToolbarControls()` interface to get the array of toolbar items and set the property value.

```json
// Definition
{
  "Caption": "Dynamic toolbar item value based on rule",
  "Controls": [],
  "ToolBar": {
    "Controls": [
      {
        "_Name": "DynamicItem",
        "_Type": "Control.Type.ToolbarItem",
        "Caption": "/MDKApp/Images/off.png",
        "Image": "/MDKApp/Images/off.png",
        "OnPress": "/MDKApp/Rules/Toolbar/SetToolbarItemValue.js"
      },
      ...
    ]
  }
}
```

```js
// Rule
export default function SetToolbarItemValue(controlProxy) {
  var toolbarItems = controlProxy.getParent().getToolbarControls();
  var imageOn = '/MDKApp/Images/on.png';
  var imageOff = '/MDKApp/Images/off.png';
  var imageOnText = 'AddedAsFavorite';
  var imageOffText = 'RemovedFromFavorite';
  var newValue, newText;
  toolbarItems.forEach(function (element) {
    if (element.name == controlProxy.getName()) {
      if (element.name == 'DynamicItem') {
        newText = imageOnText;
        newValue = imageOn;

        if (element.caption == imageOnText) {
          newText = imageOffText;
          newValue = imageOff;
        }
        element.setCaption(newText);
        element.setImage(newValue);

        /*
        The properties that rule writer is allowed to set and get are:

        //SET
        element.setCaption(newValue); // text
        element.setStyle(newValue); // style
        element.setImage(newValue); // image
        element.setSystemItem(newValue); // 0 - 22 (more details on Apple Developer website - https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem)
        element.setWidth(newValue); // integer
        element.setEnabled(newValue); // boolean
        element.setVisibility(newValue); // visible/hidden/collapse
        element.setItemType(newValue); // Button/Normal
        
        //GET
        element.name;
        element.clickable;
        element.caption;
        element.enabled;
        element.visibility;
        element.width;
        element.systemItem;
        element.itemType;
        */

        return controlProxy.executeAction('/MDKApp/Actions/Toast/' + newText + '.action');
      }
    }
  });
}
```

### Using feedback indicators in ObjectTableSections

This example shows how to use the feedback indicator for downloading/opening documents + how to properly call the `ISectionProxy.setIndicatorState()` interface to update the feedback indicator in ObjectTableSections.

```json
// Definition
{
  "_Name": "SectionedTable",
  "_Type": "Control.Type.SectionedTable",
  "Sections": [
    {
      "_Type": "Section.Type.ObjectTable",
      "ObjectCell": {
        "ProgressIndicator": "/MDKApp/Rules/ProgressIndicator/SetIndicatorState.js",
        "DetailImage": "/MDKApp/Images/compressor.png",
        "Description": "{Description}",
        "Footnote": "{MimeType}",
        "StatusText": "{FileName}",
        "SubstatusText": "/MDKApp/Rules/OData/IsMediaLocal.js",
        "Subhead": "{DocumentID}",
        "Title": "{ObjectKey}",
        "OnPress": "/MDKApp/Rules/ProgressIndicator/DownloadOrOpenDocument.js"
      },
      "Target": {
        "EntitySet": "BDSDocuments",
        "Service": "/MDKApp/Services/Amw.service"
      }
    }
  ]
}
```

```js
// Rules
export default function DownloadOrOpenDocument(sectionedTableProxy) {
  const pageProxy = sectionedTableProxy.getPageProxy();
  let bindingObject = pageProxy.getActionBinding();
  let readLink = bindingObject["@odata.readLink"];
  let serviceName = '/MDKApp/Services/Amw.service';
  let entitySet = 'BDSDocuments';

  // first we need to decide if the media exists locally or needs to be downloaded
  return sectionedTableProxy.isMediaLocal(serviceName, entitySet, readLink).then((result) => {
    if (result) {
      // the media has been downloaded, we can open it -> the path needs to be provided in the action definition
      // or it should come from binding

      // persist the media data to local sandbox, so we can open it with the document viewer
      let fs = require('@nativescript/core/file-system');
      const actionBinding = pageProxy.getActionBinding();
      if (typeof actionBinding === 'undefined') {
        return pageProxy.executeAction('/MDKApp/Actions/OData/ODataDownloadFailure.action');
      }

      let key = actionBinding['@odata.readLink'];
      let filename = actionBinding.DocFile;
      if (typeof filename === 'undefined' || filename === '') {
        filename = actionBinding.FileName;
      }
      if (typeof filename === 'undefined' || filename === '') {
        filename = actionBinding.SaveDocFile;
      }
      if (typeof filename === 'undefined') {
        // Document filename not found. proceeding with a test filename.
        filename = "res://TestOpenDocument.pdf";
      }

      const filepaths = filename.split('/');
      const filelastSegment = filepaths[filepaths.length - 1];
      filename = filelastSegment;

      if (key) {
        var tempDir = fs.knownFolders.temp();
        var tempPath = fs.path.join(tempDir.path, filename);
        var tempFile = fs.File.fromPath(tempPath);
        tempFile.writeSync(pageProxy.getClientData()[key], err => {
          return pageProxy.executeAction('/MDKApp/Actions/OData/ODataDownloadFailure.action');
        });

        pageProxy.setActionBinding({
          'FileName': tempPath,
        });

        return pageProxy.executeAction('/MDKApp/Actions/Document/OpenRelatedDocument.action');
      }
    } else {
      // The media is on the server, we can download it
      const pressedItem = pageProxy.getPressedItem();

      // get the object table section proxy, which contains the feedback indicators and performs download/open in order to update the indicator state
      const objectTableSection = sectionedTableProxy.getSections()[0];

      // set the indicator's state to in progress and start the download
      objectTableSection.setIndicatorState("inProgress", pressedItem);
      sectionedTableProxy.executeAction("/MDKApp/Actions/OData/DownloadDocumentStreams.action").then((result) => {
        // success case
        // the document was successfully downloaded, we can set the indicator's state to open
        objectTableSection.setIndicatorState("open", pressedItem);
      }, (error) => {
        // error case
        objectTableSection.setIndicatorState("toDownload", pressedItem);
        sectionedTableProxy.executeAction("/MDKApp/Actions/OData/ODataDownloadFailure.action");
      });
    }
  });
}

export default function SetIndicatorState(sectionProxy) {
  let bindingObject = sectionProxy.getBindingObject();
  let readLink = bindingObject["@odata.readLink"];
  let serviceName = '/MDKApp/Services/Amw.service';
  let entitySet = 'BDSDocuments';

  // first we need to decide if the media exists locally or needs to be downloaded
  return sectionProxy.isMediaLocal(serviceName, entitySet, readLink).then((result) => {
    if (result) {
      // The media is saved locally, we can open it
      return 'open';
    } else {
      // The media is on the server, we can download it
      return 'toDownload';
    }
  });
}
```

### Localization and Formatting in rule

setLanguage client API function is to set the app language (for in-app language setting implementation).
For iOS, the app need to be restarted to fully take effect, it's advisable for app to inform user to restart app after changing the language.

```js
// Languages related API
export default function ManageLanguages(context) {
  // get supported languages based on resource files under i18n directory, returns in key value pair
  var supportedLanguages = context.getSupportedLanguages();

  // set language in appSettings by language key
  context.setLanguage('en');

  // get current language in appSettings
  var language = context.getLanguage();
}

// Regions related API
export default function ManageRegions(context) {
  // get regions based on system, returns in key value pair
  var regions = context.getRegions();

  // set region in appSettings by language key
  context.setRegion('SG');

  // get current region in appSettings
  var region = context.getRegion();
}

// Localize text examples
export default function Localize(context) {
  // work_orders="Work Orders"
  var localizedText = context.localizeText('work_orders');
  // result: Work Orders

  // dynamic_localizable_value="{1} and {2} are required for {0} development."
  var dynamicParams = ['MDK', 'NativeScript 3.x', 'XCode 9.x'];
  var localizedTextWithDynamicParams = context.localizeText('dynamic_localizable_value', dynamicParams);
  // result: NativeScript 3.x and XCode 9.x are required for MDK development.

  // order id binding is 4013
  // dynamic_binding_localizable_value_order_id="The order id is: {0}."
  var dynamicBindingParams = ['{OrderId}'];
  var localizedTextWithDynamicBindingParam1 = context.localizeText('dynamic_binding_localizable_value_order_id', dynamicBindingParams);
  // result: The order id is: 4013

  var orderId = context.binding.OrderId;
  var localizedTextWithDynamicBindingParam2 =  context.localizeText('dynamic_binding_localizable_value_order_id', [orderId]);
  // result: The order id is: 4013
}

// Number formatting examples
export default function NumberFormattingExamples(context) {
  var valueToBeConverted = 123456.789;

  // Format as Number
  var customLocale = 'en-US';  
  var formattedAsNumber = context.formatNumber(valueToBeConverted, customLocale);
  // result: 123,456.79

  // Format as Currency
  var currencyCode = 'USD';
  customLocale = 'en-FR';
  var formattedAsCurrency = context.formatCurrency(valueToBeConverted, currencyCode, customLocale);
  // result: 123 456,79 $US

  // Format as Percentage
  valueToBeConverted = 0.7865;
  customLocale = 'en-US';
  var formattedAsPercentage = context.formatPercentage(valueToBeConverted, customLocale);
  // result: 78.65%

  // Format as Scientific Notation
  var customLocale = 'en-US';  
  var formattedAsNumber = context.formatScientific(valueToBeConverted, customLocale);
  // result: 1.23456789E5

  // Formatting with options.
  // Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
  let options = {
    maximumFractionDigits: 1,
    useGrouping: false,
  }

  // Format as Number
  var customLocale = 'en-US';  
  var formattedAsNumber = context.formatNumber(valueToBeConverted, customLocale, options);
  // result: 123456.8

  // Format as Currency
  var currencyCode = 'USD';
  customLocale = 'en-FR';
  var formattedAsCurrency = context.formatCurrency(valueToBeConverted, currencyCode, customLocale, options);
  // result: 123456,8 $US

  // Format as Percentage
  valueToBeConverted = 0.7865;
  customLocale = 'en-US';
  var formattedAsPercentage = context.formatPercentage(valueToBeConverted, customLocale, options);
  // result: 78.6%

  // Format as Scientific Notation
  var customLocale = 'en-US';  
  var formattedAsNumber = context.formatScientific(valueToBeConverted, customLocale, options);
  // result: 1E5
}

// DateTime, Date, Time formatting examples
export default function DateTimeFormattingExamples(context) {
  var dateTimeValue = context.formatDatetime(new Date(), "en-GB", "UTC");
  // result: 28 Nov 2017 at 06:16:02

  var dateValue = context.formatDate("2017-11-28T11:40:00Z", "de-DE");
  // result: 28.11.2017

  var timeValue = context.formatTime("2017-11-28T11:40:00Z", "zh-CN", "Asia/Shanghai");
  // result: 下午7:40:00
}
```

----
## ActionResult Examples

Using ActionResult in a target path and in a rule

```json
// Message Action definition of action run after CreateWorkOrder action result is stored
{
  "_Type": "Action.Type.Message",
  "Message": "/MDKApp/Rules/OData/CreateEntityMessage.js",
  "Title": "{#ActionResults:CreateWorkOrder/data/OrderDescription}",
  "OKCaption": "Ok",
  "OnSuccess": "/MDKApp/Actions/Navigation/NextChangeSetAction.action"
}
```

```js
// CreateEntityMessage.js
export default function GetCreateEntityMessage(clientAPI) {
  let actionResult = clientAPI.getActionResult('CreateWorkOrder');
  if (actionResult) {
    let entity = actionResult.data;
    return 'Entity created with description \"' + entity.OrderDescription + '\"';
  }
  return 'Entity successfully created';
}

// CreateEntityFailMessage.js
// Suppose the action result returns an error message in the error.message as below: 
// 'Error 400 (bad request); POST https://abc.xyz.com/ODataDemo/OData/OData.svc/Suppliers(0) {"code": "", "message": "Both If-Match and If-None-Match HTTP headers cannot be specified at the same time. Please specify either one of the headers or none of them."}'
export default function CreateEntityFailMessage(clientAPI) {
  let actionResult = clientAPI.getActionResult('CreateWorkOrder');
  if (actionResult && actionResult.error) {
    if (actionResult.error.responseCode > 0) {
      // return only the error message coming from backend
      // The actionResult.error.responseCode is 400.
      // The actionResult.error.responseBody is '{"code": "", "message": "Both If-Match and If-None-Match HTTP headers cannot be specified at the same time. Please specify either one of the headers or none of them."}'.
      return actionResult.error.responseBody;
    } else {
      // return the full error message
      // The actionResult.error.message is 'Error 400 (bad request); POST https://abc.xyz.com/ODataDemo/OData/OData.svc/Suppliers(0) {"code": "", "message": "Both If-Match and If-None-Match HTTP headers cannot be specified at the same time. Please specify either one of the headers or none of them."}'.
      return actionResult.error.message;
    }
  }
  return 'Entity failed to created';
}
```

----
## callFunction Example

call a function import in a rule

```json
// TaskDetail page
{
  "_Name": "TaskDetail",
  "_Type": "Page",
  "Caption": "Function Import Example",
  "OnLoaded": "/MDKOnlineFioriTrial/Rules/FunctionImport/GetDecisionOptions.js",
  "Controls": [
    {
      "_Name": "FormCellContainer",
      "_Type": "Control.Type.FormCellContainer",
      "Sections": [
        {
          "Caption": "CilentAPI",
          "Controls": [
            {
              "_Name": "ApproveButton",
              "_Type": "Control.Type.FormCell.Button",
              "OnPress": "/MDKOnlineFioriTrial/Rules/FunctionImport/ApproveRequest1.js",
              "Title": "Approve",
              "IsVisible": false
            },
            {
              "_Name": "RejectButton",
              "_Type": "Control.Type.FormCell.Button",
              "OnPress": "/MDKOnlineFioriTrial/Rules/FunctionImport/RejectRequest1.js",
              "Title": "Reject",
              "IsVisible": false
            }
          ]
        }
      ]
    }
  ]
}
```

```js
// GetDecisionOptions.js
export function GetDecisionOptions(clientAPI) {
  var functionName = 'DecisionOptions';
  var parameters = { 'InstanceID': '001' };
  var oFunction = { Name: functionName, Parameters: parameters };
  var serviceName = '/MDKOnlineFioriTrial/Services/FioriTrial.service';
  var approveBtn = clientAPI.evaluateTargetPa('{#Page:TaskDetail1/#Control:ApproveButton}');
  var RejectButton = clientAPI.evaluateTargetPath('{#Page:TaskDetail1/#Control:RejectButton}');

  clientAPI.callFunction(serviceName, oFunction).then(function(result) {
    if (result && result.length > 0) {
      result.forEach(function (item) {
        if (item.DecisionKey === '0001') {
           approveBtn.setVisible(true);
        }
        if (item.DecisionKey === '0002') {
          RejectButton.setVisible(true);
        }
      });
    } else {
      console.log('No resul set');
    }
  }).catch(function (error) {
    return console.log('------ERROR--------' + error);
  });
}
```
