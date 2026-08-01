
----
## Examples

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
              "_Type":"ObjectCardCollection.Type.Card",
              "_Name":"Card1",
              "Title":"Title",
              "DetailImage":"/MDKDevApp/Images/workorder.png",
              "DetailImageIsCircular": true,
              "Subhead":"SubHead",
              "Footnote":"Footnote",
              "StatusText":"StatusText",
              "Description":"Static bound cards and dynamic bound cards in all use cases",
              "OverflowButtons":[
                {
                  "_Type":"ObjectCard.Type.OverflowButton",
                  "_Name":"menuAction1",
                  "Title":"Action 1",
                  "Image":"/MDKDevApp/Images/workorder.png",
                  "Visible":true,
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction1.action"
                },
                {
                  "_Type":"ObjectCard.Type.OverflowButton",
                  "_Name":"menuAction2",
                  "Title":"Action 2",
                  "Image":"sap-icon://begin",
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction2.action",
                  "ButtonType":"Destructive" /* iOS Only */
                },
                {
                  "_Type":"ObjectCard.Type.OverflowButton",
                  "_Name":"menuAction3",
                  "Title":"Action 3",
                  "Image": "font-icon-class",
                  "Visible":false,
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction3.action"
                },
                {
                  "_Type":"ObjectCard.Type.OverflowButton",
                  "_Name":"menuAction4",
                  "Title":"Action 4",
                  "Image":"sap-icon://accept",
                  "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardMenuAction4.action",
                  "ButtonType":"Disabled" /* iOS Only */
                }
              ],
              "OnPress":"/MDKDevApp/Actions/Toast/ObjectCardOnPress.action",
              "PrimaryAction":{
                "_Type":"ObjectCard.Type.ActionItem",
                "_Name":"PrimaryAction",
                "Title":"Primary",
                "Visible":true,
                "OnPress":"/MDKDevApp/Actions/Toast/PrimaryActionMessage.action",
                "Style":"ObjectCardPrimaryAction"
              },
              "SecondaryAction":{
                "_Type":"ObjectCard.Type.ActionItem",
                "_Name":"SecondaryAction",
                "Title":"Secondary",
                "OnPress":"/MDKDevApp/Actions/Toast/SecondaryActionMessage.action",
                "Style":"ObjectCardSecondaryAction"
              },
              "Styles":{
                "BackgroundColor":"ObjectCardBackground",
                "Title":"ObjectCardTitle",
                "Subhead":"ObjectCardSubHead",
                "Footnote":"ObjectCardFootnote",
                "Description":"ObjectCardDescription",
                "StatusText":"ObjectCardStatusText",
                "DetailImage": "font-icon-class"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Style Classes Definition
Note that font size & bold style are not supported for Android. Only red, green and default color are supported for Android status text style. CSS shadow parts are required for the background color, title, subhead, and status text styles of the web client.

```css
.ObjectCardBackground {
  background-color: #f0afa0;
}

.ObjectCardTitle {
  font-color: #339966;
}

.ObjectCardSubHead {
  font-color: #ff00ff;
}

.ObjectCardFootnote {
  font-color: #339966;
}

.ObjectCardDescription {
  font-color: #ffbb33;
}

.ObjectCardStatusText {
  font-color: #ff0000; /*Android support Red, Green & default color only*/
}

.ObjectCardPrimaryAction {
  font-color: green;
  background-color: cyan;
  background-color-normal: cyan; /*iOS only*/
  background-color-highlighted: red; /*iOS only*/
}

.ObjectCardSecondaryAction {
  font-color: green;
  background-color: orange;
  background-color-normal: orange; /*iOS only*/
  background-color-highlighted: black; /*iOS only*/
}

.font-icon-class {
  color: #339966;
}

/* Additional CSS Shadow Parts for the BackgroundColor, Title, SubHead & StatusText styles of Web Client */
.ObjectCardBackground::part(root) {
  background-color: #ff0000;
}

.ObjectCardTitle::part(title) {
  font-color: #339966;
}

.ObjectCardSubHead::part(subtitle) {
  font-color: #ff00ff;
}

.ObjectCardStatusText::part(status) {
  font-color: #339966;
}
```