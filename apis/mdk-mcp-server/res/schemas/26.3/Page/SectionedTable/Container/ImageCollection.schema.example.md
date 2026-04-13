
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "StaticImageCollectionPage",
  "Caption": "Static Image Collection (Facets)",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ImageCollection",
          "ImageCells": [
            {
              "ImageCell": {
                "Title": "Workorders",
                "Subtitle": "Subtitle",
                "Attribute": "Attribute",
                "Image": "/MDKDevApp/Images/workorder.png",
                "ImageIsCircular": true,
                "OnPress": "/MDKDevApp/Actions/Messages/Message1.action",
                "Visible": true
              }
            },
            {
              "ImageCell": {
                "Title": "Hidden Image",
                "Subtitle": "Subtitle",
                "Attribute": "Attribute",
                "Image": "/MDKDevApp/Images/workorder.png",
                "ImageIsCircular": true,
                "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
                "Visible": false
              }
            },
            {
              "ImageCell": {
                "Title": "Documents",
                "Subtitle": "Subtitle",
                "Attribute": "Attribute",
                "Image": "/MDKDevApp/Images/seam.png",
                "ImageIsCircular": true,
                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action"
              }
            },
            {
              "ImageCell": {
                "Title": "Jobs",
                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action"
              }
            },
            {
              "ImageCell": {
                "Title": "Assets",
                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action"
              }
            },
            {
              "ImageCell": {
                "Title": "Workorders",
                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action"
              }
            },
            {
              "ImageCell": {
                "Title": "Documents",
                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action"
              }
            },
            {
              "ImageCell": {
                "Title": "Jobs",
                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action"
              }
            }
          ],
          "Layout": {
            "LayoutType": "HorizontalScroll"
          }
        },
        {
          "Header": {
            "Caption": "Top Operation"
          },
          "Footer": {
            "Caption": "See All",
            "AccessoryType": "disclosureIndicator",
            "FooterStyle": "attribute",
            "AttributeLabel": "8",
            "OnPress": "/MDKDevApp/Actions/Messages/Message3.action"
          },
          "ImageCell": {
            "Title": "Workorders",
            "Subtitle": "Subtitle",
            "Attribute": "Attribute",
            "Image": "sap-icon://favorite",
            "ImageIsCircular": true,
            "OnPress": "/MDKDevApp/Actions/Messages/Message1.action",
            "Styles": {
              "Image": "font-icon-class"
            }
          },
          "Layout": {
            "LayoutType": "HorizontalFit"
          },
          "_Type": "Section.Type.ImageCollection"
        }
      ]
    }
  ]
}
```

### Style Classes Definition
```css
.font-icon-class {
  font-size: 8;
  color: red;
  background-color: grey;
}
```