## Create OData Related Entity

### CreateRelatedPurchaseOrderItems.action

```json
{
  "_Type": "Action.Type.ODataService.CreateRelatedEntity",
  "Target": {
    "Service": "/MDKSampleApp/Services/SampleService.service",
    "EntitySet": "PurchaseOrderItems"
  },
  "Properties": {
    "PurchaseOrderId":"#Control:purchaseOrderId/#Value",
  },
  "ParentLink": {
    "Property": "Header",
    "Target": {
      "EntitySet": "PurchaseOrderHeaders",
      "ReadLink": "{@odata.readLink}"
    }
  }
}
```