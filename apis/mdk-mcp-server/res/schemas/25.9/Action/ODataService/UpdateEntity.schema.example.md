
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS object containing the updated entity. The failure ActionResult is an error message.

----
## Examples

### Update with Headers & RequestOptions

```json
{
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "Properties": {
    "CompanyName": "#Control:CompanyName/#Value",
    "ContactName": "#Control:ContactName/#Value"
  },
  "Headers": {
    "MDK-Header": "MDK"
  },
  "RequestOptions": {
    "UpdateMode": "Replace"
  }
}
```

### Update links

```json
{ 
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "UpdateLinks": [{
    "Property": "Orders",
    "Target": {
      "EntitySet": "Orders",
      "QueryOptions": "$filter=OrderID eq '{#Page:-Previous/OrderID}'"
    }
  }]
}
```

### Update links by rule

```json
{ 
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "UpdateLinks": "/MyMDKApp/Rules/LinkRule.js"
}
```

### Update binary type

```json
{ 
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Customers",
    "ReadLink": "{@odata.readLink}"
  },
  "Properties": {
    "BinaryData": "#Control:Attachment/#Value/#Index:0"
  }
}
```

### Update with Open Type Dynamic Properties

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

Open types are currently supported only for  MBT generated OData services. The # prefix and the Edm. namespace are optional.

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
  "_Type": "Action.Type.ODataService.UpdateEntity",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "DynamicCustomers",
    "ReadLink": "{@odata.readLink}"
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
  },
  "Headers": {
    "MDK-Header": "MDK"
  },
  "RequestOptions": {
    "UpdateMode": "Replace"
  }
}
```
