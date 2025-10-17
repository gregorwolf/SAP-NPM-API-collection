## RemoveDefiningRequest

### RemoveDefiningRequest.action

```json
{
	
	"Service": "/MDKSampleApp/Services/SampleService.service",
	"_Type": "Action.Type.OfflineOData.RemoveDefiningRequest",
	"DefiningRequest": {
    	"Name": "ProductCategories"
  	},
	"ShowActivityIndicator": true,
	"OnSuccess": "/MDKSampleApp/Actions/OData/RemoveDefiningRequestSuccess.action",
	"OnFailure": "/MDKSampleApp/Actions/OData/RemoveDefiningRequestFailure.action"
}
```

## On Success

### RemoveDefiningRequestSuccess.action

```json
{
    "Duration": 3,
    "Message": "ProductCategories has been removed Successful",
    "NumberOfLines": 2,
    "_Type": "Action.Type.ToastMessage"
}
```

## On Failure

### RemoveDefiningRequestFailure.action

```json
{
    "Duration": 3,
    "Message": "Remove ProductCategories from DefiningRequest Failed",
    "NumberOfLines": 2,
    "_Type": "Action.Type.ToastMessage"
}
```