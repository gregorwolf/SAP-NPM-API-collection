## ObjectTable

### Products_List page

```json
{
	"Caption": "Product List ",
	"Controls": [
		{
			"Sections": [
				{
					"Header": {
						"Caption": "Products",
						"_Name": "ObjectTableHeader",
						"UseTopPadding": false
					},
					"Search":{
						"Enabled" : true,
						"Delay": 500,
						"MinimumCharacterThreshold": 3,
						"Placeholder": "Search",
						"BarcodeScanner": true
					},
					"ObjectCell": {
						"Title": "{Name}",
						"Subhead": "{ProductID}",
						"Footnote": "{Category}",
						"DetailImage": "sap-icon://product",
						"DetailImageIsCircular": true,
						"AccessoryType": "DisclosureIndicator",
						"PreserveIconStackSpacing": true,
						"DetailImageText": "No Image Available",
						"Description": "{ShortDescription}",
						"DisplayDescriptionInMobile": true,
						"StatusText": "$(N,{Price},'',{minimumFractionDigits:2,useGrouping:true})",
						"SubstatusText": "{CurrencyCode}",
						"SubstatusImage": "sap-icon://money-bills",
						"OnPress": "/MDKSampleApp/Actions/NavToProductDetails.action",
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
						],
						"Icons":[
							"sap-icon://cart",
							"sap-icon://favorite",
							"sap-icon://heart"
						],
						"HorizontalIcons":[
							"sap-icon://cart",
							"sap-icon://favorite",
							"sap-icon://heart"
						],
						"ContextMenu": {
							"Items": [
								{
									"_Name": "cart",
									"Image": "sap-icon://cart",
									"Text": "Add to Cart",
									"Mode": "Normal",
									"OnSwipe": {
										"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
										"Properties": {
											"Message": "Product added to cart"
										}
									}
								},
								{
									"_Name": "favorite",
									"Image": "sap-icon://favorite",
									"Text": "Add to Favorites",
									"Mode": "Normal",
									"OnSwipe": {
										"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
										"Properties": {
											"Message": "Product added to favorites"
										}
									}
								},
								{
									"_Name": "heart",
									"Image": "sap-icon://heart",
									"Text": "Add to Wishlist",
									"Mode": "Normal",
									"OnSwipe": {
										"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
										"Properties": {
											"Message": "Product added to wishlist"
										}
									}
								}
							],
							"LeadingItems":["cart"],
							"TrailingItems":["favorite","heart"]
						},
					},
					"Footer": {
						"_Name": "ObjectTableFooter",
						"UseTopPadding": false,
						"Caption": "See All",
						"AccessoryType": "DisclosureIndicator",
						"FooterStyle": "Attribute",
						"AttributeLabel": "/MDKSampleApp/Rules/Products_Count.js"
						
					},
					"Target":{
						"EntitySet": "Products",
						"QueryOptions": "$top=10&$orderby=ProductID asc",
						"Service": "/MDKSampleApp/Services/SampleService.service"

					},
					"_Name": "ObjectTable0",
					"_Type": "Section.Type.ObjectTable"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "Product_ObjectTable",
	"_Type": "Page"
}
```

### NavToProducts_Detail.action

```json
{
	"PageToOpen": "/MDKSampleApp/Pages/Products_Detail.page",
	"_Type": "Action.Type.Navigation"
}
```

### Products_Detail.page

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

### GenericToastMessage.action

```json
{
	"_Type": "Action.Type.ToastMessage",
	"Message": "Toast message from action"
}
```



### Products_Count.js
```js
/**
* Get the count of products in the Products entity set
* @param {IClientAPI} clientAPI
* @returns {number} ProductsCount
*/
export default function ProductsCount(clientAPI) {
    const serviceName = "/MDKSampleApp/Services/SampleService.service" 
    const entitySet = "Products";
    const queryOptions = "";
   let returnVal = 0;
    return clientAPI.count(serviceName, entitySet, queryOptions).then((result) => {
        let count = result;
        if (count > 0) {
            returnVal = count
        }
        console.log("ProductsCount: " + returnVal);
        return returnVal;
        
    }).catch(err => {
        return 0;
    });
}
```
