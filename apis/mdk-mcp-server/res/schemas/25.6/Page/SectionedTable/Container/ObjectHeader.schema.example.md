
----
## Examples

```json
{
  "_Type": "Page",
  "_Name": "SectionedTablePage",
  "Caption": "Object Table Section Page",
  "Controls": [
    {
      "Sections": [
        {
          "_Type": "Section.Type.ObjectHeader",
          "_Name": "ObjectHeader",
          "ObjectHeader": {
            "BodyText": "1000-Hamburg, MECHANIK. This is a body label, which its text can not be wrapped",
            "Description": "Temperature sensor predicts overheating failure in 4 days Urgent and needs attentions.  Temperature sensor predicts overheating failure in 4 days Urgent and needs attentions.",
            "DetailImage": "res://TestPNG.png",
            "DetailImageIsCircular": false,
            "Footnote": "Due on 12/31/16. This is a footnote label, which its text can not be wrapped",
            "HeadlineText": "Inspect Electric Pump Motor Long Job Title Example Will Wrap Max# of Lines in the HeadlineLabel",
            "StatusImage": "/MDKDevApp/Images/icon_severity_medium.png",
            "Subhead": "Job 819701. This is a subheadline label, which its text can not be wrapped",
            "SubstatusText": "Medium",
            "Tags": [
              {
                "Text": "Started",
                "Color": "red",
                "Style": "objectHeaderTagStyle1"
              },
              {
                "Text": "PM01",
                "Color": "#00ff00",
                "Style": "objectHeaderTagStyle2"
              },
              {
                "Text": "The Fourth one",
                "Style": "objectHeaderTagStyle3"
              },
            ],
            "Labels": [
              {
                "Text": "Label 1",
                "Image": "res://TestPNG.png",
                "ImagePosition": "Trailing",
                "Style": "objectHeaderLabelStyle1"
              },
              {
                "Text": "Label 2",
                "Image": "res://TestPNG.png",
                "ImagePosition": "Leading",
                "Style": "objectHeaderLabelStyle2"
              }
            ],
            "KPIView": {
              "RightMetric": "999",
              "RightUnit": "K",
              "LeftMetric": "265",
              "LeftUnit": "M",
              "Label": "New KPIView",
              "Styles": {
                "RightMetric": "KPIViewRightMetricStyle",
                "RightUnit": "KPIViewRightUnitStyle",
                "LeftMetric": "KPIViewLeftMetricStyle",
                "LeftUnit": "KPIViewLeftUnitStyle",
                "Label": "KPIViewLabelStyle",
              }
            },
            "Styles": {
              "ObjectHeader": "objectHeaderBackground",
              "BodyText": "objectHeaderBody",
              "Description": "objectHeaderDescription",
              "Footnote": "objectHeaderFootnote",
              "HeadlineText": "objectHeaderHeadeline",
              "StatusText": "objectHeaderStatus",
              "Subhead": "objectHeaderSubhead",
              "SubstatusText": "objectHeaderSubstatus"
            }
          }
        }
      ]
    }
  ]
}
```

### Static Object Header with KPI 

```json
{
  "Caption": "Static Object Header with KPI",
  "Controls": [
    {
      "Sections": [
        {
          "ObjectHeader": {
            "BodyText": "BodyText",
            "Description": "Description",
            "DetailImage": "/MDKDevApp/Images/objectheader.png",
            "DetailImageIsCircular": true,
            "Footnote": "Footnote",
            "HeadlineText": "HeadlineText",
            "StatusText": "High",
            "StatusImage": "res://n_icon.png",
            "Subhead": "Subhead",
            "SubstatusImage": "res://test_png.png",
            "SubstatusText": "Error",
            "Tags": [{"Text": "Tags"}],
            "AnalyticView": {
              "_Type": "KPI",
              "KPI": {
                "CaptionLabel": "20 minutes ago",
                "MetricItems": [
                    {
                        "LeadingUnit": "Temp",
                        "Value": "104",
                        "TrailingUnit": "°F"
                    }
                ]
              },
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
            }
          },
          "_Type": "Section.Type.ObjectHeader"
        }
      ],
      "_Name": "ObjectHeaderSection",
      "_Type": "Control.Type.SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "StaticObjectHeaderWithKPI"
}
```

### Dynamic Object Header with KPI

```json
{
    "Caption": "Object Header with Dynamic KPI",
    "Controls": [
      {
        "Sections": [
          {
            "ObjectHeader": {
                "BodyText": "{OrderId}",
                "Description": "{OrderDescription}",
                "DetailImage": "{DetailImage}",
                "DetailImageIsCircular": true,
                "Footnote": "{OrderId}",
                "HeadlineText": "{OrderDescription}",
                "StatusText": "High",
                "StatusImage": "res://n_icon.png",
                "Subhead": "{OrderId}",
                "SubstatusImage": "res://test_png.png",
                "SubstatusText": "Error",
                "Tags": [
                  {"Text": "Tag1"},
                  {"Text": "Tag2"},
                  {"Text": "Tag3"},
                  {"Text": "Tag4"}
                ],
                "Target": {
                  "EntitySet": "MyWorkOrderHeaders",
                  "Service": "/MDKDevApp/Services/Amw.service",
                  "QueryOptions": "$top=1"
                },
                "AnalyticView": {
                    "_Type": "KPI",
                    "KPI": {
                        "CaptionLabel": "20 minutes ago",
                        "MetricItems": [
                            {
                                "LeadingUnit": "",
                                "Value": "{CategorySales}",
                                "TrailingUnit": " sales"
                            }
                        ]
                    },
                    "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
                    "Target": "/MDKDevApp/Rules/ReadServiceForKPIHeader.js"
                }
            },
            "_Type": "Section.Type.ObjectHeader"
          }
        ],
        "_Name": "ObjectHeaderSection",
        "_Type": "Control.Type.SectionedTable"
      }
    ],
    "_Type": "Page",
    "_Name": "DynamicObjectHeaderWithKPI"
  }

```


### Static Object Header with Chart 

```json
{
  "Caption": "Static Object Header with Chart",
  "Controls": [
    {
      "Sections": [
        {
          "ObjectHeader": {
            "BodyText": "BodyText",
            "Description": "Description",
            "DetailImage": "/MDKDevApp/Images/objectheader.png",
            "DetailImageIsCircular": true,
            "Footnote": "Footnote",
            "HeadlineText": "HeadlineText",
            "StatusText": "High",
            "StatusImage": "res://n_icon.png",
            "Subhead": "Subhead",
            "SubstatusImage": "res://test_png.png",
            "SubstatusText": "Error",
            "Tags": [{"Text": "Tags"}],
            "AnalyticView": {
                "_Type": "Chart",
                "Chart": {
                    "Title": "Annual Sales",
                    "Subtitle": "For 2017-18",
                    "TrendTitle": "+ 20%",
                    "TrendColor": "#FF0000",
                    "TrendImage": "/MDKDevApp/Images/objectheader.png",
                    "KPI": {
                        "MetricItems": [
                                {
                                    "LeadingUnit": "Temp",
                                    "Value": "104",
                                    "TrailingUnit": "°F"
                                }
                            ],
                        "Icon": "/MDKDevApp/Images/document.png"
                    },
                    "ChartView": {
                        "ChartType": "Line",
                        "SeriesColor": ["#FF0000","#0000FF"],
                        "Data": [
                          [
                              100,
                              200,
                              300
                          ],
                          [
                              100,
                              150,
                              500
                          ]
                        ],
                        "CategoryTitles": [
                            "Jan",
                            "Feb",
                            "March"
                        ]
                    }
                },
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
            }
          },
          "_Type": "Section.Type.ObjectHeader"
        }
      ],
      "_Name": "ObjectHeaderSection",
      "_Type": "Control.Type.SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "StaticObjectHeaderWithChart"
}
```

### Dynamic Object Header with Chart 

```json
{
    "Caption": "Dynamic Object Header with Chart",
    "Controls": [
      {
        "Sections": [
          {
            "ObjectHeader": {
                "BodyText": "{OrderId}",
                "Description": "{OrderDescription}",
                "DetailImage": "{DetailImage}",
                "DetailImageIsCircular": true,
                "Footnote": "{OrderId}",
                "HeadlineText": "{OrderDescription}",
                "StatusText": "High",
                "StatusImage": "res://n_icon.png",
                "Subhead": "{OrderId}",
                "SubstatusImage": "res://test_png.png",
                "SubstatusText": "Error",
                "Tags": [
                  {"Text": "Tag1"},
                  {"Text": "Tag2"},
                  {"Text": "Tag3"},
                  {"Text": "Tag4"}
                ],
                "Target": {
                  "EntitySet": "MyWorkOrderHeaders",
                  "Service": "/MDKDevApp/Services/Amw.service",
                  "QueryOptions": "$top=1"
                },
                "AnalyticView": {
                    "_Type": "Chart",
                    "Chart": {
                        "Title": "Annual Sales",
                        "Subtitle": "For 2017-18",
                        "TrendTitle": "+ 20%",
                        "TrendColor": "#FF0000",
                        "TrendImage": "/MDKDevApp/Images/objectheader.png",
                        "KPI": {
                            "MetricItems": [
                                    {
                                        "LeadingUnit": "Temp",
                                        "Value": "104",
                                        "TrailingUnit": "°F"
                                    }
                                ],
                            "Icon": "/MDKDevApp/Images/document.png"
                        },
                        "ChartView": {
                            "ChartType": "Line",
                            "SeriesColor": ["#FF0000","#0000FF"],
                            "Data": "{CategorySales}",
                            "CategoryTitles": "{CategoryName}"
                        }
                    },
                    "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
                    "Target": "/MDKDevApp/Rules/ReadServiceForChartCard.js"
                }
            },
            "_Type": "Section.Type.ObjectHeader"
          }
        ],
        "_Name": "ObjectHeaderSection",
        "_Type": "Control.Type.SectionedTable"
      }
    ],
    "_Type": "Page",
    "_Name": "DynamicObjectHeaderWithChart"
  }
```

### Object Header with Styled KPI 

```json
{
    "Caption": "Object Header With Styled KPI",
    "Controls": [
      {
        "Sections": [
          {
            "ObjectHeader": {
              "BodyText": "BodyText",
              "Description": "Description",
              "DetailImage": "/MDKDevApp/Images/objectheader.png",
              "DetailImageIsCircular": true,
              "Footnote": "Footnote",
              "HeadlineText": "HeadlineText",
              "StatusText": "High",
              "StatusImage": "res://n_icon.png",
              "Subhead": "Subhead",
              "SubstatusImage": "res://test_png.png",
              "SubstatusText": "Error",
              "Tags": [{"Text": "Tags"}],
              "AnalyticView": {
                "_Type": "KPI",
                "KPI":  {
                  "MetricItems": [
                      {
                          "Value": "6",
                          "TrailingUnit": "h"
                      },
                      {
                          "Value": "59",   
                          "TrailingUnit": "m"   
                      },
                      {
                          "Value": "35",
                          "TrailingUnit": "s"
                      }
                  ],
                  "CaptionLabel": "Working Hours",
                  "Icon": "sap-icon://arrow-top",
                },
                "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
              },
              "Styles": {
                "ObjectHeader": "ObjectHeaderBackground",
                "BodyText": "ObjectHeaderBody",
                "Description": "ObjectHeaderDescription",
                "Footnote": "ObjectHeaderFootnote",
                "HeadlineText": "ObjectHeaderHeadeline",
                "StatusText": "ObjectHeaderStatus",
                "Subhead": "ObjectHeaderSubhead",
                "SubstatusText": "ObjectHeaderSubstatus",
                "KPITintColor": "ObjectHeaderKPITintColor",
                "KPICaptionStyle": "ObjectHeaderKPICaption",
                "KPIIcon": "font-icon-class"
              }
            },
            "_Type": "Section.Type.ObjectHeader"
          }
        ],
        "_Name": "ObjectHeaderSection",
        "_Type": "Control.Type.SectionedTable"
      }
    ],
    "_Type": "Page",
    "_Name": "ObjectHeaderWithStyledKPI"
  }
```

### Object Header with Styled Chart 

```json
{
  "Caption": "Object Header with Styled Chart",
  "Controls": [
    {
      "Sections": [
        {
          "ObjectHeader": {
            "BodyText": "BodyText",
            "Description": "Description",
            "DetailImage": "/MDKDevApp/Images/objectheader.png",
            "DetailImageIsCircular": true,
            "Footnote": "Footnote",
            "HeadlineText": "HeadlineText",
            "StatusText": "High",
            "StatusImage": "res://n_icon.png",
            "Subhead": "Subhead",
            "SubstatusImage": "res://test_png.png",
            "SubstatusText": "Error",
            "Tags": [{"Text": "Tags"}],
            "AnalyticView": {
                "_Type": "Chart",
                "Chart": {
                    "Title": "Annual Sales",
                    "Subtitle": "For 2017-18",
                    "TrendTitle": "+ 20%",
                    "TrendColor": "#FF0000",
                    "TrendImage": "sap-icon://arrow-top",
                    "KPI": {
                        "Icon": "sap-icon://arrow-bottom",
                        "MetricItems": [
                          {
                            "LeadingUnit": "Temp",
                            "Value": "104",
                            "TrailingUnit": "°F"
                          }
                        ]
                    },
                    "ChartView": {
                        "ChartType": "Line",
                        "SeriesColor": ["#FF0000","#0000FF"],
                        "Data": [
                          [
                              100,
                              200,
                              300
                          ],
                          [
                              100,
                              150,
                              500
                          ]
                        ],
                        "CategoryTitles": [
                            "Jan",
                            "Feb",
                            "March"
                        ]
                    }
                },
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
            },
            "Styles": {
              "ObjectHeader": "ObjectHeaderBackground",
              "BodyText": "ObjectHeaderBody",
              "Description": "ObjectHeaderDescription",
              "Footnote": "ObjectHeaderFootnote",
              "HeadlineText": "ObjectHeaderHeadeline",
              "StatusText": "ObjectHeaderStatus",
              "Subhead": "ObjectHeaderSubhead",
              "SubstatusText": "ObjectHeaderSubstatus",
              "ChartTitle": "ObjectHeaderChartTitle",
              "ChartSubTitle": "ObjectHeaderChartSubTitle",
              "ChartTrendTitle": "ObjectHeaderChartTrendTitle",
              "ChartKPIUnit": "ObjectHeaderChartKPIUnit",
              "ChartKPIValue": "ObjectHeaderChartKPIValue",
              "ChartKPIIcon": "font-icon-class",
              "ChartTrendImage": "font-icon-class"
            }
          },
          "_Type": "Section.Type.ObjectHeader"
        }
      ],
      "_Name": "ObjectHeaderSection",
      "_Type": "Control.Type.SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "ObjectHeaderWithStyledChart"
}
```

### Static Object Header with Chart and a PlaceholderText when no Chart Data is available

```json
{
  "Caption": "Static Object Header with Chart",
  "Controls": [
    {
      "Sections": [
        {
          "ObjectHeader": {
            "BodyText": "BodyText",
            "Description": "Description",
            "DetailImage": "/MDKDevApp/Images/objectheader.png",
            "DetailImageIsCircular": true,
            "Footnote": "Footnote",
            "HeadlineText": "HeadlineText",
            "StatusText": "High",
            "StatusImage": "res://n_icon.png",
            "Subhead": "Subhead",
            "SubstatusImage": "res://test_png.png",
            "SubstatusText": "Error",
            "Tags": [{"Text": "Tags"}],
            "AnalyticView": {
                "_Type": "Chart",
                "Chart": {
                    "Title": "Annual Sales",
                    "Subtitle": "For 2017-18",
                    "TrendTitle": "8h ago",
                    "TrendColor": "#FF0000",
                    "TrendImage": "/MDKDevApp/Images/objectheader.png",
                    "KPI": {
                        "MetricItems": [
                                {
                                    "LeadingUnit": "Temp",
                                    "Value": "104",
                                    "TrailingUnit": "°F"
                                }
                            ],
                        "Icon": "/MDKDevApp/Images/document.png"
                    },
                    "ChartView": {
                        "ChartType": "Line",
                        "SeriesColor": ["#FF0000","#0000FF"],
                        "NoDataText":"No chart data available",
                        "CategoryTitles": [
                            "Jan",
                            "Feb",
                            "March"
                        ]
                    }
                },
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
            },
            "Styles": {
              "NoDataText": "ObjectHeaderChartNoDataText"
            }            
          },
          "_Type": "Section.Type.ObjectHeader"
        }
      ],
      "_Name": "ObjectHeaderSection",
      "_Type": "Control.Type.SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "StaticObjectHeaderWithChart"
}
```

### ObjectHeader with font icon and style example

```json
{
  "_Type": "Page",
  "_Name": "SectionedTablePage",
  "Caption": "Object Table Section Page",
  "Controls": [
    {
      "Sections": [
        {
          "_Type": "Section.Type.ObjectHeader",
          "ObjectHeader": {
            "BodyText": "1000-Hamburg, MECHANIK. This is a body label, which its text can not be wrapped",
            "Description": "Temperature sensor predicts overheating failure in 4 days Urgent and needs attentions.  Temperature sensor predicts overheating failure in 4 days Urgent and needs attentions.",
            "DetailImage": "font://&#xe011;",
            "DetailImageIsCircular": false,
            "Footnote": "Due on 12/31/16. This is a footnote label, which its text can not be wrapped",
            "HeadlineText": "Inspect Electric Pump Motor Long Job Title Example Will Wrap Max# of Lines in the HeadlineLabel",
            "StatusImage": "font://&#xe011;",
            "Subhead": "Job 819701. This is a subheadline label, which its text can not be wrapped",
            "SubstatusText": "Medium",
            "SubstatusImage": "sap-icon://home",
            "Tags": [
              {"Text": "Tag1"},
              {"Text": "Tag2"},
              {"Text": "Tag3"},
              {"Text": "Tag4"}
            ],
            "Styles": {
              "ObjectHeader": "objectHeaderBackground",
              "BodyText": "objectHeaderBody",
              "Description": "objectHeaderDescription",
              "Footnote": "objectHeaderFootnote",
              "HeadlineText": "objectHeaderHeadeline",
              "StatusText": "objectHeaderStatus",
              "Subhead": "objectHeaderSubhead",
              "SubstatusText": "objectHeaderSubstatus",
              "DetailImage": "font-icon-class",
              "StatusImage": "font-icon-class",
              "SubstatusImage": "font-icon-class"
            }
          }
        }
      ]
    }
  ]
}
```

```css
/* Object Header - Background */
.objectHeaderBackground {
  background-color: yellow; /* Not supported on WebClient.*/
}

/* Object Header - BodyText */
.objectHeaderBody {
  color: black;
  font-style: body; /* iOS Only */
}

/* Object Header - Description */
.objectHeaderDescription {
  color: black;
  font-style: body; /* iOS Only */
}

/* Object Header - Footnote */
.objectHeaderFootnote {
  color: black;
  font-style: body; /* iOS Only */
}

/* Object Header - Headline */
.objectHeaderHeadeline {
  color: black;
  font-style: body; /* iOS Only */
}

/* Object Header - StatusText */
.objectHeaderStatus {
  color: black;
  font-style: body; /* iOS Only */
}

/* Object Header - Subhead */
.objectHeaderSubhead {
  color: black;
  font-style: body; /* iOS Only */
}

/* Object Header - SubstatusText */
.objectHeaderSubstatus {
  color: black;
  font-style: body; /* iOS Only */
}

/* Object Header - ChartTitle */
/* iOS Only */
.ObjectHeaderChartTitle {
  font-size: 20;
  color: @mdkRed4;
}

/* Object Header - ChartSubTitle */
/* iOS Only */
.ObjectHeaderChartSubTitle {
  font-size: 14;
  color: @mdkGreen1;
}

/* Object Header - ChartTrendTitle */
/* iOS Only */
.ObjectHeaderChartTrendTitle {
  font-size: 10;
  color: @mdkBlue1;
}

/* Object Header - ChartKPIUnit */
/* iOS Only */
.ObjectHeaderChartKPIUnit {
  font-size: 14;
  color: black;
}

/* Object Header - ChartKPIValue */
/* iOS Only */
.ObjectHeaderChartKPIValue {
  font-size: 16;
  color: brown;
}

/* Object Header - ChartKPIIcon*/
/* iOS Only */
.ObjectHeaderChartKPIIcon {
  tint-color: white;
  background-color: red;
}

/* Object Header - Chart NoDataText */
.ObjectHeaderChartNoDataText {
  color: red;
  font-size: 10;
}

/* Object Header - KPI TintColor */
.ObjectHeaderKPITintColor {
  tint-color: @mdkBlue1;  /*for KPIView */
  color: @mdkBlue1;  /*for KPIProgressView */
}

/* For Styling of Object Header KPI Caption Label */
.ObjectHeaderKPICaption {
  font-size: 30;
  color: green; 
  font-style: body;
}

.font-icon-class {
  font-size: 8;
  color: red;
}

.objectHeaderTagStyle1 {
  font-color: green;
  background-color: yellow;
  border-color: red;
}

.objectHeaderTagStyle2 {
  font-color: @mdkBlue1;
  background-color: black;
  border-color: red;
}

.objectHeaderTagStyle3 {
  font-color: @mdkYellow1;
  background-color: white;
  border-color: green;
}

.objectHeaderLabelStyle1 {
  font-color: green;
  background-color: yellow;
}

.objectHeaderLabelStyle2 {
  font-color: @mdkBlue1;
  background-color: black;
}


.KPIViewRightMetricStyle {
  font-color: @mdkBlue1;
  background-color: black;
}

.KPIViewRightUnitStyle {
  font-color: @mdkBlue1;
  background-color: black;
}

.KPIViewLeftMetricStyle {
  font-color: @mdkBlue1;
  background-color: black;
}

.KPIViewLeftUnitStyle {
  font-color: @mdkBlue1;
  background-color: black;
}

.KPIViewLabelStyle {
  font-color: @mdkBlue1;
  background-color: black;  
}
```