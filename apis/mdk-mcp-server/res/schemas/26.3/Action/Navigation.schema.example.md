
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

When this action gets executed successfully, the ActionResult is a [NavigationEntry](https://docs.nativescript.org/api-reference/interfaces/_ui_frame_.navigationentry). Otherwise, it is an error message.

----
## Examples

```json
// Navigation.action (use PageMetadata)
{
    "PageToOpen": "/MDKApp/Pages/Dummy.page",
    "PageMetadata": "{ \"Caption\": \"PageMetadata Test\", \"_Type\": \"Page\", \"_Name\": \"PageMetadataTest\", \"Controls\": [ { \"Sections\": [ { \"Header\": { \"Caption\": \"Actions\" }, \"ObjectCells\": [ {  \"ObjectCell\": { \"AccessoryType\": \"disclosureIndicator\", \"Description\": \"another pagemetadata\", \"OnPress\": \"/MDKDevApp/Actions/Navigation/PageMetadata.action\", \"Title\": \"Next Page\" } } ], \"_Name\": \"NavigationActionSection\", \"_Type\": \"Section.Type.ObjectTable\" } ], \"_Type\": \"Control.Type.SectionedTable\", \"_Name\": \"NavigationActionSectionTable\" } ] }",
    "Type": "Action.Type.Navigation"
}
```

```json
// Navigation.action (use PageMetadata object)
{
    "PageToOpen": "/MDKApp/Pages/Dummy.page",
    "PageMetadata": {
        "Caption": "PageMetadata Test",
        "_Type": "Page",
        "_Name": "PageMetadataTest",
        "Controls": [{
            "Sections": [{
            "Header": {
                "Caption": "Actions"
            },
            "ObjectCells": [{
                "ObjectCell": {
                "AccessoryType": "disclosureIndicator",
                "Description": "another pagemetadata",
                "OnPress": "/MDKDevApp/Actions/Navigation/PageMetadata.action",
                "Title": "Next Page"
                }
            }],
            "_Name": "NavigationActionSection",
            "_Type": "Section.Type.ObjectTable"
            }],
            "_Type": "Control.Type.SectionedTable",
            "_Name": "NavigationActionSectionTable"
        }]
    },
    "Type": "Action.Type.Navigation"
}
```

```json
// Navigation.action (default transition)
{
    "PageToOpen": "/MDKApp/Pages/ListPage.page",
    "Type": "Action.Type.Navigation"
}
```

```json
// Navigation.action (fade transition)
{
    "PageToOpen": "/MDKApp/Pages/ListPage.page",
    "Type": "Action.Type.Navigation",
    "Transition": {
        "Curve": "Linear",
        "Duration": 2,
        "Name": "Fade"
    }
}
```

```json
// Navigation.action (NO transition)
{
    "PageToOpen": "/MDKApp/Pages/ListPage.page",
    "Type": "Action.Type.Navigation",
    "Transition": {
        "Name": "None"
    }
}
```

```json
// Navigation.action (BackStackVisible false)
{
    "PageToOpen": "/MDKApp/Pages/ListPage.page",
    "Type": "Action.Type.Navigation",
    "BackStackVisible": false
}
```
