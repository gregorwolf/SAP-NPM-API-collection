# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 2.4.2 - 2024-12-18

### Fixed

- The annotation check of the extension linter can now properly handle extensions like `extend service CatalogService with @cds.query.limit;`

## Version 2.4.1 - 2024-12-05

### Fixed

- `cds-mtx upgrade "*"` correctly parses metadata supplied by the `--body` parameter.

## Version 2.4.0 - 2024-11-25

### Added

- Deployment logs written by HDI to `stderr` are now attached to deployment error messages.
- For HANA, the initial job status for asynchronous tenant upgrades is now `QUEUED`.
- Annotation in extensions that are blocked by default can now be allow-listed:
  ```jsonc
  "requires": {
    "cds.xt.ExtensibilityService": {
        "extension-allowlist": [
          {
            "for": ["my.bookshop.Books"],
            "annotations": ["@mandatory", "@cds.api.ignore"]
          }
        ]
    }
  }
  ```

### Fixed

- Status codes for parallel async requests are always reported correctly.

## Version 2.3.1 - 2024-11-14

### Added

- The `X-Correlation-ID` header is set for requests to Service Manager.
- Extension projects can now be tested using `cds w` even if the application base model contains `@impl` annotations.

### Fixed

- The access token coming from Service Manager is redacted with `DEBUG` output on.
- The Service Manager client will now poll the ongoing operation for containers which are on "in progress" if it can find an existing instance instead of erroring out.
- `cds login --client` works correctly with client credentials from a service key.
- Synchronous upgrades don't fail for all tenants when there's a tenant for which the upgrade fails.

## Version 2.3.0 - 2024-10-28

### Added

- If extensibility is disabled, the upgrade operation now checks if extensions exist to avoid potential data loss. If intended the check can be disabled by setting `cds.requires['cds.xt.DeploymentService'].upgrade.skipExtensionCheck: true`.
- Requests to Service Manager now forward the correlation ID.

### Fixed

- Migration command `cds-mtx-migrate --syncTenantList` is now more robust.
- `DEBUG=mtx` redacts Service Manager credentials.
- When deleting a tenant HDI container, all of its service bindings are deleted – not just the ones labeled with the tenant ID.
- Extension linter now checks `@mandatory` and `@readonly` more accurately.
- `cds.xt.JobsService` inserts jobs and tasks in one transaction.

## Version 2.2.0 - 2024-09-30

### Added

- `PUT /-/cds/saas-provisioning/tenant` and `POST /-/cds/saas-provisioning/subscribe` accept additional environment variables to the HDI deployment via the generic options `_`, e. g. additional `VCAP_SERVICES`:
  ```jsonc
  "_": {
    "hdi": {
      "deployEnv": {
        "VCAP_SERVICES": { ... },
        "SOMETHING_ELSE": "something"
      },
      ...
    }
  }
  ```

### Changed

- HANA deployments without `resources.tgz` will now skip the deployment instead of failing with an error.
- Debug logs for HANA deployments can be set using `DEBUG=deploy`.
- The error about an invalid scope when fetching a token now contains the expected scope.
- Logs for enqueued jobs are not colored in non-TTY environments any more.

### Fixed

- `/-/cds/saas-provisioning/dependencies` show a better error message when it can't resolve its configured SaaS dependencies.
- The Service Manager client re-fetches the authorization token on retries.
- Better error handling in `cds.xt.JobsService`.


## Version 2.1.0 - 2024-08-29

### Fixed

- On-the-fly CSN calculations are only done with `extensibility: true` in the main app.
- The request correlation ID is appended to generic HDI deployment error messages.
- Asynchronous extension activation now reverts faulty extensions correctly.
- Parallel extension activation calls do no longer create inconsistent extension states.

## Version 2.0.6 - 2024-08-16

### Fixed

- Subscription Manager service subscriptions are now working again.
- The `cds.features.assertIntegrity` is correctly added to the compiler options for HANA builds.
- The job status now always returns a non-null value also when using `@cap-js/hana`.
- The passcode URL now reflects the subscriber subdomain, if such is received from the client.

## Version 2.0.5 - 2024-08-06

### Fixed

- The server startup no longer yields the `WARNING: Package '@sap/cds' was loaded from different installations:` message in PNPM setups with `--global-bin-dir` on. This happened in BAS, for example on `cds watch/serve` etc.
- Setting `HDI_DEPLOY_OPTIONS` to `'{"use_hdb": false}'` now works correctly for `@sap/hana-client` fallbacks.

## Version 2.0.4 - 2024-07-31

### Added

- `cds.requires['cds.xt.SaasProvisioningService'].alwaysUpgradeModel = false` will omit a model upgrade for SaaS registry updates.

### Fixed

- Better error message when Service Manager credentials cannot be resolved.
- `/-/cds/saas-provisioning/upgrade` will ignore tenants that do not exist in Service Manager any more and print out a warning.
- `cds.requires.html5-repo: true` will correctly set the subscription dependency out of the box.
- Scope check for `cds.xt.JobService.enqueue()` is now more restrictive.

## Version 2.0.3 - 2024-07-19

- `cdsc` options from the main application are not propagated to the t0 tenant any longer.

## Version 2.0.2 - 2024-07-11

### Changed

- Calls to Service Manager now include the `Client-ID` and `Client-Version` headers.

### Fixed

- Reduced number of Service Manager requests to `service_instances` in the error case.

## Version 2.0.1 - 2024-07-04

### Added

- Added HANA build plugin mappings `.hdbeshconfig` and `.hdbcalculationview` required for enterprise search and embedded analytics integration.
- The Service Manager client reports the container state on timeouts.

### Fixed

- Improved robustness in case of temporary extension inconsistencies.
- The Service Manager client now stores instance and binding locations used for async polling in-memory, allowing parallel subscriptions for single-instance applications.
- The Service Manager client automatically recreates instances in "creation failed" state on subscription.

### Removed

- `@sap/instance-manager` is not supported any longer as a fallback to the built-in Service Manager client.

## Version 2.0.0 - 2024-06-19

### Added

- Additional endpoint to get the passcode URL.
- Dependencies for the SAP BTP Connectivity, Audit Logging, and Destinations services are automatically added if `cds.requires.[connectivity|audit-log|destinations]` properties are set, respectively.

### Changed

- `@sap/cds-mtxs` now requires `@sap/hdi-deploy >= 4`.
- Deprecated endpoint `upgradeAll` has been removed from `SaasProvisioningService`.
- Use the `cds.compile.to.hana` API to support cds plugins such as embedded analytics.
- When pushing an extension, the extension is blocked if it contains critical annotations.

## Version 1.18.2 - 2024-06-24

### Changed

- All requests to Service Manager are now retried 3 times by default. This value can be modified by setting `cds.requires.mulitenancy.serviceManager.retries`.

### Fixed

- Certificate check for sms subscription now also compatible with kyma.
- Feature toggles can contain `.` again.
- Extension field limit check now correctly accepts `0` as no fields to be extended.


## Version 1.18.1 - 2024-05-16

### Changed

- Extension linter can now be configured for extensions of existing fields.
- With extensions, the deployment service now uses a separate folder for each deployment to improve parallel upgrade and extension operations.
- Trailing parts of secrets are not logged in case of errors anymore.

### Fixed

- Callback to saas-registry now works properly with certificate-based binding.
- The passcode URL returned by the token endpoint no longer contains a 'cert' subdomain.

## Version 1.18.0 - 2024-04-29

### Added

- `cds-mtx subscribe <tenant> --body <json>` now allows to pass tenant metadata and HDI parameters.

### Changed

- Retries for failed upgrades are more resilient, using an exponential backoff mechanism and more retries.

### Fixed

- Extension linter is now also called if extensions are created via API.
- The Service Manager credentials cache is correctly invalidated following a resubscription.

## Version 1.17.0 - 2024-03-25

### Added

- Ignore non-existing container if running upgrade `*` by setting `cds.requires['cds.xt.SaasProvisioning'].upgrade.ignoreNonExistingContainers: true`.
- `cds-mtx-migrate '*'|<tenant>[,<tenant>] --init-tenant-list [--force] [--dry]` now allows to fill the internal tenant list (e. g. for migration of Dynamic Deployer base applications).
- `cds-mtx-migrate '*'|<tenant>[,<tenant>] --sync-tenant-list [--force] [--dry]` now allows to sync the internal tenant list with existing containers. Entries without a corresponding HDI container will be removed.

### Changed

- `/-/cds/saas-provisioning/upgrade` sent as an async request with payload `"tenants": ["*"]` will now return job information even if no tenants are found.
- Default restrictions for code extensions and security annotations are now aways applied.

### Fixed

- The `dataEncryption` provisioning parameter is disabled for `t0` when using HANA native tenants.
- Ignore non-existing container if running upgrade `*` by setting `cds.requires['cds.xt.SaasProvisioning'].upgrade.ignoreNonExistingContainers: true`.
- The built-in Service Manager client filters bindings by `ready = true`.

## Version 1.16.0 - 2024-02-26

### Added

- `cds-mtx upgrade` now allows to pass `*` to upgrade all tenants.

### Changed

- The Service Manager polling timeout is increased from 60 to 180 seconds.
- On failing UAA token request, MTXS now responds to client with JSON to enable parsing the passcode URL.

### Fixed

- `upgrade` action is now also provided by `cds.xt.SmsProvisioningService`.
- Cleanup option of MTXS Migration deletes old `__META__` tenant only if cleanup is triggered for `*` (all tenants).
- Improved formatting of errors when fetching auth tokens.

## Version 1.15.0 - 2024-01-30

### Added

- MTXS now supports subscription via Subscription Manager Service also for Node.js applications.

### Fixed

- Additional services needed when using `SERVICE_REPLACEMENTS` for HDI deployment can now also be consumed in Kyma after adding them to the `cds` configuration like
  ```json
  "requires": {
        "myuserprovided": {
            "vcap": {
                "label": "user-provided",
                "name": "myuserprovided"
            }
        },
  ```
  See also https://help.sap.com/docs/SAP_HANA_PLATFORM/4505d0bdaf4948449b7f7379d24d0f0d/a4bbc2dd8a20442387dc7b706e8d3070.html#environment-variables-for-hdi-configuration
- Temporary files for build and deployment are created in the OS temp directory if file system permissions do not allow the creation in the cds root directory.

## Version 1.14.4 - 2024-01-24

### Fixed

- Fixed a `TypeError` in the credentials cache invalidation for HANA deployments.

## Version 1.14.3 - 2024-01-18

### Fixed

- i18n translations missing in some Java setups are now correctly resolved.
- CSNs loaded in a worker thread are correctly linked. In earlier versions, this could lead to a stack overflow in projects having `cds.requires.db.schema_evolution: false` and cyclic actions such as this:
  ```cds
  entity C_Books as projection on Books { * } actions {
    action returnSelf() returns C_Books;
  }
  ```
- Sync upgrades for `tenants = *` with `clusterSize > 1` are working correctly.

### Changed

- The temporary workaround for `cds.env.requires.['cds.xt.ModelProvideService'].loadSync = true` is removed. This setting won't have an effect for future versions.

## Version 1.14.2 - 2024-01-04

## Fixed

- `POST /-/model-provider/getEdmx` correctly ad-hoc compiles EDMX files for extended or toggled models.
- `POST /-/model-provider/getEdmx` re-compiles the EDMX if a `model` is passed.
- More resilient retry handling for 'authentication failed' errors in SAP HANA deployments.

## Version 1.14.1 - 2023-12-21

## Fixed

- A sidecar setup can be started for local development even with `multitenancy: false`.
- Additional resilience measures for the new Service Manager APIs if a healthy instance exists, but no binding.
- `cds.env.requires.['cds.xt.ModelProvideService'].loadSync = true` can be set to skip using worker threads when loading the application model.

### Changed

- `lazyT0` now also works in a sidecar scenario with `multitenancy` not explicitly set to `true`.
- The default for `cds.requires.multitenancy.jobCleanupIntervalStale` is reduced from one week to two days.

## Version 1.14.0 - 2023-12-14

### Changed

- Various performance improvements for retrieving EDMX or CSN models.
- Improved logging for `cds.xt.JobsService` or `cds.xt.DeploymentService`.

## Version 1.13.4 - 2023-12-07

### Changed

- The built-in Service Manager client uses async APIs for creating or deleting service bindings by default.

## Version 1.13.3 - 2023-12-05

### Fixed

- `PUT /-/cds/saas-provisioning/tenant` can now be used for upgrade purposes with shared deployment directories in non-extensible apps.
- `POST /-/cds/saas-provisioning/upgrade` correctly determines the deployment directory in non-extensible apps if just one tenant is passed in the request body.

## Version 1.13.2 - 2023-12-01

### Fixed

- Projects with `cds.features.assert_integrity = 'db'` don't generate constraints for `t0` any more.
- Deployment resources for `t0` are not created in the `base` directory any more.
- Fixed a race condition for the shared `base` directory.

## Version 1.13.1 - 2023-11-27

### Added

- `DEBUG=mtx` will now log all outgoing requests to Service Manager.
- For `multitenancy.jobs.clusterSize > 1` the Service Manager request will throw an error for a corrupt tenant without credentials.

### Changed

- For non-extensibility projects, a shared deployment folder is used across tenants for resource extraction. For `n` simultaneous tenant upgrades, this decreases the number of extracted files `n`-fold.

## Version 1.13.0 - 2023-11-13

### Added

- `GET /-/cds/saas-provisioning/tenant` now also returns `createdAt` and `modifiedAt` fields.

### Changed

- The internal job runner now has an in-memory queuing mechanism. For non-scaled sidecar instances, this avoids tasks for the same tenant from being run at the same time.

## Version 1.12.1 - 2023-10-17

### Added

- API `PUT /-/cds/extensibility/Extensions/<extension id>` now also accepts i18n-files.

### Fixed

- More stable upgrade with extensibility enabled.
- Downloaded migrated extension projects now contain correct base model references.

## Version 1.12.0 - 2023-10-05

### Added

- Beta: Setting `cds.requires.multitenancy.humanReadableInstanceName = true` will create human-readable tenant IDs for instances created via Service Manager, instead of hashed strings. This is incompatible with existing tenants using hashed instance names.
- Extensions of internal entities / services starting with `cds.xt.` are no longer allowed.
- If no extensions exist, `ModelProviderService.getEdmx()` now uses edmx files prebuilt by `cds build`.
- `ModelProviderService.getEdmx()` with empty `locale` parameter returns non-translated edmx.
- `ModelProviderService.getI18n()` returns the translated texts for a given `locale` and `tenant`.
- Migrated extension projects can now be downloaded using `cds extend <url> --download-migrated-projects`.

### Changed

- The allowlist for HDI deployment parameters (`HDI_DEPLOY_OPTIONS`) is removed. Any option can now be used.
- `PUT /-/cds/saas-provisioning/tenant` now also allows non-UUID strings for `subscribedSubaccountId`.

### Fixed

- Synchronous call of `PUT /-/cds/saas-provisioning/tenant` now returns correct `content-type`: `text/plain`.
- Update of extensions with different tags that depend on each other does no longer result in a compilation error.
- Extensions containing new entities with associations to base entities do no longer cause a compilation error.
- For SAP HANA deployment, no recompilation is done any more for applications not using extensibility.

## Version 1.11.0 - 2023-09-01

### Added

- `/-/cds/extensibility/push` now also accepts the `prefer: respond-async` header for asynchronous requests.
- `/-/cds/model-provider/getCsn` uses an LRU cache for base model CSNs, limited to 5 entries by default. This cache size can be configured using `cds.requires['cds.xt.ModelProviderService'].cacheSize`.
- The `treat_unmodified_as_modified` parameter is now allowed for HDI deployments.

### Fixed

- The Service Manager client now returns all bindings for partial cache misses for `cds.requires.['cds.xt.SaasProvisioningService'].jobs.clusterSize > 1`.
- The Service Manager client will now wait with exponential back-off for unexpected error codes.
- The Service Manager client will now print the correct root cause for errors with a `description` field.
- Command `cds-mtx` now terminates immediately after execution is finished.

## Version 1.10.0 - 2023-07-31

### Added

- Cleanup of stale jobs can now be disabled by setting `cds.requires.multitenancy.jobCleanup = false`.
- Experimental Extension CRUD API.

### Changed

- The Service Manager cache is invalidated for connection acquisition errors matching `SSL certificate validation failed`.

## Version 1.9.2 - 2023-07-20

### Changed

- Remove peerDependency to `@sap/cds>=6`.  This caused troubles in installation scenarios where sap/cds 7 was fetched while 6 should be used.

### Fixed

- The MTX migration script does not longer undeploy application database tables if HDI `auto_undeploy` is configured for the `cds.xt.DeploymentService`.
- The result verification of the MTX migration script no longer shows false errors when using `--force`.
- When a request fails, shorter errors are logged and secret data is hidden. (Set `DEBUG=req` in env to see all details again.)

## Version 1.9.1 - 2023-07-06

### Fixed

- `GET /-/cds/saas-provisioning/tenant` now doesn't include a duplicate `tenant` field, but only provides the tenant via `subscribedTenantId`.
- After switching from `@sap/cds-mtx` to `@sap/cds-mtxs`, existing tenants will now be taken into account when running an upgrade for all tenants (`['*']`).

## Version 1.9.0 - 2023-06-22

### Added

- MTXS Migration now checks extensibility configuration if old extensions exist.
- Upgrade now checks if MTXS Migration has been done if old extensions exist and if extensibility is properly configured.
- `GET /-/cds/saas-provisioning/tenant` now returns a `subscribedTenantId` field, even if the tenant was onboarded with no metadata.
- Token resource now accepts the POST method (can be used with @sap/cds-dk version 7).

## Version 1.8.4 - 2023-06-07

### Fixed

- Further improvement of timeout error handling when fetching uaa tokens.

## Version 1.8.3 - 2023-06-05

### Fixed

- Enables passing deployment options to the `upgrade` endpoint of `cds.xt.SaasProvisioningService`.
- The Service Manager now requests the authorization token resiliently.
- MTXS migration script now ignores changes caused by sap.common entities when verifying the migration result.

## Version 1.8.2 - 2023-05-24

### Fixed

- Fix for asynchronous subscriptions with `lazyT0 = true`.
- SAP HANA deployment now correctly evaluates the sql mapping configuration (e. g. `cds.data.sql_mapping.quoted`) also for deployment of `t0`.

### Changed

- New API `ExtensibiltyService.getExtensions` replaces projection `ExtensibiltyService.Extensions` and is now working without additional configuration effort.

## Version 1.8.1 - 2023-05-10

### Fixed

- MTXS Migration can now handle empty extension projects.
- MTXS Migration can now handle extension projects with complex folder structure correctly.
- The SaaS registry callback now supports X.509 authentication.
- Sidecar is now using mocked authentication in development mode.
- Fix for asynchronous subscriptions with `lazyT0 = true`.

## Version 1.8.0 - 2023-05-04

### Added

- Token endpoint can now handle UAA binding with X.509 (mTLS) authentication. On CLI side, this requires @sap/cds-dk@>=6.8.0.

### Changed

- `JobsService`: the job status will now remain `RUNNING` until all tenant tasks have succeeded or failed, instead moving to `FAILED` as soon as there's the first task failure.

### Fixed

- MTXS Migration only deploys `cds.xt.Extensions` instead of the full application model.

## Version 1.7.2 - 2023-04-17

### Fixed

- MTXS Migration now handles multiple generated projects correctly.
- Extensibility Service now contains action `add` for extension modification.
- Model Provider Service now offer action `getExtResources` returning the archive of the uploaded extension.
- CSV files provided in extensions are now correctly re-deployed again with `upgrade`.

## Version 1.7.1 - 2023-04-05

### Fixed

- MTXS Migration now behaves more robust with regards to cds build configurations.
- Re-subscribe now also re-deploys extensions again.
- Stability improvements for tenant upgrades.

## Version 1.7.0 - 2023-03-28

### Changed

- Filter duplicate linter messages based on new LinterMessage API.
- cds-mtx script now logs reasons for missing MTXS environment.
- `DeploymentService` plugin handlers are now registered on `serving:cds.xt.DeploymentService`.

### Fixed

- HANA deployment now correctly evaluates the sql mapping configuration (e. g. `cds.data.sql_mapping.quoted`).

## Version 1.6.3 - 2023-03-13

### Fixed

- `t0` model DDL files do not end up in application build results any more.
- `cds.xt.SaasProvisioningService`: fixed an error for programmatic usage when sending the callback.
- `cds-mtx` commands now properly exit with code != 1 when receiving an error from the `DeploymentService`.

## Version 1.6.2 - 2023-03-03

### Fixed

- Robustness of MTX Migration has been improved.

## Version 1.6.1 - 2023-03-01

### Fixed

- The lazily onboarded `t0` will now implicitly be created with the same onboarding parameters (e.g. database ID) as the first onboarded tenant.

## Version 1.6.0 - 2023-02-27

### Added

- `t0` onboarding can now happen lazily before the first subscription by setting `cds.requires.['cds.xt.DeploymentService'].lazyT0`.
- E-Tag handling for the `getCsn` API in sidecar scenarios has been introduced.

### Fixed

- Fixed input validation for feature toggles containing `_` or `-`.

## Version 1.5.1 - 2023-02-08

### Added

- Jobs are now cleaned up in the database after configurable cutoff times. The following options are possible:
  + `jobCleanupInterval`: Frequency in milliseconds for cleaning up finished or failed jobs. Default is 1 day.
  + `jobCleanupAge`: Time in milliseconds for the minimum age of the failed or finished jobs to delete. Default is 1 day.
  + `jobCleanupIntervalStale`: Frequency in milliseconds for cleaning up queued or running jobs. Default is 7 days.
  + `jobCleanupAgeStale`: Time in milliseconds for the minimum age of the queued or running jobs to delete. Default is 7 days.
- MTXS migration script now allows to cleanup @sap/mtx metadata containers.

### Changed

- `/-/cds/saas-provisioning/tenant`: consumers using the `mtx_status_callback` don't need a SaaS registry binding to the application any more.

### Fixed

- `cds migrate` does not crash any more when no options are supplied.
- `cds-mtx-migrate` command now terminates immediately when the migration is finished.
- Parameter `--dry` for `cds migration` now also skips the creation of the `t0`tenant.
- `ModelProviderService`: Non-repeated dots are now allowed in feature toggles, e.g. `foo.bar.baz` is a valid feature toggle name.

## Version 1.5.0 - 2023-01-27

### Added

- The built-in Service Manager client now caches binding information in-memory.
- The `optimise_file_upload` HDI deployment option is now supported.
- MTX migration script now allows to split extensions based on extension file names using regular expressions.
- Now, provisioning supports SaaS applications using extensibility in combination with migration tables. Before, provisioning failed with a HDI deployment error.
  **Note:** Extending migration table artifacts is not supported.

### Fixed

- MTX migration script now detects enabled multitenancy also for a sidecar project setup.
- Improved robustness for MTX migration script, e. g. with inconsistent old metadata tenants.


## Version 1.4.5 - 2023-01-18

- The authorization header for asynchronous operations is correctly propagated for internal callbacks using `mtx_status_callback`.

## Version 1.4.4 - 2023-01-16

### Changed

- `cds.xt.DeploymentService` configuration has been flattened. Instead of
  ```js
  "hdi": {
    "create": {
      "provisioning_parameters": {
        "database_id": "<ID>"
      },
      "binding_parameters": {
        "key": "value"
      }
    }
  }
  ```
  you can now also write
  ```js
  "hdi": {
    "create": {
      "database_id": "<ID>"
    },
    "bind": {
      "key": "value"
    }
  }
  ```
  The old configuration is still supported, but you're advised to migrate to the new configuration for improved readability.

- `/-/cds/jobs/pollJob` now also returns a `tenants` field, so tenant-specific tasks don't have to be polled individually. An example response format looks like this:
  ```js
  {
    "status": "FAILED",
    "op": "upgrade",
    "tenants": {
        "non-existing-tenant": {
           "status": "FAILED",
           "error": "Tenant 'non-existing-tenant' does not exist"
        },
        "existing-tenant": {
           "status": "FINISHED"
        }
     }
  }
  ```

### Fixed

- `cds.xt.SaasProvisioningService`: `*` is not allowed as a tenant name any more.
- Namespace check for new entities in extensions now also covers new root entities.
- Asynchronous operations now correctly send the callbacks defined via `status_callback` or `mtx_status_callback`.


## Version 1.4.3 - 2022-12-28

### Fixed

- Asynchronous jobs now return a directly-consumable URL for Cloud Foundry deployments in the `Location` header.
- Some incorrect status reports for the job and task polling have been fixed.
- Stability improvements for HANA tenant lifecycle operations, most notably unhandled promise rejections exiting the process have been fixed.

## Version 1.4.2 - 2022-12-19

### Fixed

- `/-/cds/jobs/pollTask` now correctly fetches the task status.
- Jobs now have the correct default `RUNNING` status.

## Version 1.4.1 - 2022-12-16

### Fixed

- Fixed an error with when parsing the tenant metadata when it is empty.
- Async upgrade parallelization via database clustering now works correctly with the new jobs service.
- Improved `tenant_id` correlation for Kibana logging.

## Version 1.4.0 - 2022-12-15

### Changed

- Async API calls now have a `x-job-id` header.
- Improved error handling for the Service Manager client.
- When doing asynchronous updates for multiple tenants, you can now poll the status for each individual tenant. Please continue using the `Location` response header to poll the status for all tenants.
  + This is what a sample response body for an asynchronous request to `/-/cds/saas-provisioning/upgrade` looks like:
  ```json
  {
    "ID": "<jobID>",
    "createdAt": "2022-12-12T13:07:15.817Z",
    "op": "upgrade",
    "tenants": {
        "t1": {
            "ID": "<taskID>"
        }
    }
  }
  ```

## Version 1.3.3 - 2022-12-01

### Changed

- The built-in Service Manager client now supports pagination tokens. This allows for more than 1250 tenants.

### Added

- The built-in Service Manager client now supports X.509 (mTLS) certificates in addition to the client-credentials authentication flow.
- `cds-mtx` commands now exit the process correctly on SAP HANA when there's an error in the command.
- SAP HANA encryption parameters are now correctly forwarded to the service-manager on subscription

### Fixed

- Improved error handling for the built-in Service Manager client.
- Tenant metadata can now be retrieved programmatically for all tenants via
    ```js
    const sps = await cds.connect.to('cds.xt.SaasProvisioningService')
    const tenants = await sps.get('/tenant')
    ```
- `UPDATE`, `DELETE` and `upgrade` APIs of `cds.xt.SaasProvisioningService` can now also be called programmatically.

## Version 1.3.2 - 2022-11-17

### Fixed

- `cds-mtx` commands now exit the process correctly.

### Added

- `cds.requires['cds.xt.SaasProvisioningService'].jobs.clusterPoolSize` allows you to specify the number of concurrent HANA Cloud cluster tenant upgrades.
- `cds.requires['cds.xt.DeploymentService'].hdi.create.binding_parameters` now also works with the built-in Service Manager client.

### Changed

- Error handling for the built-in Service Manager client is improved.

## Version 1.3.1 - 2022-11-04

### Changed

- `cds.requires.multitenancy.for` settings have been moved to `cds.requires['cds.xt.DeploymentService'].for`.

## Version 1.3.0 - 2022-10-28

### Added

- `cds.requires['cds.xt.DeploymentService'].for` lets you define tenant-specific creation and deployment configuration.
  + For example: parameters for `t0` onboarding can be specified via `cds.requires['cds.xt.DeploymentService'].for.t0`. Analogous to the configuration in `cds.xt.DeploymentService` you can specify options for `create` and `deploy`.
- `cds.xt.DeploymentService`: The `t0` tenant is now onboarded on startup.
- `POST /-/cds/deployment/subscribe` saves onboarding metadata in `t0`.
- `POST /-/cds/deployment/unsubscribe` removes onboarding metadata for `t0`.
- [BETA] Command line tool `cds-mtx` now also allows to run `upgrade` in an application environment, e. g. `npx cds-mtx upgrade tenant1` or `cds-mtx upgrade tenant1` if you have installed `@sap/cds-mtxs` globally. This redeploys the current application model. Potential service handlers can be registered in `cli.js` (`server.js` is not loaded)

### Changed

- `@sap/instance-manager` has been replaced by a custom Service Manager client, which is now the default. You can switch back to the `@sap/instance-manager`-based client by setting `cds.requires['cds.xt.DeploymentService']['old-instance-manager']` to `true`.

### Fixed

- `/-/cds/saas-provisioning/upgrade` now also runs with DwC

## Version 1.2.0 - 2022-10-06

### Added

- `cds.xt.DeploymentService`: Additional parameters for HDI deployment (`@sap/hdi-deploy`) can now be added via the subscription request or the `cds` environment.

Via additional parameter in the subscription payload:

```
{
  "tenant": "tenant",
  "_": {
    "hdi": {
      "deploy": {
        "auto_undeploy": "true"
      }
    }
  }
}
```

Via `cds` environment:
```
...
"cds": {
  "requires": {
    "cds.xt.DeploymentService": {
      "hdi": {
        "deploy": {
          "auto_undeploy": "true"
        }
      }
    }
  }
}
```
- `PUT /-/cds/saas-provisioning/tenant/<tenantId>` saves subscription metadata.
- `GET /-/cds/saas-provisioning/tenant/<tenantId>` returns the saved tenant metadata for `<tenantId>`.
- `GET /-/cds/saas-provisioning/tenant` returns the saved tenant metadata for all tenants.
- `GET /-/cds/deployment/getTables(tenant='<tenantId>)` returns all deployed tables for a tenant.
- [BETA] Command line tool `cds-mtx` allows to run `subscribe and unsubscribe` in an application environment, e. g. `npx cds-mtx subscribe tenant1` or `cds-mtx subscribe tenant1` if you have installed `@sap/cds-mtxs` globally.

### Changed

- `@sap/cds-mtxs@1.2.0` requires `@sap/cds@6.2`
- `POST /-/cds/saas-provisioning/upgrade` accepts a list of tenants like `upgrade(['t1', 't2'])`.
  + `upgrade(['*'])` upgrades all tenants.
- `POST /-/cds/saas-provisioning/upgrade` gets its tenants from the `t0` cache instead of the `saas-registry` service.
- `POST /-/cds/saas-provisioning/upgradeAll` has been deprecated and will be removed.
- `POST /-/cds/deployment/unsubscribe` is now idempotent for HANA as well.
- Polling interval to service-manager in `@sap/instance-manager` options has been increased to reduce rate-limiting problems.

## Version 1.1.2 - 2022-08-25

### Added

- `cds.xt.DeploymentService` now lets you register a `deploy` handler, invoked right before the HDI deployment is triggered.

## Version 1.1.1 - 2022-08-10

### Fixed

- `cds.xt.DeploymentService` can now also be called by users with role `cds.Subscriber`.

### Changed

- Log and debug output is improved.

## Version 1.1.0 - 2022-08-09

### Added

- `cds.xt.DeploymentService` can now be added via the subscription request or `cds` environment (e. g. HANA via service-manager).

  Via an additional parameter in the subscription payload:
  ```json
  {
    "subscribedTenantId": "tenant",
    "eventType": "CREATE",
    "_": {
      "hdi": {
        "create": {
          "provisioning_parameters": { "database_id" : "DB_ID" }
        }
      }
    }
  }
  ```
  Via the `cds` environment:
  ```json
  "cds": {
    "requires": {
    "cds.xt.DeploymentService": {
      "hdi": {
        "create": {
          "provisioning_parameters": { "database_id" : "DB_ID" }
        }
      }
    }
  }
  ```

## Version 1.0.1 - 2022-07-06

### Added

- `@sap/cds-mtxs` now has a `peerDependency` to `@sap/cds`.

## Version 1.0.0 - 2022-07-05

First external release.

## Version 0.1.0 - 2022-06-30

Initial release.

## Version 0.0.1

Initial milestone version.
