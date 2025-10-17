## Close Offline OData

### CloseOffline.action

```json
{
	"_Type": "Action.Type.OfflineOData.Close",
	"Service": "/MDKSampleApp/Services/SampleService.service",
	"Force": true,
	"ActionResult": {
		"_Name": "close"
	},
	"OnSuccess": "/MDKSampleApp/Actions/OData/CloseOfflineSuccessMessage.action",
	"OnFailure": "/MDKSampleApp/Actions/OData/CloseOfflineFailureMessage.action"
}
```

## On Success

### CloseOfflineSuccessMessage.action

```json
{
	"Message": "OData Offline Store closed successfully",
	"NumberOfLines": 1,
	"Duration": 3,
	"_Type": "Action.Type.ToastMessage"
}
```

## On Failure

### CloseOfflineFailureMessage.action

```json
{
	"Message": "Failure closing data service - {{#ActionResults:close/#Property:error}}",
	"NumberOfLines": 1,
	"Duration": 3,
	"_Type": "Action.Type.ToastMessage"
}
```