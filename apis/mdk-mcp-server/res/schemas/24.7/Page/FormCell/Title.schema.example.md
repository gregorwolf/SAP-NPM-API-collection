
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Title",
        "_Name": "TitleFormCell",
        "PlaceHolder": "Title",
        "Value": "Work Request",
        "FormatRule": "/AssetWorkManager/Rules/FormatRule.js",
        "IsEditable": true,
        "Enabled": true,
        "HelperText": "This is helper text",
        "validationProperties": {
          "ValidationMessage": "Validation Message",
          "ValidationMessageColor": "ff0000",
          "SeparatorBackgroundColor": "000000",
          "SeparatorIsHidden": false,
          "ValidationViewBackgroundColor": "fffa00",
          "ValidationViewIsHidden": false
        },
        "Styles": {
          "Background": "TitleFormCellBackground",
          "Value": "TitleFormCellValue"
        }
      }]
    }]
  }]
}
```

### TitleFormCell with OnValueChange supporting PLT formatter
```json
{
    "PlaceHolder": "Title",
    "Value": "This should be uppercase",
    "_Name": "TitleFormCell",
    "_Type": "Control.Type.FormCell.Title",
    "OnValueChange": "$(PLT,'/MDKDevApp/Actions/Messages/OnValueChangeIOS.action', '/MDKDevApp/Actions/Messages/OnValueChangeAndroid.action')",
    "IsEditable": true
}
```

### Style Classes Definition
```css
/* Title Form Cell - Background */
.TitleFormCellBackground {
  background-color: yellow;
}

/* Title Form Cell - Value */
.TitleFormCellValue {
  background-color: #0000FF; /* iOS Only */
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}
```
