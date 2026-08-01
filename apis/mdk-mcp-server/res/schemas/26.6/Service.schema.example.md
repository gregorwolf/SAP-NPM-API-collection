
----
## Examples

### Service with LanguageURLParam & Headers

```json
{
  "DestinationName": "Northwind",
  "OfflineEnabled": true,
  "LanguageURLParam": "sap-language",
  "Headers": {
    "Accept-Language": "/MyMDKApp/Rules/GetLanguage.js"
  }
}
```

### Service with PathSuffix

```json
{
  "DestinationName":"Northwind",
  "PathSuffix":"/V3/OData/OData.svc",
  "OfflineEnabled": true,
  "OfflineOptions": {
    "StoreParameters": {
      "StoreName": "NorthwindV3"
    }
  }
}
```

### Offline Service With CSDL Options and Store Parameters

```json
{
  "DestinationName":"Northwind",
  "OfflineEnabled": true,
  "OfflineOptions": {
    "ServiceOptions": {
      "supportsBind": false,
      "supportsPatch": false,
    },
    "CSDLOptions": [
      "allowCaseConflicts",
      "defaultVariableScale",
      "defaultVariableSrid",
      "disableFacetWarnings",
      "disableLoggingOfErrors",
      "disableLoggingOfWarnings",
      "disableNameValidation",
      "excludeServerOnlyElements",
      "failIfProviderIncompatible",
      "ignoreAllAnnotations",
      "ignoreAllReferences",
      "ignoreEdmAnnotations",
      "ignoreExternalReferences",
      "ignoreInternalReferences",
      "ignoreStandardReferences",
      "ignoreUndefinedTerms",
      "ignoreXmlAnnotations",
      "logWithUnqualifiedFileNames",
      "processMixedVersions",
      "resolveUndefinedTerms",
      "retainOriginalText",
      "retainResolvedText",
      "traceParsingOfElements",
      "strictFacetWarnings",
      "warnAboutUndefinedTerms",
      "warnIfProviderIncompatible"
    ],
    "StoreParameters": {
      "EnableIndividualErrorArchiveDeletion": true,
      "EnableRepeatableRequests": true
    }
  }
}
```

### Online Service with Service Options & CSDL Options

```json
{
  "DestinationName":"Northwind",
  "OfflineEnabled": false,
  "OnlineOptions": {
    "ServiceOptions": {
      "avoidInPaths": "test",
      "cacheMetadata": false,
      "checkQueries": false,
      "checkResults": false,
      "checkVersion": false,
      "dataFormat": 1,
      "dataVersion": 0,
      "databaseOnly": false,
      "fixMissingEmptyLists": false,
      "fixMissingNullValues": false,
      "logErrors": false,
      "logWarnings": false,
      "metadataFile": "test",
      "metadataText": "test",
      "metadataURL": "/Test/$metadata",
      "pingAccept": "application/json",
      "pingMethod": "GET",
      "pingResource": "/",
      "requiresToken": "X-CSRF-Token",
      "requiresType": false,
      "supportsAlias": false,
      "supportsBatch": false,
      "supportsBind": false,
      "supportsDelta": false,
      "supportsNext": false,
      "supportsPatch": false,
      "supportsUnbind": false,
      "statefulService": false
    },
    "CSDLOptions": [
      "allowCaseConflicts",
      "defaultVariableScale",
      "defaultVariableSrid",
      "disableFacetWarnings",
      "disableLoggingOfErrors",
      "disableLoggingOfWarnings",
      "disableNameValidation",
      "excludeServerOnlyElements",
      "failIfProviderIncompatible",
      "ignoreAllAnnotations",
      "ignoreAllReferences",
      "ignoreEdmAnnotations",
      "ignoreExternalReferences",
      "ignoreInternalReferences",
      "ignoreStandardReferences",
      "ignoreUndefinedTerms",
      "ignoreXmlAnnotations",
      "logWithUnqualifiedFileNames",
      "processMixedVersions",
      "resolveUndefinedTerms",
      "retainOriginalText",
      "retainResolvedText",
      "traceParsingOfElements",
      "strictFacetWarnings",
      "warnAboutUndefinedTerms",
      "warnIfProviderIncompatible"
    ]
  }
}
```

### Rest Service
OfflineEnabled must be set to false when RestService is true

```
{
  "DestinationName":"Northwind",
  "OfflineEnabled": false,
  "RestService": true
}
```

### Offline Service with Custom ProgressMessages

Defines custom step-level progress messages with format string placeholders for each offline OData operation step.

```json
{
  "DestinationName": "Northwind",
  "OfflineEnabled": true,
  "OfflineOptions": {
    "ProgressMessages": {
      "BuildingEntityStore": "{0}/{1} Building the entity store...",
      "CreatingBootStrapDatabase": "{0}/{1} Creating bootstrap database...",
      "CreatingRequestQueueDatabase": "{0}/{1} Creating request queue database...",
      "DownloadingEntityStore": "{0}/{1} Downloading entity store... {2}",
      "ErasingExpiredRequests": "{0}/{1} Erasing expired requests...",
      "LoadingMetadata": "{0}/{1} Loading metadata...",
      "PerformingTransactionMerge": "{0}/{1} Performing transaction merge...",
      "PerformingCreateDeleteMerge": "{0}/{1} Performing create-delete merge...",
      "ProcessingDefiningQueries": "{0}/{1} Processing defining queries... {2}",
      "ProcessingRequests": "{0}/{1} Processing requests... {2}",
      "ReapplyingChanges": "{0}/{1} Reapplying changes...",
      "AnalyzingReceivedData": "{0}/{1} Analyzing received data...",
      "ReceivingDataFromServer": "{0}/{1} Receiving data from server... {2}",
      "RemovingDeletedRelationships": "{0}/{1} Removing deleted relationships...",
      "RemovingRemoveAfterUploadRequests": "{0}/{1} Removing RemoveAfterUpload requests...",
      "SendingDataToServer": "{0}/{1} Sending data to server... {2}",
      "SendingEntityStoreDatabase": "{0}/{1} Sending entity store... {2}/{3}",
      "SendingRequestQueueDatabase": "{0}/{1} Sending request queue database...",
      "UploadPreprocessing": "{0}/{1} Pre-processing before uploading...",
      "WaitingForDownload": "{0}/{1} Waiting for download..."
    }
  }
}
```

### Offline Service with Custom Localized ProgressMessages using i18n

By default, the MDK client provides built-in localized progress messages, no configuration is required. To customize these messages with localization, the `ProgressMessages` values support the `$(L, key)` localization syntax. The keys are resolved at runtime from the project's `i18n/i18n.properties` files, enabling multi-language support without a custom rule.

```json
{
  "DestinationName": "Northwind",
  "OfflineEnabled": true,
  "OfflineOptions": {
    "ProgressMessages": {
      "BuildingEntityStore": "{0}/{1} $(L, buildingEntityStore)",
      "CreatingBootStrapDatabase": "{0}/{1} $(L, creatingBootStrapDatabase)",
      "CreatingRequestQueueDatabase": "{0}/{1} $(L, creatingRequestQueueDatabase)",
      "DownloadingEntityStore": "{0}/{1} $(L, downloadingEntityStore) {2}",
      "ErasingExpiredRequests": "{0}/{1} $(L, erasingExpiredRequests)",
      "LoadingMetadata": "{0}/{1} $(L, loadingMetadata)",
      "PerformingTransactionMerge": "{0}/{1} $(L, performingTransactionMerge)",
      "PerformingCreateDeleteMerge": "{0}/{1} $(L, performingCreateDeleteMerge)",
      "ProcessingDefiningQueries": "{0}/{1} $(L, processingDefiningQueries) {2}",
      "ProcessingRequests": "{0}/{1} $(L, processingRequests) {2}",
      "ReapplyingChanges": "{0}/{1} $(L, reapplyingChanges)",
      "AnalyzingReceivedData": "{0}/{1} $(L, analyzingReceivedData)",
      "ReceivingDataFromServer": "{0}/{1} $(L, receivingDataFromServer) {2}",
      "RemovingDeletedRelationships": "{0}/{1} $(L, removingDeletedRelationships)",
      "RemovingRemoveAfterUploadRequests": "{0}/{1} $(L, removingRemoveAfterUploadRequests)",
      "SendingDataToServer": "{0}/{1} $(L, sendingDataToServer) {2}",
      "SendingEntityStoreDatabase": "{0}/{1} $(L, sendingEntityStoreDatabase) {2}/{3}",
      "SendingRequestQueueDatabase": "{0}/{1} $(L, sendingRequestQueueDatabase)",
      "UploadPreprocessing": "{0}/{1} $(L, uploadPreprocessing)",
      "WaitingForDownload": "{0}/{1} $(L, waitingForDownload)"
    }
  }
}
```

With the corresponding `i18n/i18n.properties`:

```properties
buildingEntityStore=Building the entity store
creatingBootStrapDatabase=Creating bootstrap database
creatingRequestQueueDatabase=Creating request queue database
downloadingEntityStore=Downloading entity store
erasingExpiredRequests=Erasing expired requests
loadingMetadata=Loading metadata
performingTransactionMerge=Performing transaction merge
performingCreateDeleteMerge=Performing create-delete merge
processingDefiningQueries=Processing defining queries
processingRequests=Processing requests
reapplyingChanges=Reapplying changes
analyzingReceivedData=Analyzing received data
receivingDataFromServer=Receiving data from the server
removingDeletedRelationships=Removing deleted relationships
removingRemoveAfterUploadRequests=Removing RemoveAfterUpload requests
sendingDataToServer=Sending data to the server
sendingEntityStoreDatabase=Sending entity store database
sendingRequestQueueDatabase=Sending request queue database
uploadPreprocessing=Pre-processing requests before uploading
waitingForDownload=Waiting for download
```

### Offline Service with OnOfflineProgressUpdate Callback

A rule is invoked for every progress update during offline operations.

```json
{
  "DestinationName": "Northwind",
  "OfflineEnabled": true,
  "OnOfflineProgressUpdate": "/MyMDKApp/Rules/OnOfflineProgressUpdate.js"
}
```

#### OnOfflineProgressUpdate Rule — Synchronous

This rule receives progress data through `context.getEventData()` and returns a custom message string. If `AutoIncludeProgressMessages` is set to `true`, this custom message string replaces the UI default progress message.

Available `eventData` properties include: `eventName`, `step`, `currentStepNumber`, `totalStep`, `message`, `messageParam1`, `messageParam2`.

```js
// OnOfflineProgressUpdate.js
export default function OnOfflineProgressUpdate(context) {
  const eventData = context.getEventData();
  const currentStepNumber = eventData.currentStepNumber;
  const totalStep = eventData.totalStep;
  const messageParam1 = eventData.messageParam1;
  const messageParam2 = eventData.messageParam2;

  let customMessage = eventData.message;

  switch (eventData.step) {
    case "BuildingEntityStore":
      customMessage = `${currentStepNumber}/${totalStep} ${context.localizeText('buildingEntityStore')}`;
      break;
    case "DownloadingEntityStore":
      customMessage = `${currentStepNumber}/${totalStep} ${context.localizeText('downloadingEntityStore')} ${messageParam1}`;
      break;
    case "ProcessingDefiningQueries":
      customMessage = `${currentStepNumber}/${totalStep} ${context.localizeText('processingDefiningQueries')} ${messageParam1}`;
      break;
    case "ReceivingDataFromServer":
      customMessage = `${currentStepNumber}/${totalStep} ${context.localizeText('receivingDataFromServer')} ${messageParam1}`;
      break;
    case "SendingDataToServer":
      customMessage = `${currentStepNumber}/${totalStep} ${context.localizeText('sendingDataToServer')} ${messageParam1}`;
      break;
    case "SendingEntityStoreDatabase":
      customMessage = `${currentStepNumber}/${totalStep} ${context.localizeText('sendingEntityStoreDatabase')} ${messageParam1}/${messageParam2}`;
      break;
    // Other steps: return default message
  }
  return customMessage;
}
```

#### OnOfflineProgressUpdate Rule — Asynchronous (Promise)

When the rule returns a `Promise`, the offline operation continues without blocking. The resolved message is pushed to the UI asynchronously. This approach is useful for updating page controls or performing other asynchronous tasks.

```js
// OnOfflineProgressPromiseUpdate.js
export default function OnOfflineProgressUpdate(context) {
  const eventData = context.getEventData();

  // Access page controls to display progress details
  const pageProxy = context.evaluateTargetPathForAPI('#Page:ProgressPage');
  const section = pageProxy.getControl('SectionedTable').getSection('ProgressSection');
  const stepControl = section.getControl('Step');
  const messageControl = section.getControl('Message');

  const customMessage = `${eventData.currentStepNumber}/${eventData.totalStep} ${eventData.step}`;

  // Update page controls, then resolve with the display message
  stepControl.setValue(eventData.step);
  return messageControl.setText(customMessage).then(() => {
    return customMessage;
  });
}
```

### Offline Service with AutoIncludeProgressMessages Disabled

When `AutoIncludeProgressMessages` is set to `false`, progress text or messages are not injected into the ActivityIndicator or Banner UI, regardless of `ProgressText` or `ProgressMessages` customization. The `OnOfflineProgressUpdate` rule is still invoked, but the returned message is not auto-displayed.

```json
{
  "DestinationName": "Northwind",
  "OfflineEnabled": true,
  "OfflineOptions": {
    "AutoIncludeProgressMessages": false
  },
  "OnOfflineProgressUpdate": "/MyMDKApp/Rules/OnOfflineProgressUpdate.js"
}
```

### Progress Resolution Behavior

The following table shows how `ProgressText` (action-level), `ProgressMessages` (service-level), and `AutoIncludeProgressMessages` interact to determine the content displayed during offline OData operations:

| ProgressText | ProgressMessages | AutoIncludeProgressMessages | Result |
|---|---|---|---|
| Not defined | Not defined | `true` | Default ProgressMessages |
| Not defined | Defined | `true` | Custom ProgressMessages |
| Defined | Not defined | `true` | Custom ProgressText |
| Defined | Defined | `true` | Custom ProgressMessages |
| Not defined | Not defined | `false` | No progress text or messages injected |
| Not defined | Defined | `false` | No progress text or messages injected |
| Defined | Not defined | `false` | No progress text or messages injected |
| Defined | Defined | `false` | No progress text or messages injected |

**Notes:**

1. `AutoIncludeProgressMessages: false` disables all automatic progress UI updates, regardless of `ProgressText` or `ProgressMessages` settings.

2. `ProgressMessages` takes precedence over `ProgressText` when both are defined.

3. `ProgressMessages` replaces the legacy default `ProgressText`, offering more comprehensive step-level reporting. To retain the previous behavior, explicitly define custom `ProgressText` values.

### ServiceUrl (Deprecated)
If DestinationName is not specified, the destination name will be taken from the ServiceUrl property. This is done by taking the last path component from the URL.

```json
{
  "ServiceUrl":"https://mobile-w00070145a18.eu2.hana.ondemand.com/com.sap.sam.swa",
  "OfflineEnabled": true,
  "LanguageURLParam": "sap-language"
}
```
