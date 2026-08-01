
----
## Action Result
The ActionResult of this action is `null`.

----
## Defining Request Types

There are three types of defining request:

type 1 - A defining request that identifies one or more entities where the automaticallyRetrievesStreams property is set to false. In this case, even if the defining request identifies media entities, the media streams will not be downloaded.

```json
{
	"Name": "Customers",
	"Query": "Customers"
},
```

type 2 - A defining request that identifies one or more entities, some of which may be media entities, and where the automaticallyRetrievesStreams property is set to true. In this case, the media streams will be downloaded for media entities.

```json
{
	"Name": "Products",
	"Query": "Products",
	"AutomaticallyRetrievesStreams": true
},
```

type 3 - A defining request that identifies a single media entity and the automaticallyRetrievesStreams property is set to true. The URL specified in this case MUST be the read link of the media entity, not the read link of the media stream.

```json
{
	"Name": "Products(101)",
	"Query": "Products(101)",
	"AutomaticallyRetrievesStreams": true
},
```

----
## Mobile Services Option

If 'allow_defining_query_removal' option in Mobile Services is not enabled, only the defining request of type 3 can be removed.

If 'allow_defining_query_removal' option in Mobile Services is enabled, all types can be removed when there is no pending change. Removing a defining request from the provider will delete all local data of the defining request in OfflineODataProvider, like entities downloaded from the backend, relationships associated with the entities, and their media streams. The local data is always deleted immediately. But if non-shared delta tracking is enabled, the name of the defining request and its change logs on the server will be deleted during next download.

----
## Examples

```json
{
  "_Type": "Action.Type.OfflineOData.RemoveDefiningRequest",
  "Service": "/MyMDKApp/Services/MyOData.service",
  "DefiningRequest": {
    "Name": "Products"
  }
}
```

```json
{
  "_Type": "Action.Type.OfflineOData.RemoveDefiningRequest",
  "Service": "/MyMDKApp/Services/MyOData.service",
  "DefiningRequest": {
    "Name": "{@odata.readLink}"
  }
}
```
