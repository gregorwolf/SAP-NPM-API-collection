Generated Keys
==============

### What the HANA SPS10 Dev Guide has to say

For objects that do not have a unique key in their results, for example, calculation views or aggregated tables, you can
generate a locally valid key. This key value numbers the results starting with 1 and is not meant for dereferencing the entity;
so you cannot use this key to retrieve the entity. The key is valid only for the duration of the current session and is used only
to satisfy OData's need for a unique ID in the results. The property type of a generated local key is Edm.String and cannot be
changed.

Service definition *test.xsodata*
  
```xsodata
service {
  "xsodata.test.views::all_types_view" as "all_types_view_genkey" key generate local "GenID";
}
```

**Metadata retrieved via /test.xsodata/$metadata:** 
 
```xml
<EntityType Name="all_types_view_genkeyType">
  <Key>
    <PropertyRef Name="GenID"/>
  </Key>
  <Property Name="GenID" Type="Edm.String" Nullable="false" MaxLength="2147483647"/>
  <Property Name="KEY" Type="Edm.Int32" Nullable="false"/>
  <Property Name="DATE" Type="Edm.DateTime"/>
  <Property Name="TIME" Type="Edm.Time"/>
  ...
</EntityType>
```

### Differences to XS Classic

Error messages differ for requests involving a generated local key:

| Request            | XS1                         | XS2                                     |
|--------------------|-----------------------------|-----------------------------------------|
| GET on Entity      | 404 Resource Not Found      | 501 Not Implemented with specific error |
| DELETE on Entity   | 404 Resource Not Found      | 501 Not Implemented with specific error |
| PUT on Entity      | 500 with SQL Error          | 501 Not Implemented with specific error |
| POST on Entity Set | 501 Feature Not Implemented | 501 Not Implemented with specific error |

### Generated Key Checks

Several URI restrictions apply to generated keys.

If an entity type uses a generated key, the following HTTP Methods are not allowed:

| Method   | EntitySet | Entity  |
|----------|-----------|---------|
| GET      |           | :x:     |
| POST     | :x:       | :x:     |
| PUT      | :x:       | :x:     |
| DELETE   | :x:       | :x:     |

