
----
## Action Result
The ActionResult of this action is a JS object containing the entity creation result.

----
## Examples

### CreateEntity with Headers

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers"
  },
  "Properties": {
    "CompanyName": "#Control:CompanyName/#Value",
    "ContactName": "#Control:ContactName/#Value",
    "Address": {
      "street": "#Control:Street/#Value",
      "city": "#Control:City/#Value",
      "state": "#Control:State/#Value"
    },
    "Emails": [
      "Russell@example.com",
      "Russell@contoso.com"
    ]
  },
  "Headers": {
    "MDK-Header": "MDK"
  }
}
```

### CreateEntity and linking to another entity using Dynamic Query String

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers"
  },
  "Properties": {
    "CompanyName": "#Control:CompanyName/#Value",
    "ContactName": "#Control:ContactName/#Value"
  },
  "RequestOptions": {
    "RemoveCreatedEntityAfterUpload": true,
    "TransactionID": "UseGeneratedID",
  },
  "CreateLinks": [{
    "Property": "Orders",
    "Target": {
      "EntitySet": "Orders",
      "QueryOptions": "$filter=OrderID eq '{#Page:-Previous/OrderID}'"
    }
  }]
}
```

### CreateEntity and linking to another entity using Rule

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers"
  },
  "Properties": {
    "CompanyName": "#Control:CompanyName/#Value",
    "ContactName": "#Control:ContactName/#Value"
  },
  "CreateLinks": "/MyMDKApp/Actions/LinkRule.js"
}
```

### Deep Insert

A deep insert is an OData POST request to create an entity that also contains inline related entities. When a deep insert is processed, the top-level entity and all its related entities are created and related together as a single operation. 

The navigation property used for the deep insert refer to one entity.

Linking entities with 1:1 relationship in offline OData is a special case, you must using deep insert to create a 1:1 relationship between entities.

It cannot be accomplished using the following two approaches:

1. create entity 1, create entity 2 and link to entity 1 via CreateLinks in Create Entity.
2. create entity 1, create related entity 2 to link to entity 1 via Create Related Entity action.

These approaches don't work because the related entities, as well as the relationship, must be created simultaneously in offline scenario.

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "Service": "/MDKDevApp/Services/ODataLink.service",
    "EntitySet": "Orders"
  },
  "Properties": {
    "OrderID": "#Control:OrderID/#Value",
    "CustomerID": "#Control:CustomerID/#Value",
    "Customer": {
      "CustomerID": "#Control:CustomerID/#Value",
      "Name": "#Control:Name/#Value"
    }
  }
}
```

The navigation property used for the deep insert refer to many entities (This is not supported by Offline)

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "Service": "/MDKDevApp/Services/ODataLink.service",
    "EntitySet": "Customers"
  },
  "Properties": {
    "CustomerID": "#Control:CustomerID/#Value",
    "Name": "#Control:Name/#Value",
    "Orders": [
      {
        "CustomerID": "#Control:CustomerID/#Value",
        "OrderID": "#Control:OrderID/#Value"
      }
    ]
  }
}
```

### CreateEntity with Binary Data

According to the OData specification, binary data types (Edm.Binary) can have variable lengths, but you can set a maximum length using the MaxLength attribute.

By default, if the OData service is created using MBT, the maximum length is set to 4000. If you plan to upload binary data larger than 4000 bytes, please ensure you explicitly define the MaxLength attribute.

```xml
<Property Name="BinaryData" Type="Edm.Binary" Nullable="false" MaxLength="5000"/>
```

In the example below, the BinaryData property is of binary type. If you provide an attachment array, only the first attachment will be used to supply the binary value. You can also use the first attachment to provide this value.

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers"
  },
  "Properties": {
    "CompanyName": "#Control:CompanyName/#Value",
    "ContactName": "#Control:ContactName/#Value",
    "BinaryData": "#Control:Attachment/#Value/#Index:0"
  },
}
```
