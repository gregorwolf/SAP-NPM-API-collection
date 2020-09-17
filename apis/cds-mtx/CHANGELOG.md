# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.0.20 - 2020-09-10

### Fixed
- Custom content upload using `/mtx/v1/model/updateCustomTenantContent` now also works 
with cds 4

## Version 1.0.19 - 2020-09-03

### Added
- The asynchronous model update API now accepts a callback URL (header field `MTX_STATUS_CALLBACK`) that
  is called when the update is finished
- A new REST API for activating extensions from csn sources was added. Use `POST /mtx/v1/model/activateCsn/` 
with a csn JSON as payload. Example:

```
{
        "extensionCsn": "{\"extensions\":[{\"extend\":\"sap.capire.bookshop.Books\",\"elements\":{\"Z_ISBN_101\":{\"type\":\"cds.String\"}}}]}",
        "tenant": "213a722e-ed91-43e2-adb4-3885b5e9d63e"
}
```

### Fixed
- The sequence of extensions added through `cds.mtx.activate()` is now stable, even after 
a base model update.

## Version 1.0.18 - 2020-08-28

## Version 1.0.17 - 2020-08-19

### Fixed
- Asynchronous basemodel upgrade and job status requests that failed when using @sap/cds@^4 are now fixed
- Extensions that got lost when running onboarding multiple times are now preserved
- The cds env configuration is now also available for service-manager 

## Version 1.0.16 - 2020-08-03

### Added

- Support for instances managed by Service Manager
- Support for JWT Refresh Tokens to simplify token renewal in cds-sidecar-client

### Fixed

- Idempotent asynchronous offboarding
- CDS 4 compatibility


## 1.0.15 - 2020-07-01


### Fixed
- cds 4 compatibility
- updated readme.md

## 1.0.14 - 2020-05-27


### Added

- diagnose endpoint at /mtx/v1/model/diagnose/
    - requires to be authenticated for the paas tenant
    - requires scope "MtxDiagnose"
- added memory status to debug logs. Activation with env MTX_LOG_MEMORY=true

### Fixed

- stablelized parallel extension activation
- handling of asynchronous job status across multiple mtx application instances

## 1.0.13 - 2020-04-27

### Added

- Logs are now collected by default when running asynchronous APIs
    - can be disabled with environment variable `MTX_COLLECT_LOGS=true`
    - logs can be limited by `MTX_LOG_COLLECTION_LIMIT=<limit>`

- extensibility API that accepts csn notation `cds.mtx.activate(tenantId, csn)`

### Fixed

- handling of errornous undeploy.json files: error message now points to the root problem
- handling of build errors: API now returns build and compile errors properly

## 1.0.12

### Added
- reenabled the support of different domains (BETA)

- Support for asynchronous extension activation to handle long-running jobs

## 1.0.11

### Added

- Support of asynchronous onboarding as specified by the [saas-registry](https://wiki.wdf.sap.corp/wiki/display/CPC15N/SaaS+Application+Registration+in+CF#SaaSApplicationRegistrationinCF-Asynchronouscallbacksimplementation)

## 1.0.10

### Fixed
- Compatibility with snapi compiler mode (env variable CDS_FEATURES_SNAPI=y)
    - WARNING: in this mode, it is currently not checked if annotations of the basemodel are overwritten in the extension
- Tenant upgrade with undeploy=true is now working properly

## 1.0.9

### Fixed
- Compatibility with older versions of @sap/cds

## 1.0.8

### Added
- possibility to store build / deployment logs in job log for asynchronous tenant update
    - must currently be activated by environment variables (`MTX_COLLECT_LOGS=true` and `MTX_LOG_COLLECTION_LIMIT=<limit>`)
- whitelist for entities and services that are allowed to be extended
```
"mtx": {
           "element-prefix": "Z_",
            "namespace-blacklist": ["com.sap.", "sap."],
            "entity-whitelist": ["my.bookshop.Books"],
            "service-whitelist": ["CatalogService"]
       }
```

### Fixed
- Enable compatibility with SAP HANA cloud edition (no hdbcds support)
- Deployment error with very old tenants (conflict with custom_tenant_objects.hdbtable)

## 1.0.7

### Added
- allows to enable auto-undeploy in base model update request

### Fixed
- datatype error in synchronous base model update api

## 1.0.6

## 1.0.5

### Added
- accept database_id in onboarding request

## 1.0.4

### Added
- enhanced namespace check for extensions
- metadata API now supports ETags
### Changed

### Fixed
- Datatype of custom content tables now LargeString
- Bad request when sending non-json content

### Removed

## 1.0.3
- Bug fixes

## 1.0.2
- Bug fixes

## 1.0.1
- Ignore namespace rules for customer extension entities
- Enable hdbtabledata generation

## 1.0.0 - 26.07.2019
Initial release version.
