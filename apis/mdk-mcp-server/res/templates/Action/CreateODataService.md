## OData Create for Online

### CreateOnlineStore.action

```json
{
	"OnFailure": "/MDKSampleApp/Actions/OData/CreateOnlineStoreFailed.action",
	"OnSuccess": "/MDKSampleApp/Actions/OData/OpenOnlineStore.action",
	"Service": "/MDKSampleApp/Services/SampleService.service",
	"_Type": "Action.Type.ODataService.Create",
	"ShowActivityIndicator": true,
	"ActivityIndicatorText": "Creating Online Store. Please wait..."
}
```

## On Failure

### CreateOnlineStoreFailed.action

```json
{
	"Message": "Create Online Store Failed",
	"OKCaption": "OK",
	"Title": "Error",
	"_Type": "Action.Type.Message"
}
```



