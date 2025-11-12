
----
## Examples


### Static
```json
{
  "Caption": "Key-Value",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "Header": {
            "Caption": "Two-column key-value collection (default)"
          },
          "_Type": "Section.Type.KeyValue",
          "_Name": "KeyValueTable",
          "KeyAndValues": [
            {
              "KeyName": "Title",
              "Value": "The Dark Side of the Moon",
              "Visible": true
            },
            {
              "KeyName": "Track",
              "Value": "Hidden track",
              "Visible": false
            },
            {
              "KeyName": "Artist",
              "Value": "Pink Floyd"
            },
            {
              "KeyName": "Year",
              "Value": "1973"
            }
          ]
        },
        {
          "Header": {
            "Caption": "One-column key-value collection"
          },
          "_Type": "Section.Type.KeyValue",
          "KeyAndValues": [
            {
              "KeyName": "Grrrrrrrreat for long strings",
              "Value": "The quick brown fox jumps over the lazy dog"
            },
            {
              "KeyName": "How long can it really be?",
              "Value": "3.14159 26535 89793 23846 26433 83279 50288 41971 69399 37510 58209 74944 59230 78164 06286 20899 86280 34825 34211 70679 82148"
            }
          ],
          "Layout": {
            "NumberOfColumns": 1
          }
        },
        {
          "Header": {
            "Caption": "Three-column key-value collection"
          },
          "_Type": "Section.Type.KeyValue",
          "KeyAndValues": [
            {
              "KeyName": "Red",
              "Value": "Rojo"
            },
            {
              "KeyName": "White",
              "Value": "Blanco"
            },
            {
              "KeyName": "Blue",
              "Value": "Azul"
            }
          ],
          "Layout": {
            "NumberOfColumns": 3
          }
        }
      ]
    }
  ]
}
```

### Data Binding
```json
{
  "_Type": "Page",
  "_Name": "BindingKeyValuePage",
  "Caption": "KeyValue Data Binding Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "Sections": [
        {
          "KeyAndValues": [
            {
              "KeyName": "Order ID",
              "Value": "{OrderId}"
            },
            {
              "KeyName": "Description",
              "Value": "{OrderDescription}"
            }
          ],
          "_Type": "Section.Type.KeyValue",
          "_Name": "KeyValueTable"
        }
      ],
      "Target": {
        "EntitySet": "MyWorkOrderHeaders",
        "Service": "/MDKApp/Services/Amw.service",
        "QueryOptions": "$expand=Operations&$orderby=OrderId&$top=1"
      }
    }
  ]
}
```

### Clickable KeyValue Section
```
{
  "_Type": "Page",
  "_Name": "BindingKeyValuePage",
  "Caption": "KeyValue Data Binding Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "Sections": [
        {
          "KeyAndValues": [
            {
              "KeyName": "Title",
              "Value": "The Dark Side of the Moon",
              "OnPress": "/MDKDevApp/Actions/Messages/AlertMessage.action"
            },
            {
              "KeyName": "Artist",
              "Value": "Pink Floyd",
              "OnPress": "/MDKDevApp/Actions/Messages/AlertMessage.action",
              "LinkColor": "#FF0000"
            }
          ],
          "_Type": "Section.Type.KeyValue",
          "_Name": "KeyValueTable"
        }
      ]
    }
  ]
}
```
