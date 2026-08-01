
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "SectionTablePage",
  "Caption": "Extension Section Page",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.Extension",
      "_Name": "ExtensionTable",
      "Module": "MapsModule",
      "Control": "Maps",
      "Class": "CustomMap",
      "Height": 500,
      "ExtensionProperties": {
        "Configuration": {
            "EnableCurrentLocation": true,
            "EnableDynamicLayers": true,
            "EnableNearMe": true,
            "EnableFeatureLayers": true,
            "EnableBaseMaps": true
        },
        "Type": "TrafficMap",
        "Title": "Store Locations",
      },
      "OnPress": "/MDKApp/Actions/NavToDetailPage.action",
      "Target": {
            "EntitySet": "StoreLocations",
            "Service": "/MDKApp/Services/MyStore.service",
            "QueryOptions": "/MDKApp/Rules/Stores/GetLocalStoreQueryOptions.js"
      }
    }]
  }]
}
```