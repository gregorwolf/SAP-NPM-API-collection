
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "ContactCellPage",
  "Caption": "Contact Cell Page",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.ContactCell",
      "ContactCell": [{
        "DetailImage": "/MDKApp/Images/icon.png",
        "BadgeImage": "sap-icon://sys-enter-2",
        "Headline": "John Doe",
        "Subheadline": "Software Developer",
        "Description": "3010 Highland Pkwy, Suite 900, Downers Grove, IL 60515",
        "Visible": true,
        "ActivityItems": [{
          "ActivityType": "VideoCall",
          "ActivityValue": "630-667-7983"
        },
        {
          "ActivityType": "Email",
          "ActivityValue": "john.doe@sap.com"
        },
        {
          "ActivityType": "Detail",
          "ActivityValue": "This is an alert"
        }],
        "Styles": {
          "Headline": "ContactCellHeadline",
          "Subheadline": "ContactCellSubheadline",
          "Description": "ContactCellDescription"
        }
      }]
    }]
  }]
}
```

### Font icon and style - DetailImage and BadgeImage


```json
{
  "_Type": "Page",
  "_Name": "ContactCellPage",
  "Caption": "Contact Cell Page",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.ContactCell",
      "ContactCell": [{
        "DetailImage": "sap-icon://home",
        "BadgeImage": "sap-icon://sys-enter-2",
        "Headline": "John Doe",
        "Subheadline": "Software Developer",
        "Description": "3010 Highland Pkwy, Suite 900, Downers Grove, IL 60515",
        "Visible": true,
        "ActivityItems": [{
          "ActivityType": "VideoCall",
          "ActivityValue": "630-667-7983"
        },
        {
          "ActivityType": "Email",
          "ActivityValue": "john.doe@sap.com"
        },
        {
          "ActivityType": "Detail",
          "ActivityValue": "This is an alert"
        }],
        "Styles": {
          "Headline": "ContactCellHeadline",
          "Subheadline": "ContactCellSubheadline",
          "Description": "ContactCellDescription",
          "DetailImage": "font-icon-class",
          "BadgeImage": "font-icon-class-badge"
        }
      }]
    }]
  }]
}
```

```css
/* Contact Cell - Headline */
.ContactCellHeadline {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* Contact Cell - Subheadline */
.ContactCellSubheadline {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* Contact Cell - Description */
.ContactCellDescription {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* Contact Cell - DetailImageText */
.ContactCellDetailImageText {
  color: #fff;
  background-color: #007aff;
}

.font-icon-class {
  font-size: 8;
  color: red;
}

.font-icon-class-badge {
  font-size: 12;
  color: blue;
  background-color: #39ff0d;
}
```

### DetailImageText and Circular Avatar

```json
{
  "_Type": "Page",
  "_Name": "ContactCellPage",
  "Caption": "Contact Cell Page",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.ContactCell",
      "ContactCell": [{
        "Headline": "Jane Smith",
        "DetailImageText": "JS",
        "DetailImageIsCircular": false,
        "BadgeImage": "sap-icon://sys-enter-2",
        "Description": "Some description",
        "Visible": true,
        "Styles": {
          "DetailImageText": "ContactCellDetailImageText",
          "BadgeImage": "font-icon-class-badge"
        }
      }]
    }]
  }]
}
```

### UseHeadlineForDetailImage

```json
{
  "_Type": "Page",
  "_Name": "ContactCellPage",
  "Caption": "Contact Cell Page",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.ContactCell",
      "ContactCell": [{
        "Headline": "John Doe",
        "UseHeadlineForDetailImage": true,
        "Description": "Some description",
        "Visible": true,
        "Styles": {
          "DetailImageText": "ContactCellDetailImageText"
        }
      }]
    }]
  }]
}
```