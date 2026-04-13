
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS array containing the read entity collection. The failure ActionResult is an error message.

----
## Examples

### Read

```json
{
  "_Type": "Action.Type.ODataService.Read",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "QueryOptions": "$filter=CustomerID eq '1234'"
  }
}
```

### Read selected properties

```json
{
  "_Type": "Action.Type.ODataService.Read",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers"
  },
  "Properties": ["CustomerID", "CompanyName"]
}
```