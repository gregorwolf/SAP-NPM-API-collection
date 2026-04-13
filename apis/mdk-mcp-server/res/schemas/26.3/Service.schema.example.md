
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

### ServiceUrl (Deprecated)
If DestinationName is not specified, the destination name will be taken from the ServiceUrl property. This is done by taking the last path component from the URL.

```json
{
  "ServiceUrl":"https://mobile-w00070145a18.eu2.hana.ondemand.com/com.sap.sam.swa",
  "OfflineEnabled": true,
  "LanguageURLParam": "sap-language"
}
```
