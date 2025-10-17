## Open OData Service

### OpenOnlineStore.action

```json
{
	"ActivityIndicatorText": "Opening Online Store. Please wait...",
	"OnFailure": "/MDKSampleApp/Actions/OData/OpenOnlineStoreFailed.action",
	"OnSuccess": "/MDKSampleApp/Actions/OData/OpenOnlineStoreSuccess.action",
	"Service": "/MDKSampleApp/Services/SampleService.service",
	"ShowActivityIndicator": true,
	"_Type": "Action.Type.ODataService.Open"
}
```

## On Success

### OpenOnlineStoreSuccess.action

```json
{
	"Duration": 3,
	"Message": "Open Online Store Success",
	"_Type": "Action.Type.ToastMessage"
}
```

## On Failure

### OpenOnlineStoreFailed.action

```json
{
	"Message": "Open Online Store Failed",
	"OKCaption": "OK",
	"Title": "Error",
	"_Type": "Action.Type.Message"
}
```