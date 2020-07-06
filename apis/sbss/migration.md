# Migration Guide

## Version 3 ==> Version 4

### `@sap/hdbext` is now a peer dependency

Applications that make use of PostgreSQL will benefit from faster deploy times.
Applications that make use of HANA will need to explicitly specify `@sap/hdbext`
as a dependency.
See the required version range in the _package.json_ file of `@sap/sbss`.

### Signature `createCredentials(instanceId, bindingId, callback)` is now removed

Use `createCredentials({ instanceId, bindingId }, callback)` instead.
