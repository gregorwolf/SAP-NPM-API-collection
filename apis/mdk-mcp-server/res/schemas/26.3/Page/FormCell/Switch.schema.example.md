
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
        "_Type": "Control.Type.FormCell.Switch",
        "_Name": "Switchcell",
        "Caption": "Confirmed",
        "Value": false,
        "IsEditable": true,
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
          "Background": "SwitchFormCellBackground",
          "Switch": "SwitchFormCellSwitch",
          "Caption": "SwitchFormCellCaption"
        }
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* Switch Form Cell - Background */
.SwitchFormCellBackground {
  background-color: yellow;
}

/* Switch Form Cell - Switch */
.SwitchFormCellSwitch {
  background-color: red;
  padding: 5px;
}

/* Switch Form Cell - Caption */
.SwitchFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}
```