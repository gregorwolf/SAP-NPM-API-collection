## PushNotification Un-register

### UnregisterFromPush.action

```json
{
    "_Type": "Action.Type.PushNotificationUnregister",
	"OnFailure": "/MDKSampleApp/Actions/UnregisterFailed.action",
	"OnSuccess": "/MDKSampleApp/Actions/UnregisterSuccess.action"
}
```

## On Success

### UnregisterSuccess.action

```json
{
	"Message": "Push Unregister Succeed",
	"OKCaption": "OK",
	"Title": "Success",
	"_Type": "Action.Type.Message"
}
```

## On Failure

### UnregisterFailed.action

```json
{
	"Message": "Push Unregister Failed",
	"OKCaption": "OK",
	"Title": "Error",
	"_Type": "Action.Type.Message"
}
```