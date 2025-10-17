## CheckRequiredFields Action

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
				"OnPress": "/MDKSampleApp/Actions/POHeader/POHeaderCheckRequiredFields.action"
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
							"Value": "",
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

### POHeaderCheckRequiredFields.action

```json
{
	"_Type": "Action.Type.CheckRequiredFields",
	"RequiredFields":["supplierId"],
	"OnSuccess": "/MDKSampleApp/Actions/POHeader/POHeaderCreateEntity.action",
	"OnFailure": "/MDKE2EOffline/Actions/PurchaseOrders/PORequiredFieldMissing.action",
	"ActionResult": {
		"_Name": "poRequired"
	}
}
```

### PORequiredFieldMissing.action

```json
{
	"_Type": "Action.Type.Message",
	"Message": "{{#ActionResults:poRequired/#Property:error}}",
	"OKCaption": "OK",
    "Title": "Missing Required Field"
}
```