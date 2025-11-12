
----
## Examples


### With a simple fixed collection specifier
```json
{
  "_Type": "Page",
  "_Name": "FilterPage",
  "Controls": [
    {
      "_Type": "Control.Type.FormCellContainer",
      "_Name": "FormCellContainer",
      "Sections": [
        {
          "Controls": [{
            "_Type": "Control.Type.FormCell.MultiSorter",
            "_Name": "OrderBy",
            "AllowEmptySelection": true,
            "Caption": "Sort By",
            "Items": ["OrderId", "BusinessArea", "OrderType"],
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
              "Caption": "CaptionStyleClassName",
              "MutiSorter": "BackgroundClassName",
              "Items": {
                "DisplayValue": "DisplayValueStyleClassName",
                "DirectionLabel": "DirectionLabelStyleClassName"
              }
            }
          }]
        }
      ]
    }
  ]
}
```

### Set Style for MultiSorter control
Since MultiSorter control has nested control style format, like this:
```json
"Styles": {
  "Caption": "CaptionStyleClassName",
  "MutiSorter": "BackgroundClassName",
  "Items": {
    "DisplayValue": "DisplayValueStyleClassName",
    "DirectionLabel": "DirectionLabelStyleClassName"
  }
}
```
If we want to set style for DisplayValue or DirectionLabel, we could call setStyle() like this:
```js
multiSorterControl.setStyle("DisplayValueStyleClassName", "Items/DisplayValue");
multiSorterControl.setStyle("DirectionLabelStyleClassName", "Items/DirectionLabel");
```

### With a complex fixed collection specifier
We can set sort items with a complex fixed collection specifier with customized ascending and descending labels. If the label value is not specified, localized `Ascending` and `Descending` will be the default value.
```json
{
  "Controls": [
    {
      "Sections": [
        {
          "Controls": [{
            "_Type": "Control.Type.FormCell.MultiSorter",
            "_Name": "SortFilter",
            "AllowEmptySelection": false,
            "Caption": "Sort By",
            "Items": [{
              "ReturnValue": "OrderId",
              "DisplayValue": "Job ID",
              "AscendingLabel": "Smaller First",
              "DescendingLabel": "Larger First"
            }, {
              "ReturnValue": "OrderDescription",
              "DisplayValue": "Description"
            }, {
              "ReturnValue": "Priority",
              "DisplayValue": "Priority",
              "AscendingLabel": "Higher",
              "DescendingLabel": "Lower"
            }],
            "IsEditable":true
          }]
        }
      ]
    }
  ]
}
```


### Sorter Form Cell with Rule and Global support
```json
{
  "Controls": [
    {
      "Sections": [
        {
          "Controls": [{
            "_Type": "Control.Type.FormCell.MultiSorter",
            "_Name": "SortFilter",
            "AllowEmptySelection": false,
            "Caption": "Sort By",
            "Items": [
              {
                "ReturnValue": "/MDKDevApp/Globals/Sorter.global",
                "DisplayValue": "BusinessArea"
              },
              {
                "ReturnValue": "OrderType",
                "DisplayValue": "OrderType",
                "AscendingLabel": "/MDKDevApp/Rules/SorterQueries/AscendingSorterLabel.js",
                "DescendingLabel": "Descending"
              },
              {
                "ReturnValue": "OrderId",
                "DisplayValue": "OrderId",
                "AscendingLabel": "Smaller First",
                "DescendingLabel": "/MDKDevApp/Rules/SorterQueries/DescendingSorterLabel.js"
              }],
            "IsEditable":true
          }]
        }
      ]
    }
  ]
}
```

```javascript

// Sorter.global - Global file returning ReturnValue for multi sorter
{
  "_Type": "string",
  "Value": "BusinessArea"
}

// AscendingSorterLabel.js - Rule returing ascending label string
function AscendingSorterLabel() {
    return "Ascending";
  }

// DescendingSorterLabel.js - Rule returing promise of descending label string
function DescendingSorterLabel() {
    return Promise.resolve("Larger First");
  }
```

### Style Classes Definition
```css
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