## ProfileHeader

### UserProfile.page

```json
{
	"Caption": "User Profile",
	"Controls": [
		{
			"Sections": [
				{
					"ProfileHeader": {
						"DetailImage": "sap-icon://account",
						"DetailImageIsCircular": true,
						"Headline": "#Application/#AppData/UserId",
						"ActivityItems":[
							{
								"ActivityType": "Message",
								"ActivityValue": "1-800-677-7271"
							},
							{
								"ActivityType": "Phone",
								"ActivityValue": "1-800-677-7271"
							},
							{
								"ActivityType": "VideoCall",
								"ActivityValue": "1-800-677-7271"
							},
							{
								"ActivityType": "Email",
								"ActivityValue": "support@domain.com"
							}
						]

					},
					"_Name": "userProfileSection",
					"_Type": "Section.Type.ProfileHeader"
				},
				{
					"Buttons": [
						{
							"Title": "Sync",
							"TextAlignment": "center",
							"OnPress":"/MDKSampleApp/Actions/Service/SyncInitialize.action",
							"_Type": "ButtonTable.Type.Button"
						},
						{
							"Title": "Change Passcode",
							"OnPress":"/MDKIntegration/Actions/ChangeUserPasscode.action",
							"TextAlignment": "center",
							"_Type": "ButtonTable.Type.Button"
						},
						{
							"Title": "Log Out",
							"OnPress": "/MDKIntegration/Actions/LogoutUser.action",
							"TextAlignment": "center",
							"_Type": "ButtonTable.Type.Button"
						}
					],
					"_Name":"ButtonTable",
					"_Type": "Section.Type.ButtonTable"
				}
			],
			"_Name": "SectionedTable0",
			"_Type": "Control.Type.SectionedTable"
		}
	],
	"_Name": "UserProfile",
	"_Type": "Page"
}
```

### SyncInitialize.action

```json
{
	"Animated": true,
	"CompletionMessage": "Sync Completed",
	"CompletionTimeout": 7,
	"Message": "Sync In Progress",
	"OnSuccess": "/MDKSampleApp/Actions/Service/SyncStartedMessage.action",
	"_Type": "Action.Type.ProgressBanner"
}
```

### SyncStartedMessage.action

```json
{
	"Animated": true,
	"Duration": 2,
	"Message": "Sync Started",
	"IsIconHidden": true,
	"_Type": "Action.Type.ToastMessage",
	"OnSuccess": "/MDKSampleApp/Actions/Service/UploadOffline.action",
	"OnFailure": "/MDKSampleApp/Actions/Service/SyncFailureMessage.action"
}
```

### UploadOffline.action

```json
{
	"Service": "/MDKSampleApp/Services/SampleService.service",
	"_Type": "Action.Type.OfflineOData.Upload",
	"ActionResult": {
		"_Name": "sync"
	},
	"OnSuccess": "/MDKSampleApp/Actions/Service/DownloadOffline.action",
	"OnFailure": "/MDKSampleApp/Actions/Service/SyncFailureMessage.action"
}
```

### DownloadOffline.action

```json
{
	"Service": "MDKSampleApp/Services/SampleService.service",
	"DefiningRequests": [
        {
            "Name": "Products",
            "Query": "Products"
        }, 
        {
            "Name": "Suppliers",
            "Query": "Suppliers"
        }, 
        {
            "Name": "Customers",
            "Query": "Customers"
        }, 
        {
            "Name": "PurchaseOrderHeaders",
            "Query": "PurchaseOrderHeaders"
        }, 
        {
            "Name": "PurchaseOrderItems",
            "Query": "PurchaseOrderItems"
        }, 
        {
            "Name": "ProductCategories",
            "Query": "ProductCategories"
        }, 
        {
            "Name": "SalesOrderHeaders",
            "Query": "SalesOrderHeaders"
        }, 
        {
            "Name": "SalesOrderItems",
            "Query": "SalesOrderItems"
        }
    ],
	"_Type": "Action.Type.OfflineOData.Download",
	"ActionResult": {
		"_Name": "sync"
	},
	"OnSuccess": "/MDKSampleApp/Actions/Service/SyncSuccessMessage.action",
	"OnFailure": "/MDKSampleApp/Actions/Service/SyncFailureMessage.action"
}
```

### SyncSuccessMessage.action

```json
{
	"Animated": true,
	"Duration": 2,
	"Message": "Sync offline data complete",
	"_Type": "Action.Type.ToastMessage"
}
```

### SyncFailureMessage.action

```json
{
	"Message": "Sync offline data failed - {{#ActionResults:sync/#Property:error}}",
	"Duration": 7,
	"Animated": true,
	"_Type": "Action.Type.BannerMessage"
}
```

### ChangeUserPasscode.action

```json
{
	"_Type": "Action.Type.ChangeUserPasscode"
}
```

### LogoutUser.action

```json
{
	"_Type": "Action.Type.Logout"
}
```
