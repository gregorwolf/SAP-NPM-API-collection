
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
        "_Type": "CardHeader.Type.ExtendedHeader",
        "ItemType": "Label",
        "ItemSeparator": true,
        "Items": [
          {
            "_Type": "CardHeaderExtendedHeader.Type.Label",
            "_Name": "CA_EHL_1a",
            "Text": "Negative",
            "Image": "sap-icon://warning",
            "ImagePosition": "Trailing"
          },
          {
            "_Type": "CardHeaderExtendedHeader.Type.Label",
            "_Name": "CA_EHL_2a",
            "Text": "Critical"
          }
        ]
      },
      {
        "_Type": "CardHeader.Type.ExtendedHeader",
        "ItemType": "Rating",
        "Items": [
          {
            "_Type": "CardHeaderExtendedHeader.Type.Rating",
            "_Name": "CA_EHR_1a",
            "Score": 2,
            "Label": "256 Reviews"
          },
          {
            "_Type": "CardHeaderExtendedHeader.Type.Rating",
            "_Name": "CA_EHR_2a",
            "Score": 3,
            "Label": "56 Reviews"
          }
        ]
      },
      {
        "_Type": "CardHeader.Type.ExtendedHeader",
        "ItemType": "Tag",
        "Items": [
          {
            "_Type": "CardHeaderExtendedHeader.Type.Tag",
            "Text": "Tag1",
            "Color": "#00ff00",
            "Style": "card-tag-1"
          },
          {
            "_Type": "CardHeaderExtendedHeader.Type.Tag",
            "Text": "Tag2",
            "Color": "blue",
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
  "Body": {
    "_Type": "Card.Type.Body",
    "Visible": true,
    "Separators": {
      "HeaderSeparator": true,
      "BodySeparator": true,
      "FooterSeparator": true,
      "Styles": {
        "HeaderSeparator": "card-counter-text-2",
        "BodySeparator": "card-label-2",
        "FooterSeparator": "card-counter-text-2"
      }
    },
    "Contents": [
      {
        "_Type": "CardBodyContent.Type.Text",
        "Text": "abcde",
        "NumberOfLines": 2,
        "Styles": {
          "Text": "card-label-2"
        }
      },
      {
        "_Type": "CardBodyContent.Type.LabelBar",
        "Layout": {
          "LayoutType": "Vertical"
        },
        "ItemSeparator": true,
        "Items": [
          {
            "_Type": "CardBodyContentLabelBar.Type.Item",
            "_Name": "CA_EHL_1a",
            "Text": "Negative",
            "Image": "sap-icon://warning",
            "ImagePosition": "Trailing",
            "Styles": {
              "Image": "card-font-icon-1",
              "Text": "card-label-1"
            }
          },
          {
            "_Type": "CardBodyContentLabelBar.Type.Item",
            "_Name": "CA_EHL_2a",
            "Text": "Critical",
            "Styles": {
              "Text": "card-counter-text-2"
            }
          }
        ]
      },
      {
        "_Type": "CardBodyContent.Type.Space",
        "NumberOfSpacings": 3
      },
      {
        "_Type": "CardBodyContent.Type.Separator",
        "Style": "card-label-2"
      }
    ]
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

@mdkYellow1:                  #ffbb33;
@mdkBlue1:                    #3333cc;
@mdkBlue2:                    #7070db;
@mdkRed3:                     #ff6666;

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

.card-counter-text-2 {
  font-color: green;
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

.card-label-2 {
  font-color: @mdkBlue2;
}

.card-button-1 {
  font-size: 20;
  font-color: black;
  background-color: @mdkBlue1;
}
```