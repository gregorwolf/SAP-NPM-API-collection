
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
        "_Type": "Control.Type.FormCell.DatePicker",
        "_Name": "Date Picker",
        "Caption": "End Date",
        "Mode": "Date",
        "Value": "2017-02-02T12:00:00Z",
        "IsEditable": false,
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
          "Background": "DatePickerFormCellBackground",
          "Caption": "DatePickerFormCellCaption",
          "Value": "DatePickerFormCellValue"
        }
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* DatePicker Form Cell - Background */
.DatePickerFormCellBackground {
  background-color: yellow;
}

/* DatePicker Form Cell - Caption */
.DatePickerFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* DatePicker Form Cell - Value */
.DatePickerFormCellValue {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}
```