# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).


## Version 1.2.0 - 2021-03-30


### Added
- Multitenant applications now support extensions of entities using schema evolution based on `.hdbmigrationtable` files.
- It is now possible to specify limits for the number of extension fields per entity.
If no limit is specified, the number of extension fields is not limited.\
If this list exists, only entities and services contained in this list can be extended. 
```
"mtx" : {
  "extension-allowlist": [
    {
        'for': ['my.bookshop.Authors', 'my.bookshop.Books'],
        'new-fields': 2
    },
    {
        'for': ['CatalogService']
    }
  ]
}
```

## Version 1.1.5 - 2021-03-09

### Fixed
- The extension API `/mtx/v1/content` now returns a correct json if a collection is requested with any version of 
@sap/cds used by the application. The `cds extend` command was returning `(intermediate result) is not iterable` because
of an incorrect server response.
- Connection handling has been improved. Errors of type `TimeoutError: Acquiring client from pool timed out` are reduced.

## Version 1.1.3 - 2021-03-03


### Fixed
- `mtx/v1/model/status` now returns the job status again

## Version 1.1.2 - 2021-03-01


### Added 
- Multitenant applications **without tenant specific extensions** now support schema evolution based on `.hdbmigrationtable` files.
- Provisioning parameters for the container creation can now also be set
via cds environment `mtx.provisioning.container` or environment variable `CDS_MTX_PROVISIONING_CONTAINER`.\
Provisioning parameters that are set in the subscription request to `mtx/v1/provisioning/tenant` 
override the values from the environment.
- Dedicated hdi deployment options can now be set via environment variable
`HDI_DEPLOY_OPTIONS`, e. g. `HDI_DEPLOY_OPTIONS="{\"trace\": true }"`. \
See also 
[HDI deploy options](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.05/en-US/a4bbc2dd8a20442387dc7b706e8d3070.html).

### Fixed
- Fix job-status handling.
- Persist job errors, so they can be revealed even after MTX restart.

## Version 1.0.28 - 2021-02-22

### Added 

- It is now possible to pass hdi deployment parameters `undeploy` and `path-parameter` with the model upgrade 
(`mtx/v1/model/upgrade` and `mtx/v1/model/asyncUpgrade`)

## Version 1.0.27 - 2021-02-01

### Fixed

- Extensions via `extend projection ` are now checked correctly by the linter.
- Cross hdi container access is now supported properly (see also https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.05/en-US/a4bbc2dd8a20442387dc7b706e8d3070.html)

## Version 1.0.26 - 2021-01-04


### Fixed

- When using`hdb` as driver for the database, the tenant updates are now logged properly

## Version 1.0.25 - 2020-11-27


### Added

- Added enhanced authentication API needed for the @sap/cds-sidecar-client 
to support authentication with clientid/clientsecret from subscriber account.
This is needed to extend multitentant applications that are provided as services.

### Fixed

- Activation via cds-sidecar-client shows linter errors again
- Offboarding of tenants does no longer cause a reconnect of cds 
(also requires update of @sap/cds dependency to minimum @sap/cds@4.3)

## Version 1.0.24 - 2020-11-07


### Fixed

- Broken compatibility with hdb driver is now fixed

## Version 1.0.23 - 2020-11-05


### Fixed

- MTX is now compatible with latest versions of @sap/hana-client
- Linters can now handle extension projects with subfolders again
- The connection pool used by mtx is now correctly updated on offboarding 
even with scaled applications

## Version 1.0.22 - 2020-10-21


### Fixed

- The application url returned to the saas registry when using asynchronous onboarding
can now also be set in the header field 'application_url'
- The build task used when onboarding do now use the right defaults. When being used
as sidecar application, build task do no longer have to have the model option.
- New entities with namespaces in extensions are now correctly 
checked by the extensibility linter on extension activation
- Call of onboarding and offboarding via javacript API is now fixed ('Cannot read property 'headers' of undefined')

## Version 1.0.21 - 2020-09-29


### Fixed

- Connections to application after off- and onboarding now work properly

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