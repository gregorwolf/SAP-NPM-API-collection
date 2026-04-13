
----
## Examples


### Simple Caption Header - No Top Padding
```json
{
  "Header": {
    "Caption": "A Section Caption - No Top Padding",
    "UseTopPadding": false,
    "Styles": {
      "Header": "header-css-class",
      "Caption": "caption-css-class",
    }
  }
}
```

### Header Items

Notes:

- `Items` array accepts same or combination of item types on both sides.
- Only 1 item on the left and 1 item on the right would be displayed.
- In the following example, only label and button2 items will be displayed, as button1 item has `Visible` set to false and icon item exceeds the items display limit for the left position.

```json
{
  "Header": {
    "Caption": "Test caption",
    "Items": [
      {
        "_Type": "SectionHeaderItem.Type.Button",
        "_Name": "button1",
        "Title": "Button 1",
        "Position": "Right",
        "Visible": false,
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton1.action"
      },
      {
        "_Type": "SectionHeaderItem.Type.Label",
        "_Name": "label",
        "Title": "Label",
        "Position": "Left"
      }, {
        "_Type": "SectionHeaderItem.Type.Button",
        "_Name": "button2",
        "Title": "Button 2",
        "Position": "Right",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton2.action"
      }, {
        "_Type": "SectionHeaderItem.Type.Icon",
        "_Name": "icon",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageIcon.action",
        "Icon": "/MDKDevApp/Images/extension.png",
        "Position": "Left"
      }
    ],
    "AccessoryType": "None",
    "OnPress": "/MDKDevApp/Actions/Messages/MessageHeader.action"
  }
}
```

### Header Items - Styling

```json
{
  "Header": {
    "Items": [
      {
        "_Type": "SectionHeaderItem.Type.Label",
        "_Name": "label1",
        "Title": "Label 1",
        "Position": "Left",
        "Styles": {
          "Label": "headerItemLabel"
        }
      },
      {
        "_Type": "SectionHeaderItem.Type.Icon",
        "_Name": "icon2",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageIcon.action",
        "Icon": "sap-icon://customer-and-supplier",
        "Position": "Right",
        "Styles": {
          "Icon": "font-icon-class"
        }
      },
      {
        "_Type": "SectionHeaderItem.Type.Button",
        "_Name": "button4b",
        "Title": "Button 4b",
        "Position": "Right",
        "ButtonType": "Primary",
        "Image": "sap-icon://customer-and-supplier",
        "ImagePosition": "Trailing",
        "OnPress": "/MDKDevApp/Actions/Messages/MessageButton.action",
        "Styles": {
          "Image": "font-icon-class",
          "Button": "Styles2Button"
        }
      }
    ],
    "AccessoryType": "None",
    "OnPress": "/MDKDevApp/Actions/Messages/MessageHeader.action"
  }
}
```

### Grid Header
```json
{
  "Header": {
    "Grid": {
      "Items": [
        {
          "Text": ""
        },
        {
          "Text": "ID"
        },
        {
          "Text": "Description"
        },
        {
          "Text": "Price",
          "TextAlignment": "right"
        }
      ],
      "Layout": {
        "ColumnWidthPercentage": [
          0.2,
          0.2,
          -1,
          0.25
        ]
      }
    }
  }
}
```


### Style Classes Definition
```css
.headerItemLabel {
  font-name: thinSystem;
  font-size: 13;
  font-color: #ff00ff;
  font-typeface: bold;
}

.font-icon-class {
  font-size: 8;
  color: red;
}

.Styles2Button {
  background-color: #bfd4e8;
  background-color-highlighted: #74a5d2;
  background-color-disabled: #363e46;

  font-name: thinSystem;
  font-size: 14;
  font-color: #ffee00;
  font-typeface: italic;

  border-color: #6600ff;
  border-width: 4;

  padding: 12 16;
}
```
