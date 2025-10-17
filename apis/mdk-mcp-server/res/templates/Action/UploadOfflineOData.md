## Upload Offline OData Action

### UploadOfflineOData.action

```json
{
	"Service": "/MDKSampleApp/Services/SampleService.service",
	"_Type": "Action.Type.OfflineOData.Upload",
	"ActionResult": {
		"_Name": "sync"
	},
	"OnSuccess": "/MDKSampleApp/Actions/Service/DownloadOfflineOData.action",
	"OnFailure": "/MDKSampleApp/Actions/Service/SyncFailureMessage.action"
}
```