## Upload OData Media 

### UploadProductMedia.action

```json
{
    "_Type": "Action.Type.ODataService.UploadMedia",
    "Target": {
        "Service": "/MDKSampleApp/Services/SampleService.service",
        "EntitySet": "Products",
        "ReadLink": "{@odata.readLink}"
    },
    "Media":"#Control:Attachment/#Value",
    "ActionResult": { "_Name": "OData" },
    "OnSuccess": "/MDKSampleApp/Actions/ClosePage.action",
    "OnFailure": "/MDKSampleApp/Rules/Failure.js"
}
```

### Failure.js

```js
export default function Failure(context) {
  var actionResult = context.getActionResult('OData');

  let message = actionResult ? actionResult.error : 'Failure'
  return context.executeAction({
    "Name": "/MDKSampleApp/Actions/Messages/Failure.action",
    "Properties": {
      "Message": message,
    }
  });
}
```
### Failure.action

```json
{
    "_Type" : "Action.Type.Message",
    "Message" : "#ActionResults:OData/#Property:error",
    "Title" : "OData Error",
    "OKCaption" : "OK"
}
```

