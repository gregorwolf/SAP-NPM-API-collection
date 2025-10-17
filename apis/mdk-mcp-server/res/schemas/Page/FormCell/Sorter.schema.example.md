
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
            "_Type": "Control.Type.FormCell.Sorter",
            "_Name": "OrderBy",
            "AllowEmptySelection": true,
            "Caption": "Sort By",
            "SortByItems": ["OrderId", "BusinessArea", "OrderType"],
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
            }
          }]
        }
      ]
    }
  ]
}
```

### With a complex fixed collection specifier
```json
{
  "Controls": [
    {
      "Sections": [
        {
          "Controls": [{
            "_Type": "Control.Type.FormCell.Sorter",
            "_Name": "SortFilter",
            "AllowEmptySelection": false,
            "Caption": "Sort By",
            "SortByItems": [{
              "ReturnValue": "OrderId",
              "DisplayValue": "Job ID"
            }, {
              "ReturnValue": "OrderDescription",
              "DisplayValue": "Description"
            }, {
              "ReturnValue": "Priority",
              "DisplayValue": "Priority"
            }],
            "IsEditable":true
          }]
        }
      ]
    }
  ]
}
```


### Sorter queries having asc/desc attribute and sorter queries with multiple attributes.
```json
{
  "Controls": [
    {
      "Sections": [
        {
          "Controls": [{
            "_Type": "Control.Type.FormCell.Sorter",
            "_Name": "SortFilter",
            "AllowEmptySelection": false,
            "Caption": "Sort By",
            "SortByItems": [
              {
                "ReturnValue": "OrderId desc",
                "DisplayValue": "OrderId Descending"
              }, 
              {
                "ReturnValue": "OrderId asc",
                "DisplayValue": "OrderId Ascending"
              },
              {
                "ReturnValue": "Priority ,OrderId",
                "DisplayValue": "Priority (default ascending) and then OrderId (default ascending)"
              },
              {
                "ReturnValue": "Priority desc ,OrderId",
                "DisplayValue": "Priority descending and then OrderId (default ascending)"
              },
              {
                "ReturnValue": "Priority ,OrderId desc",
                "DisplayValue": "Priority (default ascending) and then OrderId descending"
              }
              {
                "ReturnValue": "Priority desc ,OrderId asc",
                "DisplayValue": "Priority descending and then OrderId ascending"
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
            "_Type": "Control.Type.FormCell.Sorter",
            "_Name": "SortFilter",
            "AllowEmptySelection": false,
            "Caption": "Sort By",
            "SortByItems": [
              {
                "ReturnValue": "/MDKDevApp/Globals/DescendingSorter.global",
                "DisplayValue": "Descending order of BusinessArea"
              },
              {
                "ReturnValue": "/MDKDevApp/Rules/SorterQueries/AscendingSorterQuery.js",
                "DisplayValue": "Ascending order of OrderType"
              },
              {
                "ReturnValue": "/MDKDevApp/Rules/SorterQueries/DescendingSorterQuery.js",
                "DisplayValue": "Descending order of OrderType"
              },
              {
                "ReturnValue": "/MDKDevApp/Rules/SorterQueries/MultipleColumnSorterQuery.js",
                "DisplayValue": "Descending order of BusinessArea and then ascending order of OrderId"
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
// AscendingSorterQuery.js - Rule returing sorter query string
function AscendingSorterQuery() {
    return "OrderType asc";
  }

// DescendingSorterQuery.js - Rule returing promise of sorter query string
function DescendingSorterQuery() {
    return Promise.resolve("OrderType desc");
  }

// MultipleColumnSorterQuery.js - Rule returing promise of sorter query string with multiple attributes
export default function MultipleColumnSorterQuery() {
    return Promise.resolve("BusinessArea desc, OrderId asc");
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