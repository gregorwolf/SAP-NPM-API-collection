
----
## Examples


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

```