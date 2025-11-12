
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
        "validationProperties": {
          "ValidationMessage": "Validation Message",
          "ValidationMessageColor": "ff0000",
          "SeparatorBackgroundColor": "000000",
          "SeparatorIsHidden": false,
          "ValidationViewBackgroundColor": "fffa00",
          "ValidationViewIsHidden": false
        },
        "Styles": {
          "Background": "SimplePropertyFormCellBackground",
          "Caption": "SimplePropertyFormCellCaption",
          "Value": "SimplePropertyFormCellValue"
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
```