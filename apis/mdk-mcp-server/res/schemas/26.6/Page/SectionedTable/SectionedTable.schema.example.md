
----
## Examples

### SectionedTable with FeedbackFilterBar
```json
{
  "_Type": "Page",
  "_Name": "WorkOrderList",
  "Caption": "Work Orders",
  "Controls": [
    {
      "Section": {
        "Header": {
          "UseTopPadding": false
        },
        "ObjectCell": {
          "AccessoryType": "disclosureIndicator",
          "Description": "{OrderDescription}",
          "DetailImage": "/MDKDevApp/Images/workorder.png",
          "OnPress": "/MDKDevApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
          "StatusImage": "/MDKDevApp/Images/workorder_details.png",
          "Title": "{OrderId}"
        },
        "Target": {
          "EntitySet": "MyWorkOrderHeaders",
          "Service": "/MDKDevApp/Services/Amw.service",
          "QueryOptions": "$orderby=OrderId"
        },
        "_Type": "Section.Type.ObjectTable"
      },
      "FilterFeedbackBar": {
        "ShowAllFilters": "true",
        "FastFilters": [
          {  
            "_Name": "OrderByOrderId",
            "FilterType": "Sorter",
            "Label": "Order By",
            "DisplayValue": "Order Id",
            "ReturnValue": "OrderId"
          },
          {  
            "_Name": "OrderByBA",
            "FilterType": "Sorter",
            "DisplayValue": "Business Area",
            "ReturnValue": "BusinessArea"
          },
          {  
            "_Name": "LowPriority",
            "FilterType": "Filter",
            "Label": "Prio",
            "FilterProperty": "/MDKDevApp/Globals/Priority.global",
            "DisplayValue": "Low",
            "ReturnValue": "1"
          },
          {  
            "_Name": "MedPriority",
            "FilterType": "Filter",
            "FilterProperty": "/MDKDevApp/Globals/Priority.global",
            "DisplayValue": "Medium",
            "ReturnValue": "2"
          },
          {  
            "_Name": "HE217",
            "FilterType": "Filter",
            "FilterProperty": "HeaderEquipment",
            "Label": "HE",
            "DisplayValue": "HE-10000217",
            "ReturnValue": "10000217"
          },
          {  
            "_Name": "IDFilterLt",
            "FilterType": "Filter",
            "FilterProperty": "",
            "CustomQueryGroup":"OrderIdGroup",
            "Label": "ID",
            "DisplayValue": "< 4000020",
            "ReturnValue": "OrderId lt '4000020'"
          },
          {  
            "_Name": "IDFilterGt",
            "FilterType": "Filter",
            "FilterProperty": "",
            "CustomQueryGroup":"OrderIdGroup",
            "Label": "",
            "DisplayValue": "> 4000020",
            "ReturnValue": "OrderId gt '4000020'"
          }
        ],
        "Styles": {
          "Active": "activeFilter",
          "InActive": "inactiveFilter"
        }
      },
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ]
}
```

```css
.activeFilter {
  font-color: #cc6600;
  border-color: #cc6600;
}

.inactiveFilter {
  font-color: #800080;
  border-color: #800080;
}


### Categories Group page
```json
{
  "_Type": "Page",
  "_Name": "MyProductsByCategoryPage",
  "Caption": "Products By Categories",
  "Controls": [
    {
      "Target": {
        "EntitySet": "Categories",
        "Service": "/MDKApp/Services/Amw.service",
        "QueryOptions": "$orderby=CategoryName&$top=3"
      },
      "Section": {
        "Header": {
          "UseTopPadding": false,
          "Caption": "Category Group"
        },
        "Target": {
          "EntitySet": "Products",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$filter=CategoryID eq {CategoryID}"
        },
        "ObjectCell": {
          "Title": "{ProductName}",
          "Description": "{UnitPrice}",
          "Subhead": "{CategoryID}"
        },
        "_Type": "Section.Type.ObjectTable"
      },
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ]
}
```

### Categories Group by a section template with a rule
```json
{
  "_Type": "Page",
  "_Name": "MyProductsByCategoryPage",
  "Caption": "Products By Categories",
  "Controls": [
    {
      "Target": {
        "EntitySet": "Categories",
        "Service": "/MDKApp/Services/Amw.service",
        "QueryOptions": "$orderby=CategoryName&$top=3"
      },
      "Section": "/MDKApp/Rules/GetGroupSection.js",
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ]
}
```

#### The fuction of the section rule
```js
  function GetGroupSection(context) {
    const binding = context.binding;
    if(binding.CategoryID % 2 == 0) {
      return {
        "_Type": "Section.Type.ObjectTable",
        "Header": {
          "Caption": "Category Group",
          "UseTopPadding": true
        },
        "Target": {
          "EntitySet": "Products",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$filter=CategoryID eq {CategoryID}"
        },
        "ObjectCell": {
          "Title": "{ProductName}",
          "Description": "{UnitPrice}",
          "Subhead": "{CategoryID}"
        }
      };
    } else {
      return {
        "_Type": "Section.Type.ObjectCollection",
        "Header": {
          "Caption": "Category Group",
          "UseTopPadding": true
        },
        "Layout": {
          "NumberOfColumns": 2
        },
        "Target": {
          "EntitySet": "Products",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$filter=CategoryID eq {CategoryID}"
        },
        "ObjectCell": {
          "Title": "{ProductName}",
          "Description": "{UnitPrice}",
          "Subhead": "{CategoryID}"
        }
      };
    }
  } 
```