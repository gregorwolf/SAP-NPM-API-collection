
----
## Examples

```json
{
  "_Name": "MyMDKApp",
  "_Type": "Page",
  "Caption": "My MDK App",
  "Controls": [
    {
      "Sections": [
        {
          "ObjectCells": [
            {
              "ObjectCell": {
                "AccessoryType": "disclosureIndicator",
                "DetailImage": "/MyMDKApp/Images/workorder.png",
                "DetailImageIsCircular": true,
                "OnPress": "/MyMDKApp/Actions/Navigation/NavToWorkOrderList.action",
                "StatusText": "/MyMDKApp/Rules/OData/TotalWorkOrders.js",
                "Title": "Work Orders"
              }
            },
            {
              "ObjectCell": {
                "AccessoryType": "disclosureIndicator",
                "Description": "Examples using MDK Client",
                "DetailImage": "/MyMDKApp/Images/component.png",
                "OnPress": "/MyMDKApp/Actions/NavToAppModelerFeatures.action",
                "StatusText": "See More",
                "Title": "MDK Components"
              }
            }
          ],
          "_Name": "WorkOrdersSection",
          "_Type": "Section.Type.ObjectTable"
        }
      ],
      "DataSubscriptions": "/MyMDKApp/Rules/OData/DataSubscriptions.js",
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ],
  "ToolBar": {
    "Controls": [
      {
        "SystemItem": "FlexibleSpace",
        "_Type": "Control.Type.ToolbarItem",
        "_Name": "FlexibleSpaceb"
      },
      {
        "_Name": "LogoutToolbarItem",
        "_Type": "Control.Type.ToolbarItem",
        "Caption": "Log out",
        "OnPress": "/MyMDKApp/Actions/LogoutUser.action"
      }
    ]
  }
}
```

### Example for Tab Control with header
```json
// the section type of the first SectionedTable must be Section.Type.ObjectHeader/ProfileHeader/KPIHeader 
{
  "Caption": "Tabs with ObjectHeader",
  "Controls": [
    {
      "Sections": [
        {
          "ObjectHeader": {
            "BodyText": "BodyText",
            "Description": "Description",
            "DetailImageIsCircular": true,
            "Footnote": "Footnote",
            "HeadlineText": "HeadlineText",
            "StatusText": "High",
            "StatusImage": "res://n_icon.png",
            "Subhead": "Subhead",
            "SubstatusImage": "res://test_png.png",
            "SubstatusText": "Error",
            "Tags": "Tags"
          },
          "_Type": "Section.Type.ObjectHeader"
        }
      ],
      "_Name": "ObjectHeaderSection",
      "_Type": "Control.Type.SectionedTable"
    },
    {
      "Items":[
        {
          "_Name": "ActionsTab",
          "Caption": "Actions",
          "Image": "font://&#xe05a;",
          "OnPress": "/MyMDKApp/Actions/Messages/Message.action",
          "PageToOpen": "/MyMDKApp/Pages/Examples/TabActionExamples.page",
          "_Type": "Control.Type.TabItem"
        },
        {
          "_Name": "ControlsTab",
          "Caption": "/MyMDKApp/Rules/ControlsCaption.js",
          "Image": "res://map_icon",
          "ResetIfPressedWhenActive": "/MyMDKApp/Rules/AlwaysTrue.js",
          "OnPress": "/MyMDKApp/Rules/TabControl/TabControlRule.js",
          "PageToOpen": "/MyMDKApp/Pages/Examples/ControlExamples.page",
          "_Type": "Control.Type.TabItem"
        },
        {
          "_Name": "OData",
          "Caption": "OData",
          "ResetIfPressedWhenActive": "/MyMDKApp/Rules/AlwaysTrue.js",
          "PageToOpen": "/MyMDKApp/Pages/Examples/ODataExamples.page",
          "_Type": "Control.Type.TabItem"
        }
      ],
      "Position": "/MyMDKApp/Rules/AlwaysTop.js",
      "_Type": "Control.Type.Tabs",
      "_Name": "TabsControl"
    }
  ],
  "_Type": "Page",
  "_Name": "TabsWithObjectHeader"
}
```