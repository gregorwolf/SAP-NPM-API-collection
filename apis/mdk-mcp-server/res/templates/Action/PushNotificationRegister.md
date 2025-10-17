## PushNotification Register

### RegisterForPush.action

```json
{
    "_Type": "Action.Type.PushNotificationRegister",
	"OnFailure": "/MDKSampleApp/Actions/PushRegisterFailed.action",
	"OnSuccess": "/MDKSampleApp/Actions/PushRegisterSuccess.action",
	"ActionResult":{
		"_Name": "_pushRegister"
	}
}
```

## On Success

### PushRegisterSuccess.action

```json
{
	"Message": "Push Registration Succeed",
	"OKCaption": "OK",
	"Title": "Success",
	"_Type": "Action.Type.Message"
}
```

## On Failure

### PushRegisterFailed.action

```json
{
	"Message": "Push Register Failed. Error {{#ActionResults:_pushRegister/#Property:error}}",
	"OKCaption": "OK",
	"Title": "Error",
	"_Type": "Action.Type.Message"
}
```