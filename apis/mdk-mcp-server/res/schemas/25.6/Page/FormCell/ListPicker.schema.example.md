
----
## Targeting Items in a List
The following target paths can be evaluated from a page which has a list picker control with name "ListPicker".

- `#Control:ListPicker/#Value/#First` -> Returns the first item in the control.
- `#Control:ListPicker/#Value/#Last` -> Returns the last item in the control.
- `#Control:ListPicker/#Value/5` -> Returns the 5th item in the control.
- `#Control:ListPicker/#Value/5/BindingObject` -> Returns the `BindingObject` property from the 5th item in the control if the `ListPicker` is bound to an EntitySet, which contains the full binding object.
- `#Control:ListPicker/#Value/5/DisplayValue` -> Returns the `DisplayValue` property from the 5th item in the control.
- `#Control:ListPicker/#SelectedTarget` -> Returns the data associated with the currently selected list item.
- `#Control:ListPicker/#SelectedRow` -> Returns the currently selected rows index.
- `#Control:ListPicker/#SelectedValue` -> Returns the selected value (ReturnValue) associated with the currently selected item from the ListPicker control.

----
## Examples

### Picker Items - Literal
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "ListPickerFormCell",
        "AllowMultipleSelection": false,
        "IsSelectedSectionEnabled": true,
        "AllowEmptySelection": true,
        "Caption": "Picker",
        "PickerItems": ["One", "Two", "Three"],
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": ["One"],
        "IsEditable": true,
        "HelperText": "This is helper text",
        "FilterProperty":"Priority"
      }]
    }]
  }]
}
```

### Picker Items - Binding
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "ListPickerFormCell",
        "AllowMultipleSelection": false,
        "Caption": "Picker",
        "PickerItems": {
          "DisplayValue": "{EquipmentDesc}",
          "ReturnValue": "{EquipmentId}",
          "Target": {
            "EntitySet": "WOHeaders",
            "Service": "/MDKApp/Services/Amw.service"
          },
         "IsEditable": true
        },
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": "/MDKApp/Rules/PickerSelection.js"
      }]
    }]
  }]
}
```

### Picker Items - Global
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "ListPickerFormCell",
        "AllowMultipleSelection": false,
        "Caption": "Picker",
        "PickerItems": "/MDKApp/Globals/OneTwoThree.global",
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": "/MDKApp/Globals/One.global",
        "IsEditable": true
      }]
    }]
  }]
}
```

### Picker Items - Rule
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "ListPickerFormCell",
        "AllowMultipleSelection": false,
        "Caption": "Picker",
        "PickerItems": "/MDKApp/Rules/OneTwoThree.js",
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": "/MDKApp/Rules/One.js",
        "IsEditable": true
      }]
    }]
  }]
}
```

### Picker Items - ObjectCell Binding
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "ListPickerFormCell",
        "AllowMultipleSelection": false,
        "Caption": "Picker",
        "PickerItems": {
          "ObjectCell": {
            "Title": "{OrderDescription}",
            "Subhead": "{OrderId}",
            "DetailImage": "/MDKApp/Images/workorder.png",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "StatusImage": "/MDKApp/Images/workorder_details.png"
          },
          "ReturnValue": "{OrderId}",
          "Target": {
            "EntitySet": "MyWorkOrderHeaders",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$expand=Operations&$orderby=OrderId"
          },
         "IsEditable": true
        },
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": "/MDKApp/Rules/PickerSelection.js"
      }]
    }]
  }]
}
```

### Picker Items - ObjectCell Literal
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "ListPickerFormCell",
        "AllowMultipleSelection": false,
        "IsSelectedSectionEnabled": true,
        "AllowEmptySelection": true,
        "Caption": "Picker",
        "PickerItems": [
          {
            "ObjectCell": {
              "Title": "Distance",
              "Subhead": "Distance Unit",
              "Description": "Distance Description",
              "DetailImage": "/MDKApp/Images/workorder.png",
              "Icons": [
                  "/MDKApp/Images/icon_severity_medium.png",
                  "/MDKApp/Images/open.png"
              ],
              "StatusImage": "/MDKApp/Images/workorder_details.png"
            },
            "ReturnValue": "Distance"
          },
          {
            "ObjectCell": {
              "Title": "Touch ID",
              "Subhead": "Touch ID & Passcode",
              "Description": "Touch ID Description",
              "DetailImage": "/MDKApp/Images/icon.png",
              "Icons": [
                  "/MDKApp/Images/icon_severity_medium.png",
                  "/MDKApp/Images/open.png"
              ],
              "StatusImage": "/MDKApp/Images/workorder_details.png"
            },
            "ReturnValue": "Touch ID"
          }
        ],
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": ["Distance"],
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
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "ListPickerFormCell",
        "AllowMultipleSelection": false,
        "Caption": "Picker",
        "PickerItems": [
          "One",
          "Two",
          "Three"
        ],
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": [
          "One"
        ],
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
          "Background": "ListPickerFormCellBackground",
          "Caption": "ListPickerFormCellCaption",
          "Value": "ListPickerFormCellValue"
        }
      }]
    }]
  }]
}
```

### Picker Items - Example used in Filter Popover
```json
{
  "_Type": "Page",
  "_Name": "FilterPage",
  "Value": "Filter Page with ListPicker Example",
  "Result": [
    "{#Page:FilterPage/#Control:PriorityFilter/#FilterValue}"
  ],
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Filter",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "PriorityFilter",
        "AllowMultipleSelection": false,
        "IsSelectedSectionEnabled": true,
        "AllowEmptySelection": true,
        "Caption": "By Priority",
        "PickerItems": [{
          "DisplayValue": "Low",
          "ReturnValue": "1"
         },
         {
           "DisplayValue": "Medium",
          "ReturnValue": "2"
         },
         {
          "DisplayValue": "High",
          "ReturnValue": "3"
         }],
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "Value": ["One"],
        "IsEditable": true,
        "FilterProperty": "Priority"
      }]
    }]
  }]
}
```

### List Picker - Allow Default Value when One item is present
```json
{
  "_Type": "Page",
  "_Name": "FilterPage",
  "Value": "Filter Page with ListPicker Example",
  "Result": [
    "{#Page:FilterPage/#Control:PriorityFilter/#FilterValue}"
  ],
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Filter",
      "Controls": [{
        "_Type": "Control.Type.FormCell.ListPicker",
        "_Name": "PriorityFilter",
        "IsSelectedSectionEnabled": true,
        "AllowEmptySelection": true,
        "AllowDefaultValueIfOneItem": true,
        "Caption": "By Priority",
        "PickerItems": [{
          "DisplayValue": "Low",
          "ReturnValue": "1"
         }],
        "PickerPrompt": "Picker",
        "PlaceHolder": "PlaceHolder",
        "IsEditable": true,
        "FilterProperty": "Priority"
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* ListPicker Form Cell - Background */
.ListPickerFormCellBackground {
  background-color: yellow;
}

/* ListPicker Form Cell - Caption */
.ListPickerFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* ListPicker Form Cell - Value */
.ListPickerFormCellValue {
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