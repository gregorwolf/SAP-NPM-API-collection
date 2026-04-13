
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is an empty string. The failure ActionResult is an error message.

----
## Examples

```json
// OpenDocument.action
{
    "Path": "/path/to/document.pdf",
    "_Type": "Action.Type.OpenDocument"
}

{
    "Path": "res://document.pdf",
    "_Type": "Action.Type.OpenDocument",
    "UseExternalViewer" : true
}

{
    "Path": "https://some.externalserver.xyz/images/someimage.jpg",
    "_Type": "Action.Type.OpenDocument",
    "UseExternalViewer" : false
}

```

```json
// OpenDocument for OData Media
{
    "Path": "/MyMDKApp/Services/MyOData.service/Products(1)/$value",
    "_Type": "Action.Type.OpenDocument"
}

{
    "Path": "/MyMDKApp/Services/MyOData.service/Products(1)/$value",
    "MimeType": "application/pdf",
    "_Type": "Action.Type.OpenDocument"
}

{
    "Path": "/MyMDKApp/Services/MyOData.service/{@odata.readLink}/$value",
    "MimeType": "{MimeType}",
    "_Type": "Action.Type.OpenDocument"
}

// OpenDocument for OData Stream
{
    "Path": "/MyMDKApp/Services/MyOData.service/Products(1)/Document",
    "_Type": "Action.Type.OpenDocument"
}

{
    "Path": "/MyMDKApp/Services/MyOData.service/Products(1)/Document",
    "MimeType": "application/pdf",
    "_Type": "Action.Type.OpenDocument"
}

{
    "Path": "/MyMDKApp/Services/MyOData.service/{@odata.readLink}/Document",
    "MimeType": "{MimeType}",
    "_Type": "Action.Type.OpenDocument"
}

```
