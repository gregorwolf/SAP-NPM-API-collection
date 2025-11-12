
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "Formcell",
  "Caption": "Button FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Button Form Cells",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Button",
        "_Name": "Button1",
        "Title": "Left",
        "OnPress": "/MDKApp/Actions/Messages/Message1.action",
        "TextAlignment": "left",
        "Styles": {
          "Background": "ButtonFormCellBackground",
          "Value": "ButtonFormCellValue"
        }
      },
      {
        "_Type": "Control.Type.FormCell.Button",
        "_Name": "Button2",
        "Title": "/MDKApp/Globals/Center.global",
        "OnPress": "/MDKApp/Actions/Popover/Popover.action",
        "TextAlignment": "/MDKApp/Globals/CenterLowercase.global",
        "ButtonType": "Button",
        "Styles": {
          "Background": "FormCellBackgroundCritical",
          "Value": "FormCellButtonStyle2"
        }
      },
      {
        "_Type": "Control.Type.FormCell.Button",
        "_Name": "Button3",
        "Title": "/MDKApp/Rules/FormCell/RightText.js",
        "OnPress": "/MDKApp/Actions/Popover/Popover.action",
        "TextAlignment": "/MDKApp/Rules/FormCell/RightTextLowercase.js",
        "ButtonType": "Normal",
        "Styles": {
          "Background": "FormCellBackgroundCriticalTitle",
          "Value": "FormCellButtonStyle3"
        }
      },
      {
        "_Type": "Control.Type.FormCell.Button",
        "_Name": "Button4",
        "Title": "Default Alignment",
        "OnPress": "/MDKApp/Rules/FormCell/SwitchChanged.js",
        "Styles": {
          "Background": "FormCellBackgroundStandard",
          "Value": "FormCellButtonStyleDefault"
        }
      },
      {
        "_Type": "Control.Type.FormCell.Button",
        "_Name": "Button4",
        "Title": "Default Alignment",
        "OnPress": "/MDKApp/Rules/FormCell/SwitchChanged.js",
        "Styles": {
          "Background": "FormCellBackgroundStandard",
          "Value": "FormCellButtonStyleDefault"
        },
        "Enabled": false
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* Button Form Cell - Background */
.ButtonFormCellBackground {
  background-color: yellow;
}

/* Button Form Cell - Value */
.ButtonFormCellValue {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}
```

