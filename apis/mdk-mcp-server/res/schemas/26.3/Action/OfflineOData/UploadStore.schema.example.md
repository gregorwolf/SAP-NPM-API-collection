
----
## Action Result
The ActionResult of this action is `null`.

----
## Examples

### Store Upload

```json
{
  "_Type": "Action.Type.OfflineOData.UploadStore",
  "Service": "/MyMDKApp/Services/MyOData.service"
}
```

### Store Upload with Note

```json
{
  "_Type": "Action.Type.OfflineOData.UploadStore",
  "Service": "/MyMDKApp/Services/MyOData.service",
  "Note": "My Note"
}
```

### Store Upload with Encryption Key

```json
{
  "_Type": "Action.Type.OfflineOData.UploadStore",
  "Service": "/MyMDKApp/Services/MyOData.service",
  "EncryptionKey": "MyEncryptionKey123"
}
```

### Store Upload with Encryption Key and Note

```json
{
  "_Type": "Action.Type.OfflineOData.UploadStore",
  "Service": "/MyMDKApp/Services/MyOData.service",
  "EncryptionKey": "MyEncryptionKey123",
  "Note": "My Note"
}
```
