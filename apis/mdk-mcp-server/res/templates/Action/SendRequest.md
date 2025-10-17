## SendRequest REST service action

### SendRequest.action

```json
{
    "_Type": "Action.Type.RestService.SendRequest",

    "Target": {
        "Path": "/inference/deployments/d12580e28539ebfc",
        "RequestProperties": {
        "Method": "POST",
        "Headers": {
            "content-type": "application/json"
        },
        "FetchCSRF": false
        },
        "Service": "/MDKSampleApp/Services/AzureOpenAI.service"
    },
    "ShowActivityIndicator": true,
    "ActivityIndicatorText": "Processing ...",
    "ActionResult": { "_Name" : "OData" },
    "OnFailure": "/MDKSampleApp/Actions/Failure.action"
}
```