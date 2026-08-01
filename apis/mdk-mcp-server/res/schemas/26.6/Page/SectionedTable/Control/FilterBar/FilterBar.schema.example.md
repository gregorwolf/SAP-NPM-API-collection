
----
## Examples


### Page with ObjectTableSection with FilterBar
```json
{
  "_Type": "Page",
  "_Name": "SectionedTablePage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "FilterBar": {
            "_Type": "Control.Type.FilterBar",
            "_Name": "SortFilter",
            "Filters": "/MDKDevApp/Rules/FilterBar/InitialFilters.js",
            "Sections": [
              {
                "Controls": [
                  {
                    "_Name": "Priority",
                    "_Type": "FilterBar.Type.Segmented",
                    "Label": "Priority",
                    "Value": "",
                    "Items": [
                      {
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
                      }
                    ],
                    "SimpleQuery": {
                      "Property" : "Priority",
                      "Operator": "eq"
                    },
                    "DisplayOnBar": true
                  },
                  {
                    "_Name": "OrderIdCompare",
                    "_Type": "FilterBar.Type.Segmented",
                    "Label": "OrderID Compare",
                    "Value": "",
                    "Items": [
                      {
                        "DisplayValue": "< 4004760",
                        "ReturnValue": "OrderId lt '4004760'"
                      },
                      {
                        "DisplayValue": "= 4004760",
                        "ReturnValue": "OrderId eq '4004760'"
                      },
                      {
                        "DisplayValue": "> 4004760",
                        "ReturnValue": "OrderId gt '4004760'"
                      }
                    ],
                    "AllowEmptySelection": true,
                    "AllowMultipleSelection": false,
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  },
                  {
                    "_Name": "OrderIdA",
                    "_Type": "FilterBar.Type.Segmented",
                    "Label": "OrderID Static",
                    "Value": "",
                    "Items": "/MDKDevApp/Rules/FilterBar/GetOrderIDItems.js",
                    "SimpleQuery": {
                      "Property" : "OrderId",
                      "Operator": "lt"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  },
                  {
                    "_Name": "OrderIdB",
                    "_Type": "FilterBar.Type.ListPicker",
                    "Label": "Order ID >=",
                    "Value": "4000034",
                    "PickerItems": {
                        "DisplayValue": "{OrderDescription}",
                        "ReturnValue": "{OrderId}",
                        "Target": {
                            "EntitySet": "MyWorkOrderHeaders",
                            "Service": "/MDKDevApp/Services/Amw.service",
                            "QueryOptions": "$top=20"
                        }
                    },
                    "Search": {
                        "Enabled": true
                    },
                    "AllowMultipleSelection": false,
                    "AllowEmptySelection": true,
                    "SimpleQuery": {
                      "Property" : "OrderId",
                      "Operator": "ge"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  }
                ]
              },
              {
                "Controls": [
                  {
                    "_Name": "Favorite",
                    "_Type": "FilterBar.Type.Switch",
                    "Label": "Is Favorite?",
                    "HelperText": "Favorite is",
                    "SimpleQuery": {
                      "Property" : "Favorite"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  },
                  {
                    "_Name": "Quantity",
                    "_Type": "FilterBar.Type.Slider",
                    "Label": "Qty",
                    "MinValue": 1,
                    "MaxValue": 111,
                    "Step": 0.5,
                    "DecimalPlaces": 1,
                    "HelperText": "Quantity is",
                    "SimpleQuery": {
                      "Property" : "Quantity",
                      "Operator": "ge"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  }
                ]
              },
              {
                "Controls": [
                  {
                    "_Name": "MultiSorter",
                    "_Type": "FilterBar.Type.MultiSorter",
                    "Label": "Multi sorter",
                    "Value": "",
                    "Items": [
                      {
                        "ReturnValue": "OrderId",
                        "DisplayValue": "OrderId",
                        "AscendingLabel": "Lowest first",
                        "DescendingLabel": "Highest first"
                      },
                      {
                        "ReturnValue": "Priority",
                        "DisplayValue": "Priority - Long text of Products be wrapped up",
                        "AscendingLabel": "This is very long ascending text be wrapped up",
                        "DescendingLabel": "Highest first"
                      },
                      {
                        "ReturnValue": "HeaderFunctionLocation",
                        "DisplayValue": "HeaderFunctionLocation",
                        "AscendingLabel": "Ascending",
                        "DescendingLabel": "Descending"
                      },
                      {
                        "ReturnValue": "CreationDate",
                        "DisplayValue": "CreationDate",
                        "AscendingLabel": "Earliest first",
                        "DescendingLabel": "Latest first"
                      },
                      {
                        "ReturnValue": "DueDate",
                        "DisplayValue": "DueDate",
                        "AscendingLabel": "Earliest first",
                        "DescendingLabel": "Latest first"
                      }
                    ],
                    "HelperText": "Multi sort by",
                    "DisplayOnBar": true
                  }
                ]
              }
            ]
          },
          "Header": {
            "UseTopPadding": false
          },
          "ObjectCell": {
            "AccessoryType": "disclosureIndicator",
            "Description": "{OrderDescription}",
            "DetailImage": "/MDKDevApp/Images/workorder.png",
            "DetailImageIsCircular": false,
            "Icons": [
              "/MDKDevApp/Images/icon_severity_medium.png",
              "/MDKDevApp/Images/open.png"
            ],
            "OnPress": "/MDKDevApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
            "StatusImage": "/MDKDevApp/Images/workorder_details.png",
            "Title": "{OrderId}"
          },
          "Search": {
            "Enabled": true,
            "Placeholder": "Item Search",
            "BarcodeScanner": true,
            "Delay": 500,
            "OnScanPress": "/MDKDevApp/Rules/OData/WorkOrderScan.js",
            "MinimumCharacterThreshold": 3
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaders",
            "Service": "/MDKDevApp/Services/Amw.service",
            "QueryOptions": "$orderby=OrderId"
          },
          "_Name": "Section",
          "_Type": "Section.Type.ObjectTable"
        }
      ]
    }
  ]
}
```

### Page with ObjectTableSection with FilterBar and Styling
```json
{
  "_Type": "Page",
  "_Name": "SectionedTablePage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "FilterBar": {
            "_Type": "Control.Type.FilterBar",
            "_Name": "SortFilter",
            "Filters": "/MDKDevApp/Rules/FilterBar/InitialFilters.js",
            "Sections": [
              {
                "Controls": [
                  {
                    "_Name": "Priority",
                    "_Type": "FilterBar.Type.Segmented",
                    "Label": "Priority",
                    "Value": "",
                    "Items": [
                      {
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
                      }
                    ],
                    "SimpleQuery": {
                      "Property" : "Priority",
                      "Operator": "eq"
                    },
                    "DisplayOnBar": true
                  },
                  {
                    "_Name": "OrderIdCompare",
                    "_Type": "FilterBar.Type.Segmented",
                    "Label": "OrderID Compare",
                    "Value": "",
                    "Items": [
                      {
                        "DisplayValue": "< 4004760",
                        "ReturnValue": "OrderId lt '4004760'"
                      },
                      {
                        "DisplayValue": "= 4004760",
                        "ReturnValue": "OrderId eq '4004760'"
                      },
                      {
                        "DisplayValue": "> 4004760",
                        "ReturnValue": "OrderId gt '4004760'"
                      }
                    ],
                    "AllowEmptySelection": true,
                    "AllowMultipleSelection": false,
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  },
                  {
                    "_Name": "OrderIdA",
                    "_Type": "FilterBar.Type.Segmented",
                    "Label": "OrderID Static",
                    "Value": "",
                    "Items": "/MDKDevApp/Rules/FilterBar/GetOrderIDItems.js",
                    "SimpleQuery": {
                      "Property" : "OrderId",
                      "Operator": "lt"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  },
                  {
                    "_Name": "OrderIdB",
                    "_Type": "FilterBar.Type.ListPicker",
                    "Label": "Order ID >=",
                    "Value": "4000034",
                    "PickerItems": {
                        "DisplayValue": "{OrderDescription}",
                        "ReturnValue": "{OrderId}",
                        "Target": {
                            "EntitySet": "MyWorkOrderHeaders",
                            "Service": "/MDKDevApp/Services/Amw.service",
                            "QueryOptions": "$top=20"
                        }
                    },
                    "Search": {
                        "Enabled": true
                    },
                    "AllowMultipleSelection": false,
                    "AllowEmptySelection": true,
                    "SimpleQuery": {
                      "Property" : "OrderId",
                      "Operator": "ge"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  }
                ]
              },
              {
                "Controls": [
                  {
                    "_Name": "Favorite",
                    "_Type": "FilterBar.Type.Switch",
                    "Label": "Is Favorite?",
                    "HelperText": "Favorite is",
                    "SimpleQuery": {
                      "Property" : "Favorite"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  },
                  {
                    "_Name": "Quantity",
                    "_Type": "FilterBar.Type.Slider",
                    "Label": "Qty",
                    "MinValue": 1,
                    "MaxValue": 111,
                    "Step": 0.5,
                    "DecimalPlaces": 1,
                    "HelperText": "Quantity is",
                    "SimpleQuery": {
                      "Property" : "Quantity",
                      "Operator": "ge"
                    },
                    "DisplayOnBar": "/MDKDevApp/Rules/FilterBar/GetDisplayOnBarValue.js"
                  }
                ]
              },
              {
                "Controls": [
                  {
                    "_Name": "MultiSorter",
                    "_Type": "FilterBar.Type.MultiSorter",
                    "Label": "Multi sorter",
                    "Value": "",
                    "Items": [
                      {
                        "ReturnValue": "OrderId",
                        "DisplayValue": "OrderId",
                        "AscendingLabel": "Lowest first",
                        "DescendingLabel": "Highest first"
                      },
                      {
                        "ReturnValue": "Priority",
                        "DisplayValue": "Priority - Long text of Products be wrapped up",
                        "AscendingLabel": "This is very long ascending text be wrapped up",
                        "DescendingLabel": "Highest first"
                      },
                      {
                        "ReturnValue": "HeaderFunctionLocation",
                        "DisplayValue": "HeaderFunctionLocation",
                        "AscendingLabel": "Ascending",
                        "DescendingLabel": "Descending"
                      },
                      {
                        "ReturnValue": "CreationDate",
                        "DisplayValue": "CreationDate",
                        "AscendingLabel": "Earliest first",
                        "DescendingLabel": "Latest first"
                      },
                      {
                        "ReturnValue": "DueDate",
                        "DisplayValue": "DueDate",
                        "AscendingLabel": "Earliest first",
                        "DescendingLabel": "Latest first"
                      }
                    ],
                    "HelperText": "Multi sort by",
                    "DisplayOnBar": true
                  }
                ]
              }
            ],
            "Styles": {
              "Bar": "filterBar",
              "Active": "activeFilterBarItem",
              "InActive": "inactiveFilterBarItem"
            }
          },
          "Header": {
            "UseTopPadding": false
          },
          "ObjectCell": {
            "AccessoryType": "disclosureIndicator",
            "Description": "{OrderDescription}",
            "DetailImage": "/MDKDevApp/Images/workorder.png",
            "DetailImageIsCircular": false,
            "Icons": [
              "/MDKDevApp/Images/icon_severity_medium.png",
              "/MDKDevApp/Images/open.png"
            ],
            "OnPress": "/MDKDevApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
            "StatusImage": "/MDKDevApp/Images/workorder_details.png",
            "Title": "{OrderId}"
          },
          "Search": {
            "Enabled": true,
            "Placeholder": "Item Search",
            "BarcodeScanner": true,
            "Delay": 500,
            "OnScanPress": "/MDKDevApp/Rules/OData/WorkOrderScan.js",
            "MinimumCharacterThreshold": 3
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaders",
            "Service": "/MDKDevApp/Services/Amw.service",
            "QueryOptions": "$orderby=OrderId"
          },
          "_Name": "Section",
          "_Type": "Section.Type.ObjectTable"
        }
      ]
    }
  ]
}
```

### Style Classes Definition
```css
.filterBar {
  border-radius: 0;
  border-width: 1;  /* iOS Only */
}

.activeFilterBarItem {
  font-color: #ff3333;
  background-color: #79d2a6;
  border-color: #ff6666;  /* iOS Only */
  
}

.inactiveFilterBarItem {
  font-color: #cc6600;
  background-color: #80b3ff;
  border-color: pink;  /* iOS Only */
}
```
