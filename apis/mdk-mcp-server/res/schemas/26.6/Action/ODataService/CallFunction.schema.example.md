
----
**Note**
1. CallFunction action returns an empty string in the offline mode. The App user needs to upload the pending changes to the backend to complete the transaction. 
Offline mode can support HTTP POST, PUT, PATCH/MERGE, and DELETE requests. It does not support GET requests because GET requests are executed locally and there is no way to predict or simulate what the GET response will be when executed on the backend. Similarly, other HTTP requests (POST, PUT, PATCH, DELETE) made locally have no impact on the local data, again, because the effect cannot be predicted in the way that the effect for standard CRUD operations can.

2. CallFunction will store the results in the ActionBinding automatically. The App can bind it to Control directly like the example below. The parameter Target is the CallFunction name and case senstive.

```json
{
  "ObjectCell": {
    "Footnote": "{CategoryName}",
    "Title": "{CategoryID}"
  },
  "Target": "{GetOneCategory}",
  "_Name": "SectionObjectCollection0",
  "_Type": "Section.Type.ObjectCollection"
}
```

----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is of a JS primitive type, object or a JS array. The failure ActionResult is an error message.

----
## Examples

```json
{
  "_Type": "Action.Type.ODataService.CallFunction",
  "Target": {
    "Function": {
      "Name": "UpdateCustomerDetail",
      "Parameters": {
        "FirstName": "Lewis",
        "LastName": "Black",
        "Emails": [
          "lewisblack@example.com",
          "lewisblack@google.com"
        ],
        "Address": {
          "Street": "187 Suffolk Ln.",
          "City": "Boise"
        }
      }
    },
    "Service": "/MyMDKApp/Services/MyOData.service"
  }
}
```

