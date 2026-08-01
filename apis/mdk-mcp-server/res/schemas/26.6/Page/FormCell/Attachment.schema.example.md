
----
## Android Platforms File Types List
| Android Version                                  |
| ------------------------------------------------ | 
| [9.0](https://android.googlesource.com/platform/libcore/+/refs/tags/android-9.0.0_r49/luni/src/main/java/libcore/net/MimeUtils.java)              | 
| [8.1](https://android.googlesource.com/platform/libcore/+/refs/tags/android-8.1.0_r69/luni/src/main/java/libcore/net/MimeUtils.java)              | 
| [8.0](https://android.googlesource.com/platform/libcore/+/refs/tags/android-8.0.0_r39/luni/src/main/java/libcore/net/MimeUtils.java)              | 
| [7.1.1](https://android.googlesource.com/platform/libcore/+/refs/tags/android-7.1.1_r59/luni/src/main/java/libcore/net/MimeUtils.java)              | 
| [7.0](https://android.googlesource.com/platform/libcore/+/refs/tags/android-7.0.0_r36/luni/src/main/java/libcore/net/MimeUtils.java)              | 
| [6.0](https://android.googlesource.com/platform/libcore/+/refs/tags/android-cts-6.0_r32/luni/src/main/java/libcore/net/MimeUtils.java)            | 

----
## Examples

```json
// Attachment Form Cell metadata
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Attachment",
        "_Name": "AttachmentFormCell",
        "AttachmentTitle": "Photos [%d]",
        "AttachmentAddTitle": "Add photos",
        "AttachmentCancelTitle": "No!",
        "AttachmentActionType": ["AddPhoto", "TakePhoto", "SelectFile"],
        "AllowedFileTypes": [ "jpg", "png", "gif" ],
        "MaxFileSize": 1,
        "OnValueChange": "/MyMDKApp/Actions/ShowMessage.action",
        "RequiredIndicator": true,
        "Styles": {
          "Background": "AttachmentFormCellBackground",
          "RequiredIndicator": "RequiredIndicatorColor"
        },
        "Validation": {
          "Message": "This is validation view message",
          "Visible": true,
          "SeparatorVisible": true,
          "Styles": {
            "Message": "ValidationMessage",
            "ValidationView": "ValidationView"
          }
        }
      }]
    }]
  }]
}
```

### Set attachment Value from a Rule and OnPress event handler
```json
// Attachment Form Cell metadata
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "Sections": [{
      "_Type": "Control.Type.FormCellContainer",
      "_Name": "FormCellContainer",
      "Caption": "Section",
      "Controls": [{
        "_Type": "Control.Type.FormCell.Attachment",
        "_Name": "AttachmentFormCell",
        "AttachmentTitle": "Photos [%d]",
        "AttachmentAddTitle": "Add photos",
        "AttachmentCancelTitle": "No!",
        "AttachmentActionType": ["AddPhoto", "TakePhoto", "SelectFile"],
        "Value": "/MyMDKApp/Rules/InitializeAttachments.js",
        "AllowedFileTypes": ["jpg", "png", "gif"],
        "OnValueChange": "/MyMDKApp/Actions/ShowMessage.action",
        "OnPress": "/MyMDKApp/Rules/AttachmentOnPress.js"
      }]
    }]
  }]
}
```

```javascript
// set local attachments to Value property
// InitializeAttachments.js
function InitializeAttachments(formcellProxy) {
    var serviceName = '/MyMDKApp/Services/Amw.service';
    var entitySet = 'Images';
    var queryOption = '$top=1'
    var promises = [];
    var attachmentData = [];
    return formcellProxy.read(serviceName, entitySet, [], queryOption).then(function (attachments) {
        attachments.forEach(function (attachmentObject) {
            var documentObject = attachmentObject.Document;
            var readLink = documentObject['@odata.readLink'];
            var entitySet = readLink.split('(')[0];
            promises.push(formcellProxy.isMediaLocal(serviceName, entitySet, readLink).then(function (isMediaLocal) {
                return [isMediaLocal, documentObject];
            }));
        });

        return Promise.all(promises).then(function (results) {
            results.forEach(function (result) {
                var isMedialLocal = result[0];
                var attachment = result[1];
                if (isMedialLocal && !attachment.FileSize) {
                    var entitySet = 'Documents';
                    var property = 'Document';
                    var readLink = attachment['@odata.readLink'];
                    var service = '/MyMDKApp/Services/Amw.service';
                    var documentPath = attachment.path;
                    var attachmentEntry = formcellProxy.createAttachmentEntry(documentPath, entitySet, property, readLink, service);
                    if (attachmentEntry) {
                        attachmentData.push(attachmentEntry);
                    }
                }
            });
            return attachmentData;
        });
    });
}
```

```javascript
// on press event handler for existing attachment
// AttachmentOnPress.js
import { ImageSource, knownFolders, path } from '@nativescript/core';

// clientAPI is instance of AttachmentEntryProxy
export default function AttachmentOnPress(clientAPI) {
  // get action binding information
  const binding = clientAPI.getPageProxy().getActionBinding();
  if (binding.index === 0) {
    // execute the default open behaviour
    clientAPI.open();
  } else if (binding.index === 1) {
    ImageSource.fromResource("download_icon").then((imageSource) => {
      const folderPath = knownFolders.documents().path;
      const fileName = "test.png";
      const filePath = path.join(folderPath, fileName);
      const saved = imageSource.saveToFile(filePath, "png");
      if (saved) {
        console.log("Image saved successfully!");
      }

      let newAttachmentEntry = clientAPI.createAttachmentEntry(filePath, binding.entitySet, binding.property, binding.readLink, binding.service);
      // replace to the new file
      clientAPI.setValue(newAttachmentEntry, false);
      setTimeout(() => {
        // execute the default open behaviour
        clientAPI.open();
      }, 1000);
    });
  } else if (binding.index === 2) {
    clientAPI.executeAction('/MyMDKApp/Actions/Popover/Popover.action');
  } else {
    alert(clientAPI.getIndex() + '\n' + clientAPI.getValue().urlString);
  }
}
```

### Style Classes Definition
```css
/* Attachment Form Cell - Background */
.AttachmentFormCellBackground {
  background-color: yellow;
}

/* Validation view */
.ValidationView {
  background-color: #83AF9B;
  border-top-color: #ff00ee;
}

/* Validation message */
.ValidationMessage {
  font-size: 16;
  font-color: #0000ff;
}

/* Required indicator's color - font-color / color can be used */
.RequiredIndicatorColor {
  font-color: blue;
}
```