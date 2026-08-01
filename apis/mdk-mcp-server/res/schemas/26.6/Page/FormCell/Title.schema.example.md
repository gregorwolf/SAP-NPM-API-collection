
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
        "Validation": {
          "Message": "This is validation view message",
          "Visible": true,
          "SeparatorVisible": true,
          "Styles": {
            "Message": "ValidationMessage",
            "ValidationView": "ValidationView"
          }
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

/* Validation view */
.ValidationView {
  background-color: #83AF9B;
  border-top-color: #ff00ee;
}

/* Validation message */
.ValidationMessage {
  font-size: 16;
  font-color: #0000ff;
}
```
