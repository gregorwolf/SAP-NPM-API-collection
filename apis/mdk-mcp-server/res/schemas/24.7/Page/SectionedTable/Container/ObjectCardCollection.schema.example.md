
----
## Examples


### Dynamic ObjectCard Collection

```json
{
  "_Type": "Page",
  "_Name": "ObjectCollectionPage",
  "Caption": "Work Orders",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "Card":{
            "_Type":"Control.Type.ObjectCard",
            "Title":"{OrderId}",
            "DetailImage":"/MDKDevApp/Images/workorder.png",
            "Subhead":"{MainWorkCenter}",
            "Footnote":"/MDKDevApp/Rules/GetFootnote.js",
            "StatusText":"{Priority}",
            "Description":"{OrderDescription}",
            "OverflowButtons":[
              {
                "_Name":"Transfer",
                "Image": "sap-icon://accept",
                "Title":"Transfer",
                "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction1.action"
              },
              {
                "_Name":"Submit",
                "Title":"Submit",
                "Image": "sap-icon://home",
                "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction2.action"
              }
            ],
            "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardOnPress.action",
            "PrimaryAction":{
              "Title":"Primary",
              "Visible":true,
              "OnPress":"/MDKDevApp/Actions/Toast/PrimaryActionMessage.action"
            },
            "SecondaryAction":{
              "Title":"Secondary",
              "OnPress":"/MDKDevApp/Actions/Toast/SecondaryActionMessage.action"
            }
          },
          "Layout":{
            "LayoutType":"Vertical"
          },
          "_Name":"ObjectCardCollection",
          "_Type":"Section.Type.ObjectCardCollection",
          "Target":{
            "EntitySet":"MyWorkOrderHeaders",
            "Service":"/MDKDevApp/Services/Amw.service",
            "QueryOptions":"$orderby=OrderId&$top=20"
          }
        }
      ]
    }
  ]
}
```

### Static ObjectCard

```json
{
  "_Type": "Page",
  "_Name": "StaticObjectCardCollectionPage",
  "Caption": "Static Object Card Collection Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "StaticObjectCardCollectionTable",
      "Sections": [
        {
          "_Type": "Section.Type.ObjectCardCollection",
          "Layout": {
            "LayoutType": "HorizontalScroll"
          },
          "Cards": [
            {
              "_Type":"Control.Type.ObjectCard",
              "Title":"Title",
              "DetailImage":"/MDKDevApp/Images/workorder.png",
              "DetailImageIsCircular": true,
              "Subhead":"SubHead",
              "Footnote":"Footnote",
              "StatusText":"StatusText",
              "Description":"Static bound cards and dynamic bound cards in all use cases",
              "OverflowButtons":[
                {
                  "_Name":"menuAction1",
                  "Title":"Action 1",
                  "Image":"/MDKDevApp/Images/workorder.png",
                  "Visible":true,
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction1.action"
                },
                {
                  "_Name":"menuAction2",
                  "Title":"Action 2",
                  "Image":"sap-icon://begin",
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction2.action",
                  "ButtonType":"Destructive" /* iOS Only */
                },
                {
                  "_Name":"menuAction3",
                  "Title":"Action 3",
                  "Image": "font-icon-class",
                  "Visible":false,
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction3.action"
                },
                {
                  "_Name":"menuAction4",
                  "Title":"Action 4",
                  "Image":"sap-icon://accept",
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction4.action",
                  "ButtonType":"Disabled" /* iOS Only */
                }
              ],
              "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardOnPress.action",
              "PrimaryAction":{
                "Title":"Primary",
                "Visible":true,
                "OnPress":"/MDKDevApp/Actions/Toast/PrimaryActionMessage.action"
              },
              "SecondaryAction":{
                "Title":"Secondary",
                "OnPress":"/MDKDevApp/Actions/Toast/SecondaryActionMessage.action"
              }
            }
          ]
        }
      ]
    }
  ]
}
```