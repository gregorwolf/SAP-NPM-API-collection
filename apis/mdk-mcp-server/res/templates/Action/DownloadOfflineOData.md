## Download Offline OData Action

### DownloadOfflineOData.action

```json
{
	"Service": "MDKSampleApp/Services/SampleService.service",
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
	"_Type": "Action.Type.OfflineOData.Download",
	"ActionResult": {
		"_Name": "sync"
	},
	"OnSuccess": "/MDKSampleApp/Actions/Service/SyncSuccessMessage.action",
	"OnFailure": "/MDKSampleApp/Actions/Service/SyncFailureMessage.action"
}
```

## OnSuccess

### SyncSuccessMessage.action

```json
{
	"Animated": true,
	"Duration": 2,
	"Message": "Sync offline data service complete",
	"_Type": "Action.Type.ToastMessage"
}
```

## OnFailure

### SyncFailureMessage.action

```json
{
	"Message": "Sync offline data service failure - {{#ActionResults:sync/#Property:error}}",
	"Duration": 7,
	"Animated": true,
	"_Type": "Action.Type.BannerMessage"
}
```