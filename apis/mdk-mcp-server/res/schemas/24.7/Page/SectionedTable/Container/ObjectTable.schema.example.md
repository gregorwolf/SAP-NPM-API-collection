
----
## Examples


### Full Page
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
          "_Type": "Section.Type.ObjectTable",
          "_Name": "ObjectTable",
          "Visible": true,
          "DataPaging": {
            "ShowLoadingIndicator": true,
            "LoadingIndicatorText": "Loading more items, please wait…"
          },
          "ObjectCell": {
            "AccessoryType": "disclosureIndicator",
            "Description": "{OrderDescription}",
            "DetailImage": "/MDKApp/Images/workorder.png",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
            "StatusImage": "/MDKApp/Images/workorder_details.png",
            "Title": "{OrderId}"
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaderCollection",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$expand=Operations&$orderby=OrderId"
          },
          "Selection":{
            "Mode": "None",
            "LongPressToEnable": "Multiple",
            "ExitOnLastDeselect": true
          },
          "OnSelectionChanged": "/MDKApp/Actions/SelectionChanged.action",
          "OnSelectionModeChanged": "/MDKApp/Actions/SelectionModeChanged.action"
        }
      ]
    }
  ]
}
```

### Full Page With Search
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
          "_Type": "Section.Type.ObjectTable",
          "Visible": true,
          "ObjectCell": {
            "AccessoryType": "disclosureIndicator",
            "Description": "{OrderDescription}",
            "DetailImage": "/MDKApp/Images/workorder.png",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
            "StatusImage": "/MDKApp/Images/workorder_details.png",
            "Title": "{OrderId}"
          },
          "Search": {
            "Enabled": true,
            "Placeholder": "Search",
            "BarcodeScanner": false
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaderCollection",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$expand=Operations&$orderby=OrderId"
          }
        }
      ]
    }
  ]
}
```

### Max Item Count (Preview Mode)
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
          "_Type": "Section.Type.ObjectTable",
          "Visible": true,
          "MaxItemCount": 3,
          "ObjectCell": {
            "AccessoryType": "disclosureIndicator",
            "Description": "{OrderDescription}",
            "DetailImage": "/MDKApp/Images/workorder.png",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
            "StatusImage": "/MDKApp/Images/workorder_details.png",
            "Title": "{OrderId}"
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaderCollection",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$expand=Operations&$orderby=OrderId"
          }
        }
      ]
    }
  ]
}
```

### Full Page With DetailButton and Handler
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
          "_Type": "Section.Type.ObjectTable",
          "Visible": true,
          "MaxItemCount": 5,
          "ObjectCell": {
            "AccessoryType": "detailButton",
            "DetailImage": "/MDKApp/Images/icon.png",
            "Description": "{OrderDescription}",
            "Footnote": "{SystemStatus}",
            "Icons": [
              "/MDKApp/Images/medium.png",
              "/MDKApp/Images/open.png"
            ],
            "OnPress": "/MDKApp/Actions/Navigation/NavToWOHeaderUpdate.action",
            "OnAccessoryButtonPress": "/MDKApp/Actions/Messages/Message.action",
            "StatusImage": "res://icon.png",
            "StatusText": "{SystemStatus}",
            "SubstatusImage": "res://icon.png",
            "SubstatusText": "{HeaderFunctionLocation}",
            "Subhead": "{MainWorkCenter}",
            "Title": "{OrderId}"
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaders",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$top=5"
          }
        }
      ]
    }
  ]
}
```

### Full Page With DetailDisclosureButton and Handler
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
          "_Type": "Section.Type.ObjectTable",
          "Visible": true,
          "MaxItemCount": 5,
          "ObjectCell": {
            "AccessoryType": "detailDisclosureButton",
            "DetailImage": "/MDKApp/Images/icon.png",
            "Description": "{OrderDescription}",
            "Footnote": "{SystemStatus}",
            "Icons": [
              "/MDKApp/Images/medium.png",
              "/MDKApp/Images/open.png"
            ],
            "OnPress": "/MDKApp/Actions/Navigation/NavToWOHeaderUpdate.action",
            "OnAccessoryButtonPress": "/MDKApp/Actions/Messages/Message.action",
            "StatusImage": "res://icon.png",
            "StatusText": "{SystemStatus}",
            "SubstatusImage": "res://icon.png",
            "SubstatusText": "{HeaderFunctionLocation}",
            "Subhead": "{MainWorkCenter}",
            "Title": "{OrderId}"
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaders",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$top=5"
          }
        }
      ]
    }
  ]
}
```
### Full Page With Swipe
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
          "_Type": "Section.Type.ObjectTable",
          "Visible": true,
          "DataPaging": {
            "ShowLoadingIndicator": true,
            "LoadingIndicatorText": "Loading more items, please wait…"
          },
          "ObjectCell": {
            "AccessoryType": "disclosureIndicator",
            "Description": "{OrderDescription}",
            "DetailImage": "/MDKApp/Images/workorder.png",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
            "StatusImage": "/MDKApp/Images/workorder_details.png",
            "Title": "{OrderId}",
            "ContextMenu": {
              "PerformFirstActionWithFullSwipe": true,
              "LeadingItems": "/MDKApp/Rules/SetLeadingItems.js",
              "TrailingItems": ["UpdateCountry","UpdateCountryFailed", "ShowCity", "ShowCountry"],
              "Items":[
                {
                  "_Name": "UpdateCity",
                  "Text": "Update City",
                  "Image": "sap-icon://home",
                  "Style": "MDKSwipeControlStyle",
                  "Mode": "Normal",
                  "OnSwipe": "/MDKApp/Rules/UpdateCity.js"
                },
                {
                  "_Name": "UpdateCompanyName",
                  "Text": "Update CompanyName",
                  "Image": "sap-icon://accept",
                  "Mode": "Normal",
                  "OnSwipe": "/MDKApp/Rules/UpdateCompanyName.js"
                },
                {
                  "_Name": "UpdateAddress",
                  "Text": "Update Address",
                  "Image": "sap-icon://away",
                  "Mode": "Normal",
                  "OnSwipe": "/MDKApp/Rules/UpdateAddress.js"
                },
                {
                  "_Name": "ShowMessage",
                  "Text": "Toast Message",
                  "Image": "sap-icon://message",
                  "Mode": "Normal",
                  "OnSwipe": "/MDKApp/Actions/Message/ShowMessage.action"
                },
                {
                  "_Name": "ShowAlert",
                  "Text": "Alert Message",
                  "Image": "sap-icon://background",
                  "Mode": "Normal",
                  "OnSwipe": "/MDKApp/Actions/Message/ShowAlert.action"
                },
                {
                  "_Name": "OtherAction",
                  "Text": "Other Action",
                  "Image": "sap-icon://begin",
                  "Mode": "Normal",
                  "OnSwipe": "/MDKApp/Actions/Message/OtherAction.action"
                },
                {
                  "_Name": "UpdateCountry",
                  "Text": "Update Country",
                  "Image": "sap-icon://customer",
                  "Mode": "Deletion",
                  "OnSwipe": "/MDKApp/Rules/UpdateCountry.js"
                },
                {
                  "_Name": "UpdateCountryFailed",
                  "Text": "Update Country-Failed",
                  "Image": "sap-icon://globe",
                  "Mode":  "Deletion",
                  "OnSwipe": "/MDKApp/Rules/UpdateCountryFailed.js"
                },
                {
                  "_Name": "ShowCity",
                  "Text": "City Info",
                  "Image": "sap-icon://information",
                  "Mode": "Normal",
                  "OnSwipe":"/MDKApp/Actions/Message/ShowCity.action"
                },
                {
                  "_Name": "ShowCountry",
                  "Text": "Country Info",
                  "Image": "sap-icon://iphone",
                  "Mode": "Normal",
                  "OnSwipe": "/MDKApp/Actions/Message/ShowCountry.action"
                },
                {
                  "_Name": "ShowAddress",
                  "Text": "Address Info.",
                  "Image": "sap-icon://key",
                  "OnSwipe": "/MDKApp/Actions/Message/ShowAddress.action"
                },
                {
                  "_Name": "OtherActionFailed",
                  "Text": "Other Actions",
                  "Image": "sap-icon://log",
                  "OnSwipe":"/MDKApp/Actions/Message/OtherActionFailed.action"
                }
              ]
            }
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaderCollection",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$expand=Operations&$orderby=OrderId"
          }
        }
      ]
    }
  ]
}

```

```javascript
export default function SetLeadingItems(context) {
  let binding = context.binding;
  if (binding.Status === 'Completed') {
    return ["UpdateAddress", "UpdateCompanyName", "ShowMessage"];
  } else {
    return ["UpdateCity", "UpdateCompanyName", "UpdateAddress"];
  }
}
```

### Static (Single Column Facet)
```json
{
  "_Type": "Page",
  "_Name": "SectionedTablePage",
  "Caption": "Object Table Section Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectTable",
          "_Name": "StaticSection1",
          "Visible": true,
          "ObjectCells": [
            {
              "ObjectCell": {
                "AccessoryType": "disclosureIndicator",
                "Footnote": "/MDKApp/Rules/ObjectTable/ObjectTableText.js",
                "DetailImage": "/MDKApp/Rules/ObjectTable/ObjectTableImage.js",
                "OnPress": "/MDKApp/Actions/Messages/Message1.action"
              }
            },
            {
              "ObjectCell": {
                "AccessoryType": "disclosureIndicator",
                "OnPress": "/MDKApp/Actions/Messages/Message2.action",
                "Title": "/MDKApp/Rules/ObjectTable/ObjectTableText.js"
              }
            }
          ]
        },
        {
          "_Type": "Section.Type.ObjectTable",
          "_Name": "StaticSection2",
          "Visible": "/MDKApp/Rules/ObjectTable/Visible.js",
          "ObjectCells": [
            {
              "ObjectCell": {
                "AccessoryType": "disclosureIndicator",
                "Footnote": "/MDKApp/Rules/ObjectTable/ObjectTableText.js",
                "OnPress": "/MDKApp/Actions/Messages/Message3.action"
              }
            },
            {
              "ObjectCell": {
                "AccessoryType": "disclosureIndicator",
                "OnPress": "/MDKApp/Actions/Messages/Message4.action",
                "Title": "/MDKApp/Rules/ObjectTable/ObjectTableText.js"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Full Page with font icon and style
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
          "_Type": "Section.Type.ObjectTable",
          "Visible": true,
          "ObjectCell": {
            "AccessoryType": "disclosureIndicator",
            "Description": "{OrderDescription}",
            "DetailImage": "sap-icon://home",
            "AccessoryButtonIcon": "sap-icon://settings",
            "Icons": [
              "font://&#xe011;",
              "font://&#xe05d;"
            ],
            "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
            "StatusImage": "font://&#xe011;",
            "Title": "{OrderId}",
            "Subhead": "{MainWorkCenter}",
            "Footnote": "{SystemStatus}",
            "StatusText": "{SystemStatus}",
            "SubstatusText": "{HeaderFunctionLocation}",
            "SubstatusImage": "sap-icon://home",
            "Styles": {
              "Title": "ObjectCellGreenText",
              "Subhead": "ObjectCellPurpleText",
              "Footnote": "ObjectCellRedText",
              "Description": "ObjectCellYellowText",
              "StatusText": "ObjectCellBlueText",
              "SubstatusText": "ObjectCellBrownText",
              "DetailImage": "font-icon-class",
              "StatusImage": "font-icon-class",
              "SubstatusImage": "font-icon-class",
              "Icons": "font-icon-class",
              "AccessoryButtonIcon": "font-icon-class"
            }
          },
          "Target": {
            "EntitySet": "MyWorkOrderHeaderCollection",
            "Service": "/MDKApp/Services/Amw.service",
            "QueryOptions": "$expand=Operations&$orderby=OrderId"
          }
        }
      ]
    }
  ]
}
```

### Style Classes Definition
```css
.ObjectCellRedText {
  color: #ff0000;
}

.ObjectCellYellowText {
  color: #ffbb33;
}

.ObjectCellBlueText {
  color: #0040ff;
}

.ObjectCellBrownText {
  color: #cc6600;
}

.ObjectCellGreenText {
  color: #339966;
}

.ObjectCellPurpleText {
  color: #ff00ff;
}

.font-icon-class {
  font-size: 8;
  color: red;
  background-color: grey;
}

.MDKSwipeControlStyle {
  background-color: #339966;
}
```