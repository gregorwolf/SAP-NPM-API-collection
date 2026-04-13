
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is the stream data of the downloaded media. The failure ActionResult is an error message.

----
## Examples

### OData Media entity

"Product" EntityType is a Media Entity and it has an associated media stream (could be a product image) that can be downloaded:
```xml
<EntityType Name="Product" HasStream="true">
  <Key>
    <PropertyRef Name="ID"/>
  </Key>
  <Property Name="ID" Type="Edm.String" Nullable="false"/>
  <Property Name="Name" Type="Edm.String" Nullable="false"/>
  <Property Name="Price" Type="Edm.Decimal" Nullable="false"/>
</EntityType>
```
Note: Each entity can only have a single associated media stream.

### Query Options

```json
{
  "_Type": "Action.Type.ODataService.DownloadMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Images",
    "QueryOptions": "$filter=id eq {id}"
  }
}
```

### Read Link

```json
{
  "_Type": "Action.Type.ODataService.DownloadMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Images",
    "ReadLink": "{@odata.readLink}"
  }
}
```

### DownloadOptions

```json
{
  "_Type": "Action.Type.ODataService.DownloadMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Images",
    "ReadLink": "{@odata.readLink}"
  },
  "DownloadOptions": {
    "WriteToFilePath": "/MyMDKApp/Rules/GetFilePathName.js"
  }
}
```