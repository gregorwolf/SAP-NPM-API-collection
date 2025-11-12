
----

## Examples

### Chart Content Page - Static - Interactive
```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "_Name": "SalesChart",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": [
                "2017",
                "2018"
              ],
              "SeriesColor": [
                "#0f0f0f",
                "#ffffff"
              ],
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
              "CategoryTitles": ["Jan", "Feb", "Mar"],
              "TrendItems":[
                {
                  "TrendTitle": "5%",
                  "TrendImage": ""
                },
                {
                  "TrendTitle": "30%",
                  "TrendImage": ""
                },
                {
                  "TrendTitle": "20%",
                  "TrendImage": ""
                }
                ],
              "CategoryAxisTitle": "Months",
              "ValueAxisTitle": "Sales"
            },
            "SummaryView": {
              "SeriesTitles": [
                "Sales for 2017",
                "Sales for 2018"
              ],
              "AggregateItem": {
                "Title": "Total Sales",
                "Value": {
                  "LeadingUnit": "$",
                  "Metrics": [
                    "200",
                    "300"
                  ],
                  "TrailingUnit": "k"
                },
                "TrendTitle": "20%",
                "TrendImage": ""
              }
            }
          }
        }
      ]
    }
  ]
}
```

### Chart Content page - Static - ReadOnly

```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "IsReadOnly": true,
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": [
                "2017",
                "2018"
              ],
              "SeriesColor": [
                "#0f0f0f",
                "#ffffff"
              ],
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
              "CategoryTitles": ["Jan", "Feb", "Mar"],
              "CategoryAxisTitle": "Months",
              "ValueAxisTitle": "Sales"
            },
            "SummaryView": {
              "SeriesTitles": [
                "Sales for 2017",
                "Sales for 2018"
              ],
              "AggregateItem": {
                "Title": "Total Sales",
                "Value": {
                  "LeadingUnit": "$",
                  "Metrics": [
                    "200",
                    "300"
                  ],
                  "TrailingUnit": "k"
                },
                "TrendTitle": "20%",
                "TrendImage": ""
              },
              "SelectedItem": {
                "SelectedIndex": 2,
                "Title": "Sales for Feb",
                "Value": {
                  "LeadingUnit": "$",
                  "Metrics": [
                    "20",
                    "30"
                  ],
                  "TrailingUnit": "k"
                },
                "TrendTitle": "10%",
                "TrendImage": ""
              }
            }
          }
        }
      ]
    }
  ]
}
```

### Chart Content page - Static - Inferred Metrics - Interactive
```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": [
                "2017",
                "2018"
              ],
              "SeriesColor": [
                "#0f0f0f",
                "#ffffff"
              ],
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
              "CategoryTitles": ["Jan", "Feb", "Mar"],
              "TrendItems":[
                {
                  "TrendTitle": "5%",
                  "TrendImage": ""
                },
                {
                  "TrendTitle": "30%",
                  "TrendImage": ""
                }
                ],
            },
            "SummaryView": {
              "AggregateItem": {
                "Title": "Total Sales",
                "Value": {
                  "LeadingUnit": "$",
                  "TrailingUnit": "k",
                  "Function": "SUM"
                },
                "TrendTitle": "20%",
                "TrendImage": ""
              }
            }
          }
        }
      ]
    }
  ]
}
```

### Chart Content page - Static - Inferred Metrics - ReadOnly

```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "IsReadOnly": true,
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": [
                "2017",
                "2018"
              ],
              "SeriesColor": [
                "#0f0f0f",
                "#ffffff"
              ],
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
              "CategoryTitles": ["Jan", "Feb", "Mar"]
            },
            "SummaryView": {
              "AggregateItem": {
                "Title": "Total Sales",
                "Value": {
                  "LeadingUnit": "$",
                  "TrailingUnit": "k",
                  "Function": "SUM"
                },
                "TrendTitle": "20%",
                "TrendImage": ""
              },
              "SelectedItem": {
                "Title": "Sales for Feb",
                "Value": {
                  "LeadingUnit": "$",
                  "TrailingUnit": "k"
                },
                "TrendTitle": "10%",
                "TrendImage": "",
                "SelectedIndex": 2
              }
            }
          }
        }
      ]
    }
  ]
}
```

### Chart Content page - Static - Minimal - Interactive
```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": [
                "2017",
                "2018"
              ],
              "SeriesColor": [
                "#0f0f0f",
                "#ffffff"
              ],
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
              "CategoryTitles": ["Jan", "Feb", "Mar"],
              "TrendItems":[
                {
                  "TrendTitle": "5%",
                  "TrendImage": ""
                },
                {
                  "TrendTitle": "30%",
                  "TrendImage": ""
                },
                {
                  "TrendTitle": "20%",
                  "TrendImage": ""
                }
                ]
            },
            "SummaryView": {
              "AggregateItem": {
                "Title": "Total Sales",
                "TrendTitle": "20%",
                "TrendImage": ""
              }
            }
          }
        }
      ]
    }
  ]
}
```


### Chart Content page - Static - Minimal - ReadOnly

```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "IsReadOnly": true,
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": [
                "2017",
                "2018"
              ],
              "SeriesColor": [
                "#0f0f0f",
                "#ffffff"
              ],
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
              "CategoryTitles": ["Jan", "Feb", "Mar"],
            },
            "SummaryView": {
              "AggregateItem": {
                "Title": "Total Sales",
                "TrendTitle": "20%",
                "TrendImage": ""
              },
              "SelectedItem": {
                "Title": "Sales for Feb",
                "TrendTitle": "10%",
                "TrendImage": "",
                "SelectedIndex": 2
              }
            }
          }
        }
      ]
    }
  ]
}
```

### Chart Content page - Dynamic - Interactive
```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": "{SeriesTitles}",
              "SeriesColor": "{SeriesColor}",
              "Data": "{DataPoints}",
              "CategoryTitles": "{CategoryTitles}"
            },
            "SummaryView": {
              "AggregateItem": {
                "Title": "Total Sales",
                "TrendTitle": "20%",
                "TrendImage": ""
              }
            },
            "Target": {
              "EntitySet": "MySalesOrders",
              "Service": "/MDKDevApp/Services/Amw.service"
            }
          }
        }
      ]
    }
  ]
}
```

### Chart Content page - Dynamic - ReadOnly

```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "IsReadOnly": true,
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": "{SeriesTitles}",
              "SeriesColor": "{SeriesColor}",
              "Data": "{DataPoints}",
              "CategoryTitles": "{CategoryTitles}",
            },
            "SummaryView": {
              "AggregateItem": {
                "Title": "Total Sales",
                "TrendTitle": "20%",
                "TrendImage": ""
              },
              "SelectedItem": {
                "Title": "Sales for Feb",
                "TrendTitle": "10%",
                "TrendImage": "",
                "SelectedIndex": 2
              }
            },
            "Target": {
              "EntitySet": "MySalesOrders",
              "Service": "/MDKDevApp/Services/Amw.service"
            }
          }
        }
      ]
    }
  ]
}
```

### Chart Content Page - Static - Interactive - with a PlaceholderText and no Chart Data
```json
{
  "_Type": "Page",
  "_Name": "ChartContentSectionPage",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.ChartContent",
          "ChartContent": {
            "Title": "Sales categorized by Months",
            "Subtitle": "Displaying sales in $",
            "StatusText": "8h ago",
            "ChartView": {
              "ChartType": "Column",
              "SeriesTitles": [
                "2017",
                "2018"
              ],
              "SeriesColor": [
                "#0f0f0f",
                "#ffffff"
              ],
              "CategoryTitles": ["Jan", "Feb", "Mar"],
              "TrendItems":[
                {
                  "TrendTitle": "5%",
                  "TrendImage": ""
                },
                {
                  "TrendTitle": "30%",
                  "TrendImage": ""
                },
                {
                  "TrendTitle": "20%",
                  "TrendImage": ""
                }
                ],
              "NoDataText":"No chart data available",
              "CategoryAxisTitle": "Months",
              "ValueAxisTitle": "Sales"
            },
            "SummaryView": {
              "SeriesTitles": [
                "Sales for 2017",
                "Sales for 2018"
              ],
              "AggregateItem": {
                "Title": "Total Sales",
                "Value": {
                  "LeadingUnit": "$",
                  "Metrics": [
                    "200",
                    "300"
                  ],
                  "TrailingUnit": "k"
                },
                "TrendTitle": "20%",
                "TrendImage": ""
              }
            },
            "Styles": {
              "NoDataText": "ChartNoDataText"
            }
          }
        }
      ]
    }
  ]
}
```

### Style Classes Definition
```css
/* Chart Content- Chart NoDataText */
.ChartNoDataText {
  color: red;
  font-size: 10;
}
```