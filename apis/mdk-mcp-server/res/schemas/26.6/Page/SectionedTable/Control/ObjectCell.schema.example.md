
----
## Examples

```json
{
  "_Type": "Page",
  "_Name": "SectionedTablePage",
  "Caption": "Work Orders",
  "Controls": [{
    "_Type": "Control.Type.SectionedTable",
    "_Name": "SectionedTable",
    "Sections": [{
      "_Type": "Section.Type.ObjectTable",
      "Visible": true,
      "ObjectCell": {
        "_Type": "ObjectTable.Type.ObjectCell",
        "_Name": "ObjectCell",
        "AccessoryType": "DisclosureIndicator",
        "Description": "{OrderDescription}",
        "DisplayDescriptionInMobile": false,
        "DetailImage": "/MDKApp/Images/workorder.png",
        "Icons": [
          "/MDKApp/Images/icon_severity_medium.png",
          "/MDKApp/Images/open.png"
        ],
        "OnPress": "/MDKApp/Actions/Navigation/NavActionToWorkOrderDetail.action",
        "StatusImage": "/MDKApp/Images/workorder_details.png",
        "Title": "{OrderId}",
        "Styles": {
          "Title": "ObjectCellTitle",
          "Subhead": "ObjectCellSubhead",
          "Footnote": "ObjectCellFootnote",
          "Description": "ObjectCellDescription",
          "StatusText": "ObjectCellStatusText",
          "SubstatusText": "ObjectCellSubstatusText"
        }
      },
      "Target": {
        "EntitySet": "MyWorkOrderHeaderCollection",
        "Service": "/MDKApp/Services/Amw.service",
        "QueryOptions": "$expand=Operations&$orderby=OrderId"
      }
    }]
  }]
}
```

```json
{   "_Type": "Page",
    "_Name": "SectionedTablePage",
    "Caption": "Accessory Button Examples",
    "Controls": [
        {
            "Sections": [
                {
                    "Header": {
                        "Caption": "4 different Accessory Button Image Types"
                    },
                    "ObjectCells": [
                        {
                            "ObjectCell": {
                                "_Type": "ObjectTable.Type.ObjectCell",
                                "_Name": "ObjectCell1",
                                "AccessoryButtonIcon": "/MDKDevApp/Images/workorder.png",
                                "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
                                "OnAccessoryButtonPress": "/MDKDevApp/Actions/Messages/Message1.action",
                                "Title": "Local Image Path"
                            }
                        },
                        {
                            "ObjectCell": {
                                "_Type": "ObjectTable.Type.ObjectCell",
                                "_Name": "ObjectCell2",
                                "AccessoryButtonIcon": "https://www.gstatic.com/webp/gallery/1.sm.jpg",
                                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action",
                                "OnAccessoryButtonPress": "/MDKDevApp/Actions/Messages/Message3.action",
                                "Title": "Https Image Path"
                            }
                        },
                        {
                            "ObjectCell": {
                                "_Type": "ObjectTable.Type.ObjectCell",
                                "_Name": "ObjectCell3",
                                "AccessoryButtonIcon": "res://icon.png",
                                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action",
                                "OnAccessoryButtonPress": "/MDKDevApp/Actions/Messages/Message3.action",
                                "Title": "res:// Image Path"
                            }
                        },
                        {
                            "ObjectCell": {
                                "_Type": "ObjectTable.Type.ObjectCell",
                                "_Name": "ObjectCell4",
                                "AccessoryButtonIcon": "sap-icon://home",
                                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action",
                                "OnAccessoryButtonPress": "/MDKDevApp/Actions/Messages/Message3.action",
                                "Title": "sap-icon Image Path"
                            }
                        }
                    ],
                    "_Type": "Section.Type.ObjectTable"
                },
                {
                    "Header": {
                        "Caption": "Accessory Button Text"
                    },
                    "ObjectCells": [
                        {
                            "ObjectCell": {
                                "_Type": "ObjectTable.Type.ObjectCell",
                                "_Name": "ObjectCell5",
                                "AccessoryButtonText": "Click Here",
                                "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
                                "OnAccessoryButtonPress": "/MDKDevApp/Actions/Messages/Message1.action",
                                "Title": "Accessory Button Text"
                            }
                        }
                    ],
                    "_Type": "Section.Type.ObjectTable"
                }
            ],
            "_Type": "Control.Type.SectionedTable",
            "_Name": "SectionedTable"
        }
    ],
}
```
```json
{   "_Type": "Page",
    "_Name": "SectionedTablePage",
    "Caption": "Accessory Button Examples with Style",
    "Controls": [
        {
            "Sections": [
                {
                    "Header": {
                        "Caption": "Accessory Button SAP Icon with Style"
                    },
                    "ObjectCells": [
                        {
                            "ObjectCell": {
                                "_Type": "ObjectTable.Type.ObjectCell",
                                "_Name": "ObjectCell1",
                                "AccessoryButtonIcon": "sap-icon://home",
                                "OnPress": "/MDKDevApp/Actions/Messages/Message2.action",
                                "OnAccessoryButtonPress": "/MDKDevApp/Actions/Messages/Message3.action",
                                "Title": "Accessory Button SAP Icon with Style",
                                "Styles":{
                                  "AccessoryButtonIcon": "font-icon-class"
                                }
                            }
                        }
                    ],
                    "_Type": "Section.Type.ObjectTable"
                },
                {
                    "Header": {
                        "Caption": "Accessory Button Text with Style"
                    },
                    "ObjectCells": [
                        {
                            "ObjectCell": {
                                "_Type": "ObjectTable.Type.ObjectCell",
                                "_Name": "ObjectCell2",
                                "AccessoryButtonText": "Click Here",
                                "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
                                "OnAccessoryButtonPress": "/MDKDevApp/Actions/Messages/Message1.action",
                                "Title": "Accessory Button Text with Style",
                                "Styles":{
                                  "AccessoryButtonText": "fa-brands"
                                }
                            }
                        }
                    ],
                    "_Type": "Section.Type.ObjectTable"
                }
                  
            ],
            "_Type": "Control.Type.SectionedTable",
            "_Name": "SectionedTable"
        }
    ],
}
```
```json
{
    "_Type": "Page",
    "_Name": "StaticObjectTable",
    "Caption": "Static ObjectTable with individual avatar styling",
    "Controls": [{
        "_Type": "Control.Type.SectionedTable",
        "_Name": "Sections",
        "Sections": [{
            "_Type": "Section.Type.ObjectTable",
            "ObjectCells": [
                {
                    "ObjectCell": {
                        "_Type": "ObjectTable.Type.ObjectCell",
                        "_Name": "ObjectCell1",
                        "HorizontalIcons": [
                            "/TestApp/Images/action.png",
                            "/TestApp/Images/action.png",
                            "/TestApp/Images/action.png",
                            "/TestApp/Images/action.png"
                        ],
                        "Tags": [
                            {
                                "Text": "tag 1",
                                "Color": "Red"
                            },
                            {
                                "Text": "tag 2",
                                "Color": "Blue"
                            }
                        ],
                        "AvatarStack": {
                            "Avatars": [
                                {
                                    "Image": "sap-icon://customer",
                                    "ImageText": "A",
                                    "Style": "avatar"
                                },
                                {
                                    "Image": "sap-icon://customer",
                                    "ImageText": "B",
                                    "Style": "avatar"
                                },
                                {
                                    "Image": "sap-icon://customer",
                                    "ImageText": "C",
                                    "Style": "avatar"
                                },
                                {
                                    "Image": "sap-icon://customer",
                                    "ImageText": "D",
                                    "Style": "avatar"
                                },
                                {
                                    "Image": "sap-icon://customer",
                                    "ImageText": "E",
                                    "Style": "avatar"
                                },
                                {
                                    "Image": "sap-icon://customer",
                                    "ImageText": "F",
                                    "Style": "avatar"
                                }
                            ],
                            "ImageIsCircular": true,
                            "ImageHasBorder": true,
                            "BadgeImage": "sap-icon://settings",
                            "OverflowToGrid": {
                                "Enabled": true,
                                "GridMax": 3,
                                "ImageIsCircular": false
                            }
                        }
                    }
                }
            ],
            "_Name": "Section"
        }]
    }]
}
```
```json
{
    "_Type": "Page",
    "_Name": "StaticObjectTable",
    "Caption": "Static ObjectTable",
    "Controls": [{
        "_Type": "Control.Type.SectionedTable",
        "_Name": "Sections",
        "Sections": [{
            "_Type": "Section.Type.ObjectTable",
            "ObjectCells": [
                {
                    "ObjectCell": {
                        "_Type": "ObjectTable.Type.ObjectCell",
                        "_Name": "ObjectCell1",
                        "HorizontalIcons": [
                            "/TestApp/Images/action.png",
                            "/TestApp/Images/action.png",
                            "/TestApp/Images/action.png",
                            "/TestApp/Images/action.png"
                        ],
                        "Tags": [
                            {
                                "Text": "tag 1",
                                "Color": "Pink"
                            },
                            {
                                "Text": "tag 2",
                                "Color": "Mango"
                            }
                        ],
                        "AvatarStack": {
                            "Avatars": [
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "A"
                                },
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "B"
                                }
                            ],
                            "ImageIsCircular": true,
                            "ImageHasBorder": true,
                            "BadgeImage": "sap-icon://settings"
                        },
                        "AvatarGrid": {
                            "Avatar": [
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "G"
                                },
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "H"
                                },
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "I"
                                },
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "J"
                                },
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "K"
                                },
                                {
                                    "Image": "/MDKApp/Images/workorder.png",
                                    "ImageText": "L"
                                }
                            ],
                            "GridMax": 4,
                            "ImageIsCircular": false
                        }
                    }
                }
            ],
            "_Name": "Section"
        }]
    }]
}
```
```json
{
    "_Type": "Page",
    "_Name": "ObjectCellBindingCollection",
    "Caption": "ObjectCell Binding Collection",
    "Controls": [{
        "Sections": [{
            "ObjectCell": {
                "_Type": "ObjectTable.Type.ObjectCell",
                "_Name": "ObjectCell",
                "AccessoryType": "DisclosureIndicator",
                "Description": "{OrderDescription}",
                "DetailImage": "/MDKDevApp/Images/workorder.png",
                "DetailImageIsCircular": false,
                "Icons": [
                    "/MDKDevApp/Images/icon_severity_medium.png",
                    "/MDKDevApp/Images/open.png"
                ],
                "StatusImage": "/MDKDevApp/Images/workorder_details.png",
                "Title": "{OrderId}",
                "AvatarStack": {
                    "Avatar": {
                        "Image": "/MDKDevApp/Rules/Odata/GetAvatarsForStack.js",
                        "ImageText": "{OperationNo}"
                    },
                    "BindingCollection": "{Operations}",
                    "ImageIsCircular": true,
                    "ImageBorder": true,
                    "BadgeImage": "/MDKDevApp/Images/Open.png",
                    "OverflowToGrid": {
                        "Enabled": false
                    }
                },
                "AvatarGrid": {
                    "GridMax": 3,
                    "ImageIsCircular": true,
                    "Avatar": {
                        "Image": "/MDKDevApp/Rules/Odata/GetAvatarsForGrid.js",
                        "ImageText": "{OperationNo}"
                    },
                    "BindingCollection": "{Operations}"
                }
            },
            "Target": {
                "EntitySet": "MyWorkOrderHeaders",
                "Service": "/MDKDevApp/Services/Amw.service",
                "QueryOptions": "$expand=Operations&$top=5&$orderby=OrderId"
            },
            "_Type": "Section.Type.ObjectTable"
        }],
        "_Type": "Control.Type.SectionedTable",
        "_Name": "SectionedTable"
    }]
}
```

### Style Classes Definition
```css
/* Object Cell - Title */
.ObjectCellTitle {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
  text-decoration: underline;
}

/* Object Cell - Subhead */
.ObjectCellSubhead {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
  text-decoration: line-through;
}

/* Object Cell - Footnote */
.ObjectCellFootnote {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* Object Cell - Description */
.ObjectCellDescription {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* Object Cell - StatusText */
.ObjectCellStatusText {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* Object Cell - SubstatusText */
.ObjectCellSubstatusText {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

.font-icon-class {
  font-size: 8;
  color: red;
  background-color: grey;
}

/* fa-brands-400.ttf */
.fa-brands {
  color: #E9967A;
}

/* Object Cell - Individual Avatar Styling in AvatarStack and AvatarGrid */
.avatar {
  background-color: yellow; /* For ImageText Only */
  color: black;
  font-size: 16; /* For Image Only, applicable only for SAP icon and font icon types */
}
```