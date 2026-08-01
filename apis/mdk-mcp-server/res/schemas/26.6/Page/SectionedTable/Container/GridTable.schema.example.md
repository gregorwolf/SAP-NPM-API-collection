
----
## Examples


```json
{
  "_Type": "Section.Type.GridTable",
  "_Name": "GridTableSection",
  "DataPaging": {
    "ShowLoadingIndicator": true,
    "LoadingIndicatorText": "Loading more items, please wait…"
  }, 
  "Row": {
    "Items": [
      {
        "Image": "/MDKApp/Images/workorder.png"
      },
      {
        "Text": "{OrderId}"
      },
      {
        "Text": "{OrderDescription}"
      },
      {
        "Text": "$(C,{OrderId},'USD')",
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
    },
    "OnPress": "/MDKApp/Actions/Messages/Message.action",
    "OnAccessoryButtonPress": "/MDKApp/Actions/Messages/Message2.action",
    "AccessoryType": "detailButton"
  },
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
      ]
    }
  },
  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MDKApp/Services/Amw.service"
  }
}
```

### GridTable with Style


```json
{
  "_Type": "Section.Type.GridTable",
  "_Name": "GridTableSection",
  "DataPaging": {
    "ShowLoadingIndicator": true,
    "LoadingIndicatorText": "Loading more items, please wait…"
  }, 
  "Row": {
    "Items": [
      {
        "Image": "sap-icon://favorite",
        "Style": "font-icon-class"
      },
      {
        "Text": "{OrderId}",
        "Style": "GridTableIdItem"
      },
      {
        "Text": "{OrderDescription}"
      },
      {
        "Text": "$(C,{OrderId},'USD')",
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
    },
    "OnPress": "/MDKApp/Actions/Messages/Message.action",
    "OnAccessoryButtonPress": "/MDKApp/Actions/Messages/Message2.action",
    "AccessoryType": "detailButton"
  },
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
      ]
    }
  },
  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MDKApp/Services/Amw.service"
  }
}
```

### GridTable with OnPress and OnAccessoryButtonPress supporting PLT formatter
```json
{
  "_Name": "GridTableSection",
  "_Type": "Section.Type.GridTable",
  "Row": {
    "Items": [{
      "Image": "/MDKDevApp/Images/on.png",
      "BindTo": "detailImage"
    },{
      "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/2000px-SAP_2011_logo.svg.png",
      "BindTo": "firstIcon"
    },{
      "Image": "/MDKDevApp/Images/icon.png",
      "BindTo": "secondIcon"
    },{
      "Image": "/MDKDevApp/Images/medium.png",
      "BindTo": "thirdIcon"
    },{
      "Text": "{OrderId}",
      "Style": "GridTableIdItem",
      "BindTo": "subheadline"
    }, {
      "Text": "{OrderDescription}",
      "NumberOfLines": 0,
      "TextAlignment": "left",
      "BindTo": "headline"
    }, {
      "Text": "$(C,{OrderId},'USD')",
      "BindTo": "footnote"
    }],
    "Layout": {
      "ColumnWidthPercentage": [0.1,0.1,0.1,0.1, 0.2, -1, 0.25]
    },  
    "OnPress": "$(PLT,'/MDKDevApp/Actions/Messages/OnPressIOS.action', '/MDKDevApp/Actions/Messages/OnPressAndroid.action','/MDKDevApp/Actions/Messages/OnPressWeb.action')",
    "OnAccessoryButtonPress": "$(PLT,'/MDKDevApp/Actions/Messages/OnAccessoryButtonPressIOS.action', '/MDKDevApp/Actions/Messages/OnAccessoryButtonPressAndroid.action')",
    "AccessoryType": "detailButton"
  },
  "Header": {
    "Grid": {
      "Items": [{
        "Text": ""
      }, {
        "Text": ""
      }, {
        "Text": ""
      }, {
        "Text": ""
      }, {
        "Text": "ID"
      }, {
        "Text": "Description"
        }, {
        "Text": "Price"
      }]
    }
  },
  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MDKDevApp/Services/Amw.service"
  }
}
```

### Style Classes Definition
```css
.GridTableIdItem {
  color: #3333cc;
  font-name: italicSystem;
}

.font-icon-class {
  font-size: 8;
  color: red;
}
```