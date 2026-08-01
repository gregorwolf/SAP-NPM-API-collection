
----
## SideDrawer item without PageToOpen property
You may define a SideDrawer item without the property `PageToOpen`. In the case you'd like to set an action or rule to `OnPress` property. The action or the rule will be executed with the SiderDrawer control context.

If there are navigation actions in the rule, the first non-modal page in the navigation actions will be displayed, as if the page is defined in `PageToOpen`, so you can do some tasks before showing the page.

If both `PageToOpen` and `OnPress` properties are not defined in an item,  clicking the item it will do nothing.

----

## Examples

```json

{
  "_Type": "Page",
  "Controls": [
    {
      "_Type": "Control.Type.SideDrawer",
      "ClearHistory": false,
      "Header": {
        "Icon": "https://www.gstatic.com/webp/gallery/2.jpg",
        "IconIsCircular": true,
        "Headline": "{OrderId}",
        "SubHeadline": "{OrderDescription}",
        "Target": {
          "EntitySet": "MyWorkOrderHeaders",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$top=1"
        }
      },
      "Sections": [
        {
          "Caption": "Main Section",
          "Items": [
            {
              "Title": "MDK Components",
              "Image": "res://map_icon",
              "OnPress": "/MDKDevApp/Actions/Banner/BannerMessage.action",
              "PageToOpen": "/MDKDevApp/Pages/Examples/FeatureCategory.page",
              "ResetIfPressedWhenActive": true,
              "_Name": "FeatureCategory"
            },
            {
              "Title": "Work Orders",
              "Image": "res://map_icon",
              "OnPress": "/MDKDevApp/Actions/Popover/Popover.action",
              "PageToOpen": "/MDKDevApp/Pages/OData/WorkOrder/WorkOrderList.page",
              "ResetIfPressedWhenActive": true,
              "_Name": "WorkOrderList"
            },
            {
              "Title": "Fiori Controls",
              "Image": "res://map_icon",
              "OnPress": "/MDKDevApp/Rules/Navigation/NavToControlExamples.js",
              "_Name": "ControlExamples"
            }
          ]
        },
        {
          "Caption": "Controls",
          "Items": [
            {
              "Title": "Formcell",
              "Image": "https://www.gstatic.com/webp/gallery/1.sm.jpg",
              "OnPress": "/MDKDevApp/Actions/Message/ShowMessage.action",
              "PageToOpen": "/MDKDevApp/Pages/FormCellExamples.page",
              "_Name": "FormCellExamples"
            },
            {
              "Title": "SectionTable",
              "Image": "https://www.gstatic.com/webp/gallery/1.sm.jpg",
              "OnPress": "/MDKDevApp/Actions/Message/ShowMessage.action",
              "PageToOpen": "/MDKDevApp/Pages/SectionTableExamples.page",
              "_Name": "SectionTableExamples"
            }
          ]
        },
        {
          "PreserveImageSpacing": false,
          "Items": [
            {
              "_Name": "ODataItem",
              "Title": "OData Examples",
              "PageToOpen": "/MDKDevApp/Pages/Examples/ODataExamples.page"
            },
            {
              "_Name": "StylingItem",
              "Title": "Styling",
              "PageToOpen": "/MDKDevApp/Pages/Examples/StyleExamples.page"
            }
          ]
        }
      ],
      "Styles": {
        "DrawerBackground": "SideDrawerBackground",
        "HeaderBackground": "SideDrawerHeaderBackground",
        "HeaderIcon": "SideDrawerHeaderIcon",
        "HeaderHeadline": "SideDrawerHeadline",
        "HeaderSubHeadline": "SideDrawerSubHeadline",
        "HeaderSeparator": "SideDrawerHeaderSeparator",
        "SectionCaption": "SideDrawerSectionCaption",
        "SectionSeparator": "SideDrawerSectionSeparator",
        "SectionItemActive": "SideDrawerItemActive",
        "SectionItemOnPress": "SideDrawerItemOnPress",
        "SectionItemInactive": "SideDrawerItemInactive"
      }
    }
  ]
}
```

```json
// Without header icon and with iconText

{
  "_Type": "Page",
  "Controls": [
    {
      "_Type": "Control.Type.SideDrawer",
      "ClearHistory": false,
      "Header": {
        "IconIsCircular": true,
        "Headline": "{OrderId}",
        "SubHeadline": "{OrderDescription}",
        "Target": {
          "EntitySet": "MyWorkOrderHeaders",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$top=1"
        }
      },
      "Sections": [
        {
          "Caption": "Main Section",
          "Items": [
            {
              "Title": "MDK Components",
              "Image": "res://map_icon",
              "OnPress": "/MDKDevApp/Actions/Banner/BannerMessage.action",
              "PageToOpen": "/MDKDevApp/Pages/Examples/FeatureCategory.page",
              "ResetIfPressedWhenActive": true,
              "_Name": "FeatureCategory"
            },
            {
              "Title": "Work Orders",
              "Image": "res://map_icon",
              "OnPress": "/MDKDevApp/Actions/Popover/Popover.action",
              "PageToOpen": "/MDKDevApp/Pages/OData/WorkOrder/WorkOrderList.page",
              "ResetIfPressedWhenActive": true,
              "_Name": "WorkOrderList"
            }
          ]
        }
      ],
      "Styles": {
        "HeaderIcon": "SideDrawerHeaderIcon"
      }
    }
  ]
}
```

```json
// Items defined from rule

{
  "_Type": "Page",
  "Controls": [
    {
      "_Type": "Control.Type.SideDrawer",
      "ClearHistory": false,
      "Header": {
        "IconIsCircular": true,
        "Headline": "Headline",
        "SubHeadline": "SubHeadline"
      },
      "Sections": [
        {
          "Caption": "Main Section",
          "Items": "/MDKApp/Rules/GetMenuItems.js"
        }
      ]
    }
  ]
}
```

```json
// Side drawer with font icon and styles

{
  "_Type": "Page",
  "Controls": [
    {
      "_Type":"Control.Type.SideDrawer",
      "DrawerButton": "sap-icon://home",
      "Header": {
        "Icon": "sap-icon://settings",
        "IconIsCircular":true,
        "Headline": "Headline",
      },
      "Styles": {
        "HeaderIcon": "font-icon-class",
        "DrawerButton": "font-icon-class"
      },
      "Sections": [
        {
          "Caption": "caption",
          "Items": [ 
              {
                "Title": "title-1",
                "Image": "sap-icon://settings",
                "Styles": {
                  "SectionItemImage": "font-icon-class"
                }
              },
              {
                "Title": "title-2",
                "Image": "sap-icon://settings",
                "Styles": {
                  "SectionItemImage": "font-icon-class-2"
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

```css
.SideDrawerBackground {
  background-color: #232F34;
}
.SideDrawerHeaderBackground {
  background-color: orange;
}
.SideDrawerHeadline {
  color: white;
}
.SideDrawerSubHeadline {
  font-style: italic;
}
.SideDrawerHeaderSeparator {
  border-bottom-color: white;
  border-bottom-width: 2;
}
.SideDrawerSectionCaption {
  background-color: #192325;
  color: white;
}
.SideDrawerSectionSeparator {
  border-bottom-color: orange;
  border-bottom-width: 1;
}
.SideDrawerItemActive {
  background-color: brown;
}
.SideDrawerItemInactive {
  color: white;
}
.SideDrawerItemOnPress {
  background-color: #344955;
  color: white;
}
.font-icon-class {
  font-size: 5;
  color: red;
}
.font-icon-class-2 {
  font-size: 5;
  color: green;
}
```
