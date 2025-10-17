## KeyValue

### KeyValue Page

```json
{
	"Caption": "Product Details",
	"Controls": [
		{
			"Sections": [
				{
					"Header": {
						"Caption": "Product Details",
						"UseTopPadding": false
					},
					"EmptySection": {
						"Caption": "No Data Available"
					},
					"KeyAndValues":[
						{
							"KeyName": "Name",
							"Value": "{Name}"
						},
						{
							"KeyName": "ProductId",
							"Value": "{ProductId}"
						},
						{
							"KeyName": "Category",
							"Value": "{Category}"
						},
						{
							"KeyName": "ShortDescription",
							"Value": "{ShortDescription}"
						},
						{
							"KeyName": "Price",
							"Value": "{Price}"
						},
						{
							"KeyName": "CurrencyCode",
							"Value": "{CurrencyCode}"
						},
						{
							"KeyName": "Width",
							"Value": "{DimensionWidth}"
						},
						{
							"KeyName": "Height",
							"Value": "{DimensionHeight}"
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
							"Value": "{Weight}"
						},
						{
							"KeyName": "WeightUnit",
							"Value": "{WeightUnit}"
						}
					],
					"Target":{
						"EntitySet": "Products('HT-1001')",
						"Service": "/MDKSampleApp/Services/SampleService.service"
					},
					"_Name": "KeyValueSection",
					"_Type": "Section.Type.KeyValue"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "KeyValuePage",
	"_Type": "Page"
}
```