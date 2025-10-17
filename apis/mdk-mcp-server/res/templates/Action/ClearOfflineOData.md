## Clear Offline OData Service

### ClearOfflineOData.action

```json
{
    "_Type": "Action.Type.OfflineOData.Clear",
    "Service": "/MDKSampleApp/Services/SampleService.service",
    "OnSuccess" : "/MDKSampleApp/Actions/OData/ODataClearSuccessMessage.action",
    "OnFailure": "/MDKSampleApp/Actions/OData/ODataClearFailureMessage.action",
    "Force": true
}

```

## On Success

### ODataClearSuccessMessage.action

```json
{
    "Message": "Clear OData service success",
    "Duration": 3,
    "_Type": "Action.Type.ToastMessage"
}
```

## On Failure

### ODataClearFailureMessage.action

```json
{
    "Message": "Failed to clear OData service",
    "NumberOfLines": 2,
    "Duration": 3,
    "_Type": "Action.Type.ToastMessage"
}

```