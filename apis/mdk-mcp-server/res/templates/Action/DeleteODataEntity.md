## OData DeleteEntity Action

### Product_DeleteEntity.action

```json
{
	"ActionResult": {
		"_Name": "productDelete"
	},
	"OnFailure": "/MDKSampleApp/Actions/Products/ProductDeleteFailed.action",
	"OnSuccess": "/MDKSampleApp/Actions/Products/ProductDeleteSuccess.action",
	"Target": {
		"EntitySet": "Products",
		"ReadLink": "{@odata.readLink}",
		"Service": "/MDKSampleApp/Services/SampleService.service"
	},
	"_Type": "Action.Type.ODataService.DeleteEntity"
}
```

## OnSuccess

### ProductDeleteSuccess.action
```json
{
	"Animated": true,
	"Duration": 6,
	"IsIconHidden": true,
	"MaxNumberOfLines": 3,
	"Message": "Product deleted successfully",
	"_Type": "Action.Type.ToastMessage"
}
```

## OnFailure

### ProductDeleteFailed.action

```json
{
	"Animated": true,
	"Duration": 8,
	"MaxNumberOfLines": 3,
	"Message": "Product delete failed - {{#ActionResults:productDelete/#Property:error}}",
	"OnSuccess": "/MDKSampleApp/Actions/ClosePage.action",
	"_Type": "Action.Type.ToastMessage"
}
```