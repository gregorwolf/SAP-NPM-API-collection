
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "Extension FormCell Page",
  "Controls": [{
    "_Name": "FormCellContainer",
    "_Type": "Control.Type.FormCellContainer",
    "Sections": [{
      "Caption": "Extension FormCell Section",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Extension",
        "_Name": "ExtensionFormCell",
        "Module": "DevAppExtension",
        "Control": "MyFormCellExtension",
        "Class": "MyFormCellExtension",
        "Height": 300,
        "ExtensionProperties": {
          "MyProp1": {
            "Caption": "Test"
          },
          "MyProp2": "/MDKApp/Globals/Test.global",
          "MyEvent1": "/MDKApp/Actions/Messages/Message2.action"
        },
        "Target": {
          "EntitySet": "MyWorkOrderHeaders",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$expand=Operations&$orderby=OrderId&$top=3"
        },
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      }]
    }]
  }]
}
```