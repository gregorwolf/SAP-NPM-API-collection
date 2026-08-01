
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS array of OData media entities. The failure ActionResult is an error message.

----
## Examples

### OData Media entity

"Image" EntityType is a Media Entity.

```xml
<EntityType Name="Image" HasStream="true">
  <Key>
    <PropertyRef Name="ID"/>
  </Key>
  <Property Name="ID" Type="Edm.String" Nullable="false"/>
  <Property Name="Name" Type="Edm.String" Nullable="false"/>
</EntityType>
...
...
<EntitySet Name="Image" EntityType="MyODataModel.Image"/>
```
Note: Uploads media, it replaces if it has any existing media.
      UploadMedia action is for MediaEntity.
      UploadStream action is for normal Entity, if the property type is Edm.Stream.

### UploadMedia from Attachment control

```json
{
  "_Type": "Action.Type.ODataService.UploadMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Images",
    "ReadLink": "{@odata.readLink}"
  },
  "Media":"#Control:Attachment/#Value",
  "ActionResult": { "_Name": "OData" },
  "OnSuccess": "/MyMDKApp/Actions/ClosePage.action",
  "OnFailure": "/MyMDKApp/Rules/Failure.js"
}

{
  "_Type": "Action.Type.ODataService.UploadMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Images",
    "QueryOptions": "$filter=ID eq 1234"
  },
  "Media":"#Control:Attachment/#Value",
  "ActionResult": { "_Name": "OData" },
  "OnSuccess": "/MyMDKApp/Actions/ClosePage.action",
  "OnFailure": "/MyMDKApp/Rules/Failure.js"
}
```
