## Calendar Control

### CalendarSample.page

```json
{
	"Caption": "Calendar Sample",
	"Controls": [
		{
			"Sections": [
				{
					"CalendarType": "/MDKSampleApp/Rules/Calendar/GetPropertyValue.js",
					"StartDayOfWeek": "/MDKSampleApp/Rules/Calendar/GetPropertyValue.js",
					"StartDate": "/MDKSampleApp/Rules/Calendar/GetPropertyValue.js",
					"EndDate": "/MDKSampleApp/Rules/Calendar/GetPropertyValue.js",
					"IsPersistentSelection": "/MDKSampleApp/Rules/Calendar/GetPropertyValue.js",
					"SelectedDate": "/MDKSampleApp/Rules/Calendar/GetPropertyValue.js",
					"OnSelectedDateChange": "/MDKSampleApp/Rules/Calendar/OnSelectedDateChange.js",
					"_Name": "calendarSection",
					"_Type": "Section.Type.Calendar"
				},
				{
					"Header": {
						"Caption": "Calendar Settings",
						"UseTopPadding": false
					},
					"Controls":[
						{
							"Caption": "Calendar Type",
							"Value": "Month",
							"IsVisible": true,
							"Separator": true,
							"OnValueChange": "/MDKSampleApp/Rules/Calendar/RedrawCalendarSection.js",
							"IsEditable": true,
							"ApportionsSegmentWidthsByContent": true,
							"Segments": [
								"Month",
								"Week",
								"Expandable"
							],
							"_Type": "Control.Type.FormCell.SegmentedControl",
							"_Name": "CalendarType"
						},
						{
							"Caption": "Start Day of Week",
							"Value": "Sun",
							"IsVisible": true,
							"Separator": true,
							"OnValueChange": "/MDKSampleApp/Rules/Calendar/RedrawCalendarSection.js",
							"IsEditable": true,
							"ApportionsSegmentWidthsByContent": false,
							"Segments": [
								"Sun",
								"Mon",
								"Sat"
							],
							"_Type": "Control.Type.FormCell.SegmentedControl",
							"_Name": "StartDayOfWeek"
						},
						{
							"Caption": "Start Date Limit",
							"IsVisible": "#Page:-Current/#ClientData/#Property:IsLimitingCalendarDisplayedDateRange",
							"Separator": true,
							"IsEditable": true,
							"Mode": "Date",
							"OnValueChange": "/MDKSampleApp/Rules/Calendar/RedrawCalendarSection.js",
							"_Type": "Control.Type.FormCell.DatePicker",
							"_Name": "StartDate"

						},
						{
							"Caption": "End Date Limit",
							"IsVisible": "#Page:-Current/#ClientData/#Property:IsLimitingCalendarDisplayedDateRange",
							"Separator": true,
							"IsEditable": true,
							"Mode": "Date",
							"OnValueChange": "/MDKSampleApp/Rules/Calendar/RedrawCalendarSection.js",
							"_Type": "Control.Type.FormCell.DatePicker",
							"_Name": "EndDate"
						},
						{
							"Caption": "Is Persistent Selection",
							"Value": false,
							"IsVisible": true,
							"Separator": true,
							"OnValueChange": "/MDKSampleApp/Rules/Calendar/RedrawCalendarSection.js",
							"IsEditable": true,
							"_Type": "Control.Type.FormCell.Switch",
							"_Name": "TogglePersistentSelection"
						},
						{
							"Caption": "Limit Calendar's Displayed Date Range",
							"Value": false,
							"IsVisible": true,
							"Separator": true,
							"OnValueChange": "/MDKSampleApp/Rules/Calendar/ToggleCalendarLimitDisplayedDateRange.js",
							"_Type": "Control.Type.FormCell.Switch",
							"_Name": "ToggleLimitDisplayedDateRange",
							"IsEditable": true
						},
						{
							"Caption": "Default Selected Date",
							"IsVisible": true,
							"Separator": true,
							"IsEditable": true,
							"Mode": "Date",
							"_Type": "Control.Type.FormCell.DatePicker",
							"_Name": "DefaultSelectedDate",
							"OnValueChange": "/MDKSampleApp/Rules/Calendar/RedrawCalendarSection.js"
						}


					],
					"_Name": "settingSection",
					"_Type": "Section.Type.FormCell"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "CalendarSample",
	"_Type": "Page"
}
```

### GetPropertyValue.js

```js
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function GetPropertyValue(clientAPI) {
    const property = clientAPI.getProperty();
    let pageProxy = clientAPI.getPageProxy();
    let pageClientData = pageProxy.getClientData();

    switch (property) {
        case 'HeaderCaption':
            return pageClientData['CalendarType'];
        case 'CalendarType':
            return pageClientData['CalendarType'];
        case 'StartDayOfWeek':
            return pageClientData['CalendarStartDayOfWeek'];
        case 'StartDate':
            return pageClientData['CalendarStartDate'];
        case 'EndDate':
            return pageClientData['CalendarEndDate'];
        case 'IsPersistentSelection':
            return pageClientData['CalendarIsPersistentSelection'];
        case 'SelectedDate':
            return pageClientData['CalendarDefaultSelectedDate'];
    }
}
```

### OnSelectedDateChange.js

```js
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function OnSelectedDateChange(clientAPI) {
    return clientAPI.executeAction(
    {
        "Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
        "Properties":{
            "Duration": 3,
            "Message":"Triggered OnSelectedDateChanged! for current "+ clientAPI.getType() +"!"
        }
    })
}
```

### RedrawCalendarSection.js

```js
export default function RedrawCalendarSection(clientAPI) {
  let pageProxy = clientAPI.getPageProxy();
  let pageClientData = pageProxy.getClientData();
  let sectionTableProxy = pageProxy.getControl('SectionedTable0');
  let formCellSectionProxy = sectionTableProxy.getSection('settingSection');

  pageClientData['CalendarType'] = formCellSectionProxy.getControl('CalendarType').getValue()[0].ReturnValue;
  pageClientData['CalendarStartDayOfWeek']  = formCellSectionProxy.getControl('StartDayOfWeek').getValue()[0].ReturnValue;
  pageClientData['CalendarIsPersistentSelection']  = formCellSectionProxy.getControl('TogglePersistentSelection').getValue();
  pageClientData['CalendarDefaultSelectedDate']  = formCellSectionProxy.getControl('DefaultSelectedDate').getValue();

  if (pageClientData['IsLimitingCalendarDisplayedDateRange']) {
    pageClientData['CalendarStartDate']  = formCellSectionProxy.getControl('StartDate').getValue();
    pageClientData['CalendarEndDate']  = formCellSectionProxy.getControl('EndDate').getValue();
  }
  else {
    pageClientData['CalendarStartDate']  = null;
    pageClientData['CalendarEndDate']  = null;
  }

  let redrawWhere = sectionTableProxy.getSection('calendarSection');
  switch (pageClientData['RedrawWhere']){
    case 'SectionTable':
      redrawWhere = sectionTableProxy;
      break;
    case 'Page':
      redrawWhere = pageProxy;
      break;
    case 'Section':
      redrawWhere = sectionTableProxy.getSection('calendarSection');
  }

  return redrawWhere.redraw(true);
}
```

### ToggleCalendarLimitDisplayedDateRange.js

```js
import RedrawCalendarSection from "./RedrawCalendarSection";

export default function ToggleCalendarLimitDisplayedDateRange(context) {
  let pageProxy = context.getPageProxy();
  let pageClientData = context.getPageProxy().getClientData();
  let sectionTableProxy = pageProxy.getControl('SectionedTable0');
  let formCellSectionProxy = sectionTableProxy.getSection('settingSection');

  pageClientData['IsLimitingCalendarDisplayedDateRange'] = context.getValue();
  
  formCellSectionProxy.getControl('StartDate').visible = context.getValue();
  formCellSectionProxy.getControl('EndDate').visible = context.getValue();
  if (!context.getValue())
  {
    pageClientData['CalendarStartDate'] = null;
    pageClientData['CalendarEndDate'] = null;
  }
  RedrawCalendarSection(context);
}
```