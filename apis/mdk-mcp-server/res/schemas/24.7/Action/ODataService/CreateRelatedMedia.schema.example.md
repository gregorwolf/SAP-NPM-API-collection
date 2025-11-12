
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a JS array containing the OData readLink of the created entities. The failure ActionResult is an error message.

----
## Examples

### OData Related Media entity

"Image" EntityType is a Media Entity and it has an associated media stream:
```xml
<EntityType Name="Image" HasStream="true">
  <Key>
    <PropertyRef Name="id"/>
  </Key>
  <Property Name="id" Type="Edm.Int64" Nullable="false"/>
  <Property Name="label" Type="Edm.String" Nullable="true"/>
  <Property Name="created" Type="Edm.Date" Nullable="true"/>
  <Property Name="updated" Type="Edm.Date" Nullable="true"/>
  <NavigationProperty Name="artist" Type="Self.Artist"/>
</EntityType>
```

Parent EntityType "Artist" has a navigation property linking to "Image":
```xml
<EntityType Name="Artist">
  <Key>
    <PropertyRef Name="id"/>
  </Key>
  <Property Name="id" Type="Edm.Int64" Nullable="false"/>
  <Property Name="firstName" Type="Edm.String" Nullable="false"/>
  <Property Name="lastName" Type="Edm.String" Nullable="false"/>
  <Property Name="dateOfBirth" Type="Edm.Date" Nullable="true"/>
  <NavigationProperty Name="images" Type="Collection(Self.Image)"/>
</EntityType>
```

Note: Each entity can only have a single associated media stream.
With this action, you can create an "Image" entity and at the same time upload a media file to it. The new "Image" entity is linked to an existed "Artist" entity by its navigation property "images".

### CreateRelatedMedia

```json
{
  "_Type": "Action.Type.ODataService.CreateRelatedMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Images"
  },
  "Properties": {
    "ObjectKey": "#Control:ObjectKey/#Value",
    "FileName": "#Control:FileName/#Value"
  },
  "ParentLink": {
    "Property": "images",
    "Target": {
      "EntitySet": "Artists",
      "ReadLink": "{@odata.readLink}"
    }
  },
  "Media":"#Control:Attachment/#Value"
}
```

### CreateRelatedMedia without Properties

```json
{
  "_Type": "Action.Type.ODataService.CreateRelatedMedia",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EntitySet": "Images"
  },
  "ParentLink": {
    "Property": "images",
    "Target": {
      "EntitySet": "Artists",
      "ReadLink": "{@odata.readLink}"
    }
  },
  "Media": "#CurrentPage/#Control:Attachment/#Value"
}
```
