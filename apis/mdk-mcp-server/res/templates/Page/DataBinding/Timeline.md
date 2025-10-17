## Timeline Control

### MaintenanceTimeline.page

```json
{
	"Caption": "Maintenance Timeline",
	"Controls": [
		{
			"Sections": [
				{
					"Cell": {
						"Headline": "{TaskHeader}",
						"Subhead": "{TaskType}",
						"State": "{TaskState}",
						"Attribute": "{TaskDescription}",
						"Timestamp": "{Timeframe}",
						"OnPress": {
							"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
							"Properties": {
								"Message": "{TaskDescription}"
							}
						}
					},
					"Target": "/MDKSampleApp/Rules/MaintenceTimeline/GetTimelineData.js",
					"_Name": "timelineSection",
					"_Type": "Section.Type.Timeline"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "MaintenanceTimeline",
	"_Type": "Page"
}
```


### GetTimelineData.js

```js
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
 export default function GetTimelineData(context) {
    return [
        {
            "TaskHeader": "Created",
            "TaskType": "Maintenance Order 12991",
            "TaskState": "Start",
            "TaskDescription": "Order Created",
            "Timeframe": "2022-04-03T15:37:11"
        },
        {
            "TaskHeader": "Reviewed",
            "TaskType": "Maintenance Order 12991",
            "TaskState": "Complete",
            "TaskDescription": "Order Reviewed",
            "Timeframe": "2022-04-04T16:12:58"
        },
        {
            "TaskHeader": "Assigned",
            "TaskType": "Maintenance Order 12991",
            "TaskState": "Complete",
            "TaskDescription": "Technician Assigned",
            "Timeframe": "2022-04-04T17:03:12"
        },
        {
            "TaskHeader": "On-Site",
            "TaskType": "Maintenance Order 12991",
            "TaskState": "Open",
            "TaskDescription": "Arrived at On-Site",
            "Timeframe": "2022-04-04T19:44:09"
        },
        {
            "TaskHeader": "Identified",
            "TaskType": "Maintenance Order 12991",
            "TaskState": "Open",
            "TaskDescription": "Root-cause found",
            "Timeframe": "2022-04-04T20:14:30"
        },
        {
            "TaskHeader": "Replacement Required",
            "TaskType": "Maintenance Order 12991",
            "TaskState": "Open",
            "TaskDescription": "Parts replacement is required",
            "Timestamp": "2022-04-04T20:30:00"
        },
        {
            "TaskHeader": "Job Done",
            "TaskType": "Maintenance Order 12991",
            "TaskState": "End",
            "TaskDescription": "Parts replace to complet order",
            "Timeframe": "2022-04-15T15:37:20"
        }
    ];
}
```