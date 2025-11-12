
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "ContactCellPage",
  "Caption": "Contact Cell Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ContactCell",
          "_Name": "Contacts",
          "DataPaging": {
            "ShowLoadingIndicator": true,
            "LoadingIndicatorText": "Loading more items, please wait…"
          },
          "ContactCells": [
            {
              "ContactCell":
                {
                  "DetailImage": "/MDKApp/Images/icon.png",
                  "Headline": "John Doe",
                  "Subheadline": "Software Developer",
                  "Description": "3010 Highland Pkwy, Suite 900, Downers Grove, IL 60515",
                  "ActivityItems": [
                    {
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
                    }
                  ]
                }
              },
            {
              "ContactCell":
              {
                "DetailImage": "/MDKApp/Images/icon.png",
                "Headline": "John Doe",
                "Subheadline": "Software Developer",
                "Description": "3010 Highland Pkwy, Suite 900, Downers Grove, IL 60515",
                "ActivityItems": [
                  {
                    "ActivityType": "Phone",
                    "ActivityValue": "630-667-7983"
                  },
                  {
                    "ActivityType": "Email",
                    "ActivityValue": "john.doe@sap.com"
                  },
                  {
                    "ActivityType": "Message",
                    "ActivityValue": "630-667-7983"
                  }
                ]
              }
            }
          ]          
        }
      ]
    }
  ]
}
```

### Examples with Swipe
```json
{
  "Caption": "Contact Cell Page",
  "Controls": [
    {
      "Sections": [
        {
          "ContactCell": 
            {
              "Headline": "{CustomerName}",
              "Subheadline": "{City}",
              "Description": "{Country}",
              "ActivityItems": [
                {
                  "ActivityType": "VideoCall",
                  "ActivityValue": "630-667-7983"
                },
                {
                  "ActivityType": "Email",
                  "ActivityValue": "john.doe@sap.com"
                },
                {
                  "ActivityType": "Detail",
                  "ActivityValue": "{CustomerID}"
                }
              ],
              "ContextMenu": {
                "PerformFirstActionWithFullSwipe": true,
                "LeadingItems": ["Toast", "Alert"],
                "TrailingItems": ["Banner", "ShowMessage"],
                "Items":[
                  {
                    "_Name": "Toast",
                    "Text": "Toast",
                    "Image": "/MDKApp/Images/toast.png",
                    "Mode": "Normal",
                    "OnSwipe": "/MDKDevApp/Actions/Message/ToastMessage.action"
                  },
                  {
                    "_Name": "Alert",
                    "Text": "Alert",
                    "Image": "/MDKApp/Images/alert.png",
                    "Mode": "Normal",
                    "OnSwipe": "/MDKDevApp/Actions/Message/AlertMessage.action"
                  },
                  {
                    "_Name": "Banner",
                    "Text": "Banner",
                    "Image": "/MDKApp/Images/banner.png",
                    "Mode": "Normal",
                    "OnSwipe": "/MDKDevApp/Actions/Message/BannerMessage.action"
                  },
                  {
                    "_Name": "ShowMessage",
                    "Text": "Show Message",
                    "Image": "sap-icon://message",
                    "Mode": "Normal",
                    "OnSwipe":"/MDKApp/Actions/Message/ShowMessage.action"
                  }
                ]
              }
            },
          "Target": {
            "EntitySet": "Customers",
            "Service": "/MDKDevApp/Services/CPXSNorthwind.service",
            "QueryOptions": "$filter=Country eq 'USA'"
          },
          "_Type": "Section.Type.ContactCell",
          "_Name": "CustomerContacts"
        }
      ],
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "SectionedTablePage"
}
```