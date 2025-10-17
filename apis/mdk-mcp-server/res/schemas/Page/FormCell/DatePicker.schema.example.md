
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
        "Validation": {
          "Message": "This is validation view message",
          "Visible": true,
          "SeparatorVisible": true,
          "Styles": {
            "Message": "ValidationMessage",
            "ValidationView": "ValidationView"
          }
        },
        "RequiredIndicator": true,
        "Styles": {
          "Background": "DatePickerFormCellBackground",
          "Caption": "DatePickerFormCellCaption",
          "Value": "DatePickerFormCellValue",
          "RequiredIndicator": "RequiredIndicatorColor"
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

/* Required indicator's color - font-color / color can be used */
.RequiredIndicatorColor {
  font-color: blue;
}
```