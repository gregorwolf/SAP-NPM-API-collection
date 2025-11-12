
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

```
