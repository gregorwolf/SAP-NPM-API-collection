## Popover Menu Action

### PopoverMenu.action

```json
{
	"_Type": "Action.Type.PopoverMenu",
	"Title": "Popover Menu",
	"PopoverItems": [
		{
			"Icon": "sap-icon://message-popup",
			"Title": "Show Message",
			"OnPress": "/MDKSampleApp/Actions/Popover/ShowMessage.action"
		},
		{
			"Icon": "sap-icon://bell",
			"Title": "Show Banner",
			"OnPress": "/MDKSampleApp/Actions/Popover/ShowBanner.action"
		},
		{
			"Icon": "sap-icon://message-warning",
			"Title": "Show ToastMessage",
			"OnPress": "/MDKSampleApp/Actions/Popover/ShowToastMessage.action"
		},
		{
			"Icon": "sap-icon://message-error",
			"Title": "Disabled Item",
			"Enabled": false
		}
	]
}
```

### ShowMessage.action

```json
{
	"_Type": "Action.Type.Message",
	"Message": "Message Triggered from PopOver",
	"OKCaption": "OK",
	"Title": "Message Action"
}
```

### ShowBanner.action

```json
{
	"_Type": "Action.Type.BannerMessage",
	"Message": "Banner Message Triggered from Popover",
	"Duration":4,
	"Animated": true
}
```

### ShowToastMessage.action

```json
{
	"_Type": "Action.Type.ToastMessage",
	"Message": "Toast Message Triggered from Popover",
	"Animated": true,
	"Duration":4,
	"NumberOfLines":2
}
```