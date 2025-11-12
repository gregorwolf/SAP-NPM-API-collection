
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is the data of the downloaded stream. The failure ActionResult is an error message.

----
## Examples

### OData entity with Edm.Stream properties

"HiResPhoto" and "LoResPhoto" properties are Edm.Stream in the following "Product" EntityType:
```xml
<EntityType Name="Product">
  <Key>
    <PropertyRef Name="ID"/>
  </Key>
  <Property Name="ID" Type="Edm.String" Nullable="false"/>
  <Property Name="Name" Type="Edm.String"/>
  <Property Name="Price" Type="Edm.Decimal" Nullable="false"/>
  <Property Name="HiResPhoto" Type="Edm.Stream" Nullable="true"/>
  <Property Name="LoResPhoto" Type="Edm.Stream" Nullable="true"/>
</EntityType>
```
Both data stream of "HiResPhoto" and "LoResPhoto" can be downloaded using this action.

### Query Options

```json
{
  "_Type": "Action.Type.ODataService.DownloadStream",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products",
    "QueryOptions": "$filter=ProductID eq {ProductID}"
  },
  "Properties": ["Picture"]
}
```

### Read Link

```json
{
  "_Type": "Action.Type.ODataService.DownloadStream",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products",
    "ReadLink": "{@odata.readLink}"
  },
  "Properties": ["Picture"]
}
```

### DownloadOptions

```json
{
  "_Type": "Action.Type.ODataService.DownloadStream",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products",
    "ReadLink": "{@odata.readLink}"
  },
  "Properties": ["Picture"],
  "DownloadOptions": [{
    "WriteToFilePath": "/MyMDKApp/Rules/GetFilePathName.js"
  }]
}
```
