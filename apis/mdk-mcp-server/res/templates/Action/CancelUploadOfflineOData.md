## Cancel UploadOffline OData

### CancelUploadOffline.action

```json
{
    "Service": "/MDKSampleApp/Services/SampleService.service",
    "_Type": "Action.Type.OfflineOData.CancelUpload",
    "OnSuccess" : "/MDKSampleApp/Actions/OData/CancelUploadODataSuccess.action",
    "OnFailure": "/MDKSampleApp/Actions/OData/CancelUploadODataFailed.action",
}
```

## On Success

### CancelUploadODataSuccess.action

```json
{
    "Message": "Cancel OData upload success",
    "Duration": 3,
    "_Type": "Action.Type.ToastMessage"
}
```

## On Failure

### CancelUploadODataFailed.action

```json
{
    "Message": "Failed to cancel OData upload",
    "NumberOfLines": 2,
    "Duration": 3,
    "_Type": "Action.Type.ToastMessage"
}
```