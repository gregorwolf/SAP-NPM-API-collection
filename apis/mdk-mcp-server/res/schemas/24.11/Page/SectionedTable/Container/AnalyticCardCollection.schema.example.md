
----

## Examples

### Static Analytic Card collection containing ChartCard

```json
{
  "_Type": "Page",
  "_Name": "AnalyticCardCollectionPage",
  "Caption": "Collection of analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "AnalyticCards": [
            {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Temperature",
                "Subtitle": "Displaying temp",
                "TrendImage": "/MDKApp/Images/down.png",
                "TrendTitle": "11.5%",
                "StatusText": "8h ago",
                "LeadingUnit": "",
                "Metric": "104",
                "TrailingUnit": "°F",
                "SeriesTitle": [
                  "2016"
                ],
                "SeriesColor": [
                  "#fcba03"
                ],
                "DataSeries": {
                  "Data": "/MDKApp/Rules/DefineDataSeries.js"
                }
            }
          ]
        }
      ]
    }
  ]
}
```

### Dynamic AnalyticCard Collection - Using EntitySet as Target

``` json
{
  "_Type": "Page",
  "_Name": "Dynamic AnalyticCardCollectionPage",
  "Caption": "Collection of dynamically generated analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "_Name": "SectionedTable",
          "Sections": [
            {
              "_Type": "Section.Type.AnalyticCardCollection",
              "AnalyticCard": {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Yearly Sales",
                "SeriesTitle": "{YearOfProduction}",
                "SeriesColor": "/MdkApp/Rules/GetColor.js",
                "DataSeries": {
                  "Data": "{DataSeries1}",
                  "CategoryTitles": "{CategorySeries}",
                  "CategoryLabelVisible": true,
                  "NumericLabelVisible": false
                }
              },
              "Target": {
                "EntitySet": "MySalesOrders",
                "Service": "/MDKApp/Services/Amw.service"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Dynamic AnalyticCard Collection - Using Rule as Target

``` json
{
  "_Type": "Page",
  "_Name": "Dynamic AnalyticCardCollectionPage",
  "Caption": "Collection of dynamically generated analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "_Name": "SectionedTable",
          "Sections": [
            {
              "_Type": "Section.Type.AnalyticCardCollection",
              "AnalyticCard": {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Yearly Sales",
                "SeriesTitle": "{YearOfProduction}",
                "SeriesColor": "/MdkApp/Rules/GetColor.js",
                "DataSeries": {
                  "Data": "{DataSeries1}",
                  "CategoryTitles": "{CategorySeries}",
                  "CategoryLabelVisible": true,
                  "NumericLabelVisible": false
                }
              },
              "Target": "/MDKDevApp/Rules/ReadServiceForChartCard.js"
            }
          ]
        }
      ]
    }
  ]
}
```

### Static Analytic Card collection having Charts with Dynamic DataSeries

```json
{
  "_Type": "Page",
  "_Name": "AnalyticCardCollectionPage",
  "Caption": "Collection of analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "AnalyticCards": [
            {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Temperature",
                "Subtitle": "Displaying temp",
                "TrendTitle": "11.5%",
                "StatusText": "8h ago",
                "LeadingUnit": "",
                "Visible": true,
                "OnPress": "/MDKApp/Actions/ExecuteAction.js",
                "Metric": "104",
                "TrailingUnit": "°F",
                "SeriesTitle": [
                  "2016"
                ],
                "SeriesColor": ["Red"],
                "DataSeries": {
                  "Data": "{DataSeries1}",
                  "CategoryTitles":  "{CategorySeries}",
                  "CategoryLabelVisible": true,
                  "NumericLabelVisible": false
                },
                "Styles": {
                  "Title": "ChartCardTitle",
                  "Subtitle": "ChartCardSubtitle",
                  "StatusText": "ChartCardStatusText",
                  "SeriesTitle": "ChartCardSeriesTitle",
                  "TrendTitle": "ChartCardTrendTitle"
                },
                "Target": {
                  "EntitySet": "MyWorkOrderHeaders",
                  "Service": "/MDKApp/Services/Amw.service"
                },
                "DataSubscriptions": "/MDKApp/Rules/OData/DataSubscriptions.js"
            }
          ]
        }
      ]
    }
  ]
}
```

### Static Analytic Card collection having Charts with DataSeries set by Rules

```json
{
  "_Type": "Page",
  "_Name": "AnalyticCardCollectionPage",
  "Caption": "Collection of analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "AnalyticCards": [
            {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Temperature",
                "Subtitle": "Displaying temp",
                "TrendImage": "/MDKApp/Images/down.png",
                "TrendTitle": "11.5%",
                "StatusText": "8h ago",
                "LeadingUnit": "",
                "Metric": "104",
                "TrailingUnit": "°F",
                "SeriesTitle": [
                  "2016"
                ],
                "SeriesColor": ["#fcba03"],
                "DataSeries": {
                  "Data": "/MDKApp/Rules/DefineDataSeries.js"
                }
            }
          ]
        }
      ]
    }
  ]
}
```

### Static Analytic Card collection having Charts with Static DataSeries

```json
{
  "_Type": "Page",
  "_Name": "AnalyticCardCollectionPage",
  "Caption": "Collection of analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "AnalyticCards": [
            {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Temperature",
                "Subtitle": "Displaying temp",
                "TrendImage": "/MDKApp/Images/down.png",
                "TrendTitle": "11.5%",
                "StatusText": "8h ago",
                "LeadingUnit": "",
                "Metric": "104",
                "TrailingUnit": "°F",
                "SeriesTitle": [
                  "2016",
                  "2017"
                ],
                "DataSeries": {
                  "Data": [
                    [
                      200,
                      170,
                      165,
                      143,
                      166,
                      112,
                      110
                    ],
                    [
                      150,
                      120,
                      130,
                      135,
                      120,
                      138,
                      137
                    ],
                  ],
                  "CategoryTitles": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
                }
            }
          ]
        }
      ]
    }
  ]
}
```

### Static Analytic Card collection having Charts with a PlaceholderText and no Data

```json
{
  "_Type": "Page",
  "_Name": "AnalyticCardCollectionPage",
  "Caption": "Collection of analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "AnalyticCards": [
            {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Temperature",
                "Subtitle": "Displaying temp",
                "TrendImage": "/MDKApp/Images/down.png",
                "TrendTitle": "11.5%",
                "StatusText": "8h ago",
                "LeadingUnit": "",
                "Metric": "104",
                "TrailingUnit": "°F",
                "NoDataText":"No chart data available",
                "SeriesTitle": [
                  "2016",
                  "2017"
                ],
                "DataSeries": {
                  "CategoryTitles": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
                },
                "Styles": {
                  "NoDataText": "ChartCardNoDataText"
                }
            }
          ]
        }
      ]
    }
  ]
}
```

### Analytic Card collection with font icon and styles

```json
{
  "_Type": "Page",
  "_Name": "AnalyticCardCollectionPage",
  "Caption": "Collection of analytic cards",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.AnalyticCardCollection",
          "AnalyticCards": [
            {
                "_Type": "Card.Type.Chart",
                "ChartType": "Line",
                "Title": "Temperature",
                "Subtitle": "Displaying temp",
                "TrendImage": "sap-icon://arrow-top",
                "TrendTitle": "11.5%",
                "StatusText": "8h ago",
                "LeadingUnit": "",
                "Metric": "104",
                "TrailingUnit": "°F",
                "NoDataText":"No chart data available",
                "SeriesTitle": [
                  "2016",
                  "2017"
                ],
                "DataSeries": {
                  "CategoryTitles": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
                },
                "Styles": {
                  "TrendImage": "font-icon-class",
                  "NoDataText": "ChartCardNoDataText"
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
/* Chart Card - Title */
.ChartCardTitle {
  color: white;
  font-style: body;
  font-size: 16px;
}

/* Chart Card - Subtitle */
.ChartCardSubtitle {
  color: white;
  font-style: body;
  font-size: 16px;
}

/* Chart Card - StatusText */
.ChartCardStatusText {
  color: white;
  font-style: body;
  font-size: 16px;
}

/* Chart Card - Series Title */
.ChartCardSeriesTitle {
  color: white;
  font-style: body;
  font-size: 16px;
}

/* Chart Card - Trend Title */
.ChartCardTrendTitle {
  color: white;
  font-style: body;
  font-size: 16px;
}

/* Chart Card- Chart NoDataText */
.ChartCardNoDataText {
  color: red;
  font-size: 10;
}

.font-icon-class {
  font-size: 8;
  color: red;
}
```
