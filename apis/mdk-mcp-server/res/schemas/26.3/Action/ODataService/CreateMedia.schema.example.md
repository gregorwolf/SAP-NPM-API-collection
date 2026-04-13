
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS array of OData media entities. The failure ActionResult is an error message.

----
## Examples

### OData Media entity

"Product" EntityType is a Media Entity and it has an associated media stream (could be a product image):
```xml
<EntityType Name="Product" HasStream="true">
  <Key>
    <PropertyRef Name="ID"/>
  </Key>
  <Property Name="ID" Type="Edm.String" Nullable="false"/>
  <Property Name="Name" Type="Edm.String" Nullable="false"/>
  <Property Name="Price" Type="Edm.Decimal" Nullable="false"/>
</EntityType>
...
...
<EntitySet Name="Products" EntityType="MyODataModel.Product"/>
```
Note: Each entity can only have a single associated media stream.
With this action, you can create "Product" entity and at the same time upload a media file (e.g. an image) to it.

### CreateMedia with documents from Attachment control

```json
{
  "_Type": "Action.Type.ODataService.CreateMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products"
  },
  "Properties": {
    "ID": "#Control:IDCtrl/#Value",
    "Name": "#Control:NameCtrl/#Value",
    "Price": "#Control:PriceCtrl/#Value"
  },
  "Media": "#Control:Attachment/#Value"
}
```

### CreateMedia with Signature image from Signature control

```json
{
  "_Type": "Action.Type.ODataService.CreateMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Products"
  },
  "Properties": {
    "ID": "#Control:IDCtrl/#Value",
    "Name": "#Control:NameCtrl/#Value",
    "Price": "#Control:PriceCtrl/#Value",
  },
  "Media": ["#Control:SignatureCell/#Value"]
}
```
