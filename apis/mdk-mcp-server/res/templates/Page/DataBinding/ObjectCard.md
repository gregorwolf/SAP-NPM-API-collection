## ObjectCard

### ObjectCard Page

```json
{
	"Caption": "Products in Card",
	"Controls": [
		{
			"Sections": [
				{
					"Header": {
						"_Name": "ObjectCardHeader",
						"Caption": "Products in Card",
						"UseTopPadding": false
					},
					"Footer": {
						"_Name": "ObjectCardFooter",
						"Caption": "Products Footer",
						"UseTopPadding": false
					},
					"EmptySection": {
						"FooterVisible": false
					},
					"Search": {
						"BarcodeScanner": true,
						"Enabled": true,
						"MinimumCharacterThreshold": 3,
						"Delay": 300,
						"Placeholder": "Search for Products"
					},
					"Card": {
						"Title": "{Name}",
						"Subhead": "{ProductId}",
						"Footnote": "{Category}",
						"Description": "{ShortDescription}",
						"DetailImageIsCircular": true,
						"StatusText": "$(N,{Price},'',{minimumFractionDigits:2,useGrouping:true})",
						"OnPress": {
							"Name": "/MDKSampleApp/Actions/NavToPage.action",
							"Properties": {
								"PageToOpen": "/MDKSampleApp/Pages/SectionTable/SimplePropertyCollection.page"
							}
						},
						"OverflowButtons":[
							{
								"_Name": "share",
								"Image": "sap-icon://share-2",
								"Title": "Share",
								"OnPress": {
									"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
									"Properties": {
										"Message": "Product Share pressed"
									}
								},
								"Visible": true
							},
							{
								"_Name": "review",
								"Image": "sap-icon://edit",
								"Title": "Review",
								"OnPress": {
									"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
									"Properties": {
										"Message": "Product Review pressed"
									}
								},
								"Visible": true
							}
						],
						"PrimaryAction": {
							"_Name": "addtocart",
							"Image": "sap-icon://cart",
							"Title": "Add to Cart",
							"OnPress": {
								"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
								"Properties": {
									"Message": "Product added to cart"
								}
							},
							"Visible": true
						},
						"SecondaryAction": {
							"_Name": "favorite",
							"Image": "sap-icon://favorite",
							"Title": "Add to Favorite",
							"OnPress": {
								"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
								"Properties": {
									"Message": "Product added to favorites"
								}
							},
							"Visible": true
						},
						"_Name": "ObjectCard",
						"_Type": "Control.Type.ObjectCard"
					},
					"Layout": {
						"LayoutType": "HorizontalScroll",
						"NumberOfColumns": 2
					},
					"DataPaging": {
						"ShowLoadingIndicator": false,
						"PageSize": 10
					},
					"Target": {
						"EntitySet": "Products",
						"Service": "/MDKSampleApp/Services/SampleService.service",
						"QueryOptions": "$expand=SupplierDetails&$orderby=ProductId asc"
					},
					"_Name": "ObjectCardSection",
					"_Type": "Section.Type.ObjectCardCollection"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "Product_ObjectCard",
	"_Type": "Page"
}
```