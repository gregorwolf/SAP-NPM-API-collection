
----
## Action Result
The ActionResult of this action is `null`.

----
## Examples

### Upload

```json
{
  "_Type": "Action.Type.OfflineOData.Upload",
  "Service": "/MyMDKApp/Services/MyOData.service"
}
```

### Selective upload

```json
{
  "_Type": "Action.Type.OfflineOData.Upload",
  "Service": "/MyMDKApp/Services/MyOData.service",
  "UploadCategories": [
    "Customer",
    "Product"
  ]
}
```