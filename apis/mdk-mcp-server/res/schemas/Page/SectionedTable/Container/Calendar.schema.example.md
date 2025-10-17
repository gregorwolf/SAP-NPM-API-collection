
----
## Examples

# static indicators

```json
{
  "Caption": "Calendar Section",
  "OnLoaded": "/MDKDevApp/Rules/Calendar/InitializeCalendarProps.js",
  "ActionBar":{
    "Items":[
      {
        "Position":"right",
        "Caption":"Get Date",
        "OnPress": "/MDKDevApp/Rules/Calendar/GetSelectedDate.js"
      }
    ]
  },
  "Controls" : [
    {
      "Sections": [
        {
          "Header": {
            "Caption": "Calendar Section"
          },
          "CalendarType": "Week",
          "StartDayOfWeek": "Mon",
          "StartDate": "2023-01-01T00:00:00Z",
          "EndDate": "#Page:CalendarPage/#ClientData/#Property:CalendarEndDate",
          "IsPersistentSelection": false,
          "SelectedDate": "2023-08-01T00:00:00Z",
          "OnSelectedDateChange": "/MDKDevApp/Actions/Messages/Message.action",
          "Styles": {
            "Calendar": "Calendar",
            "ExpandableHandle": "CalendarExpandableHandle",
            "Buttons": "CalendarButtons",
            "InnerMonthLabel": "CalendarInnerMonthLabel",
            "WeekDayLabel": "CalendarWeekDayLabel",
            "Header": "CalendarHeader",
            "Dates": "CalendarDates"
          },
          "Indicators": [
            {
              "Icon": "font://&#xe011;",
              "Title": "Due Date",
              "Styles": {
                "Icon": "OrangeColor"
              },
              "_Name": "DueDateIndicator"
            },
            {
              "Icon": "/MDKDevApp/Images/icon.png",
              "Title": "Start Date",
              "_Name": "StartDateIndicator"
            }
          ],
          "Events": [
            {
              "Date": "2025-06-30T08:00:00",
              "Indicator": "DueDateIndicator"
            },
            {
              "Date": "2025-06-01T08:00:00",
              "Indicator": "StartDateIndicator"
            }
          ],
          "_Name": "CalendarSection1",
          "_Type": "Section.Type.Calendar"
        }
      ],
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "CalendarPage"
}
```

# dynamic indicators

```json
{
  "Caption": "Calendar Section",
  "OnLoaded": "/MDKDevApp/Rules/Calendar/InitializeCalendarProps.js",
  "ActionBar":{
    "Items":[
      {
        "Position":"right",
        "Caption":"Get Date",
        "OnPress": "/MDKDevApp/Rules/Calendar/GetSelectedDate.js"
      }
    ]
  },
  "Controls" : [
    {
      "Sections": [
        {
          "Header": {
            "Caption": "Calendar Section"
          },
          "CalendarType": "Week",
          "StartDayOfWeek": "Mon",
          "StartDate": "2023-01-01T00:00:00Z",
          "EndDate": "#Page:CalendarPage/#ClientData/#Property:CalendarEndDate",
          "IsPersistentSelection": false,
          "SelectedDate": "2023-08-01T00:00:00Z",
          "OnSelectedDateChange": "/MDKDevApp/Actions/Messages/Message.action",
          "Styles": {
            "Calendar": "Calendar",
            "ExpandableHandle": "CalendarExpandableHandle",
            "Buttons": "CalendarButtons",
            "InnerMonthLabel": "CalendarInnerMonthLabel",
            "WeekDayLabel": "CalendarWeekDayLabel",
            "LegendLabel": "LegendLabel",
            "Header": "CalendarHeader",
            "Dates": "CalendarDates"
          },
          "Indicators": [
            {
              "Icon": "font://&#xe011;",
              "Title": "Due Date",
              "Styles": {
                "Icon": "OrangeColor"
              },
              "_Name": "DueDateIndicator"
            },
            {
              "Icon": "/MDKDevApp/Images/icon.png",
              "Title": "Start Date",
              "_Name": "StartDateIndicator"
            }
          ],
          "Event": {
            "IndicatorName": "/MDKDevApp/Rules/Calendar/GetIndicatorName.js"
          },
          "Targets": [
            {
              "EntitySet": "MyWorkOrderHeaders",
              "Service": "/MDKDevApp/Services/Amw.service",
              "QueryOptions": "$filter=OrderType ne 'PM02'",
              "DateProperties": [
                "CreationDate",
                "DueDate"
              ]
            },
            {
              "EntitySet": "MyWorkOrderOperations",
              "Service": "/MDKDevApp/Services/Amw.service",
              "DateProperties": [
                "SchedEarliestStartDate",
                "SchedEarliestEndDate"
              ]
            }
          ],
          "_Name": "CalendarSection1",
          "_Type": "Section.Type.Calendar"
        }
      ],
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "CalendarDynamicPage"
}
```
### GetIndicatorName.js
```js
export default function GetIndicatorName(context) {
  let matchedDate = context.binding.Date;
  console.log("Matched Date:", matchedDate);
  let entitySets = context.binding.EntitySets;
  if (entitySets.MyWorkOrderHeaders && entitySets.MyWorkOrderHeaders.length > 0) {
    return "DueDateIndicator";
  } else if (entitySets.MyWorkOrderOperations && entitySets.MyWorkOrderOperations.length > 0) {
    return "StartDateIndicator";
  } else {
    return null;
  }
}
```


## Calendar Date Range Example


```json
{
  "Caption": "Calendar Section",
  "OnLoaded": "/MDKDevApp/Rules/Calendar/InitializeCalendarProps.js",
  "ActionBar":{
    "Items":[
      {
        "Position":"right",
        "Caption":"Get Date",
        "OnPress": "/MDKDevApp/Rules/Calendar/GetSelectedDate.js"
      }
    ]
  },
  "Controls" : [
    {
      "Sections": [
        {
          "Header": {
            "Caption": "Calendar Section"
          },
          "CalendarType": "DateRange",
          "StartDayOfWeek": "Mon",
          "StartDate": "2023-01-01T00:00:00Z",
          "EndDate": "#Page:CalendarPage/#ClientData/#Property:CalendarEndDate",
          "IsPersistentSelection": false,
          "Height": 700,
          "SelectedDateRange": {
            "StartDate": "2025-08-01T00:00:00Z",
            "EndDate": "2025-08-09T00:00:00Z",,
          },
          "OnSelectedDateRangeChange": "/MDKDevApp/Actions/Messages/Message.action",
          "Styles": {
            "Calendar": "Calendar",
            "Dates": "CalendarDates"
          },
          "_Name": "CalendarSection1",
          "_Type": "Section.Type.Calendar"
        }
      ],
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ],
  "_Type": "Page",
  "_Name": "CalendarPage"
}
```

### Style Classes Definition
```css

.Calendar {
  background-color: #ffe6e6;
}

/* Android Only */
.CalendarButtons {
  background-color: blue;
  font-color: red;
}

/* Android Only */
.CalendarExpandableHandle {
  color: black;
}

/* iOS Only */
.CalendarInnerMonthLabel {
  font-color: blue;
  font-style: largeTitle;
}

.CalendarWeekDayLabel {
  font-color: black;
  font-color-highlighted: purple; /* iOS Only */
  font-style: title3; /* iOS Only */
  font-typeface: italic; /* Android Only */
  font-size: 32; /* Android Only */
}

.LegendLabel {
  font-color: red;
}

.CalendarHeader {
  background-color: green;
  font-color: blue;
  font-style: largeTitle; /* iOS Only */
  font-typeface: italic; /* Android Only */
  font-size: 32; /* Android Only */
}

.CalendarDates {
  font-color: blue;
  font-style: body; /* iOS Only */
  font-typeface: italic; /* Android Only */
  font-size: 14; /* Android Only */
  ripple-color: red; /* Android Only */

  font-color-highlighted: purple;
  font-style-highlighted: title3; /* iOS Only */
  font-typeface-highlighted: bold; /* Android Only */
  font-size-highlighted: 18; /* Android Only */
  border-color-highlighted: black; /* Android Only */

  background-color-selected: @mdkYellow1;
  background-color-range-selected: @mdkGreen3; /* Android Only */
  font-color-selected: red;
  font-style-selected: callout; /* iOS Only */
  font-typeface-selected: bold; /* Android Only */
  font-size-selected: 20; /* Android Only */
  border-color-selected: cyan; /* Android Only */
  ripple-color-selected: blue; /* Android Only */

  font-color-enabled: #895600;
  font-style-enabled: footnote; /* iOS Only */
  font-typeface-enabled: italic; /* Android Only */
  font-size-enabled: 11; /* Android Only */
}

.OrangeColor {
  color: #f8a509;
}

.RedColor {
  font-color: red;
}

```