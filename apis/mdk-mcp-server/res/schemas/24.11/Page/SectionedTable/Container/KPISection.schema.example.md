
----
## Example

### Static
```json
{
  "_Type": "Page",
  "_Name": "KPISectionPage",
  "Caption": "KPI section Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.KPISection",
          "Visible": true,
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
              "TintColor":"KPISectionTintColor",
              "BackgroundColor":"KPISectionBackgroundColor"
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
  "_Name": "KPISectionPage",
  "Caption": "KPI section Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
      {
          "_Type": "Section.Type.KPISection",
          "Visible": true,
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
                "EntitySet": "MyKPISection",
                "Service": "/MDKDevApp/Services/KPI.service"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### KPISection with font icon and styles
```json
{
  "_Type": "Page",
  "_Name": "KPISectionPage",
  "Caption": "KPI section Page",
  "Controls": [
    {
        "_Type": "Control.Type.SectionedTable",
        "_Name": "SectionedTable",
        "Sections": [
            {
                "_Type": "Section.Type.KPISection",
                "Visible": true,
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
                      "TintColor":"KPISectionTintColor",
                      "BackgroundColor":"KPISectionBackgroundColor",
                      "Icon": "font-icon-class"
                  }
            }
        ]   
    }
  ]
}
```

```css
/* KPISection - TintColor */
/* tint-color for KPIView, color for KPIProgressView */
.KPISectionTintColor {
  tint-color: @mdkBlue1; 
  color: @mdkBlue1;
}

/* KPISection - BackgroundColor */
.KPISectionBackgroundColor {
  background-color: #6002ee;
}

.font-icon-class {
  font-size: 8;
  color: red;
}
```