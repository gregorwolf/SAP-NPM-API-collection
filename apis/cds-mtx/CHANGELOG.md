# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 2.6.5 - 2023-09-04

### Changed
- All available HDI deployment parameters can now be passed for tenant deployment.

### Added
- Container creation now adds parameters needed for HANA encryption

## Version 2.6.4 - 2022-11-17

### Fixed
- Full tenant metadata is stored again when running the subscription from CAP java
- APIs can now be run without express app
- Improved filter for technical tenants when getting all tenant ids

## Version 2.6.3 - 2022-10-18

### Fixed
- .hdinamespace files provided as native HANA content are now included for deployment
- Edmx files are only generated for the default language if ad-hoc edmx compilation is enabled (`mtx.edmx.compile: true`)

### Changed
- `polling_interval_millis` set for `@sap/instance-manager` has been increased to `3000`

## Version 2.6.2 - 2022-09-21

### Fixed
- Debug logs do no longer contain any authentication details
### Added
- Retries can now be configured with a delay (in ms)
  ```
  "mtx": {
     "provisioning": { "retryDelay": 1000 }
  }
  ```
- Clustering of upgrade jobs by database id can be disabled to reduce service-manager workload
  ```
  "mtx": {
      "jobs": {
        "clusterbydb": false
      },
      ...
  }
  ```


## Version 2.6.1 - 2022-08-22

### Fixed
- Use of legacy APIs for scope checks has been removed
- Better compatibility for environments without vcap-environment, especially DwC
- Restored compatibility for Node.js 12.  In version 2.6.0, this failed with an error like `SyntaxError: Unexpected token`.
- Extension linters now also check types and aspects
- I18n file collection now works correctly with @sap/cds@6
- Job status of asynchronous requests to scaled applications is now returned correctly again

### Changed
- Retries for container creation and deployment have been disabled. Retries can be configured using via cds env:
  ```
  "mtx": {
     "provisioning": { "retries": 2 }
  }
  ```
  retries two times after a failure.

## Version 2.6.0 - 2022-07-07

### Added
 - Support for new build task aliases `java` and `nodejs`

### Fixed
- @sap/cds-mtx is now compatible with @sap/cds@^6.
- Kibana logs of asynchronous jobs now always have the correct correlation id.
- Upgrade of tenants with no meta tenant (e. g. created by dynamic deployer) can now be upgraded again, including the creation of the missing meta tenant.
- Upgrade of tenants now consistently updates the basemodel files per tenant again.

## Version 2.5.6 - 2022-05-18

### Added
- Tenant upgrades can now scale beyond a single database.
- The tenant IDs are now exposed in the provisioning service (`/mtx/v1/provisioning/tenantIds`).
- The SaaS Provisioning Service `UPDATE` event type is now also supported.
- By setting cds environment `mtx.provisioning.lazymetadatacontainercreation: true`, the creation of the `__META__` container can be postponed to the first onboarding again. In case the onboarding request contains additional parameters for the container creation, these parameters will also be used for the creation of the `__META__` tenant, except if the parameters are also set via cds environment `mtx.provisioning.metadatacontainer`.

### Fixed
- When using a custom folder setup for native artifacts for HDI, the `cfg` folder is now correctly included for the HDI deployment

## Version 2.5.5 - 2022-04-14

### Changed
- Improved logging in the context of requesting tokens.

## Version 2.5.4 - 2022-04-04

### Changed
- If enabled via `cds.env.mtx.security.metadata-scope-checks`, the v2 CSN and EDMX APIs, as well as all metadata APIs are now scope-checked for `mtdeployment`.
- Tokens sent to the command-line client are now reduced in scope for security reasons.

### Fixed
- `MT_LIB_TENANT-`-prefixed tenants used by the Java runtime are now correctly ignored by the `cds-mtx` sidecar.

## Version 2.5.3 - 2022-03-14

### Fixed
- Provisioning parameters for the container creation can now also be set exclusively for the `__META__` container via cds environment `mtx.provisioning.metadatacontainer` or environment variable `CDS_MTX_PROVISIONING_METADATACONTAINER`. Tenant containers are not affected by that cds environment.
- Configuration parameters for the `@sap/instance-manager` module can now be passes using cds environment `mtx.provisioning.instancemanageroptions` or environment variable `CDS_MTX_PROVISIONING_INSTANCEMANAGEROPTIONS`. See also [@sap/instance-manager](https://www.npmjs.com/package/@sap/instance-manager).
- Upgrade calls for non-existing tenants do no longer create orphan HDI containers
- More robust handling of inconsistent HDI container having no tenant id (error "TypeError: Cannot read property 'toLowerCase' of undefined")

## Version 2.5.2 - 2022-01-26

### Added
- It is now checked if CDS annotations `@sql.append` and `@sql.prepend` are used in extensions. Using these annotations in extensions is currently not allowed.


### Fixed
- API `/mtx/v1/provisioning/tenant` does no longer return duplicate tenants in case of concurrent API calls.
- Dependencies to `VCAP_SERVICES` environment have been removed. Service dependencies can now be fully defined via `cds.env`, except for databases shared between tenants.

## Version 2.5.1 - 2021-12-09

### Fixed
- The `cds-mtx`-provided `.hdiconfig` now does not overwrite the application-provided one during deployment. This fixes an issue in parallel tenant upgrades for a large number of tenants, where the unlinking of the previously existing `.hdiconfig` failed occasionally.

## Version 2.5.0 - 2021-12-06

### Added
- Binding of both service-manager and managed-hana is now supported. To enable it, you have to
set the feature flag `cds.features.hybrid_instance_manager` to true. Please note that you also
need a compatible version of `@sap/instance-manager`.

## Version 2.4.2 - 2021-12-02

### Fixed
- Authentication request for cds extension client is now returning token again
- `hdbmigrationtable` files from an updated model with multiple new migration versions
are now correctly merged with tenant specific `hdbmigrationtable` files


## Version 2.4.1 - 2021-11-09


### Fixed
- Additional HDI_DEPLOY_OPTIONS do no longer affect the stability
of the meta tenant creation
- Reduction of redundant file system operations to improve stability of
tenant upgrade

## Version 2.4.0 - 2021-11-02

### Added
- Added parameter `subscriptionData` to `TenantPersistenceService.deleteTenant` so that
custom handlers get more information about the tenant that is deleted. Can be `{}`
if there was a failed deletion attempt before that already removed the metadata.
- Database deployment is now internally called via cds service `TenantPersistenceService` that
  applications can add handlers for
  ```
  @protocol:'rest'
  service TenantPersistenceService {
      type JSON {
          // any json
      }
      ...
      action deployToDb(sourceDir: String, instanceData: JSON, deploymentOptions: JSON, additionalServices: JSON);
  }
  ```
  Please note that this API is not meant to be called by applications but has been
  introduced to allow applications to create handlers for custom logic to be executed
  with the database deployment.
- You can now diagnose deployed tables using `mtx/v1/diagnose/tables/<tenantId>`.

### Changed
- Parallel tenant upgrades have been optimized so that build results for non-extended tenants are shared and the number of database interactions is reduced.
- An `EventTypeMissingError` is now thrown when the `eventType` parameter is missing at tenant creation.

### Fixed
- APIs `mtx.getEdmx(tenantId, service, language, odataVersion)` and the endpoint
`/mtx/v1/metadata/edmx/<tenant-id>?name=<service>&language=<lang>&odataVersion=<version>`
now reuse the preuild edmx if `odataVersion` equals configured version (`cds.odata.version`)
- Job list returned by diagnose API now contains correct results
- Offboarding via CDS transactions is now working without an explicit `where` clause, i.e. you can simplify
  ```js
  await transaction.delete('tenant', tenantId).where({ subscribedTenantId: tenantId })
  ```
  into
  ```js
  await transaction.delete('tenant', tenantId)
  ```

## Version 2.3.4 - 2021-10-18

### Fixed
- Fixed full build logs not being part of the jobs logs.

## Version 2.3.3 - 2021-10-14

### Fixed
- Job status reports for asynchronous tenant base model updates now contain the correct build and deployment logs.
- With HANA build task configurations having subfolders, e. g. `sap/db` instead of `db`,
native HANA artifacts and csv files are now deployed correctly.
- API `mtx/v1/model/content` now also works with tenant from url as specified
- Update of tenant metadata containers on HANA Cloud no longer fails

## Version 2.3.2 - 2021-10-06

### Added
- Additional user-provided services are now accessible for the deployment

### Fixed

- The `mtx/v1/diagnose/jobs` API will now correctly deliver job information about jobs in memory.
- Compatibility with cds < @sap/cds@5.5.0 when running onboarding, upgrade or extend on java projects
has been fixed.

## Version 2.3.1 - 2021-09-30

### Fixed
- Configuration `mtx.jobs.parallelUpgradeLimit` is now correctly limiting the number
of parallel tenant upgrades.

## Version 2.3.0 - 2021-09-27


### Fixed
- The maximum filename length of sources files that are stored with the tenant metadata has been
increased from 200 to 500. The tenant metadata store will be updated accordingly with any tenant
operation (extend, upgrade).
- Exceptions from asynchronous jobs are now visible in the application log again

### Added
- Tenant upgrade is now internally called via cds service `TenantPersistenceService` that
  applications can add handlers for
  ```
  @protocol:'rest'
  service TenantPersistenceService {
      type JSON {
          // any json
      }
      ...
      action upgradeTenant(tenantId: UUID, instanceData: JSON, deploymentOptions: JSON) returns JSON;
  }
  ```
  Please note that this API is not meant to be called by applications but has been
  introduced to allow applications to create handlers for custom logic to be executed
  with the tenant upgrade.
- (BETA) It is now possible to get the edmx for services with a different odata version than the version configured
for the build. API `mtx.getEdmx(tenantId, service, language, odataVersion)` and the endpoint
`/mtx/v1/metadata/edmx/<tenant-id>?name=<service>&language=<lang>&odataVersion=<version>` now supports a parameter `odataVersion`.
Please note that the output is compiled on-the-fly if `odataVersion` is specified which has potential impact on the performance.
You will also have to run a tenant upgrade for existing tenants (`/mtx/v1/model/upgrade`) to get a correct result.
- Extensions can now be reset via API `/mtx/v1/model/reset` and `/mtx/v1/model/asyncReset`.
- The job removal timeout is now configurable using `cds.mtx.jobs.removalTimeout`.
- `mtx.jobs.maxParallelExecutions` can now be used to parallelize asynchronous jobs. The default is `2`.

### Changed

- Tenant updates are now parallelized. You can set the pool size using `mtx.jobs.parallelUpgradeLimit`. The default is `4`.
- `mtx.jobs.intervalTimeout` is now deprecated, as the job queue does not require polling any more.
- The default queue size for asynchronous jobs has been increased to `1000`.
- In case of errors, the full `hdi-deploy` logs are now also printed for the default logging level.

## Version 2.2.2 - 2021-08-26

### Fixed
- Fixed a regression where the `ExtendCDSdelete` scope was required for extension activations even without `undeployExtension` set to `false`.
- Fixed an application crash at startup when `MTX_DISABLE_META_TENANT_CREATION` is set and no Instance/Service Manager credentials are available.

### Added
- There are new APIs for diagnosing memory, asynchronous jobs, and HDI containers. They can be called via
  - `/mtx/v1/diagnose/memory`
  - `/mtx/v1/diagnose/jobs`
  - `/mtx/v1/diagnose/container/<tenantId>`

  Note that with this change, the `/mtx/v1/model/diagnose` API is not available any more.
  The new API will work out-of-the-box with `@sap/cds >= 5.5.0`, but you have to opt-in with earlier versions by setting

  ```json
  "mtx": {
    "api": {
      "diagnose": true
    }
  }
  ```
  in your `package.json`.

## Version 2.2.1 - 2021-08-19


### Changed
- To reduce the number of logs, the HDI deployment output is now only logged in debug mode.
- Tenant metdata request via `mtx/v1/provisioning/tenant/` are now cached.

### Fixed
- Native HANA table data properties files are now supported.
- `MT_LIB_TENANT-*`-prefixed tenants are now ignored when requesting `mtx/v1/provisioning/tenant`. This fixes a compatibility problem when using the `CDS_MULTITENANCY_DATASOURCE_HANADATABASEIDS` environment variable.

## Version 2.2.0 - 2021-07-30



### Added
- `working_set` and `exclude_filter` can now be used as `HDI_DEPLOY_OPTIONS`
- Job log is now cleaned up with each startup to avoid garbage after application shutdowns or crashes.
Maximum age of entries can be configured via cds configuration `mtx.jobs.cleanup.regular` and `mtx.jobs.cleanup.stale`
(in milliseconds).
"Regular" refers to finished or failed jobs (default is 30 min), "Stale" refers to queued or running jobs
(default is 7 days).
- (BETA) The tenant specific URL returned to the `saas-registry` can now be specified
via two environment variables `SUBSCRIPTION_URL` and `SUBSCRIPTION_URL_REPLACEMENT_RULES`.<br>
The following example uses the MTX application URL and turns it into the UI
application URL by replacing the application name suffix.
  ```
  SUBSCRIPTION_URL: ${protocol}://\${tenant_subdomain}-${default-uri}
  SUBSCRIPTION_URL_REPLACEMENT_RULES: [['srv', 'app']]
  ```
  `\${tenant_subomain}` will be replaced by the domain of the subscribed tenant.

### Changed

- `/mtx/v1/metadata/edmx/` will now throw `ServiceMissingError` if no `name` query parameter is passed, instead of defaulting to `CatalogService`.
- A `ModelNotFoundError` is thrown if no service model is found using `/mtx/v1/metadata/<modelType>/<tenantId>`.

### Fixed
- Access to metadata API (edmx, csn, languages, services) is now restricted
to owner or provider tenant again
- Allowed `HDI_DEPLOY_OPTIONS` are now filtered correctly
- Correlation ids of requests are now forwarded correctly to asynchronous jobs for
better supportability of mtx tenant operations.

## Version 2.1.2 - 2021-07-09

### Added

- Tenant creation and deletion is now called via cds service `TenantPersistenceService` that
applications can add handlers for
```
@protocol:'rest'
service TenantPersistenceService {
    type JSON {
        // any json
    }

    action createTenant(tenantId: UUID, subscriptionData: JSON) returns String;
    action deleteTenant(tenantId: UUID);
}
```

## Version 2.0.4 - 2021-06-14


### Added

- The global meta tenant creation in `cds.mtx.in` can now be disabled by setting the `MTX_DISABLE_META_TENANT_CREATION` environment variable

### Fixed

- More error types and semantic HTTP status codes have been added
- Setting `MTX_ROLLBACK_CORRUPTED_CONTAINER` to `true` will now also delete and recreate an HDI container if its bindings are missing

## Version 2.0.3 - 2021-06-08


### Fixed

- MTX Bootstrap has been adapted so that application service handlers can access mtx services
again
- Logging is now consistently using cds.log
- A caching problem with the metadata persistence factory is fixed

### Changed

- File system APIs are now asynchronous

### Added

- Allow array as configuration for mandatory scopes for subscription and update
```
mtx: {
    security: {
        "subscription-scope": ["myApp.subscription","myApp.superadmin"],
        "deployment-scope": ["myApp.deployment", "myApp.superadmin"]
    }
}
```

## Version 2.0.2 - 2021-05-21


### Added
- Internal on- and offboarding API for sidecar usecase: POST `/mtx/v1/internal/provisioning/subscribe`
and POST `/mtx/v1/internal/provisioning/unsubscribe`
with payload
```
{
  "subscribedTenantId": <tenant id>,
  "async": <true/false>
}
```

### Changed

- A failed offboarding will now throw a `TenantOffboardingError`, instead of just logging the error.

### Fixed

- MTX APIs are now served idempotently. This fixes custom provisioning handlers not being invoked correctly.

## Version 2.0.1 - 2021-05-10


### Added

- It's now possible to provide BTP dependencies in the `mtx` settings in your `.cdsrc.json` instead of implementing a custom handler, by setting `mtx.dependencies` accordingly.

## Version 2.0.0 - 2021-05-07


### Added
- Saas provisioning operations GET, PUT and DELETE on API `/mtx/v1/provisioning/tenant/`
now require scope `mtcallback`. Upgrade calls on API `/mtx/v1/model/upgrade/` and
`/mtx/v1/model/upgradeAsync/` now require scope `mtdeployment`.
This is now aligned with the
[mandatory scope check required for the java runtime](../java/multitenancy#xsuaa-mt-configuration).<br>
To adapt the scope names to the java runtime scope configuration,
the scope names can be changed using the following cds configuration:
```
mtx: {
    security: {
        "subscription-scope": "myApp.subscription",
        "deployment-scope": "myApp.deployment"
    }
}
```
- Support cds build API throwing BuildError instead of CompilationError.
- Undeployment of extensions can now be done using a simplified API:
`/mtx/v1/model/deactivate` with payload containing the extension sources to
be removed.
```
{
  "extension_files": [
    "db/ext3.cds"
  ],
  "tenant": "<tenant id>"
}
```
- Support automatic roll-back for corrupted tenants when `MTX_ROLLBACK_CORRUPTED_CONTAINER` is set to `true`. This should _never_ be used in production, but only for integration tests.

### Changed

- The global data meta tenant (`GLOBAL_DATA_META_TENANT`) is now created on the first application startup, instead of the first onboarding
- `@sap/hdi-deploy` and `@sap/instance-manager` are now directly required by `@sap/cds-mtx`. Therefore, they can be left out of your `package.json` `dependencies`
- Job IDs are now generated using the `uuid` package
- The default behavior of the `extension-allowlist` has changed. If `extension-allowlist`
is not configured, it is not allowed to apply any extension.<br>
Extensions can be easily enabled for all entities and services by adding the following
to the configuration.
```
mtx: {
  "extension-allowlist" = [
      {
          "for": ["*"]
      }
  ]
```

### Fixed
- No more duplicate log entries in model upgrade result.

## Version 1.2.3 - 2021-05-01


### Fixed
- Scope check for extension undeployment (ExtendCDSDelete) is enabled again

## Version 1.2.2 - 2021-04-23


## Version 1.2.1 - 2021-04-14


### Fixed
- Undeployment for model upgrade via `advancedOptions` working again
- Undeployment of base model artifacts via 'undeploy.json' is working again
- Unallowed `@cds.persistence.journal` annotations in extensions are now checked

### Added
- Size of job queue can now be configured via cds env
```
mtx: {
  jobqueue: {
    size: 10
  }
```
or parameter `CDS_MTX_JOBQUEUE_SIZE=10`

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
