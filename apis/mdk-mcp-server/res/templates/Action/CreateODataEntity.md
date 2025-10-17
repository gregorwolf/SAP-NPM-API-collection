## OData CreateEntity Action

### POHeaderCreateEntity.action

```json
{
	"ActionResult": {
		"_Name": "poHeaderCreate"
	},
	"Properties": {
		"PurchaseOrderId":"#Control:purchaseOrderId/#Value",
		"SupplierId":"#Control:supplierId/#Value",
		"GrossAmount":"#Control:grossAmount/#Value",
		"TaxAmount":"#Control:taxAmount/#Value",
		"NetAmount":"#Control:netAmount/#Value"
	},
	"Target": {
		"EntitySet": "PurchaseOrderHeaders",
		"Service": "/MDKSampleApp/Services/SampleService.service"
	},
	"OnSuccess": "/MDKSampleApp/Actions/POHeader/POCreateSuccess.action",
	"OnFailure": "/MDKSampleApp/Actions/POHeader/POCreateFailed.action",
	"_Type": "Action.Type.ODataService.CreateEntity"
}
```

## OnSuccess

### POCreateSuccess.action

```json
{
	"_Type": "Action.Type.ToastMessage",
	"Message": "PurchseOrder Create Success",
	"OnSuccess": "/MDKSampleApp/Actions/ClosePage.action",
	"Duration":3,
	"Animated": true,
	"NumberOfLines":2
}
```

## OnFailure

### POCreateFailed.action

```json
{
	"_Type": "Action.Type.ToastMessage",
	"Message": "PurchseOrder Create Failed. {{#ActionResults:poHeaderCreate/#Property:error}}",
	"Duration":3,
	"Animated": true,
	"NumberOfLines":2
}
```

### POHeaderCreate.page

```json
{
	"ActionBar": {
		"Items": [
			{
				"SystemItem": "Cancel",
				"Position": "Left",
				"OnPress": "/MDKSampleApp/Actions/CancelPage.action"
			},
			{
				"Caption": "Create",
				"Position": "Right",
				"OnPress": "/MDKSampleApp/Actions/POHeader/POHeaderCreateEntity.action"
			}
		]
	},
	"Caption": "Create PurchaseOrder",
	"Controls": [
		{
			"Sections": [
				{
					"Controls": [
						{
							"Caption":"PurchaseOrder Id",
							"Value": "/MDKSampleApp/Rules/POHeader/GeneratePurchaseOrderId.js",
							"IsEditable": false,
							"IsVisible": true,
							"_Name": "purchaseOrderId",
							"_Type": "Control.Type.FormCell.SimpleProperty"
						},
						{
							"Caption":"Supplier",
							"Value": "100000045",
							"IsEditable": false,
							"IsVisible": true,
							"_Name": "supplierId",
							"_Type": "Control.Type.FormCell.SimpleProperty"
						},
						{
							"Caption":"Net Amount",
							"Value": "1000.00",
							"IsEditable": false,
							"IsVisible": true,
							"_Name": "netAmount",
							"_Type": "Control.Type.FormCell.SimpleProperty"
						},
						{
							"Caption":"Tax NetAmount",
							"Value": "100.00",
							"IsEditable": false,
							"IsVisible": true,
							"_Name": "taxAmount",
							"_Type": "Control.Type.FormCell.SimpleProperty"
						},
						{
							"Caption":"Gross Amount",
							"Value": "1100.00",
							"IsEditable": false,
							"IsVisible": true,
							"_Name": "grossAmount",
							"_Type": "Control.Type.FormCell.SimpleProperty"
						}
					]
				}
			],
			"_Name": "FormCellContainer0",
			"_Type": "Control.Type.FormCellContainer"
		}
	],
	"_Name": "POHeaderCreate",
	"_Type": "Page"
}
```

### GeneratePurchaseOrderId.js

```js
/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function GeneratePurchaseOrderId (clientAPI) {
    var serviceName = "/MDKSampleApp/Services/SampleService.service";
	var entityName="PurchaseOrderHeaders";
	var queryOptions = "$select=PurchaseOrderId&$orderby=PurchaseOrderId desc";
	let retval="";
	return clientAPI.read(serviceName,entityName,[],queryOptions).then(function(result){
		if(result && result.length>0){
			let orderId = result.getItem(0).PurchaseOrderId;
			let maxOrderId = new Number(orderId);
			maxOrderId++
			retval = maxOrderId.toString()
		}
		else {
			//let newID = 1;
			retval ='400000000'
		}
		console.log('Generated OrderId = '+retval);
		let cd = clientAPI.getPageProxy().getClientData();
		cd.PurchaseOrderId = retval;
		return retval;
		
	});
}
```