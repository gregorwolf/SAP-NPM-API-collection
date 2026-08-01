
----
## Examples


```json
{
  "_Type": "Page",
  "Controls": [{
    "Items": [{
      "_Name": "ActionsTab",
      "Caption": "Actions",
      "Image": "res://action_icon",
      "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
      "PageToOpen": "/MDKDevApp/Pages/Examples/ActionExamples.page",
      "_Type": "Control.Type.TabItem"
    },
    {
      "_Name": "RulesTab",
      "Caption": "Rules",
      "Image": "font://&#xe05a;",
      "OnPress": "$(PLT,'/MDKDevApp/Actions/Messages/OnPressIOS.action', '/MDKDevApp/Actions/Messages/OnPressAndroid.action')",
      "PageToOpen": "/MDKDevApp/Pages/Examples/TabActionExamples.page",
      "_Type": "Control.Type.TabItem"
    },
    {
      "_Name": "ControlsTab",
      "Caption": "Controls",
      "Image": "res://control_icon",
      "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
      "PageToOpen": "/MDKDevApp/Pages/Examples/ControlExamples.page",
      "ResetIfPressedWhenActive": true,
      "_Type": "Control.Type.TabItem"
    },
    {
      "_Name":"ControlsTab",
      "Caption":"Controls",
      "Image":"res://control_icon",
      "OnPress":"/MDKDevApp/Actions/Messages/Message.action",
      "PageToOpen":"/MDKDevApp/Pages/Examples/ControlExamples.page",
      "PageMetadata":{
        "_Type":"Page",
        "_Name":"PageMetadataObjectTest1",
        "Controls":[{
            "Sections":[{
              "ObjectCells":[{
                "ObjectCell":{
                  "AccessoryType":"disclosureIndicator",
                  "Description":"another pagemetadata",
                  "OnPress":"/MDKDevApp/Actions/Navigation/PageMetadataObject.action",
                  "Title":"Next Page"
                }
              }],
              "_Name":"NavigationActionSection1",
              "_Type":"Section.Type.ObjectTable"
            }],
            "_Type":"Control.Type.SectionedTable",
            "_Name":"NavigationActionSectionTable1"
        }]
      },
      "_Type":"Control.Type.TabItem"
    }],
    "Position": "/MDKDevApp/Rules/AlwaysTop.js",
    "PreloadTabs": [2,4],
    "_Type": "Control.Type.Tabs",
    "_Name": "TabsControl"
  }]
}
```

### Preload Tabs
If user wants to preload tabs in background, `PreloadTabs` property needs to be specified. By default we need to select a tab in order to load it.

```json
"PreloadTabs": [-1]  // this will load all the tabs.
"PreloadTabs": [2,5] // this will load tabs based on indices.
"PreloadTabs": [-1,2,5] // all tabs will not be loaded only the selective ones will be loaded.
"PreloadTabs": [2,2,2] // Tab 2 will only be loaded once not thrice.
```

### Tabs with font icon and style example
```json
{
  "_Type": "Page",
  "_Name": "TabsStylesPage",
  "Caption": "Tabs Style Example",
  "Controls": [{
      "Items": [
        {
          "_Name": "ActionsTab",
          "Caption": "Actions",
          "Image": "sap-icon://settings",
          "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
          "PageToOpen": "/MDKDevApp/Pages/Examples/TabActionExamples.page",
          "_Type": "Control.Type.TabItem"
        },
        {
          "_Name": "ControlTab1",
          "Caption": "/MDKDevApp/Rules/ControlsCaption.js",
          "Image": "sap-icon://settings",
          "OnPress":"/MDKDevApp/Rules/TabControl/TabControlRule.js",
          "PageToOpen": "/MDKDevApp/Pages/Examples/ControlExamples.page",
          "_Type": "Control.Type.TabItem"
        },
        {
          "_Name": "ControlTab2",
          "Caption": "/MDKDevApp/Rules/ControlsCaption.js",
          "Image": "sap-icon://settings",
          "OnPress":"/MDKDevApp/Rules/TabControl/TabControlRule.js",
          "PageToOpen": "/MDKDevApp/Pages/Examples/ControlExamples.page",
          "_Type": "Control.Type.TabItem"
        }
      ],
      "Styles": {
        "TabStrip": "TabStripStyle",
        "TabItemImage": "font-icon-class"
      },
      "_Type": "Control.Type.Tabs",
      "_Name": "TabsStyleTest"
    }]
}
```

```css
.TabStripStyle {
  background-color: #79d2a6;
  selected-item-color: red;
  un-selected-item-color: #cc6600;
  highlight-color: red;
}

/* Only font-size is supported */
.font-icon-class {
  font-size: 8;
}
```
