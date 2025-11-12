
----
## Examples

### Filter Property - Literal
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "Sections": [{
      "_Type": "Control.Type.FormCellContainer",
      "_Name": "FormCellContainer",
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Filter",
        "_Name": "FilterFormCell",
        "AllowMultipleSelection": false,
        "AllowEmptySelection": false,
        "Caption": "Filter by",
        "FilterProperty": "EntityColour",
        "IsEditable": true,
        "HelperText": "This is helper text"
      }]
    }]
  }]
}
```

### Filter Property - Global
```json
{
  "Value": "FormCell Example",
  "Controls": [{
    "_Type": "Page",
    "_Name": "FormCellsPage",
    "Sections": [{
      "_Type": "Control.Type.FormCellContainer",
      "_Name": "FormCellContainer",
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Filter",
        "_Name": "FilterFormCell",
        "AllowMultipleSelection": false,
        "AllowEmptySelection": false,
        "Caption": "Sort By",
        "Label": "Sort",
        "FilterProperty": "/AssetWorkManager/Globals/ThirdTest.global",
        "IsEditable": true
      }]
    }]
  }]
}
```

### Filter Property - Rule
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "Sections": [{
      "_Type": "Control.Type.FormCellContainer",
      "_Name": "FormCellContainer",
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Filter",
        "_Name": "FilterFormCell",
        "AllowMultipleSelection": false,
        "AllowEmptySelection": false,
        "Caption": "Sort By",
        "FilterProperty": "/AssetWorkManager/Rules/OneTwoThree.js",
        "IsEditable": true
      }]
    }]
  }]
}
```

### Filter Property - Array
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "Sections": [{
      "_Type": "Control.Type.FormCellContainer",
      "_Name": "FormCellContainer",
      "Caption": "Section1",
      "Controls": [
        {
          "_Type": "Control.Type.FormCell.Filter",
          "_Name": "FilterFormCell",
          "AllowMultipleSelection": false,
          "AllowEmptySelection": false,
          "Caption": "By OrderId",
          "FilterProperty":[
            {
              "ReturnValue": "OrderId gt '4004500'",
              "DisplayValue": "OrderId > 4004500"
            },
            {
              "ReturnValue": "OrderId gt '4004414' and OrderId lt '4004500'",
              "DisplayValue": "OrderId > 4004414 & OrderId < 4004500"
            }
          ],
          "IsEditable": true
        }
      ]
    }]
  }]
}
```

### Filter Property - Array with Rule and Global support
```json
{
    "Caption": "Filter",
    "ActionBar": {
      "Items": [
        {
          "Position": "left",
          "SystemItem": "Cancel",
          "OnPress": "/MDKDevApp/Actions/Navigation/CancelChangeSet.action"
        },
        {
          "Position": "right",
          "SystemItem": "Done",
          "OnPress": "/MDKDevApp/Actions/Navigation/ClosePage.action"
        }
      ]
    },
    "Result": [
      "#Page:FilterPage/#Control:OrderId/#Value"
    ],
    "Controls": [
      {
        "Sections": [
          {
            "Caption": "Filter",
            "Controls": [
              {
                "AllowMultipleSelection": true,
                "AllowEmptySelection": true,
                "Caption": "Filter By OrderId",
                "FilterProperty": [
                    {
                        "ReturnValue": "/MDKDevApp/Globals/QueryString1.global",
                        "DisplayValue": "OrderId > 4004760"
                    },
                    {
                        "ReturnValue": "/MDKDevApp/Rules/FilterQueries/LessThanQuery.js",
                        "DisplayValue": "OrderId < 4000060"
                    },
                    {
                        "ReturnValue": "/MDKDevApp/Rules/FilterQueries/LogicalAndQuery.js",
                        "DisplayValue": "OrderId > 4004440 and OrderId < 4004450"
                    }
                ],
                "_Name": "OrderId",
                "_Type": "Control.Type.FormCell.Filter",
                "IsEditable": true
              }
            ]
          }
        ],
        "_Name": "FormCellContainer",
        "_Type": "Control.Type.FormCellContainer"
      }
    ],
    "_Type": "Page",
    "_Name": "FilterPage"
  }
```

```javascript
// OneTwoThree.js - Returning a property name
function FormCellFilterItems(context) {
  return 'Priority';
}

// OneTwoTree.js - Returning preset values
function FormCellFilterItems(context) {
  return {
    name: 'Priority',
    values: [{
      ReturnValue: '1',
      DisplayValue: 'Low'
    }, {
      ReturnValue: '2',
      DisplayValue: 'Medium'
    }]
  };
}

// LessThanQuery.js - Rule returing filter query string
function LessThanQuery() {
    return "OrderId lt '4000060'";
}

// LogicalAndQuery.js - Rule returning promise of filter query string 
function LogicalAndQuery() {
    return Promise.resolve("OrderId gt '4004440' and OrderId lt '4004450'");
}
```

### Validation
```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Value": "FormCell Example",
  "Controls": [{
    "Sections": [{
      "_Type": "Control.Type.FormCellContainer",
      "_Name": "FormCellContainer",
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Filter",
        "_Name": "FilterFormCell",
        "AllowMultipleSelection": false,
        "AllowEmptySelection": false,
        "Caption": "Sort by",
        "FilterProperty": "TestProperty",
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
          "Background": "FilterFormCellBackground",
          "Caption": "FilterFormCellCaption"
        }
      }]
    }]
  }]
}
```

### Style Classes Definition
```css
/* Filter Form Cell - Background */
.FilterFormCellBackground {
  background-color: yellow;
}

/* Filter Form Cell - Caption */
.FilterFormCellCaption {
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