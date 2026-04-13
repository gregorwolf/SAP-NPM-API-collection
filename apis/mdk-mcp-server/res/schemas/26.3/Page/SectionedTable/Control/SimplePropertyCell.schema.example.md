
----
## Examples


### Static
```json
{
  "_Type": "Page",
  "_Name": "StaticSimplePropCollectionPage",
  "Caption": "Static Simple Prop Collection (Facets)",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.SimplePropertyCollection",
      "SimplePropertyCells": [{
        "SimplePropertyCell": {
          "_Name": "SimplePropertyCell",
          "_Type": "SimplePropertyCollection.Type.Cell",
          "AccessoryType": "DisclosureIndicator",
          "KeyName": "Workorders",
          "Value": "42",
          "OnPress": "/AssetWorkManager/Actions/Messages/Message2.action",
          "Visible": true,
          "Styles": {
            "KeyName": "SimplePropertyCellKeyName",
            "Value": "SimplePropertyCellValue"
          }
        }
      }],
      "Layout": {
        "NumberOfColumns": 1
      }
    }]
  }]
}
```

### Dynamic
```json
{
  "_Type": "Page",
  "_Name": "SimplePropCollectionsPage",
  "Caption": "Simple Prop Collections",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.SimplePropertyCollection",
      "Header": {
        "Caption": "Simple property cells"
      },
      "Footer": {
        "Caption": "Section Footer",
        "AccessoryType": "DisclosureIndicator",
        "OnPress": "/AssetWorkManager/Actions/Messages/Message.action"
      },
      "Layout": {
        "NumberOfColumns": 1
      },
      "MaxItemCount": 5,
      "SimplePropertyCell": {
        "_Name": "SimplePropertyCell",
        "_Type": "SimplePropertyCollection.Type.Cell",
        "AccessoryType": "DisclosureIndicator",
        "KeyName": "{OrderDescription}",
        "Value": "{OrderId}",
        "OnPress": "/AssetWorkManager/Actions/Messages/Message2.action",
        "Styles": {
          "KeyName": "SimplePropertyCellKeyName",
          "Value": "SimplePropertyCellValue"
        }
      },
      "Target": {
        "EntitySet": "MyWorkOrderHeaders",
        "Service": "/AssetWorkManager/Services/Amw.service"
      }
    }]
  }]
}
```

### Style Classes Definition
```css
/* SimpleProperty Cell - KeyName */
.SimplePropertyCellKeyName {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* SimpleProperty Cell - Value */
.SimplePropertyCellValue {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}
```
