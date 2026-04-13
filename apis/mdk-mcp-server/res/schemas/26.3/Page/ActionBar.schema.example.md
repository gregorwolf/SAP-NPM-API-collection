
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "ActionBar",
  "Caption": "ActionBar",
  "ActionBar": {
    "Items": [
      {
        "Position": "Left",
        "Text": "Lefty",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Left",
        "SystemItem": "Bookmarks",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Left",
        "Caption": "Lefty 2",
        "OnPress": "$(PLT,'/MDKDevApp/Actions/Messages/OnPressIOS.action', '/MDKDevApp/Actions/Messages/OnPressAndroid.action','/MDKDevApp/Actions/Messages/OnPressWeb.action')"
      },
      {
        "Position": "Right",
        "Caption": "Righty",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "res://map_icon",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "res://menu_icon",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "font://&#xe05a;",
        "Style": "$(PLT,'ios-font-icon-class','android-font-icon-class')",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "sap-icon://add",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/seam.png",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "https://www.gstatic.com/webp/gallery/1.sm.jpg",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "res://profile_icon",
        "IsIconCircular": true,
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/profile.png",
        "IconText": "PM",
        "IsIconCircular": true,
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/profile.png",
        "IconText": "PM",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/profile.png",
        "IconText": "PM",
        "IsIconCircular": true,
        "Style": "icon-text-class",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
    ]
  },
  "Controls": []
}
```

## Examples (Enhanced)


```json
{
  "_Type": "Page",
  "_Name": "ActionBar",
  "ActionBar": {
    "Caption": "ActionBar",
    "Logo":"res://logo",
    "Subhead": "This is subhead",
    "PrefersLargeCaption": true, 
    "Logo": "res://logo",
    "OnBackButtonPressed": "/MDKDevApp/Rules/ActionBar/ActionBarMessage.js",
    "OverflowIcon": "sap-icon://detail-more",
    "DataSubscriptions": ["MyWorkOrderHeaders"],
    "Styles": {
      "ActionBar": "custom-actionbar-style",
      "Caption": "custom-actionbar-caption-style",
      "Subhead": "custom-actionbar-subhead-style",
      "Logo": "font-icon-class",
      "OverflowIcon": "font-icon-class"
    },
    "Items": [
      {
        "Position": "Left",
        "Text": "Lefty",
        "Enabled": false,
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Left",
        "SystemItem": "Bookmarks",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Left",
        "Caption": "Lefty 2",
        "OnPress": "$(PLT,'/MDKDevApp/Actions/Messages/OnPressIOS.action', '/MDKDevApp/Actions/Messages/OnPressAndroid.action','/MDKDevApp/Actions/Messages/OnPressWeb.action')"
      },
      {
        "Position": "Right",
        "Caption": "Righty",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "res://map_icon",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "res://menu_icon",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "font://&#xe05a;",
        "Style": "$(PLT,'ios-font-icon-class','android-font-icon-class')",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "sap-icon://add",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/seam.png",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "https://www.gstatic.com/webp/gallery/1.sm.jpg",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "res://profile_icon",
        "IsIconCircular": true,
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/profile.png",
        "IconText": "PM",
        "IsIconCircular": true,
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/profile.png",
        "IconText": "PM",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
      {
        "Position": "Right",
        "Icon": "/MDKApp/Images/profile.png",
        "IconText": "PM",
        "IsIconCircular": true,
        "Style": "icon-text-class",
        "OnPress": "/MDKApp/Actions/Messages/Message.action"
      },
    ]
  },
  "Controls": []
}
```

### Style Classes Definition
```css
.ios-font-icon-class {
  font-size: 17;
  color: red;
}

.android-font-icon-class {
  font-size: 4;
  color: red;
}

.icon-text-class {
  font-size:  17;
  color: #FF0000;
  background-color: #00ff00;
}

.font-icon-class {
  font-size: 8;
  color: red;
  background-color: #DCE3E8;
}

.custom-actionbar-caption-style {
  color: green; 
  font-size: 16;
  /* The following attributes are not supported on iOS */
  font-weight: 600;
  font-style: normal;
  text-decoration: line-through;
}

.custom-actionbar-subhead-style {
  color: blue; 
  font-size: 13;
}

.custom-actionbar-style {
  background-color: yellow;
}

```
