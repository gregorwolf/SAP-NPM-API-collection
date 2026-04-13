
----
## Examples

### Full Page

```json
{
  "_Type": "Page",
  "_Name": "ObjectCollectionPage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectCollection",
          "Layout": {
            "NumberOfColumns": 1
          },
          "DataPaging": {
            "ShowLoadingIndicator": true,
            "LoadingIndicatorText": "Loading more items, please wait…"
          },
          "ObjectCell": {
            "_Type": "ObjectCollection.Type.ObjectCell",
            "_Name": "ObjectCell",
            "AccessoryType": "disclosureIndicator",
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
            "AdditionalProperties": ["PlantSection"],
            "BarcodeScanner": false,
            "Enabled": true,
            "Placeholder": "Search",
            "Options": {
              "CaseSensitive": true,
              "NumberSearch": {
                "Enabled": true,
                "ConversionMethod": "UseCast"
              }
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

### Max Item Count (Preview Mode)
```json
{
  "_Type": "Page",
  "_Name": "ObjectCollectionPage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectCollection",
          "MaxItemCount": 6,
          "ObjectCell": {
            "_Type": "ObjectCollection.Type.ObjectCell",
            "_Name": "ObjectCell",
            "AccessoryType": "disclosureIndicator",
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

### Static (Two Column Facet)
```json
{
  "_Type": "Page",
  "_Name": "StaticObjectCollectionPage",
  "Caption": "Static Object Collection Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "StaticObjectCollectionTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectCollection",
          "ObjectCells": [
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell1",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "Distance Unit",
                "OnPress": "/MDKApp/Actions/Messages/Message1.action",
                "Visible": true
              }
            },
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell2",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "Hidden object cell",
                "OnPress": "/MDKApp/Actions/Messages/Message.action",
                "Visible": false
              }
            },
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell3",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "Touch ID & Passcode",
                "OnPress": "/MDKApp/Actions/Messages/Message2.action"
              }
            },
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell4",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "Support",
                "OnPress": "/MDKApp/Actions/Messages/Message3.action"
              }
            },
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell5",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "About",
                "OnPress": "/MDKApp/Actions/Messages/Message4.action"
              }
            }
          ]
        },
        {
          "_Type": "Section.Type.ObjectCollection",
          "ObjectCells": [
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell1",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "Support",
                "OnPress": "/MDKApp/Actions/Messages/Message1.action"
              }
            },
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell2",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "About",
                "OnPress": "/MDKApp/Actions/Messages/Message2.action"
              }
            }
          ]
        },
        {
          "_Type": "Section.Type.ObjectCollection",
          "ObjectCells": [
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell1",
                "AccessoryType": "disclosureIndicator",
                "Subhead": "Notes",
                "StatusText": "4",
                "OnPress": "/MDKApp/Actions/Messages/Message2.action"
              }
            },
            {
              "ObjectCell": {
                "_Type": "ObjectCollection.Type.ObjectCell",
                "_Name": "ObjectCell2",
                "AccessoryType": "disclosureIndicator",
                "AttributeLabel": "",
                "Subhead": "Documents",
                "StatusText": "4",
                "OnPress": "/MDKApp/Actions/Messages/Message2.action"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Extension views in each cell
```json
{
  "_Type": "Page",
  "_Name": "ObjectCollectionPage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectCollection",
          "Layout": {
            "NumberOfColumns": 4
          },
          "MaxItemCount": 3,
          "Extension": {
            "MaxWidth": 300,
            "DimensionRatio": "8:5",
            "Module": "MeasuringPoints",
            "Control": "MeasuringPoints",
            "Class": "MyMPClass",
            "_Name": "MeasuringPoints",
            "ExtensionProperties": {
              "Configuration": {
                "EnableCurrentLocation": "True",
                "EnableDynamicLayers": "True",
                "EnableNearMe": "True",
                "EnableFeatureLayers": "True",
                "EnableBaseMaps": "True"
              },
              "Type": "Equipment",
              "Title": "Equipment",
            },
            "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
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

### Extension with Horizontal Scrolling
```json
{
  "_Type": "Page",
  "_Name": "ObjectCollectionPage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectCollection",
          "Layout": {
            "LayoutType": "HorizontalScroll"
          },
          "MaxItemCount": 3,
          "Extension": {
            "MaxWidth": 300,
            "DimensionRatio": "8:5",
            "Module": "MeasuringPoints",
            "Control": "MeasuringPoints",
            "Class": "MyMPClass",
            "_Name": "MeasuringPoints",
            "ExtensionProperties": {
              "Configuration": {
                "EnableCurrentLocation": "True",
                "EnableDynamicLayers": "True",
                "EnableNearMe": "True",
                "EnableFeatureLayers": "True",
                "EnableBaseMaps": "True"
              },
              "Type": "Equipment",
              "Title": "Equipment",
            },
            "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
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

### Full Page with font icon and styles
```json
{
  "_Type": "Page",
  "_Name": "ObjectCollectionPage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectCollection",
          "Layout": {
            "NumberOfColumns": 1
          },
          "DataPaging": {
            "ShowLoadingIndicator": true,
            "LoadingIndicatorText": "Loading more items, please wait…"
          },
          "ObjectCell": {
            "_Type": "ObjectCollection.Type.ObjectCell",
            "_Name": "ObjectCell",
            "AccessoryType": "disclosureIndicator",
            "DetailImage": "sap-icon://home",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "AccessoryButtonIcon": "sap-icon://settings",
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
          "Search": {
            "AdditionalProperties": ["PlantSection"],
            "BarcodeScanner": false,
            "Enabled": true,
            "Placeholder": "Search",
            "Options": {
              "CaseSensitive": true,
              "NumberSearch": {
                "Enabled": true,
                "ConversionMethod": "UseCast"
              }
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
```