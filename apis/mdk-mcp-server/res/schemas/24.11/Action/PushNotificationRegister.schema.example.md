
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is `null` for demo mode or a push registration token for production mode. The failure ActionResult is an error message.

----
## Examples

```json
{
    "_Type": "Action.Type.PushNotificationRegister",
    "OnSuccess": "/MDKApp/Actions/PushNotification/PushNotificationRegisterSuccessMessage.action",
    "OnFailure": "/MDKApp/Actions/PushNotification/PushNotificationRegisterFailureMessage.action"
}
```
