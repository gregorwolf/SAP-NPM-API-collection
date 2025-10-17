## LogMessage Logger action

### LogInitialStep.action

```json
{
	"_Type": "Action.Type.Logger.LogMessage",
	"Level": "Info",
	"Message": "Starting to perform initialize step",
	"OnSuccess": "/MDKSampleApp/Actions/Messages/LogSuccessMessage.action",
	"OnFailure": "/MDKSampleApp/Actions/Messages/LogFailureMessage.action"
}
```