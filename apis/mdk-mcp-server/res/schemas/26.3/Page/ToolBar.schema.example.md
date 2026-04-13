
----
## Examples


```json
// left aligned Save button
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "ToolBar": {
    "Items": [{
      "_Name": "Save",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Save",
      "Caption": "Save",
      "OnPressAction": "/MDKApp/Actions/Save.action"
    }]
  },
  "Controls": []
}

// ToolBar not visible
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "Visible": false,
  "ToolBar": {
    "Items": [{
      "_Name": "Save",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Save",
      "Caption": "Save",
      "OnPressAction": "/MDKApp/Actions/Save.action"
    }]
  },
  "Controls": []
}

// left aligned Camera and Save buttons
{
  "_Type": "Page",
  "Caption": "ToolBarPage",
  "ToolBar": {
    "Items": [{
      "_Name": "Camera",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Camera",
      "Caption": "Camera",
      "OnPressAction": "/MDKApp/Actions/Camera.action"
    }, {
      "_Name": "Done",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Done",
      "Caption": "Done",
      "OnPressAction": "/MDKApp/Actions/Done.action"
    }]
  },
  "Controls": []
}

// three buttons - left aligned - centered - right aligned
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [{
      "_Name": "Save",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Save",
      "Caption": "Save",
      "OnPressAction": "/MDKApp/Actions/Save.action"
    }, {
      "_Name": "FlexibleSpace1",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "FlexibleSpace"
    }, {
      "_Name": "CenteredText",
      "_Type": "Control.Type.ToolbarItem",
      "Caption": "SalesOrderPage"
    }, {
      "_Name": "FlexibleSpace2",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "FlexibleSpace"
    }, {
      "_Name": "Cancel",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Cancel",
      "Caption": "Cancel",
      "OnPressAction": "/MDKApp/Actions/Cancel.action"
    }]
  }
}

// two buttons with fixed space
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [{
      "_Name": "Save",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Save",
      "Caption": "Save",
      "OnPressAction": "/MDKApp/Actions/Save.action"
    }, {
      "_Name": "FixedSpace",
      "_Type": "Control.Type.ToolbarItem",
      "Width": 5,
      "SystemItem": "FixedSpace"
    }, {
      "_Name": "Cancel",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Cancel",
      "Caption": "Cancel",
      "OnPressAction": "/MDKApp/Actions/Cancel.action"
    }]
  }
}

// image button example
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [{
      "_Name": "IconRes",
      "_Type": "Control.Type.ToolbarItem",
      "Icon": "res://n_icon.png",
      "Caption": "Icon A",
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }, {
      "_Name": "IconRef",
      "_Type": "Control.Type.ToolbarItem",
      "Icon": "/MDKDevApp/Images/seam.png",
      "Caption": "Icon B",
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }, {
      "_Name": "IconUrl",
      "_Type": "Control.Type.ToolbarItem",
      "Icon": "https://www.gstatic.com/webp/gallery/1.sm.jpg",
      "Caption": "Icon C",
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }, {
      "_Name": "IconFont",
      "_Type": "Control.Type.ToolbarItem",
      "Icon": "font://&#xe05a;",
      "Caption": "Icon D",
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }, {
      "_Name": "IconSAP",
      "_Type": "Control.Type.ToolbarItem",
      "Icon": "sap-icon://add",
      "Caption": "Icon E",
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }]
  }
}

// two buttons with flexible space
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [{
      "_Name": "Save",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Save",
      "Caption": "Save",
      "OnPressAction": "/MDKApp/Actions/Save.action"
    }, {
      "_Name": "FlexibleSpace",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "FlexibleSpace"
    }, {
      "_Name": "Cancel",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Cancel",
      "Caption": "Cancel",
      "OnPressAction": "/MDKApp/Actions/Cancel.action"
    }]
  }
}

// three buttons - disabled button
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [{
      "_Name": "Done",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Done",
      "Enabled": false,
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }, {
      "_Name": "Menu",
      "_Type": "Control.Type.ToolbarItem",
      "Caption": "Menu",
      "OnPressAction": "/MDKApp/Actions/Popover.action"
    }, {
      "_Name": "Camera",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Camera",
      "OnPressAction": "/MDKApp/Actions/Camera.action"
    }]
  }
}

// two buttons - visible
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [{
      "_Name": "VisibleItem",
      "_Type": "Control.Type.ToolbarItem",
      "Caption": "Visible",
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }, {
      "_Name": "NotVisibleItem",
      "_Type": "Control.Type.ToolbarItem",
      "Caption": "NotVisible",
      "Visible": false,
      "OnPressAction": "/MDKApp/Actions/Popover.action"
    }]
  }
}

// right aligned done button
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [{
      "_Name": "FlexibleSpace",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "FlexibleSpace"
    }, {
      "_Name": "Done",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Done",
      "Caption": "Done",
      "OnPressAction": "/MDKApp/Actions/Message.action"
    }]
  }
}

// toolbar item with normal and contained button 
// (1st not indicated - default as "Normal", 2nd indicated as "Normal", 3rd indicated as "Button")
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [
      {
        "_Name": "NormalTextToolbarItem",
        "_Type": "Control.Type.ToolbarItem",
        "Caption": "Normal Button",
        "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
      }, {
        "_Name": "NormalTextToolbarItem2",
        "_Type": "Control.Type.ToolbarItem",
        "Caption": "Normal Button 2",
        "ItemType": "Normal",
        "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
      }, {
        "_Name": "PrimaryToolbarItem",
        "_Type": "Control.Type.ToolbarItem",
        "Caption": "Contained Button",
        "ItemType": "Button",
        "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
      }
    ]
  }
}

// toolbar on top of the page (similar to an action bar)
// this is the suggested workaround to show an actionbar like toolbar on a partial modal page
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Position": "top",
    "Items": [{
      "_Name": "Cancel",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Cancel",
      "OnPress": "/MDKApp/Actions/Navigation/CancelChangeSet.action"
    }, {
      "_Name": "FlexibleSpace",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "FlexibleSpace"
    }, {
      "_Name": "Title",
      "_Type": "Control.Type.ToolbarItem",
      "Caption": "Filter",
      "Enabled": false
    }, {
      "_Name": "FlexibleSpace2",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "FlexibleSpace"
    }, {
      "_Name": "Done",
      "_Type": "Control.Type.ToolbarItem",
      "SystemItem": "Done",
      "OnPress": "/MDKApp/Actions/Navigation/ClosePage.action"
    }]
  }
}

// toolbar items with font icon and style example
{
  "_Type": "Page",
  "Caption": "ToolbarPage",
  "Controls": [],
  "ToolBar": {
    "Items": [
      {
        "_Name": "FontIconWithStyling",
        "_Type": "Control.Type.ToolbarItem",
        "Caption": "Font Icon (Styled)",
        "Icon": "sap-icon://home",
        "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
        "Style": "font-icon-class"
      },
      {
        "_Name": "FontIconWithoutStyling",
        "_Type": "Control.Type.ToolbarItem",
        "Caption": "Font Icon (Normal)",
        "Icon": "sap-icon://home",
        "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
      }
    ]
  },
}
```

### Style Classes Definition
```css
.font-icon-class {
  font-size: 4;
  color: red;
}
```