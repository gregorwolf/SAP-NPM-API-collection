# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.0.13]

### Added

- Logs are now collected by default when running asynchronous APIs
    - can be disabled with environment variable `MTX_COLLECT_LOGS=true`
    - logs can be limited by `MTX_LOG_COLLECTION_LIMIT=<limit>`
    
- extensibility API that accepts csn notation `cds.mtx.activate(tenantId, csn)`

### Fixed

- handling of errornous undeploy.json files: error message now points to the root problem
- handling of build errors: API now returns build and compile errors properly   

## [1.0.12]

### Added
- reenabled the support of different domains (BETA)

- Support for asynchronous extension activation to handle long-running jobs

## [1.0.11]

### Added

- Support of asynchronous onboarding as specified by the [saas-registry](https://wiki.wdf.sap.corp/wiki/display/CPC15N/SaaS+Application+Registration+in+CF#SaaSApplicationRegistrationinCF-Asynchronouscallbacksimplementation)

## [1.0.10]

### Fixed
- Compatibility with snapi compiler mode (env variable CDS_FEATURES_SNAPI=y)
    - WARNING: in this mode, it is currently not checked if annotations of the basemodel are overwritten in the extension
- Tenant upgrade with undeploy=true is now working properly    

## [1.0.9]

### Fixed
- Compatibility with older versions of @sap/cds

## [1.0.8]

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

## [1.0.7]

### Added
- allows to enable auto-undeploy in base model update request

### Fixed
- datatype error in synchronous base model update api

## [1.0.6]

## [1.0.5]

### Added
- accept database_id in onboarding request

## [1.0.4]

### Added
- enhanced namespace check for extensions
- metadata API now supports ETags
### Changed

### Fixed
- Datatype of custom content tables now LargeString
- Bad request when sending non-json content

### Removed

## [1.0.3]
- Bug fixes

## [1.0.2]
- Bug fixes

## [1.0.1]
- Ignore namespace rules for customer extension entities
- Enable hdbtabledata generation

## [1.0.0] - 26.07.2019
Initial release version.