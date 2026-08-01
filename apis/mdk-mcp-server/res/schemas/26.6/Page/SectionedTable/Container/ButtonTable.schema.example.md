
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "ButtonSectionPage",
  "Caption": "Button section Page",
  "Controls": [
    {
      "Sections": [
        {
          "_Type": "Section.Type.ButtonTable",
          "Buttons": [
            {
              "Title": "Button1",
              "OnPress": "/MDKApp/Actions/Messages/Message1.action",
              "TextAlignment": "left"
            } 
            {
              "Title": "Button2",
              "OnPress": "/MDKApp/Actions/Messages/Message2.action",
              "TextAlignment": "center"
            }
          ]
        }
      ]
    }
  ]
}

{
  "_Type": "Page",
  "_Name": "ButtonSectionStyle",
  "Caption": "Button Section Styles",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ButtonTable",
          "Buttons": [
            {
              "Title": "Seek and ...",
              "Visible": true
            },
            {
              "Title": "Hidden button",
              "Visible": false
            }
          ]
        },
        {
          "_Type": "Section.Type.ButtonTable",
          "Buttons": [
            {
              "Title": "Destroy",
              "Style": "DestructiveActionButton"
            }
          ]
        }
      ]
    }
  ]
}
```