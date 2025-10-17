## Delete OData Media

### DeleteMedia.action

```json
{
  "_Type": "Action.Type.ODataService.DeleteMedia",
  "Target" : {
    "EntitySet" : "Images",
    "Service": "/MDKDevApp/Services/Media.service",
    "QueryOptions": "/MDKDevApp/Rules/OData/Media/GetImageQueryOptions.js"
  },
  "ShowActivityIndicator" : true,
  "ActionResult" : { "_Name" : "OData" },
  "OnSuccess": "/MDKDevApp/Actions/OData/Success.actin",
  "OnFailure": "/MDKDevApp/Actions/Messages/Failure.action"
}
```

## OnSucces

### Success.action
```json
{
	"Animated": true,
	"Duration": 6,
	"Message": "Image deleted successfully",
	"_Type": "Action.Type.ToastMessage"
}
```

## OnFailure

### Failure.action

```json
{
    "_Type" : "Action.Type.Message",
    "Message" : "#ActionResults:OData/#Property:error",
    "Title" : "DeleteMedia Error",
    "OKCaption" : "OK"
}
```