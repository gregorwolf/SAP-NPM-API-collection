
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
      "Street": "#Control:Street/#Value",
      "City": "#Control:City/#Value",
      "Country": "#Control:Country/#Value"
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

### CreateEntity with Open Type Dynamic Properties

```xml
<EntityType Name="DynamicCustomers" OpenType="true">
  <Key>
    <PropertyRef Name="ID"/>
  </Key>
  <Property Name="CompanyName" Type="Edm.String" Nullable="false"/>
  <Property Name="ContactName" Type="Edm.String" Nullable="false"/>
</EntityType>

<ComplexType Name="DynamicAddress" OpenType="true">
  <Property Name="Street" Type="Edm.String" Nullable="true"/>
  <Property Name="City" Type="Edm.String" Nullable="true"/>
  <Property Name="Country" Type="Edm.String" Nullable="true"/>
</ComplexType>
```

In OData V4, an Open Type is a structured type (such as an entity type or complex type) that can contain dynamic properties — properties not declared in the metadata model but included dynamically at runtime in the payload.

When creating or updating entities or complex properties that include dynamic properties, the request payload (the HTTP body in a POST or PATCH operation) must explicitly include both:

- Declared properties – defined in the metadata
- Dynamic properties – added at runtime, often annotated with @odata.type to indicate their type

Supported EDM Types

- Edm.Boolean
- Edm.Byte
- Edm.Date
- Edm.DateTimeOffset
- Edm.Decimal
- Edm.Double
- Edm.Duration
- Edm.Guid
- Edm.Int16
- Edm.Int32
- Edm.Int64
- Edm.SByte
- Edm.Single
- Edm.String
- Edm.TimeOfDay

Supported User-Defined Types (must be defined in the metadata document):

- Complex Types
- Enum Types 

Collections:

- Collections are supported using the format: Collection(SupportedType).

The format of the OData V4 @odata.type property is #Namespace.TypeName.

Open types are currently supported only for MBT generated OData services. The # prefix and the Edm. namespace are optional.

Default Type Inference (when @odata.type is omitted)

| JSON Value | **Default OData Type** | **Notes** |
|-------------|------------------------|------------|
| `true` | `Edm.Boolean` | Boolean literal |
| `1` | `Edm.Int64` | Integer literal |
| `1.23` | `Edm.Double` | Floating-point literal |
| `"Hello"` | `Edm.String` | String literal |
| `null` | Requires explicit `@odata.type` | Type cannot be inferred |

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "DynamicCustomers"
  },
  "Properties": {
    "CompanyName": "#Control:CompanyName/#Value",
    "ContactName@data.type": "Edm.String",
    "ContactName": "#Control:ContactName/#Value",
    "Address": {
      "@data.type": "MyNamespace.Address",
      "Street": "#Control:Street/#Value",
      "City": "#Control:City/#Value",
      "Country": "#Control:Country/#Value"
    },
    "Emails@data.type": "Collection(Edm.String)",
    "Emails": [
      "Russell@example.com",
      "Russell@contoso.com"
    ]
  }
}
```
