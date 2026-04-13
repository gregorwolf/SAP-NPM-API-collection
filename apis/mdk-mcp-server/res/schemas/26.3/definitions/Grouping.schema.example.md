
----
## Examples


```json
  "Grouping": {
    "GroupingProperties": ["Country", "City"],
    "Header": {
      "Items": [{
        "Title": "Group Country - {Country}, City - {City}",
        "Styles": {
          "Title": "DataTableGroupHeaderItem",
          "BackgroundColor":"sectionBgColor"
        }
      }]
    }
  },

  ...

  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MDKDevApp/Services/Amw.service",
    "QueryOptions": "$orderby=Country,City"
  },
```

```less
.DataTableGroupHeaderItem {
  font-color: #ff0000;
  font-style: body; /*iOS only*/
}

.sectionBgColor {
  background-color: @mdkYellow1;
}
```
