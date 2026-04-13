
----
## Examples

### Literal
#### Duration control with unit in hour
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
        "_Type": "Control.Type.FormCell.DurationPicker",
        "_Name": "DurationControl",
        "Caption": "Duration1",
        "Value": 3.3,
        "Unit": "H",
        "MinuteInterval": 1,
        "IsEditable": true,
        "HelperText": "This is helper text"
      }]
    }]
  }]
}
```
#### Duration control with unit in Minutes
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
        "_Type": "Control.Type.FormCell.DurationPicker",
        "_Name": "DurationControl",
        "Caption": "Duration2",
        "Value": 70,
        "Unit": "M",
        "MinuteInterval": 1,
        "IsEditable": true
      }]
    }]
  }]
}
```

### Binding
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
        "_Type": "Control.Type.FormCell.DurationPicker",
        "_Name": "DurationControl",
        "Caption": "Duration1",
        "Value": "{Duration}",
        "Unit": "{DurationUOM}",
        "MinuteInterval": 1,
        "IsEditable": true
      }]
    }]
  }]
}
```

### Validation
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
        "_Type": "Control.Type.FormCell.DurationPicker",
        "_Name": "DurationControl",
        "Caption": "Duration1",
        "Value": 3.3,
        "Unit": "H",
        "MinuteInterval": 1,
        "IsEditable": true,
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
          "Background": "DurationPickerFormCellBackground",
          "Caption": "DurationPickerFormCellCaption",
          "Value": "DurationPickerFormCellValue",
          "RequiredIndicator": "RequiredIndicatorColor"
        }
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* DurationPicker Form Cell - Background */
.DurationPickerFormCellBackground {
  background-color: yellow;
}

/* DurationPicker Form Cell - Caption */
.DurationPickerFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* DurationPicker Form Cell - Value */
.DurationPickerFormCellValue {
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