
----
##Example

### Static
```json
{
    "_Type": "Page",
    "_Name": "TimelineSectionPage",
    "Caption": "Timeline section Page",
    "Controls": [
        {
            "_Type": "Control.Type.SectionedTable",
            "_Name": "SectionedTable",
            "Sections": [
                {
                    "_Type": "Section.Type.Timeline",
                    "_Name": "StaticTimelineSection",
                    "Visible": true,
                    "Cells": [
                        {
                            "Cell": {
                                "Headline": "Start It",
                                "Timestamp": "2022-01-01T11:40:00Z",
                                "State": "Start"
                            }
                        },
                        {
                            "Cell": {
                                "Headline": "Applied Statistics",
                                "Subhead": "Class",
                                "Attribute": "Room 5461",
                                "Timestamp": "2022-01-02T14:20:00Z",
                                "State": "Complete",
                                "OnPress": "/MDKDevApp/Actions/Toast/Success.action"
                            }
                        },
                        {
                            "Cell": {
                                "Headline": "Numberic Analysis",
                                "Subhead": "Class",
                                "Attribute": "Room 4223",
                                "Timestamp": "2022-06-02T09:30:00Z",
                                "State": "Open",
                                "OnPress": "/MDKDevApp/Actions/Toast/Success.action"
                            }
                        },
                        {
                            "Cell": {
                                "Headline": "Complete Event",
                                "Timestamp": "2023-02-02T17:30:00Z",
                                "State": "End"
                            }
                        },
                        {
                            "Cell": {
                                "Headline": "Today Test",
                                "Subhead": "Class",
                                "Attribute": "Room 8888",
                                "Timestamp": "/MDKDevApp/Rules/timeline/GetToday.js",
                                "State": "Open",
                                "OnPress": "/MDKDevApp/Actions/Toast/Success.action"
                            }
                        }
                    ],
                    "TimestampType": "MonthDayTime"
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
    "_Name": "TimelineSectionPage",
    "Caption": "Timeline section Page",
    "Controls": [
        {
            "_Type": "Control.Type.SectionedTable",
            "_Name": "SectionedTable",
            "Sections": [
                {
                    "_Type": "Section.Type.Timeline",
                    "_Name": "DynamicTimelineSection",
                    "Visible": true,
                    "Cell": {
                        "Headline": "{OrderDescription}",
                        "Subhead": "{OrderId}",
                        "Attribute": "{Priority}",
                        "Timestamp": "{CreationDate}",
                        "State": "/MDKDevApp/Rules/timeline/TimestampState.js",
                        "OnPress": "/MDKDevApp/Actions/Toast/Success.action"
                    },
                    "Target": {
                        "EntitySet": "MyWorkOrderHeaders",
                        "Service": "/MDKDevApp/Services/Amw.service",
                        "QueryOptions": "$top=20"
                    },
                    "TimestampType": "DayTime"
                }
            ]
        }
    ]
}
```
