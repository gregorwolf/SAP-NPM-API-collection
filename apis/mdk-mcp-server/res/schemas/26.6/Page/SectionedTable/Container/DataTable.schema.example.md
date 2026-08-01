
----
## Examples


```json
{
  "_Type": "Section.Type.DataTable",
  "_Name": "DataTableSection",
  "Header": {
    "DataTable": {
      "Items": [
        {
          "Text": "Image",
        },
        {
          "Text": "Text"
        },
        {
          "Text": "Date"
        },
        {
          "Text": "Time"
        },
        {
          "Text": "Duration"
        },
        {
          "Text": "List"
        }
      ]
    }
  },
  "Row": {
    "Layout": {
      "ColumnWidth": [
        100,
        100,
        100,
        100,
        100,
        100
      ]
    },
    "Items": [
      {
        "DisplayType": "Image",
        "Value": "sap-icon://customer"
      },
      {
        "DisplayType": "Text",
        "EditType": "Text",
        "Value": "{Text}"
      },
      {
        "DisplayType": "Text",
        "EditType": "Date",
        "Value": "{Date}"
      },
      {
        "DisplayType": "Text",
        "EditType": "Time",
        "Value": "{Time}"
      },
      {
        "DisplayType": "Text",
        "EditType": "Duration",
        "Value": "{Duration}"
      },
      {
        "DisplayType": "Text",
        "EditType": "List",
        "Value": "{List}",
        "ListPicker": {
          "Caption": "Select a value",
          "PickerItems": {
            "DisplayValue": "{Name}",
            "ReturnValue": "{ID}",
            "Target": {
              "EntitySet": "List",
              "Service": "/MyMDKApp/Services/MyOData.service"
            }
          }
        },
        "OnValueChange": "/MyMDKApp/Rules/OnValueChange.js"
      }
    ],
    "OnPress": "/MyMDKApp/Actions/Messages/Message.action"
  },
  "Target": {
    "EntitySet": "TestEntitySet",
    "Service": "/MyMDKApp/Services/MyOData.service"
  }
}
```

### DataTable with Style

```json
{
  "_Type": "Section.Type.DataTable",
  "_Name": "DataTableSection",
  "Header": {
    "DataTable": {
      "Items": [
        {
          "Text": "Image",
          "Style": "DataTableHeaderItem"
        },
        {
          "Text": "Text",
          "Style": "DataTableHeaderItem"
        },
        {
          "Text": "Date",
          "Style": "DataTableHeaderItem"
        },
        {
          "Text": "Time",
          "Style": "DataTableHeaderItem"
        },
        {
          "Text": "NotEditable",
          "Style": "DataTableHeaderItem"
        },
        {
          "Text": "Duration",
          "Style": "DataTableHeaderItem"
        },
        {
          "Text": "List",
          "Style": "DataTableHeaderItem"
        }
      ]
    }
  },
  "Row": {
    "Layout": {
      "ColumnWidth": [
        100,
        100,
        100,
        100,
        100,
        100
      ]
    },
    "Items": [
      {
        "DisplayType": "Image",
        "Value": "sap-icon://customer",
        "Styles": {
          "Image": "FontIcon"
        }
      },
      {
        "DisplayType": "Text",
        "EditType": "Text",
        "Value": "{Text}",
        "Styles": {
          "Text": "DataTableTextItem"
        }
      },
      {
        "DisplayType": "Text",
        "EditType": "Date",
        "Value": "{Date}",
        "Styles": {
          "Text": "DataTableTextItem",
          "Date": "DataTableDateItem"
        }
      },
      {
        "DisplayType": "Text",
        "EditType": "Time",
        "Value": "{Time}",
        "Styles": {
          "Text": "DataTableTextItem",
          "Time": "DataTableTimeItem"
        }
      },
      {
        "DisplayType": "Text",
        "EditType": "None",
        "Value": "{ID}",
        "Styles": {
          "Text": "DataTableTextItem"
        }
      },
      {
        "DisplayType": "Text",
        "EditType": "Duration",
        "Value": "{Duration}",
        "Styles": {
          "Text": "DataTableTextItem",
          "Duration": "DataTableDurationItem"
        }
      },
      {
        "DisplayType": "Text",
        "EditType": "List",
        "Value": "{List}",
        "ListPicker": {
          "Caption": "Select a value",
          "PickerItems": {
            "DisplayValue": "{Name}",
            "ReturnValue": "{ID}",
            "Target": {
              "EntitySet": "List",
              "Service": "/MyMDKApp/Services/MyOData.service"
            }
          }
        },
        "Styles": {
          "Text": "DataTableTextItem",
          "List": "DataTableListItem"
        }
      }
    ],
    "OnPress": "/MyMDKApp/Actions/Messages/Message.action"
  },
  "Target": {
    "EntitySet": "TestEntitySet",
    "Service": "/MyMDKApp/Services/MyOData.service"
  }
}
```

```css
.FontIcon {
  font-size: 8;
  color: green;
}

.DataTableHeaderItem {
  font-color: #E9967A;
  font-style: body; /*iOS only*/
}

.DataTableTextItem {
  font-color: #ff0000;
  font-style: body; /*iOS only*/
}

.DataTableDateItem {
  font-color: #ffbb33;
  font-style: body; /*iOS only*/
}

.DataTableTimeItem {
  font-color: #0040ff;
  font-style: body; /*iOS only*/
}

.DataTableDurationItem {
  font-color: #cc6600;
  font-style: body; /*iOS only*/
}

.DataTableListItem {
  font-color: #339966;
  font-style: body; /*iOS only*/
}
```