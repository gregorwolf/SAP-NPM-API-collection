
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS object containing the entity. The failure ActionResult is an error message.

----
## Examples

### Activate a draft and update the active entity.   

```json
{
  "_Type": "Action.Type.ODataService.DraftEnabled.Save",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  }
}
```
