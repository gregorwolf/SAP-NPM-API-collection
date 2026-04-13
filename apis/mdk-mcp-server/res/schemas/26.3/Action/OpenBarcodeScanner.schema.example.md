
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

When this action gets executed successfully, the ActionResult is ideally the display value of the scanned bar code, otherwise it’s an error message.

----
## Barcode Formats
Barcode scanning ability of MDK relies on the interfaces provided by the SAP BTP SDKs. SDKs use the native device scanning libraries, so MDK must support those formats as well. The following list of barcode formats have been tested in MDK on both iOS and Android. There may also be additional formats supported beyond this list.

- Numbers
    - EAN-8
    - EAN-13
    - EAN-14
    - UPC-E
    - UPC-A
    - Code 25
- ISBN
    - ISBN-13
    - ISSN
- Alphanumeric
    - Code 39
    - Code 39 mod 43
    - Code 93
    - Code 128
    - GS1-128 (UCC/EAN-128)
- Arbitrary Data
    - PDF417
    - QR
    - Aztec
    - Data Matrix

----
## Examples

```json
{
    "_Type": "Action.Type.OpenBarcodeScanner",
    "OnSuccess": "/MDKApp/Rules/BarcodeScanner/ShowBarcodeScanningResult.js", 
    "OnFailure": "/MDKApp/Actions/BarcodeScanner/OpenBarcodeScannerFailure.action",
    "ActionResult": {
        "_Name": "BarcodeScanner"
    }
}
```

```js
export default function ShowBarcodeScanningResult(clientAPI) {
  var actionResult = clientAPI.getActionResult('BarcodeScanner');
  if (actionResult) {
    clientAPI.setActionBinding({
      'Result': actionResult.data,
    });
    return clientAPI.executeAction('/MDKDevApp/Actions/Navigation/BarcodeScanner/NavToBarcodeScannerSuccessPage.action');
  }
}
```
