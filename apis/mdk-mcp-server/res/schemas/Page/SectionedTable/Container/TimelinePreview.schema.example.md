
----
##Example

### Static
```json
{
    "_Type": "Page",
    "_Name": "TimelinePreviewSectionPage",
    "Caption": "TimelinePreview section Page",
    "Controls": [
        {
            "_Type": "Control.Type.SectionedTable",
            "_Name": "SectionedTable",
            "Sections": [
                {
                    "_Type": "Section.Type.TimelinePreview",
                    "_Name": "StaticTimelinePreviewSection",
                    "Visible": true,
                    "Cells": [
                        {
                            "Cell": {
                                "Headline": "Start It",
                                "Timestamp": "2022-01-01T11:40:00Z",
                                "State": "Complete"
                            }
                        },
                        {
                            "Cell": {
                                "Headline": "Applied Statistics",
                                "Timestamp": "2022-01-02T14:20:00Z",
                                "State": "Complete"
                            }
                        },
                        {
                            "Cell": {
                                "Headline": "Numberic Analysis",
                                "Timestamp": "2022-06-02T09:30:00Z",
                                "State": "Open"
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
                                "Timestamp": "/MDKDevApp/Rules/timeline/GetToday.js",
                                "State": "Open"
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
    "_Name": "TimelinePreviewSectionPage",
    "Caption": "Timeline Preview section Page",
    "Controls": [
        {
            "_Type": "Control.Type.SectionedTable",
            "_Name": "SectionedTable",
            "Sections": [
                {
                    "_Type": "Section.Type.TimelinePreview",
                    "_Name": "DynamicTimelinePreviewSection",
                    "Visible": true,
                    "Cell": {
                        "Headline": "{OrderDescription}",
                        "Timestamp": "{CreationDate}",
                        "State": "/MDKDevApp/Rules/timeline/TimestampState.js"
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
