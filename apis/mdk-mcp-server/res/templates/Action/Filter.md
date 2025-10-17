## Filter Action

### ProductFilter.action

```json
{
	"Filterable": "#Page:ProductList/#Control:SectionedTable0",
	"ModalPageFullscreen": false,
	"PageToOpen": "/MDKSampleApp/Pages/Products/ProductFilter.page",
	"_Type": "Action.Type.Filter"
}
```

### ProductFilter.page

```json
{
	"ActionBar": {
		"Items": [
			{
				"OnPress": "/MDKampleApp/Actions/CancelPage.action",
				"Position": "left",
				"SystemItem": "Cancel",
				"Text": "Item"
			},
			{
				"OnPress": "/MDKampleApp/Actions/ClosePage.action",
				"Position": "Right",
				"SystemItem": "Done"
			}
		]
	},
	"Caption": "Filter",
	"Controls": [
		{
			"Sections": [
				{
					"Controls": [
						{
							"AllowEmptySelection": true,
							"AllowMultipleSelection": true,
							"Caption": "Sort by",
							"IsEditable": true,
							"IsVisible": true,
							"SortByItems": [
								"Category",
								"Name",
								"ProductID"
							],
							"_Name": "FormCellSorter0",
							"_Type": "Control.Type.FormCell.Sorter"
						}
					]
				},
				{
					"Caption": "Filter",
					"Controls": [
						
						{
							"FilterProperty": "Category",
							"_Name": "Category",
							"_Type": "Control.Type.FormCell.ListPicker",
							"Caption": "By Category",
							"Value": "",
							"PickerItems": {
								"DisplayValue": "{Category}",
								"ReturnValue": "{Category}",
								"Target": {
									"EntitySet": "ProductCategories",
									"Service": "/MDKSampleApp/Services/SampleService.service"
								}
							},
							"Search": {
								"Enabled": true,
								"Placeholder": "Item Search",
								"BarcodeScanner": true,
								"MinimumCharacterThreshold": 2
							},
							"IsSearchCancelledAfterSelection": true,
							"AllowMultipleSelection": true,
							"IsSelectedSectionEnabled": true,
							"AllowEmptySelection": true,
							"PickerPrompt": "Please Select"
						},
						{
							"OnPress": "/MDKSampleApp/Rules/Filter/FilterReset.js",
							"TextAlignment": "center",
							"Title": "Reset All",
							"_Name": "ResetButton",
							"_Type": "Control.Type.FormCell.Button"
						}
					]
				}
			],
			"_Name": "FormCellContainer",
			"_Type": "Control.Type.FormCellContainer"
		}
	],
	"Result": [
		"#Page:ProductFilter/#Control:Category/#FilterValue",
		"#Page:ProductFilter/#Control:FormCellSorter0/#Value"
	],
	"_Name": "ProductFilter",
	"_Type": "Page"
}
```

### ProductList.page

```json
{
	"ActionBar": {
		"Items": [
			{
				"OnPress": "/MDKSampleApp/Actions/Products/ProductsFilter.action",
				"Position": "Right",
				"Text": "Filter"
			}
			
		]
	},
	"Caption": "Products",
	"Controls": [
		{
			"Sections": [
				{
					"ObjectCell": {
						"AccessoryType": "disclosureIndicator",
						"DetailImageIsCircular": true,
						"Footnote": "{Category}",
						"PreserveIconStackSpacing": false,
						"StatusText": "{Price}",
						"Subhead": "{Name}",
						"SubstatusText": "{CurrencyCode}",
						"Title": "{ProductID}",
						"DetailImage": "sap-icon://product"

					},
					"Search": {
						"BarcodeScanner": true,
						"Enabled": true,
						"Placeholder": "Search"
					},
					"Header": {
						"UseTopPadding": false
					},
					"Target": {
						"EntitySet": "Products",
						"QueryOptions": "$top=10&$orderby=ProductID asc",
						"Service": "/MDKSampleApp/Services/SampleService.service"
					},
					"_Name": "SectionObjectTable0",
					"_Type": "Section.Type.ObjectTable"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "ProductList",
	"_Type": "Page"
}
```