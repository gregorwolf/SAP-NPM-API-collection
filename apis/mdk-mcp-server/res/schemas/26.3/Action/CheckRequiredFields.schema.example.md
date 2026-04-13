
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

This action does not have an ActionResult if all the specified controls contain a value. Otherwise, the ActionResult is the array of controls missing a value.

----
## Examples


```json
// CheckRequiredFields.action
{
    "OnFailure": "/MDKApp/Actions/FailureMessage.action",
    "OnSuccess": "/MDKApp/Actions/UpdateService.action",
    "RequiredFields": [
        "OrderDesc",
        "OrderQty",
        "Cost"
    ],
    "_Type": "Action.Type.CheckRequiredFields"
}
```
