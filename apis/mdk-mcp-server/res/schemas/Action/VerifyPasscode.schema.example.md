
----
## Action Result
This action does not have an action result.

----
## Examples

```json
// VerifyPasscode.action
{
    "Type": "Action.Type.VerifyPasscode",
    "OnFailure": "/MDKApp/Actions/FailureMessage.action",
    "OnSuccess": "/MDKApp/Actions/SuccessMessage.action"
}
```

```json
// VerifyPasscodeNotAllowCancel.action
{
    "Type": "Action.Type.VerifyPasscode",
    "AllowCancel": false,
    "OnFailure": "/MDKApp/Actions/FailureMessage.action",
    "OnSuccess": "/MDKApp/Actions/SuccessMessage.action"
}
```
