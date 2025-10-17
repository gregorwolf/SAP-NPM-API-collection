## ObjectCollection

### ProductCollection.page

```json
{
	"Caption": "Product Collection",
	"Controls": [
		{
			"Sections": [
				{
					"Header": {
						"Caption": "Products",
						"UseTopPadding": false
					},
					"Search":{
						"Enabled" : true,
						"Delay": 500,
						"MinimumCharacterThreshold": 3,
						"Placeholder": "Search",
						"BarcodeScanner": true
					},
					"ObjectCell": "/MultiStyleApp/Fragments/ProductObjectCell.fragment",
					"Layout": {
						"LayoutType": "HorizontalScroll",
						"MinimumInteritemSpacing":10,
						"NumberOfColumns":2
					},
					"Target":{
						"EntitySet": "Products",
						"QueryOptions": "$top=30&$orderby=ProductID",
						"Service": "/MDKSampleApp/Services/SampleService.service"
					},
					"_Name": "ObjectCollection0",
					"_Type": "Section.Type.ObjectCollection"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "ProductCollection",
	"_Type": "Page"
}
```

### ProductObjectCell.fragment

```json
{
   "_Type": "Control.Type.ObjectCell",
	"AccessoryType": "disclosureIndicator",
	"DetailImage": "sap-icon://product",
	"DetailImageIsCircular": true,
	"Footnote": "{Category}",
	"PreserveIconStackSpacing": false,
	"Selected": false,
	"StatusText": "$(N,{Price},'',{minimumFractionDigits:2,useGrouping:true})",
	"Subhead": "{Name}",
	"SubstatusText": "{CurrencyCode}",
	"Title": "{ProductID}",
	"OnPress": "/MDKSampleApp/Actions/Products/NavToProductDetails.action"		
}
```

### NavToProductDetails.action

```json
{
	"PageToOpen": "/MDKSampleApp/Pages/Products/ProductDetails.page",
	"_Type": "Action.Type.Navigation"
}
```

### ProductDetails.page

```json
{
	"Caption": "Product Details",
	"Controls": [
		{
			"Sections": [
				{
					"ObjectHeader": {
						"HeadlineText": "{Name}",
						"Subhead": "{ProductID}",
						"Footnote": "{Category}",
						"DetailImage": "sap-icon://product",
						"DetailImageIsCircular": true,
						"Description": "{ShortDescription}",
						"StatusText": "$(N,{Price},'',{minimumFractionDigits:2,useGrouping:true})",
						"SubstatusText": "{CurrencyCode}",
						"BodyText": "Dimension {DimensionWidth} x {DimensionDepth} x {DimensionHeight} {DimensionUnit}",
						"Tags": [
							{
								"Text": "In Store",
								"Color": "Green"
							},
							{
								"Text": "On Sale",
								"Color": "Red"
							},
							{
								"Text": "New Arrival",
								"Color": "Blue"
							}
						]
					},
					"_Name": "ObjectHeaderSection",
					"_Type": "Section.Type.ObjectHeader"
				},
				{
					"Header": {
						"Caption": "Dimension & Weight",
						"UseTopPadding": false
					},
					"KeyAndValues": [
						{
							"KeyName": "Height",
							"Value": "{DimensionHeight}"
						},
						{
							"KeyName": "Width",
							"Value": "{DimensionWidth}"
						},
						{
							"KeyName": "Depth",
							"Value": "{DimensionDepth}"
						},
						{
							"KeyName": "Unit",
							"Value": "{DimensionUnit}"
						},
						{
							"KeyName": "Weight",
							"Value": "{{#Property:Weight}} {{#Property:WeightUnit}}"
						}
					],
					"Layout": {
						"NumberOfColumns": 2
					},
					"MaxItemCount": 1,
					"_Name": "SectionKeyValue0",
					"_Type": "Section.Type.KeyValue"
				},
				{
					"Header": {
						"Caption": "PurchaseOrderItems",
						"_Type": "SectionCommon.Type.Header"
					},
					"ObjectCell": {
						"AccessoryType": "DisclosureIndicator",
						"Description": "{GrossAmount}",
						"Title": "{PurchaseOrderID}",
						"Footnote": "{ItemNumber}",
						"PreserveIconStackSpacing": false,
						"StatusText": "{NetAmount}",
						"Subhead": "{ProductID}",
						"SubstatusText": "{CurrencyCode}"
					},
					"EmptySection": {
						"Caption": "No record found!"
					},
					"Target": {
						"EntitySet": "{@odata.readLink}/PurchaseOrderItems",
						"Service": "/MDKSampleApp/Services/SampleService.service"
					},
					"_Type": "Section.Type.ObjectTable"
				}

			],
			"DataSubscriptions": [
				"Products",
				"PurchaseOrderItems"
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "ProductDetails",
	"_Type": "Page"
}
```
