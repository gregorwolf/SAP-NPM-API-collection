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