
----
## Examples

### Simple grouping — no additional sort keys

MDK injects `GroupingProperties` into `$orderby` automatically, so no `orderby` is needed in `QueryOptions`.

```json
  "Grouping": {
    "GroupingProperties": ["Country"],
    "Header": {
      "Items": [{
        "Title": "Country: {Country}",
        "Styles": {
          "Title": "DataTableGroupHeaderItem",
          "BackgroundColor": "sectionBgColor"
        }
      }]
    }
  },

  ...

  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MDKDevApp/Services/Amw.service"
  }
```

Resulting OData query: `$orderby=Country`

### Grouping with secondary sort keys

`GroupingProperties` are prepended to the `$orderby`. Additional sort keys in `QueryOptions` are appended after them.

```json
  "Grouping": {
    "GroupingProperties": ["Country", "City"],
    "Header": {
      "Items": [{
        "Title": "Group Country - {Country}, City - {City}",
        "Styles": {
          "Title": "DataTableGroupHeaderItem",
          "BackgroundColor": "sectionBgColor"
        }
      }]
    }
  },

  ...

  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MDKDevApp/Services/Amw.service",
    "QueryOptions": "$orderby=LastName,FirstName"
  }
```

Resulting OData query: `$orderby=Country,City,LastName,FirstName`

### Style Classes Definition

```less
.DataTableGroupHeaderItem {
  font-color: #ff0000;
  font-style: body; /*iOS only*/
}

.sectionBgColor {
  background-color: @mdkYellow1;
}
```
