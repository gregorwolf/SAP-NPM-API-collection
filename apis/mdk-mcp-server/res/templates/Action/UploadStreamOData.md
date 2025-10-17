## Upload Strean OData 

### UploadStream.action

```json
{
    "_Type": "Action.Type.ODataService.UploadStream",
    "Target": {
        "Service": "/MDKSampleApp/Services/SampleService.service",
        "EntitySet": "Videos",
        "ReadLink": "{@odata.readLink}"
    },
    "Properties": {
        "content": "#Control:Attachment/#Value"
    },
    "ActionResult" : { "_Name" : "OData" },
    "ShowActivityIndicator" : true,
    "OnSuccess": "/MDKSampleApp/Actions/Videos/UploadSuccess.action",
    "OnFailure": "/MDKSampleApp/Actions/Videos/UploadFailure.action"
}
```

## OnSuccess

### UploadSuccess.action

```json
{
	"Animated": true,
	"Duration": 6,
	"MaxNumberOfLines": 3,
	"Message": "New View Upload Successful",
	"OnSuccess": "/MDKSampleApp/Actions/CloseModalPage_Complete.action",
	"_Type": "Action.Type.ToastMessage"
}
```

## OnFailure

### UploadFailure.action

```json
{
	"Animated": true,
	"Duration": 8,
	"MaxNumberOfLines": 3,
	"Message": "Video Upload  Failed - {{#ActionResults:OData/#Property:error}}",
	"_Type": "Action.Type.ToastMessage"
}
```