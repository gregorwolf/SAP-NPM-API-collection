## Create OData RelatedMedia 

### CreateProductImages.action

```json
{
  "_Type": "Action.Type.ODataService.CreateRelatedMedia",
  "Target" : {
    "EntitySet" : "ProductImages",
    "Service" : "/MDKSampleApp/Services/SampleService.service"
  },
  "Properties" : {
    "Name": "#Control:productName/#Value"
  },
  "ParentLink": {
    "Property": "Images",
    "Target": {
      "EntitySet": "Products",
      "ReadLink": "{@odata.readLink}"
    }
  },
  "Media": "#Control:productImage/#Value",
  "ActionResult" : { "_Name" : "OData" },
  "OnSuccess": "/MDKSampleApp/Actions/Product/ImageCreateSuccess.action",
  "OnFailure": "/MDKSampleApp/Actions/Product/ImageCreateFailed.action"
}
```

## On Success

### ImageCreateSuccess.action

```json
{
    "Message": "Product Image Creation Success",
    "Duration": 3,
    "_Type": "Action.Type.ToastMessage"
}
```

## On Failure

### ImageCreateFailed.action

```json
{
	"_Type": "Action.Type.ToastMessage",
	"Message": "Product Image Creation Failed. {{#ActionResults:OData/#Property:error}}",
	"Duration":10,
	"Animated": true,
	"NumberOfLines":2
}
```