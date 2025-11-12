
----
## Examples


```json
// FioriToolbar with Buttons
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "FioriToolbar": {
    "_Name": "NewFioriToolbar",
    "_Type": "Control.Type.FioriToolbar",
    "HelperText": "helper text",
    "OverflowIcon": "sap-icon://share",
    "Items": [
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "submitButton",
        "Title": "Submit",
        "ButtonType": "Primary",
        "ImagePosition": "Leading",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "shareButton",
        "Title": "Share",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "discardButton",
        "Title": "Discard",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "button4",
        "Title": "Save Draft",
        "ButtonType": "Secondary",
        "Image": "sap-icon://customer-and-supplier",
        "ImagePosition": "Trailing",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      }
    ]
  },
  "Controls": []
}

// FioriToolbar with Icons
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "FioriToolbar": {
    "_Name": "NewFioriToolbar",
    "_Type": "Control.Type.FioriToolbar",
    "HelperText": "helper text",
    "OverflowIcon": "sap-icon://share",
    "Items": [
      {
        "_Type": "FioriToolbarItem.Type.Icon",
        "_Name": "icona",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageIcon.action",
        "Icon": "/MDKDevApp/Images/extension.png"
      }, {
        "_Type": "FioriToolbarItem.Type.Icon",
        "_Name": "iconb",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageIcon.action",
        "Icon": "/MDKDevApp/Images/extension.png"
      }
    ]
  },
  "Controls": []
}

// FioriToolbar with Buttons and DataSubscriptions
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "FioriToolbar": {
    "_Name": "NewFioriToolbar",
    "_Type": "Control.Type.FioriToolbar",
    "HelperText": "helper text",
    "DataSubscriptions": ["MyWorkOrderHeaders"],
    "OverflowIcon": "sap-icon://share",
    "Items": [
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "submitButton",
        "Title": "Submit",
        "ButtonType": "Primary",
        "ImagePosition": "Leading",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "shareButton",
        "Title": "Share",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "discardButton",
        "Title": "Discard",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "button4",
        "Title": "Save Draft",
        "ButtonType": "Secondary",
        "Image": "sap-icon://customer-and-supplier",
        "ImagePosition": "Trailing",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      }
    ]
  },
  "Controls": []
}

## Styling Examples

// FioriToolbar Styles
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "FioriToolbar": {
    "_Name": "NewFioriToolbar",
    "_Type": "Control.Type.FioriToolbar",
    "HelperText": "helper text",
    "OverflowIcon": "sap-icon://share",
    "Styles": {
      "FioriToolbar": "fiori-toolbar-1",
      "HelperText": "fiori-toolbar-helpertext-1",
      "OverflowIcon": "font-icon-class"
    },
    "Items": [
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "submitButton",
        "Title": "Submit",
        "ButtonType": "Primary",
        "ImagePosition": "Leading",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "shareButton",
        "Title": "Share",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "discardButton",
        "Title": "Discard",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "button4",
        "Title": "Save Draft",
        "ButtonType": "Secondary",
        "Image": "sap-icon://customer-and-supplier",
        "ImagePosition": "Trailing",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      }
    ]
  },
  "Controls": []
}

// FioriToolbar with Buttons and Styles
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "FioriToolbar": {
    "_Name": "NewFioriToolbar",
    "_Type": "Control.Type.FioriToolbar",
    "HelperText": "helper text",
    "OverflowIcon": "sap-icon://share",
    "Items": [
      {{
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "submitButton",
        "Title": "Submit",
        "ButtonType": "Primary",
        "ImagePosition": "Leading",
        "Styles": {
          "Image": "font-icon-class",
          "Button": "headerItemTextButton"
        },
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "shareButton",
        "Title": "Share",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action",
        "Styles": {
          "Button": "headerItemTextButton"
        }
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "discardButton",
        "Title": "Discard",
        "Styles": {
          "Button": "Styles2Button"
        },
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      },
      {
        "_Type": "FioriToolbarItem.Type.Button",
        "_Name": "button4",
        "Title": "Save Draft",
        "ButtonType": "Secondary",
        "Image": "sap-icon://customer-and-supplier",
        "ImagePosition": "Trailing",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action"
      }
    ]
  },
  "Controls": []
}

// FioriToolbar with Icons and Styles
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "FioriToolbar": {
    "_Name": "NewFioriToolbar",
    "_Type": "Control.Type.FioriToolbar",
    "HelperText": "helper text",
    "OverflowIcon": "sap-icon://share",
    "Items": [
      {
        "_Type": "FioriToolbarItem.Type.Icon",
        "_Name": "icona",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageIcon.action",
        "Icon": "sap-icon://edit",
        "Styles": {
          "Icon": "font-icon-class"
        }
      }, {
        "_Type": "FioriToolbarItem.Type.Icon",
        "_Name": "iconb",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageIcon.action",
        "Icon": "sap-icon://home",
        "Styles": {
          "Icon": "font-icon-class"
        }
      }
    ]
  },
  "Controls": []
}
```

### Style Classes Definition
```css
.font-icon-class {
  font-size: 4;
  color: red;
}

.fiori-toolbar-1 {
  background-color: yellow;
}

.fiori-toolbar-helpertext-1 {
  font-color: @mdkRed1;
  font-style: italic;
}

```