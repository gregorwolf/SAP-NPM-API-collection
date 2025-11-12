
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

When this action gets executed successfully, the ActionResult is a Boolean value indicating whether the pre-requisites are met. Otherwise it’s an error message.

----
## Examples


```json
{
    "_Type": "Action.Type.CheckBarcodeScannerPrerequisite",
    "OnSuccess": "/MDKApp/Rules/BarcodeScanner/CheckBarcodeScannerPrerequisiteResult.js", 
    "OnFailure": "/MDKApp/Actions/BarcodeScanner/CheckBarcodeScannerPrerequisiteFailure.action",
    "ActionResult": {
        "_Name": "CheckCamera"
    }
}
```

```js
export default function CheckBarcodeScannerPrerequisiteResult(clientAPI) {
  var actionResult = clientAPI.getActionResult('CheckCamera');
  if (actionResult) {
    clientAPI.setActionBinding({
      'IsCameraReady': actionResult.data,
    });
    return clientAPI.executeAction('/MDKDevApp/Actions/Navigation/BarcodeScanner/NavToBarcodeScannerPage.action');
  }
}
```

