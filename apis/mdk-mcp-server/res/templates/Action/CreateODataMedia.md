## OData CreateMedia Action

### Product_Create.action

```json
{
	"ActionResult": {
		"_Name": "productCreate"
	},
	"OnFailure": "/MDKSampleApp/Actions/Products/ProductCreateFailure.action",
	"OnSuccess": "/MDKSampleApp/Actions/Products/ProductCreateSuccess.action",
	"Properties": {
		"Category": "#Control:productCategory/#SelectedValue",
		"CategoryName":"#Control:productCategory/#SelectedValue",
		"CurrencyCode": "#Control:productCurrency/#SelectedValue",
		"DimensionDepth": "#Control:productDepth/#Value",
		"ShortDescription": "#Control:productDescription/#Value",
		"LongDescription": "#Control:productDescription/#Value",
		"QuantityUnit":"EA",
		"DimensionUnit": "#Control:productDimUnit/#SelectedValue",
		"DimensionHeight": "#Control:productHeight/#Value",
		"Name": "#Control:productName/#Value",
		"Price": "#Control:productPrice/#Value",
		"SupplierId": "#Control:productSupplierID/#SelectedValue",
		"Weight": "#Control:productWeight/#Value",
		"WeightUnit": "#Control:productWeightUnit/#SelectedValue",
		"DimensionWidth": "#Control:productWidth/#Value",
		"ProductId":"#Control:productID/#Value"
	},
	"Media": "#Control:productImage/#Value",
	"Target": {
		"EntitySet": "Products",
		"Service": "/MDKSampleApp/Services/SampleService.service"
	},
	"_Type": "Action.Type.ODataService.CreateMedia"
}
```

## OnSuccess

### ProductCreateSuccess.action

```json
{
	"Animated": true,
	"Duration": 6,
	"MaxNumberOfLines": 3,
	"Message": "New Product Created Successful",
	"OnSuccess": "/MDKSampleApp/Actions/CloseModalPage_Complete.action",
	"_Type": "Action.Type.ToastMessage"
}
```

## OnFailure

### ProductCreateFailure.action

```json
{
	"Animated": true,
	"Duration": 8,
	"MaxNumberOfLines": 3,
	"Message": "Product Create  Failed - {{#ActionResults:productCreate/#Property:error}}",
	"_Type": "Action.Type.ToastMessage"
}
```