## OData UpdateEntity Action

### Product_UpdateEntity.action

```json
{
	"ActionResult": {
		"_Name": "productUpdate"
	},
	"OnFailure": "/MDKSampleApp/Actions/Products/ProductUpdateFailed.action",
	"OnSuccess": "/MDKSampleApp/Actions/Products/ProductUpdateSuccess.action",
	"UpdateLinks":"/MDKSampleApp/Rules/Products/ProductUpdateLink.js",
	"Properties": {
		"Category": "#Control:productCategory/#SelectedValue",
		"CategoryName":"#Control:productCategory/#SelectedValue",
		"CurrencyCode": "#Control:productCurrency/#SelectedValue",
		"DimensionDepth": "#Control:productDepth/#Value",
		"ShortDescription": "#Control:FormCellNote0/#Value",
		"DimensionUnit": "#Control:productDimUnit/#SelectedValue",
		"DimensionHeight": "#Control:productHeight/#Value",
		"Name": "#Control:productName/#Value",
		"Price": "#Control:productPrice/#Value",
		"SupplierId": "#Control:productSupplierID/#SelectedValue",
		"Weight": "#Control:productWeight/#Value",
		"WeightUnit": "#Control:productWeightUnit/#SelectedValue",
		"DimensionWidth": "#Control:productWidth/#Value"
	},
	"Target": {
		"EntitySet": "Products",
		"ReadLink": "{@odata.readLink}",
		"Service": "/MDKSampleApp/Services/SampleService.service"
	},
	"_Type": "Action.Type.ODataService.UpdateEntity"
}
```
### ProductUpdateLink.js

```js
/**
* Link to Suppliers
* @param {IClientAPI} context
* @returns {Array} Links
*/
export default function ProductUpdateLink (context) {

    //Update Link to SupplierDetails
    let lstPkr = context.evaluateTargetPathForAPI("#Page:ProductEdit/#Control:productSupplierID");
    let supplierId = lstPkr.getValue()[0].ReturnValue;
    var links = [];
    if (supplierId && supplierId !== '') {
        let SPLink = context.createLinkSpecifierProxy(
            'SupplierDetails',
            'Suppliers',
            `$filter=SupplierId eq '${supplierId}'`
        );
        links.push(SPLink.getSpecifier());
    }
    return links;
}
```

## OnSuccess

### ProductUpdateSuccess.action

```json
{
	"Animated": true,
	"Duration": 6,
	"MaxNumberOfLines": 3,
	"Message": "Product Successfully updated",
	"OnSuccess": "/MDKSampleApp/Actions/CloseModalPage_Complete.action",
	"_Type": "Action.Type.ToastMessage"
}
```
## OnFailure

### ProductUpdateFailed.action

```json
{
	"Animated": true,
	"Duration": 8,
	"MaxNumberOfLines": 3,
	"Message": "Product Update failed - {{#ActionResults:productUpdate/#Property:error}}",
	"OnSuccess": "/MDKSampleApp/Actions/ClosePage.action",
	"_Type": "Action.Type.ToastMessage"
}
```

