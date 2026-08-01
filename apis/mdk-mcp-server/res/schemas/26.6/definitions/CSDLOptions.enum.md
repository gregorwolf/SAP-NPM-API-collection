## Items

- type: `enum[]`

The array items **must** be equal to one of the known values listed below.

| Value                       | Description                                                                                                                                                                                                      |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `allowCaseConflicts`          | Set this option to allow model elements with names differing only in case.                                                                                                                                       |
| `defaultVariableScale`        | Set this option to default unspecified scale to "variable" rather than "0".                                                                                                                                      |
| `defaultVariableSrid`         | Set this option to default unspecified srid to "variable" rather than "0".                                                                                                                                       |
| `disableFacetWarnings`        | Set this option to disallow warnings about questionable values for type facets, such as unspecified scale.                                                                                                       |
| `disableLoggingOfErrors`      | Disable logging of parsing errors. Parsing errors will still be thrown as exceptions even if disabled for logging.                                                                                               |
| `disableLoggingOfWarnings`    | Disable logging of parsing warnings.                                                                                                                                                                             |
| `disableNameValidation`       | Set this option to force the parser to skip validation of element names.                                                                                                                                         |
| `excludeServerOnlyElements`   | Skip server-only elements in the csdl xml to be parsed and added to CsdlDocument. An element is server-only if it contains an Annotation child element with Term="com.sap.cloud.server.odata.sql.v1.ServerOnly". |
| `failIfProviderIncompatible`  | Enable errors for incompatibility with DataServiceProvider implementation (e.g. SQLDatabaseProvider). Parsing of metadata will fail if such errors are detected.                                                 |
| `ignoreAllAnnotations`        | A combination of ignoreEdmAnnotations and ignoreXmlAnnotations.                                                                                                                                                  |
| `ignoreAllReferences`         | A combination of ignoreExternalReferences, ignoreInternalReferences, and ignoreStandardReferences.                                                                                                               |
| `ignoreEdmAnnotations`        | Set this option to force the parser to ignore EDM annotations (OData V4+ annotations).                                                                                                                           |
| `ignoreExternalReferences`    | Set this option to force the parser to ignore Edmx Reference elements which have a non-standard Uri.                                                                                                             |
| `ignoreInternalReferences`    | Set this option to force the parser to ignore Edmx Reference elements which have a non-standard Uri"                                                                                                             |
| `ignoreStandardReferences`    | Set this option to force the parser to ignore Edmx Reference elements which have a standard Uri.                                                                                                                 |
| `ignoreUndefinedTerms`        | Set this option to force the parser to ignore annotations using undefined terms.                                                                                                                                 |
| `ignoreXmlAnnotations`        | Set this option to force the parser to ignore XML annotations (custom XML attributes).                                                                                                                           |
| `logWithUnqualifiedFileNames` | Use unqualified file names (without directory path) in logged error/warning messages.                                                                                                                            |
| `processMixedVersions`        | Set this option to force the parser to process elements from multiple OData versions.                                                                                                                            |
| `resolveUndefinedTerms`       | Set this option to force the parser to resolve annotations using undefined terms.                                                                                                                                |
| `retainOriginalText`          | Set this option to force the parser to retain the original CSDL (XML) text.                                                                                                                                      |
| `retainResolvedText`          | Set this option to force the parser to retain the resolved CSDL (XML) text.                                                                                                                                      |
| `strictFacetWarnings`         | Set this option to enable the strictest possible warnings about questionable values for type facets, such as unspecified nullability.                                                                            |
| `traceParsingOfElements`      | Set this option to force the parser to trace elements encountered during parsing.                                                                                                                                |
| `warnAboutUndefinedTerms`     | Set this option to force the parser to ignore annotations using undefined terms, but log a warning message.                                                                                                      |
| `warnIfProviderIncompatible`  | Enable warnings for incompatibility with DataServiceProvider implementation (e.g. SQLDatabaseProvider). Parsing of metadata will succeed if such warnings are detected.                                          |

