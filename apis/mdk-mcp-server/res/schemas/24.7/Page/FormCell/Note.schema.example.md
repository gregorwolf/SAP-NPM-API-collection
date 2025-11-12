
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
        "_Type": "Control.Type.FormCell.Note",
        "_Name": "NoteFormCell",
        "PlaceHolder": "Description",
        "Caption": "Note",
        "FormatRule": "/AssetWorkManager/Rules/FormatRule.js",
        "IsEditable": true,
        "Enabled": true,
        "MaxNumberOfLines": 6,
        "MinNumberOfLines": 2,
        "HelperText": "This is helper text",
        "validationProperties": {
          "ValidationMessage": "Validation Message",
          "ValidationMessageColor": "ff0000",
          "SeparatorBackgroundColor": "000000",
          "SeparatorIsHidden": false,
          "ValidationViewBackgroundColor": "fffa00",
          "ValidationViewIsHidden": false,
          "MaxNumberOfLines": 2
        },
        "Styles": {
          "Background": "NoteFormCellBackground",
          "Caption": "NoteFormCellCaption",
          "Value": "NoteFormCellValue"
        }
      }]
    }]
  }]
}
```

### NoteFormCell with FormatRule supporting PLT formatter
```json
{
    "PlaceHolder": "Description",
    "_Name": "NoteFormCell",
    "_Type": "Control.Type.FormCell.Note",
    "FormatRule": "$(PLT,'/MDKDevApp/Rules/Uppercase.js','/MDKDevApp/Rules/Lowercase.js')",
    "Value": "...Add note here...",
    "IsEditable": true
}
```

### Style Classes Definition
```css
/* Note Form Cell - Background */
.NoteFormCellBackground {
  background-color: yellow;
}

/* Note Form Cell - Caption */
.NoteFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* Note Form Cell - Value */
.NoteFormCellValue {
  background-color: #0000FF;  /* iOS Only */
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}
```