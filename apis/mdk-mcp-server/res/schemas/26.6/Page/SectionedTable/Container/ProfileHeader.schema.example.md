
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "ProfileHeaderPage",
  "Caption": "Profile header Page",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.ProfileHeader",
      "Visible": true,
      "ProfileHeader": {
        "DetailImage": "sap-icon://home",
        "DetailImageIsCircular": true,
        "Headline": "John Doe",
        "Subheadline": "Software Developer",
        "Description": "3010 Highland Pkwy, Suite 900, Downers Grove, IL 60515",
        "Target": {
          "EntitySet": "MyWorkOrderHeaders",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$top=1"
        },
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
          "Headline": "ProfileHeaderHeadline",
          "Subheadline": "ProfileHeaderSubheadline",
          "Description": "ProfileHeaderDescription",
          "BackgroundColor":"ProfileHeaderBackgroundColor",
          "DetailImage": "font-icon-class"
        }
      }
    },
    {
      "_Type": "Section.Type.ProfileHeader",
      "ProfileHeader": {
        "Headline": "{FullName}",
        "DetailImage": "/MDKApp/Rules/Profile/GetSelfPhoto.js",
        "ActivityItems": [
          {
            "ActivityType": "Message",
            "ActivityValue": "{PrimaryPhoneNumber}"
          },
          {
            "ActivityType": "Phone",
            "ActivityValue": "{PrimaryPhoneNumber}"
          },
          {
            "ActivityType": "VideoCall",
            "ActivityValue": "{PrimaryPhoneNumber}"
          },
          {
            "ActivityType": "Email",
            "ActivityValue": "{Email}"
          }
        ],
        "Target": "{MemberProfile/PhoneNumbers}"
      },
      "Visible": "/MDKApp/Rules/Profile/IsProfileHeaderVisible.js"
    }]
  }]
}
```

### Style Classes Definition
```css
/* ProfileHeader - Headline */
.ProfileHeaderHeadline {
  color: white;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* ProfileHeader - Subheadline */
.ProfileHeaderSubheadline {
  color: white;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* ProfileHeader - Description */
.ProfileHeaderDescription {
  color: white;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* ProfileHeader - BackgroundColor */
.ProfileHeaderBackgroundColor {
  background-color: #0000FF;
}

.font-icon-class {
  font-size: 8;
  color: red;
  background-color: grey;
}
```
