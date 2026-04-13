
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS object containing the uploaded entity. The failure ActionResult is an error message.

----
## Examples

### OData Entity with Edm.Stream properties

`HiResPhoto` and `LoResPhoto` properties are Edm.Stream in the following "Product" EntityType:
```xml
<EntityType Name="Product">
  <Key>
    <PropertyRef Name="ProductID"/>
  </Key>
  <Property Name="ProductID" Type="Edm.String" Nullable="false"/>
  <Property Name="Name" Type="Edm.String"/>
  <Property Name="Price" Type="Edm.Decimal" Nullable="false"/>
  <Property Name="HiResPhoto" Type="Edm.Stream" Nullable="true"/>
  <Property Name="LoResPhoto" Type="Edm.Stream" Nullable="true"/>
</EntityType>
```
Both data stream of `HiResPhoto` and `LoResPhoto` can be uploaded using this action.

### Query Options

```json
{
  "_Type": "Action.Type.ODataService.UploadStream",
  "Properties": {
    "HiResPhoto": "#Control:Attachment/#Value",
    "LoResPhoto": "/MyMDKApp/Rules/GenerateLoResPhoto.js"
  },
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products",
    "QueryOptions": "$filter=ProductID eq {ProductID}"
  }
}
```

### Read Link

```json
{
  "_Type": "Action.Type.ODataService.UploadStream",
  "Properties": {
    "HiResPhoto": "#Control:Attachment/#Value",
    "LoResPhoto": "/MyMDKApp/Rules/GenerateLoResPhoto.js"
  },
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products",
    "ReadLink": "{@odata.readLink}"
  }
}
```

### Update Signature image

```json
{
  "_Type": "Action.Type.ODataService.UploadStream",
  "Properties": {
    "HiResPhoto": ["#Control:SignatureCell/#Value"],
    "LoResPhoto": "/MyMDKApp/Rules/GenerateLoResPhoto.js"
  },
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products",
    "ReadLink": "{@odata.readLink}"
  }
}
```
