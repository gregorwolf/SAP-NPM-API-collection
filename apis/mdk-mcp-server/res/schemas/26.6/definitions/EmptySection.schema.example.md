
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "EmptySections",
  "Caption": "Empty Sections",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectTable",
          "Header": {
            "Caption": "Empty Object Table"
          },
          "EmptySection": {
            "Caption": "No objects available to display in table",
            "FooterVisible": true
          },
          "Footer": {
            "Caption": "See all",
            "AccessoryType": "disclosureIndicator",
            "FooterStyle": "attribute"
          },
          "ObjectCell": {
            "Title": "Work Order",
            "DetailImage": "/MDKApp/Images/workorder.png",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "StatusImage": "/MDKApp/Images/workorder_details.png"
          },
          "Target": {
            "EntitySet": "PMCatalogProfiles",
            "Service": "/MDKApp/Services/AssetManager.service",
            "QueryOptions": "/MDKApp/Rules/Notifications/Item/Cause/NotificationItemCauseGroupQuery.js"
          }
        },
        {
          "_Type": "Section.Type.ObjectCollection",
          "Header": {
            "Caption": "Empty Object Collection (hides footer, styled)"
          },
          "EmptySection": {
            "Caption": "No objects available to display in collection",
            "FooterVisible": false,
            "Style": "EmptyKeyValueSectionCaption"
          },
          "Footer": {
            "Caption": "See all",
            "AccessoryType": "disclosureIndicator",
            "FooterStyle": "attribute"
          },
          "ObjectCell": {
            "Title": "Work Order",
            "DetailImage": "/MDKApp/Images/workorder.png",
            "Icons": [
              "/MDKApp/Images/icon_severity_medium.png",
              "/MDKApp/Images/open.png"
            ],
            "StatusImage": "/MDKApp/Images/workorder_details.png"
          },
          "Target": {
            "EntitySet": "PMCatalogProfiles",
            "Service": "/MDKApp/Services/AssetManager.service",
            "QueryOptions": "/MDKApp/Rules/Notifications/Item/Cause/NotificationItemCauseGroupQuery.js"
          }
        }
      ]
    }
  ]
}
```

```css
/* Styles.less */
.EmptyKeyValueSectionCaption {
  color: @red1;
  font-name: italicSystem;
}
```