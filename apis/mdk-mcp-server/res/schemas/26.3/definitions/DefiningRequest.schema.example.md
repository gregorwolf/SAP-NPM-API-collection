
----
## Examples

There are three types of defining request:

type 1 - A defining request that identifies one or more entities where the automaticallyRetrievesStreams property is set to false. In this case, even if the defining request identifies media entities, the media streams will not be downloaded.

```json
{
	"Name": "Customers",
	"Query": "Customers"
},
```

type 2 - A defining request that identifies one or more entities, some of which may be media entities, and where the automaticallyRetrievesStreams property is set to true. In this case, the media streams will be downloaded as well for media entities.

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
