## DataTable

### ProductDataTable.page

```json
{
	"Caption": "Products (DataTable)",
	"ActionBar": {
		"Items": [
			{
				"OnPress": "/MDKSampleApp/Rules/DataTable/SetEditMode.js",
				"Position": "Right",
				"Caption": "Edit"
			},
			{
				"OnPress": "/MDKSampleApp/Rules/DataTable/SaveEditChanges.js",
				"Position": "Right",
				"Caption": "Save"
			}
		]
	},
	"Controls": [
		{
			"Sections": [
				{
					"StickyColumn": true,
					"EditMode": "None",
					"Header": {
						"DataTable": {
							"Items": [
								{
									"Text": "Image",
									"TextAlignment": "left"
								},
								{
									"Text": "Product Id",
									"TextAlignment": "left"
								},
								{
									"Text": "Name",
									"TextAlignment": "left"
								},
								{
									"Text": "Category",
									"TextAlignment": "left"
								},
								{
									"Text": "Price",
									"TextAlignment": "left"
								},
								{
									"Text": "Currency",
									"TextAlignment": "natural"
								}
							]
						}
					},
					"Row": {
						"Layout": {
							"ColumnWidth":[75,100,200,150,120,-1]
						},
						"Items":[
							{
								"Image": "sap-icon://product",
								"DisplayType": "Image"
							},
							{
								"Value": "{ProductID}",
								"DisplayType": "Text",
								"EditType": "None"
							},
							{
								"Value": "{Name}",
								"DisplayType": "Text",
								"EditType": "Text"
							},
							{
								"Value": "{Category}",
								"DisplayType": "Text",
								"EditType": "List",
								"ListPicker": {
									"Caption": "Select Category",
									"PickerItems": {
										"DisplayValue": "{CategoryName}",
										"ReturnValue": "{CategoryName}",
										"Target": {
											"EntitySet": "ProductCategories",
											"Service": "/MDKSampleApp/Services/SampleService.service"
										}
									}
								}
							},
							{
								"Value": "$(N,{Price},'',{minimumFractionDigits:2,useGrouping:true})",
								"DisplayType": "Text",
								"EditType": "Text"
							},
							{
								"Value": "{CurrencyCode}",
								"DisplayType": "Text",
								"EditType": "List",
								"ListPicker": {
									"Caption": "Select Currency",
									"PickerItems":[
										{
											"DisplayValue": "USD",
											"ReturnValue": "USD"
										},
										{
											"DisplayValue": "EUR",
											"ReturnValue": "EUR"
										},
										{
											"DisplayValue": "JPY",
											"ReturnValue": "JPY"
										}
									]
								}
							}
						]
					},
					"Search": {
						"BarcodeScanner": true,
						"Enabled": true,
						"MinimumCharacterThreshold": 3,
						"Placeholder": "Search"
					},
					"Target": {
						"EntitySet": "Products",
						"QueryOptions": "$top=20",
						"Service": "/MDKSampleApp/Services/SampleService.service"
					},
					"_Name": "DataTableSection",
					"_Type": "Section.Type.DataTable"
				}

			],
			"_Name": "SectionedTable",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "ProductDataTable",
	"_Type": "Page"
}
```

### SetEditMode.js

```js
**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function SetEditMode(clientAPI) {
    const sectionedTable = clientAPI.getControl('SectionedTable');
    const section = sectionedTable.getSection('DataTableSection');
    section.setEditMode('Inline');
}
```

### SaveEditChanges.js

```js
**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function SaveEditChanges(clientAPI) {
    const sectionedTable = clientAPI.getControl('SectionedTable');
    const section = sectionedTable.getSection('DataTableSection');
    let productDataChanges = section.getChanges();

    let actions = [];
    for (var i = 0; i < productDataChanges.length; i++) {
      actions.push({
        Name: '/MDKSampleApp/Actions/DataTable/UpdateProduct.action',
        Properties: {
          Target: {
            ReadLink: productDataChanges[i].readLink
          },
          Properties: productDataChanges[i].changedProperties
        }
      });
    }

    return clientAPI.executeAction({
        Name: '/MDKSampleApp/Actions/DataTable/SaveProductChanges.action',
        Properties: {
          Actions: actions
        }
      }).then(data => {
        section.setEditMode("None");
      }).catch(err => {
          alert(err.toString())
      });
}
```

### UpdateProduct.action

```json
{
	"_Type": "Action.Type.ODataService.UpdateEntity",
	"Target": {
		"Service": "/MDKSampleApp/Services/SampleService.service",
		"EntitySet": "Products",
		"ReadLink": "{@odata.readLink}"
	},
	"Properties": {
	}
}
```

### SaveProductChanges.action

```json
{
	"_Type": "Action.Type.ODataService.ChangeSet",
	 "Target": {
    "Service": "/MDKSampleApp/Services/SampleService.service",
  },
  "Actions": [
  ],
  "ShowActivityIndicator" : true
}
```