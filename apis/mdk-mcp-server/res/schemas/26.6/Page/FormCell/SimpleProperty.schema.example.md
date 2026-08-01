
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
        "_Type": "Control.Type.FormCell.SimpleProperty",
        "_Name": "SimplePropertyFormCell",
        "Caption": "Location",
        "PlaceHolder": "Address",
        "Value": "127 Higgins Drive, Palo Alto",
        "AlternateInput": "Barcode",
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
        "RequiredIndicator": true,
        "Styles": {
          "Background": "SimplePropertyFormCellBackground",
          "Caption": "SimplePropertyFormCellCaption",
          "Value": "SimplePropertyFormCellValue",
          "RequiredIndicator": "RequiredIndicatorColor"
        }
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* SimpleProperty Form Cell - Background */
.SimplePropertyFormCellBackground {
  background-color: yellow;
}

/* SimpleProperty Form Cell - Caption */
.SimplePropertyFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* SimpleProperty Form Cell - Value */
.SimplePropertyFormCellValue {
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

/* Required indicator's color - font-color / color can be used */
.RequiredIndicatorColor {
  font-color: blue;
}
```