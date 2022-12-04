# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.3.3 - 2022-12-01

### Changed

- The built-in Service Manager client now supports pagination tokens. This allows for more than 1250 tenants.

### Added

- The built-in Service Manager client now supports X.509 (mTLS) certificates in addition to the client-credentials authentication flow.
- `cds-mtx` commands now exit the process correctly on HANA when there's an error in the command.

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
- [BETA] Command line tool `cds-mtx` allows to run `subscribe and unsubscribe` in an application environment, e. g. `npx cds-mtx subscribe tenant1` or `cds-mtx subscribe tenant1` if you have installed `@sap/cds-mtxs` globally

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
