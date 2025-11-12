
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS object containing the deleted media entity. The failure ActionResult is an error message.

----
## Examples

### Query Options

```json
{
  "_Type": "Action.Type.ODataService.DeleteMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Documents",
    "QueryOptions": "$filter=DocumentID eq {{Property:#DocumentID}}"
  }
}
```


### Read Link

```json
{
  "_Type": "Action.Type.ODataService.DeleteMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Documents",
    "ReadLink": "{@odata.readLink}"
  }
}
```