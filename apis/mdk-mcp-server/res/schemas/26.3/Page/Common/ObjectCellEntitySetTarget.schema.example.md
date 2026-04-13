
----
## Examples


```json
{
  "ObjectCell": {
    "Title": "{Description}",
    "Subhead": "{Id}",
    "DetailImage": "/MDKApp/Images/workorder.png",
    "Icons": [
      "/MDKApp/Images/icon_severity_medium.png",
      "/MDKApp/Images/open.png"
    ],
    "StatusImage": "/MDKApp/Images/workorder_details.png"
  },
  "ReturnValue": "{CodeGroup}",
  "Target": {
    "EntitySet": "PMCatalogProfiles",
    "Service": "/MDKApp/Services/AssetManager.service",
    "QueryOptions": "/MDKApp/Rules/Notifications/Item/Cause/NotificationItemCauseGroupQuery.js"
  }
}
```