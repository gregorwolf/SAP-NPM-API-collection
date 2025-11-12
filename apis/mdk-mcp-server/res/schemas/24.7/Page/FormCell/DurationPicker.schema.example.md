
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
        "validationProperties": {
          "ValidationMessage": "Validation Message",
          "ValidationMessageColor": "ff0000",
          "SeparatorBackgroundColor": "000000",
          "SeparatorIsHidden": false,
          "ValidationViewBackgroundColor": "fffa00",
          "ValidationViewIsHidden": false
        },
        "Styles": {
          "Background": "DurationPickerFormCellBackground",
          "Caption": "DurationPickerFormCellCaption",
          "Value": "DurationPickerFormCellValue"
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
```