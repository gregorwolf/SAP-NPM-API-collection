## SimplePropertyCollection

### Product Details page (SimplePropertyCollection)

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
					"SimplePropertyCells": [
						{
							"SimplePropertyCell": {
								"KeyName": "Name",
								"Value": "{Name}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "ProductId",
								"Value": "{ProductId}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "Category",
								"Value": "{Category}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "ShortDescription",
								"Value": "{ShortDescription}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "Price",
								"Value": "{Price}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "CurrencyCode",
								"Value": "{CurrencyCode}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "Width",
								"Value": "{DimensionWidth}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "Height",
								"Value": "{DimensionHeight}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "Depth",
								"Value": "{DimensionDepth}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "Unit",
								"Value": "{DimensionUnit}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "Weight",
								"Value": "{Weight}"
							}
						},
						{
							"SimplePropertyCell": {
								"KeyName": "WeightUnit",
								"Value": "{WeightUnit}"
							}
						}
					],
					"Layout": {
						"NumberOfColumns": 2,
						"MinimumInteritemSpacing": 10
					},
					"_Name": "simplePropertySection",
					"_Type": "Section.Type.SimplePropertyCollection"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "ProductDetailsSimple",
	"_Type": "Page"
}
```