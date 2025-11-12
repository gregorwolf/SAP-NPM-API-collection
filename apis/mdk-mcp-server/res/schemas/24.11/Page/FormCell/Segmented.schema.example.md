
----
## Examples


### Segments - Literal
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
        "_Type": "Control.Type.FormCell.SegmentedControl",
        "_Name": "SegmentedFormCell",
        "Caption": "Key",
        "Segments": ["Low", "Medium", "High"],
        "Value": "Medium",
        "IsEditable": true,
        "HelperText": "This is helper text",
        "ApportionsSegmentWidthsByContent": true
      }]
    }]
  }]
}
```

### Segments - Binding
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
        "_Type": "Control.Type.FormCell.SegmentedControl",
        "_Name": "SegmentedFormCell",
        "Caption": "Key",
        "Segments": {
          "ReturnValue": "{OrderId}",
          "Target": {
            "EntitySet": "WOHeaders",
            "Service": "/MDKApp/Services/Amw.service"
          },
          "IsEditable": true,
          "ApportionsSegmentWidthsByContent": false
        },
        "Value": "{SomeProperty}"
      }]
    }]
  }]
}
```

### Segments - Global
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
        "_Type": "Control.Type.FormCell.SegmentedControl",
        "_Name": "SegmentedFormCell",
        "Caption": "Key",
        "Segments": "/MDKApp/Globals/LowMediumHigh.global",
        "Value": "/MDKApp/Globals/Medium.global",
        "IsEditable": true,
        "ApportionsSegmentWidthsByContent": true
      }]
    }]
  }]
}
```

### Segments - Rule
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
        "_Type": "Control.Type.FormCell.SegmentedControl",
        "_Name": "SegmentedFormCell",
        "Caption": "Key",
        "Segments": "/MDKApp/Rules/LowMediumHigh.js",
        "Value": "/MDKApp/Rules/Medium.js",
        "IsEditable": true
      }]
    }]
  }]
}
```

### Validation Example
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "_Name": "FormCellContainer",
    "_Type": "Control.Type.FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.SegmentedControl",
        "_Name": "SegmentedFormCell",
        "Caption": "Key",
        "Segments": [
          "Low",
          "Medium",
          "High"
        ],
        "Value": "Medium",
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
        "Styles": {
          "Background": "SegmentedFormCellBackground",
          "Caption": "SegmentedFormCellCaption"
        }
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* Segmented Form Cell - Background */
.SegmentedFormCellBackground {
  background-color: yellow;
}

/* Segmented Form Cell - Caption */
.SegmentedFormCellCaption {
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
```