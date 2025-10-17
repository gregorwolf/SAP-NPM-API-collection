
----
##Example

### Static
```json
{
  "_Type": "Page",
  "_Name": "KPIHeaderPage",
  "Caption": "KPI header Page",
  "Controls": [
    {
        "_Type": "Control.Type.SectionedTable",
        "_Name": "SectionedTable",
        "Sections": [
            {
                "_Type": "Section.Type.KPIHeader",
                "Visible": true,
                "KPIHeader": {
                  "KPIItems": [
                        {
                            
                            "CaptionLabel": "20 minutes ago",
                            "MetricItems": [
                                {
                                    "LeadingUnit": "",
                                    "Value": "104",
                                    "TrailingUnit": "°F"
                                }
                            ]
                        },
                        {
                            "MetricItems": [
                                {
                                    "Value": "6",
                                    "TrailingUnit": "h"
                                },
                                {
                                    "Value": "59",   
                                    "TrailingUnit": "m"   
                                }
                            ],
                            "CaptionLabel": "Working Hours"
                        },
                        {
                            
                            "MetricItems": [
                                {
                                    "LeadingUnit": "",
                                    "Value": "54",
                                    "TrailingUnit": "%"
                                }
                            ],
                            "CaptionLabel": "Completed",
                            "ShowProgress": true,
                            "Progress": 0.7
                        },
                        {
                            "Icon": "/MDKDevApp/Images/document.png",
                            "MetricItems": [
                                {
                                    "Value": "2"
                                }
                            ],
                            "CaptionLabel": "Documents"
                        }
                    ],
                    "Styles":{
                        "TintColor":"KPIHeaderTintColor",
                        "BackgroundColor":"KPIHeaderBackgroundColor"
                    }
                }
            }
        ]   
    }
  ]
}
```

### Dynamic
```json

{
  "_Type": "Page",
  "_Name": "KPIHeaderPage",
  "Caption": "KPI header Page",
  "Controls": [
      {
          "_Type": "Control.Type.SectionedTable",
          "_Name": "SectionedTable",
          "Sections": [
              {
                  "_Type": "Section.Type.KPIHeader",
                  "Visible": true,
                  "KPIHeader": {
                      "KPIItems": [
                          {
                            "CaptionLabel": "{KPILabel}",
                            "MetricItems": [
                                {
                                    "LeadingUnit": "{LeadingUnit}",
                                    "Value": "{Value}",
                                    "TrailingUnit": "{TrailingUnit}"
                                }
                          ],
                          "Target": {
                              "EntitySet": "MyKPIHeader",
                              "Service": "/MDKDevApp/Services/KPI.service",
                          }
                        }
                      ]
                  }
              }
          ]    
      }
  ]
}

{
  "_Type": "Page",
  "_Name": "KPIHeaderPage",
  "Caption": "KPI header Page",
  "Controls": [
    {
        "_Type": "Control.Type.SectionedTable",
        "_Name": "SectionedTable",
        "Sections": [
            {
                "_Type": "Section.Type.KPIHeader",
                "Visible": true,
                "KPIItems": [
                    {
                        "CaptionLabel": "{KPILabel}",
                        "MetricItems": [
                            {
                            "LeadingUnit": "{LeadingUnit}",
                            "Value": "{HourValue}",
                            "TrailingUnit": "{TrailingUnit}"
                            }
                        ],
                        "Target": "/MdkApp/Rules/AFunctionThatWillReturnAnArrayOfData.js"
                    }
                ]               
            }
        ]   
    }
  ]
}
```

### KPIHeader with font icon and styles

```json
{
  "_Type": "Page",
  "_Name": "KPIHeaderPage",
  "Caption": "KPI header Page",
  "Controls": [
    {
        "_Type": "Control.Type.SectionedTable",
        "_Name": "SectionedTable",
        "Sections": [
            {
                "_Type": "Section.Type.KPIHeader",
                "Visible": true,
                "KPIHeader": {
                  "KPIItems": [
                        {
                            "Icon": "sap-icon://arrow-top",
                            "MetricItems": [
                                {
                                    "Value": "2"
                                }
                            ],
                            "CaptionLabel": "Documents"
                        }
                    ],
                    "Styles":{
                        "TintColor":"KPIHeaderTintColor",
                        "BackgroundColor":"KPIHeaderBackgroundColor",
                        "Icon": "font-icon-class"
                    }
                }
            }
        ]   
    }
  ]
}
```

```css
/* KPIHeader - TintColor */
/* tint-color for KPIView, color for KPIProgressView */
.KPIHeaderTintColor {
  tint-color: @mdkBlue1; 
  color: @mdkBlue1;
}

/* KPIHeader - BackgroundColor */
.KPIHeaderBackgroundColor {
  background-color: #6002ee;
}

.font-icon-class {
  font-size: 8;
  color: red;
}
```
