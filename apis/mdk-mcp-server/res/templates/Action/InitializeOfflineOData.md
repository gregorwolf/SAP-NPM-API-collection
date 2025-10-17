## Initialize Offline OData

### InitializeOfflineOData.action

```json
{
	"_Type": "Action.Type.OfflineOData.Initialize",
	"Service": "/MDKSampleApp/Services/SampleService.service",
	"ActionResult": {
		"_Name": "_ODataInitializeResult"
	},
	"DefiningRequests": [
		{
			"Name": "Products",
			"Query": "Products"
		},
		{
			"Name": "Suppliers",
			"Query": "Suppliers"
		}, 
		{
			"Name": "Customers",
			"Query": "Customers"
		}, 
		{
			"Name": "PurchaseOrderHeaders",
			"Query": "PurchaseOrderHeaders"
		}, 
		{
			"Name": "PurchaseOrderItems",
			"Query": "PurchaseOrderItems"
		}, 
		{
			"Name": "ProductCategories",
			"Query": "ProductCategories"
		}, 
		{
			"Name": "SalesOrderHeaders",
			"Query": "SalesOrderHeaders"
		}, 
		{
			"Name": "SalesOrderItems",
			"Query": "SalesOrderItems"
		}
	],
	"ShowActivityIndicator": true,
	"ActivityIndicatorText": "Initializing Sample Data. Please wait...",
	"OnSuccess": "/MDKSampleApp/Actions/Service/InitializeODataSuccess.action",
	"OnFailure": "/MDKSampleApp/Actions/Service/InitializeODataFailed.action"
}
```

## OnSuccess

### InitializeODataSuccess.action

```json
{
	"Duration": 3,
	"MaxNumberOfLines": 2,
	"Message": "Initialing SampleService Success",
	"_Type": "Action.Type.ToastMessage"
}
```

## OnFailure 

### InitializeODataFailed.action

```json
{
	"Message": "Initializing Sample Service Failed due to an error {{#ActionResults:_ODataInitializeResult/#Property:error}}",
	"OKCaption": "OK",
	"Title": "Error",
	"_Type": "Action.Type.Message"
}
```
