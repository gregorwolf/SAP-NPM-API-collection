
----
## Action Result
This action does not have an action result.

----
## Examples

```json
// SetDebugSettings.action
{
    "_Type": "Action.Type.SetDebugSettings",
    "DebugODataProvider": true,    
    "TracingEnabled": true,
    "Categories": [
      "mdk.trace.odata",
      "mdk.trace.profiling",
    ],
    "OnSuccess": "/MDKDevApp/Actions/DebugSettings/SetDebugSettingsSuccess.action",
    "OnFailure": "/MDKDevApp/Actions/DebugSettings/SetDebugSettingsFailed.action"
}
```
