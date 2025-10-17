## Upload Log 

### UploadLog.action

```json
{
    "_Type" : "Action.Type.Logger.Upload",
    "OnSuccess": "/MDKSampleApp/Actions/Messages/LogSuccessMessage.action",
    "OnFailure": "/MDKSampleApp/Actions/Messages/LogFailureMessage.action"
}
```

## On Success

### LogSuccessMessage.action

```json
{
    "_Type": "Action.Type.Message",
    "Message": "Log uploading was successful!",
    "Title": "Success",
    "OKCaption": "OK"
}
```

## On Failure

### LogFailureMessage.action

```json
{
    "_Type": "Action.Type.Message",
    "Message": "Log upload failed",
    "Title": "Failure",
    "OKCaption": "OK"
}
```
