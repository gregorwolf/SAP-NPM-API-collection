# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.1.2 - 2022-08-25

### Added

- You can now register a `deploy` handler for the `DeploymentService`, right before the actual deployment is triggered.
## Version 1.1.1 - 2022-08-10

### Fixed

- More debug and log output
- `DeploymentService` can now also be called by users with role `cds.Subscriber`

## Version 1.1.0 - 2022-08-09

### Added

- Additional parameters for deployment (e. g. HANA via service-manager) can now be added via the subscription request or cds environment.

Via additional parameter in the subscription payload:
```
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

Via cds environment:
```
...
"cds": {
    "requires": {
        "cds.xt.DeploymentService": {
            "model": "@sap/cds-mtxs/srv/deployment-service",
            "hdi": {
                "create": {
                        "provisioning_parameters": { "database_id" : "12345" }
                }
            }
        }
    }
}
```

## Version 1.0.1 - 2022-07-06

### Added

- peerDependency to `@sap/cds`

## Version 1.0.0 - 2022-07-05

First external release

## Version 0.1.0 - 2022-06-30

Initial release

## Version 0.0.1

Initial milestone version
