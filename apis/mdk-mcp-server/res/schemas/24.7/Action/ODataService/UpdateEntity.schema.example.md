
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS object containing the updated entity. The failure ActionResult is an error message.

----
## Examples

### Update with Headers & RequestOptions

```json
{
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "Properties": {
    "CompanyName": "#Control:CompanyName/#Value",
    "ContactName": "#Control:ContactName/#Value"
  },
  "Headers": {
    "Transaction.Ignore": "true"
  },
  "RequestOptions": {
    "UpdateMode": "Replace"
  }
}
```

### Update links

```json
{ 
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "UpdateLinks": [{
    "Property": "Orders",
    "Target": {
      "EntitySet": "Orders",
      "QueryOptions": "$filter=OrderID eq '{#Page:-Previous/OrderID}'"
    }
  }]
}
```

### Update links by rule

```json
{ 
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "UpdateLinks": "/MyMDKApp/Rules/LinkRule.js"
}
```

### Update binary type

```json
{ 
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "Properties": {
    "BinaryData": "#Control:Attachment/#Value/#Index:0"
  }
}
```
