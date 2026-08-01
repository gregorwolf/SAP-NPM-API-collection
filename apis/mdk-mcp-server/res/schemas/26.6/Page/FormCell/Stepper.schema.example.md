
----
## Examples

### Stepper Form Cell in a Section

```json
{
  "Caption": "FormCell Stepper Page",
  "Controls": [
    {
      "_Name": "SectionedTable",
      "_Type": "Control.Type.SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.FormCell",
          "Caption": "Stepper Example",
          "Controls": [
            {
              "_Type": "Control.Type.FormCell.Stepper",
              "_Name": "StepperFormCell",
              "Caption": "Quantity",
              "HelperText": "Select quantity between 0 and 100",
              "Value": 5,
              "Step": 1,
              "MinimumValue": 0,
              "MaximumValue": 100,
              "DecimalPlacesSupported": 0,
              "IsEditable": true,
              "IsVisible": true,
              "Separator": true,
              "IncrementIcon": "sap-icon://add",
              "DecrementIcon": "sap-icon://less",
              "IncrementIconIsCircular": true,
              "DecrementIconIsCircular": true,
              "OnValueChange": "/MyApp/Actions/UpdateTotal.action",
              "Validation": {
                "Message": "Please select a valid quantity",
                "Visible": true,
                "Styles": {
                  "Message": "ValidationMessage"
                }
              },
              "Styles": {
                "Background": "StepperBackground",
                "Stepper": "StepperContainer",
                "StepperTextField": "StepperTextField",
                "IncrementIcon": "StepperIncrementIcon",
                "DecrementIcon": "StepperDecrementIcon",
                "Caption": "StepperCaption",
                "HelperText": "StepperHelperText"
              }
            }
          ]
        }
      ]
    }
  ],
  "_Type": "Page",
  "_Name": "StepperFormcell"
}
```

### Style Classes Definition

```css
/* Stepper Form Cell - Background */
.StepperBackground {
  background-color: #ffffff;
  padding: 8;
}

/* Stepper Form Cell - Container */
.StepperContainer {
  border-color: #0070f2;
  border-width: 2;
  border-radius: 8;
  height: 48;
}

/* Stepper Form Cell - Text field */
.StepperTextField {
  font-color: #333333;
  font-size: 16;
  background-color: #ffffff;
  border-color: #e0e0e0;
  border-width: 1;
}

/* Stepper Form Cell - Increment icon */
.StepperIncrementIcon {
  font-color: #0070f2;
  background-color: #e6f2ff;
  font-size: 24;
}

/* Stepper Form Cell - Decrement icon */
.StepperDecrementIcon {
  font-color: #0070f2;
  background-color: #e6f2ff;
  font-size: 24;
}

/* Stepper Form Cell - Caption */
.StepperCaption {
  font-color: #333333;
  font-size: 14;
  font-typeface: bold;
}

/* Stepper Form Cell - Helper text */
.StepperHelperText {
  font-color: #666666;
  font-size: 12;
}

/* Validation message */
.ValidationMessage {
  font-size: 14;
  font-color: #d9534f;
}
```
