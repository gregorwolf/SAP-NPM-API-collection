
----
## Examples

```json
{
  "_Type": "CardCollection.Type.Card",
  "OnPress": "/MDKDevApp/Rules/Description.js",
  "Styles": {
    "Card": "card-background-1"
  },
  "Media": {
    "_Type": "Card.Type.Media",
    "Image": "sap-icon://home",
    "Styles": {
      "Image": "card-media-image-1",
      "Media": "card-background-1"
    }
  },
  "Header": {
    "Title": "Title",
    "DetailImage": "sap-icon://task",
    "DetailImageIsCircular": false,
    "Subtitle": "Subtitle",
    "CounterText": "1 of 3",
    "Styles": {
        "Title": "card-title-1",
        "Subtitle": "card-subtitle-1",
        "CounterText": "card-counter-text-1",
        "DetailImage": "card-media-image-1",
        "Icons": "card-font-icon-1",
        "Header": "card-background-1"
    },
    "ActionButton": {
      "Image": "sap-icon://share",
      "OnPress": "/MDKDevApp/Rules/Description.js",
      "Styles": {
        "Image": "card-font-icon-1"
      },
      "OverflowItems": [
        {
          "_Name": "menuAction1",
          "Title": "Action 1",
          "Image": "sap-icon://badge",
          "Visible": true,
          "OnPress": "/MDKDevApp/Rules/Description.js",
          "Styles": {
            "Image": "card-font-icon-1",
            "Title": "card-label-1"
          }
        }
      ]
    },
    "ExtendedHeaders": [
      {
        "_Type": "ExtendedHeader.Type.Label",
        "ItemSeparator": true,
        "Items": [
          {
            "_Name": "CA_EHL_1a",
            "Text": "Negative",
            "Image": "sap-icon://warning",
            "ImagePosition": "Trailing",
            "Styles": {
              "Text": "card-label-1",
              "Image": "card-font-icon-1"
            }
          }
        ]
      },
      {
        "_Type": "ExtendedHeader.Type.Rating",
        "Items": [
          {
            "_Name": "CA_EHR_1a",
            "Score": 2,
            "Label": "256 Reviews",
            "IconOn": "sap:icon//arrow-up",
            "IconOff": "sap:icon//arrow-down",
            "Styles": {
              "Label": "card-label-1",
              "IconOn": "card-font-icon-1",
              "IconOff": "card-font-icon-2"
            }
          }
        ]
      },
      {
        "_Type": "ExtendedHeader.Type.Tag",
        "Items": [
          {
            "Text": "Tag1",
            "Style": "card-tag-1"
          }
        ]
      }
    ],
    "KPIView": {
      "RightMetric": "999",
      "RightUnit": "K",
      "LeftMetric": "265",
      "LeftUnit": "M",
      "Footnote": "New KPIView"
    }
  },
  "Footer": {
    "_Type": "Card.Type.Footer",
    "Styles": {
      "Footer": "card-background-1"
    },
    "PrimaryAction": {
      "_Type": "CardFooter.Type.Button",
      "_Name": "submitButton4",
      "Title": "Submit",
      "ButtonType": "Primary",
      "Image": "sap-icon://complete",
      "ImagePosition": "Leading",
      "OnPress": "/MDKDevApp/Rules/Description.js",
      "Styles": {
        "Image": "card-font-icon-1",
        "Button": "card-button-1"
      }
    },
    "SecondaryAction": {
      "_Type": "CardFooter.Type.Button",
      "_Name": "shareButton4",
      "Title": "Share",
      "Image": "sap-icon://share",
      "Semantic": "Negative",
      "OnPress": "/MDKDevApp/Rules/Description.js",
      "Styles": {
        "Image": "card-font-icon-1",
        "Button": "card-button-1"
      }
    }
  }
},
```

### Style Classes Definition

```css
.card-background-1 {
  background-color: @mdkYellow1;
}

.card-media-image-1 {
  color: red;
  font-size: 40;
}

.card-font-icon-1 {
  color: red;
  font-size: 20;
}

.card-font-icon-2 {
  color: blue;
  font-size: 12;
}

.card-title-1 {
  font-color: white;
  font-style: title1;
}

.card-subtitle-1 {
  font-color: red;
  font-style: title2;
}

.card-counter-text-1 {
  font-color: yellow;
  font-style: title3;
}

.card-tag-1 {
  background-color: #e6f0ff;
  font-color: blue;
  border-color: red;
}

.card-label-1 {
  font-color: @mdkRed3;
  font-style: body;
}

.card-button-1 {
  font-size: 20;
  font-color: black;
  background-color: @mdkBlue1;
}
```