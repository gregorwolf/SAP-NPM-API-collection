## DownloadMedia action

### DownloadProductImage.action

```json
{
    "_Type": "Action.Type.ODataService.DownloadMedia",
    "Target": {
        "Service": "/MDKSampleApp/Services/SampleService.service",
        "EntitySet": "Products",
        "QueryOptions": "$filter=ProductId eq 'HT-1001'"
    },
    "ShowActivityIndicator" : true,
    "ActionResult" : { "_Name" : "OData" },
    "OnSuccess": "/MDKSampleApp/Rules/DocumentFileSave.js",
    "OnFailure": "/MDKSampleApp/Actions/OpenDocumentFailure.action",
}
```

### DocumentFileSave.js

```js

let fs = require("@nativescript/core/file-system");
import DocumentActionBinding from './DocumentActionBinding';

export default function DocumentFileSave(pageProxy) {
  const binding = DocumentActionBinding(pageProxy);
  let readLink = binding['@odata.readLink'];
  var filename = binding.FileName
 
  if (readLink && filename) {
    var tempDir = fs.knownFolders.temp();
    var attachmentPath = fs.path.join(tempDir.path, filename);
    var attachmentFile = fs.File.fromPath(attachmentPath);
    attachmentFile.writeSync(pageProxy.getClientData()[readLink], err => {
      attachmentFile.remove();
      return pageProxy.executeAction('/MDKSampleApp/Actions/OpenDocumentFailure.action');
    });

    pageProxy.setActionBinding({
      'Path': attachmentPath,
    });

    return pageProxy.executeAction('/MDKSampleApp/Actions/MediaDownloadComplete.action');
  }
}
```

### MediaDownloadComplete.action

```json
{
    "Message": "Media download complete",
    "Duration": 3,
    "Animated": true,
    "_Type": "Action.Type.BannerMessage"
}
```

### OpenDocumentFailure.action

```json
{
    "_Type": "Action.Type.Message",
    "Message": "Failed to open the document",
    "Title": "Failure",
    "OKCaption": "Ok"
}
```
