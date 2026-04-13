
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
      "_Name": "ControlsTab",
      "Caption": "Controls",
      "Image": "res://control_icon",
      "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
      "PageToOpen": "/MDKDevApp/Pages/Examples/ControlExamples.page",
      "ResetIfPressedWhenActive": true,
      "_Type": "Control.Type.TabItem"
    }],
    "_Type": "Control.Type.BottomNavigation",
    "_Name": "BottomNavigationControl"
  }]
}
```

### Font icon and style
```json
{
  "_Type": "Page",
  "_Name": "BottomNavigationPage",
  "Caption": "Bottom Navigation",
  "Controls": [{
      "Items": [
        {
          "_Name": "ActionsTab",
          "Caption": "Actions",
          "Image": "sap-icon://settings",
          "PageToOpen": "/MDKDevApp/Pages/Examples/TabActionExamples.page",
          "_Type": "Control.Type.TabItem"
        },
        {
          "_Name": "ControlsTab",
          "Caption": "/MDKDevApp/Rules/ControlsCaption.js",
          "Image": "sap-icon://settings",
          "PageToOpen": "/MDKDevApp/Pages/Examples/ControlExamples.page",
          "_Type": "Control.Type.TabItem"
        },
        {
          "_Name": "OData",
          "Caption": "OData",
          "Image": "sap-icon://settings",
          "PageToOpen": "/MDKDevApp/Pages/Examples/ODataExamples.page",
          "_Type": "Control.Type.TabItem"
        }
      ],
      "Styles": {
        "TabStrip": "TabStripStyle",
        "TabItemImage": "font-icon-class"
      },
      "_Type": "Control.Type.BottomNavigation",
      "_Name": "BottomNavigationControl"
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
