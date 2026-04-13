### Footer Shown Rules
The footer will be shown or hidden based on the following combinations;

| EmptySection.FooterVisible | Footer.Visible | Is Section Empty? | Shown      |
| ------------------------ |:-------------: | :---------------: | ---------- |
| false                     | true           | true              | false      |
| false                     | true           | false             | true       |
| false                     | false          | true              | false      |
| false                     | false          | false             | false      |
| true                    | true           | true              | true       |
| true                    | true           | false             | true       |
| true                    | false          | true              | false      |
| true                    | false          | false             | false      |


----
## Examples

### Footer
```json
// Footer metadata
{
  "Sections": [
    {
      "EmptySection": {  
        "Caption": "EmptySection Caption",
        "FooterVisible": true
      },
      "Footer": {
        "Caption": "This is an 'attribute' style footer",
        "AccessoryType": "DisclosureIndicator",
        "AttributeLabel": "7 (the attribute)",
        "FooterStyle": "Attribute",
        "OnPress": "/MyMDKApp/Actions/ShowMessage.action",
        "Visible": true,
        "Styles": {
          "Footer": "footer-css-class",
          "Caption": "caption-css-class",
          "AttributeLabel": "attribute-label-css-class"
        }
      },
      "Layout": {
        "NumberOfColumns": 1
      },
      "ObjectCells": [{  
        "ObjectCell": {
          "Footnote": "Footnote",
          "AccessoryType": "disclosureIndicator",
          "Title": "Title",
          "SubstatusText":" SubstatusText",
          "Subhead": "Support"
        }
      }],
      "_Type": "Section.Type.ObjectCollection"
    }
  ]
}
```

### Title Style
This style provides a caption only.
```json
// Footer metadata
{
  "Sections": [
    {
      "Footer": {
        "Caption": "This is a 'Title' style footer (the default)"
      },
      "KeyAndValues": [
        {
          "KeyName": "FirstName",
          "Value": "Lewis"
        },
        {
          "KeyName": "LastName",
          "Value": "Black"
        },
        {
          "KeyName": "Emails",
          "Value": "lewisblack@example.com"
        }
      ],
      "_Type": "Section.Type.KeyValue"
    }
  ]
}
```

### Attribute Style
This style provides a caption and an attribute.
```json
// Footer metadata
{
  "Sections": [
    {
      "Footer": {
        "Caption": "This is an 'attribute' style footer",
        "AccessoryType": "DisclosureIndicator",
        "AttributeLabel": "7 (the attribute)",
        "FooterStyle": "Attribute",
        "OnPress": "/MyMDKApp/Actions/ShowMessage.action",
        "Visible": true
      },
      "Layout": {
        "NumberOfColumns": 1
      },
      "SimplePropertyCells": [
        {
          "SimplePropertyCell": {
            "KeyName": "Do"
          }
        },
        {
          "SimplePropertyCell": {
            "KeyName": "Re"
          }
        },
        {
          "SimplePropertyCell": {
            "KeyName": "Mi"
          }
        }
      ],
      "_Type": "Section.Type.SimplePropertyCollection"
    }
  ]
}
```

### Help Style
Use this style to provide help on the section. Useful with Button Table sections.
```json
{
  "Sections": [
    {
      "Footer": {
        "Caption": "This is a 'Help' style footer",
        "FooterStyle": "Help"
      },
      "Buttons": [{
          "Title": "Close",
          "OnPress": "/MyMDKApp/Actions/Navigation/ClosePage.action",
          "TextAlignment": "Center"
      }],
      "_Type": "Section.Type.ButtonTable"
    }
  ]
}
```