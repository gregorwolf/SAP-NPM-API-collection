## ChangeSet Action

### PurchaseOrderCreateChangeSet.action

```json
{
	"_Type": "Action.Type.ODataService.ChangeSet",
	"Target": {
		"Service": "/MDKSampleApp/Services/SampleService.service"
	},
	"Actions": [
		"/MDKSampleApp/Actions/POHeader/NavToPOCreate.action",
		"/MDKSampleApp/Actions/POHeader/NavToPOItemCreate.action"
	]
}
```