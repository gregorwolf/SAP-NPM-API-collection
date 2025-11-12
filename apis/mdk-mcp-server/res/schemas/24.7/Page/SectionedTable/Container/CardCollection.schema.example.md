
----
## Examples


### Dynamic Card Collection

```json
{
  "_Type": "Page",
  "_Name": "CardCollectionPage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "Card": {
            "_Type":"CardCollection.Type.Card",
            "OnPress": "/MDKDevApp/Rules/Description.js",
            "Media": {
              "_Type":"Card.Type.Media",
              "Image": "/MDKDevApp/Images/waterfall_panorama.png"
            },
            "Header": {
              "Title":"{OrderId}",
              "DetailImage":"/MDKDevApp/Images/workorder.png",
              "DetailImageIsCircular":false,
              "Subtitle":"{MainWorkCenter}",
              "CounterText": "1 of 3",
              "ActionButton": {
                "Image": "sap-icon://share",
                "_OnPress": "/MDKDevApp/Actions/Toast/ObjectCardMenuAction1.action",
                "OnPress": "/MDKDevApp/Rules/Description.js",
                "OverflowItems":[
                  {
                    "_Name":"menuAction1",
                    "Title":"Action 1",
                    "Image":"sap-icon://badge",
                    "Visible":true,
                    "OnPress": "/MDKDevApp/Rules/Description.js",
                    "_OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction1.action"
                  },
                  {
                    "_Name":"menuAction2",
                    "Title":"Action 2",
                    "Image":"sap-icon://background",
                    "OnPress": "/MDKDevApp/Rules/Description.js",
                    "_OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction2.action"
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
                      "ImagePosition": "Trailing"
                    },
                    {
                      "_Name": "CA_EHL_2a",
                      "Text": "Critical"
                    }
                  ]
                },
                {
                  "_Type": "ExtendedHeader.Type.Rating",
                  "Items": [
                    {
                      "_Name": "CA_EHR_1a",
                      "Score": 2,
                      "Label": "256 Reviews"
                    },
                    {
                      "_Name": "CA_EHR_2a",
                      "Score": 3,
                      "Label": "56 Reviews"
                    }
                  ]
                },
                {
                  "_Type": "ExtendedHeader.Type.Tag",
                  "Items": [
                    {
                      "Text": "{ObjectType}",
                      "Color": "#00ff00",
                      "Style": "Tag1Syle"
                    },
                    {
                      "Text": "{ControlKey}",
                      "Color": "blue",
                      "Style": "Tag2Style"
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
              "PrimaryAction": {
                "_Type": "CardFooter.Type.Button",
                "_Name": "submitButton1",
                "Title": "Submit",
                "ButtonType": "Primary",
                "ImagePosition": "Leading",
                "_OnPress":"/MDKDevApp/Actions/Toast/PrimaryActionMessage.action",
                "OnPress": "/MDKDevApp/Rules/Description.js"
              },
              "SecondaryAction": {
                "_Type": "CardFooter.Type.Button",
                "_Name": "shareButton1",
                "Title": "Share",
                "Semantic": "Negative",
                "_OnPress":"/MDKDevApp/Actions/Toast/SecondaryActionMessage.action",
                "OnPress": "/MDKDevApp/Rules/Description.js"
              }
            }
          },
          "Layout":{
            "LayoutType":"HorizontalScroll"
          },
          "_Name":"DynamicCardCollection1",
          "_Type":"Section.Type.CardCollection",
          "Target":{
            "EntitySet":"MyWorkOrderHeaders",
            "Service":"/MDKDevApp/Services/Amw.service",
            "QueryOptions":"$orderby=OrderId"
          }
        }
      ]
    }
  ]
}
```

### Static Card

```json
{
  "_Type": "Page",
  "_Name": "StaticCardCollectionPage",
  "Caption": "Static Card Collection Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "StaticObjectCardCollectionTable",
      "Sections": [
        {
          "Cards":[
            {
              "_Type":"CardCollection.Type.Card",
              "OnPress": "/MDKDevApp/Rules/Description.js",
              "Media": {
                "_Type":"Card.Type.Media",
                "Image": "/MDKDevApp/Images/waterfall_panorama.png"
              },
              "Header": {
                "Title":"Title",
                "TitleOnMedia":true,
                "DetailImage":"/MDKDevApp/Images/workorder.png",
                "DetailImageIsCircular":false,
                "Subtitle":"Subtitle",
                "CounterText": "1 of 3",
                "ActionButton": {
                  "Image": "sap-icon://share",
                  "_OnPress": "/MDKDevApp/Actions/Toast/ObjectCardMenuAction1.action",
                  "OnPress": "/MDKDevApp/Rules/Description.js",
                  "OverflowItems":[
                    {
                      "_Name":"menuAction1",
                      "Title":"Action 1",
                      "Image":"sap-icon://badge",
                      "Visible":true,
                      "OnPress": "/MDKDevApp/Rules/Description.js",
                      "_OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction1.action"
                    },
                    {
                      "_Name":"menuAction2",
                      "Title":"Action 2",
                      "Image":"sap-icon://background",
                      "OnPress": "/MDKDevApp/Rules/Description.js",
                      "_OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction2.action"
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
                        "ImagePosition": "Trailing"
                      },
                      {
                        "_Name": "CA_EHL_2a",
                        "Text": "Critical"
                      }
                    ]
                  },
                  {
                    "_Type": "ExtendedHeader.Type.Rating",
                    "Items": [
                      {
                        "_Name": "CA_EHR_1a",
                        "Score": 2,
                        "Label": "256 Reviews"
                      },
                      {
                        "_Name": "CA_EHR_2a",
                        "Score": 3,
                        "Label": "56 Reviews"
                      }
                    ]
                  },
                  {
                    "_Type": "ExtendedHeader.Type.Tag",
                    "Items": [
                      {
                        "Text": "Tag1",
                        "Color": "#00ff00",
                        "Style": "Tag1Syle"
                      },
                      {
                        "Text": "Tag2",
                        "Color": "blue",
                        "Style": "Tag2Style"
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
                "PrimaryAction": {
                  "_Type": "CardFooter.Type.Button",
                  "_Name": "submitButton1",
                  "Title": "Submit",
                  "ButtonType": "Primary",
                  "ImagePosition": "Leading",
                  "_OnPress":"/MDKDevApp/Actions/Toast/PrimaryActionMessage.action",
                  "OnPress": "/MDKDevApp/Rules/Description.js"
                },
                "SecondaryAction": {
                  "_Type": "CardFooter.Type.Button",
                  "_Name": "shareButton1",
                  "Title": "Share",
                  "Semantic": "Negative",
                  "_OnPress":"/MDKDevApp/Actions/Toast/SecondaryActionMessage.action",
                  "OnPress": "/MDKDevApp/Rules/Description.js"
                }
              }
            }
          ],
          "Layout":{
            "LayoutType":"HorizontalScroll"
          },
          "_Name":"StaticCardCollection1",
          "_Type":"Section.Type.CardCollection"
        }
      ]
    }
  ]
}
```