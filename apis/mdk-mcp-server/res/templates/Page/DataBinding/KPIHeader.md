## KPIHeader

### KPIHeaderSample.page

```json
{
	"Caption": "KPI Header",
	"Controls": [
		{
			"Sections": [
				{
					"KPIHeader": {
						"KPIItems": [
							{
								
								"CaptionLabel": "Completed",
								"Icon": "sap-icon://complete",
								"MetricItems": [
									{
										"LeadingUnit": "",
										"Value": "{CategorySales}",
										"TrailingUnit": " sales"
									}
								],
								"Target": "/MDKSampleApp/Rules/ReadServiceForKPIHeader.js"
							},
							{
								"Icon": "sap-icon://document",
								"CaptionLabel": "Documents",
								"MetricItems": [
									{
										"Value": "{CategorySales}"
									}
								],
								"Target": "/MDKSampleApp/Rules/ReadServiceForKPIHeader.js"
							},
							{   
								"CaptionLabel": "Sales this week",
								"ShowProgress": true,
								"Progress": "{FractionSales}",
								"MetricItems": [
									{
										"LeadingUnit": "",
										"Value": "{FractionSalesStr}",
										"TrailingUnit": ""
									}
								],
								"Target": "/MDKSampleApp/Rules/ReadServiceForKPIHeader.js"
							},
							{
								"CaptionLabel": "Working Hours",
								"Icon": "sap-icon://time-entry-request",
								"MetricItems": [
									{
										"Value": "{Hours}",
										"TrailingUnit": "h"
									},
									{
										"Value": "{Minutes}",   
										"TrailingUnit": "m"   
									},
									{
										"Value": "{Seconds}",
										"TrailingUnit": "s"
									}
								],
								"Target": "/MDKSampleApp/Rules/ReadServiceForKPIHeader.js"
							}

						]
					},
					"_Name": "kpiSection",
					"_Type": "Section.Type.KPIHeader"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "KPIHeaderSample",
	"_Type": "Page"
}
```

### ReadServiceForKPIHeader.js

```js
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ReadServiceForKPIHeader(clientAPI) {
    const properties = ['CategorySales'];
    const entitySet = 'Category_Sales_for_1997';
    const serviceName = '/MDKSampleApp/Services/NorthWindV4.service';
    const queryOptions = '$top=1';
    return clientAPI.read(serviceName, entitySet, properties, queryOptions)
      .then((result) => {

        let Hours;
        let Minutes;
        let Seconds;
        let CategorySales;
        let ExpectedSales;
        let FractionSales;
        let FractionSalesStr;

        var res = result.getItem(0);
        CategorySales = Math.floor(res.CategorySales%24);

        Hours = CategorySales;
        Minutes = CategorySales + 5;
        Seconds = CategorySales + 12;
        ExpectedSales = CategorySales + 10;
        FractionSales = CategorySales/ExpectedSales;
        FractionSalesStr = CategorySales.toString() + "/" + ExpectedSales.toString();

      return {
        Hours: Hours,
        Minutes: Minutes,
        Seconds: Seconds,
        CategorySales: CategorySales,
        FractionSales: FractionSales,
        FractionSalesStr: FractionSalesStr,
      }
    })
}
```