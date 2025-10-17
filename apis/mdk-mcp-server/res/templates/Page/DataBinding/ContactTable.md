## ContactCell

### ContactCell Page
```json
{
	"Caption": "Contact Cell",
	"Controls": [
		{
			"Sections": [
				{
					"Header": {
						"UseTopPadding": false
					},
					"ContactCell": {
						"Headline": "{FirstName}, {LastName}",
						"Subheadline": "{CustomerId}",
						"Description": "{HouseNumber} {Street}, {City}, {Country} - {PostalCode}",
						"DetailImage": "sap-icon://customer",
						"ActivityItems":[
							{
								"ActivityType": "Phone",
								"ActivityValue": "{PhoneNumber}"
							},
							{
								"ActivityType": "Email",
								"ActivityValue": "{EmailAddress}"
							},
							{
								"ActivityType": "VideoCall",
								"ActivityValue": "{PhoneNumber}"
							},
							{
								"ActivityType": "Message",
								"ActivityValue": "{EmailAddress}"
							}
						],
						"ContextMenu": {
							"Items": [
								{
									"_Name": "delete",
									"Image": "sap-icon://delete",
									"Text": "Delete",
									"Style": "RedBGWhiteText",
									"OnSwipe": {
										"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
										"Properties": {
											"Message": "Delete pressed"
										}
									}
								},
								{
									"_Name": "edit",
									"Image": "sap-icon://edit",
									"Text": "Edit",
									"Style": "RedBGWhiteText",
									"OnSwipe": {
										"Name": "/MDKSampleApp/Actions/GenericToastMessage.action",
										"Properties": {
											"Message": "Edit pressed"
										}
									}
								}
							],
							"LeadingItems": ["delete"],
							"TrailingItems": ["edit"]
						}
					},
					"Target":{
						"EntitySet": "Customers",
						"Service": "/MDKSampleApp/Services/SampleService.service"
					},
					"_Name": "contactCell",
					"_Type": "Section.Type.ContactCell"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "ContactCell",
	"_Type": "Page"
}
```