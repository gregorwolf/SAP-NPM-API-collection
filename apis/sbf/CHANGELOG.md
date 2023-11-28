# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

There are _incompatible changes_ between _major_ versions.
See the [migration guide](migration.md) how to adapt.

The format is based on [Keep a Changelog](http://keepachangelog.com/).


<a name="6.6.2"></a>
## 6.6.2 - 2023-11-20
### Changed
- Dependencies version update.

<a name="6.6.1"></a>
## 6.6.1 - 2023-11-13
### Changed
- Dependencies version update.

<a name="6.6.0"></a>
## 6.6.0 - 2023-09-18
### Added
- Support for node v20 added.
### Removed
- Support for node v12 is removed.

<a name="6.5.9"></a>
## 6.5.9 - 2023-07-24
### Changed
- Dependencies version update.

<a name="6.5.8"></a>
## 6.5.8 - 2023-06-25
### Changed
- Dependencies version update.

<a name="6.5.7"></a>
## 6.5.7 - 2023-04-03
### Changed
- Dependencies version update.

### Removed
- Support for node.js v10 is removed.

<a name="6.5.6"></a>
## 6.5.6 - 2023-03-29
### Added
- Support Node v18. 

<a name="6.5.4"></a>
## 6.5.4 - 2023-02-28
### Changed
- improve UAA error handling. 

<a name="6.5.3"></a>
## 6.5.3 - 2023-01-11
### Changed
- dependencies version update.

<a name="6.5.2"></a>
## 6.5.2 - 2022-07-12
### Changed
- dependencies version update.

<a name="6.5.1"></a>
## 6.5.1 - 2022-07-10
### Changed
- dependencies version update.

<a name="6.5.0"></a>
## 6.5.0 - 2022-07-05
### Added
- Enable broker developers to implement async creation of service binding.

<a name="6.4.10"></a>
## 6.4.10 - 2022-06-18

### Fixed
- dependencies version update.

<a name="6.4.9"></a>
## 6.4.9 - 2022-06-02

### Changed
- Relevant for XSUAA scenarios: `authorities` provided by the consumer are ignored and overriden by `extend_xssecurity`. If `extend_xssecurity` is not provided, SBF will pass an empty `authorities` array. <br/>Set the new `secureUAAScopes` option (or environment variable `SBF_SECURE_UAA_SCOPES`) **explicitly** to `false`, in order to pass the authorities array provided by the consumer as is. **This behavior and environment variable form an incompatible change**.

### Fixed
- Fixed leaking of headers in logged messages in XSUAA scenarios.
- Fixed support for clientx509enabled for K8S apps, where XSUAA credentials are mounted as files.

<a name="6.4.8"></a>
## 6.4.8 - 2022-05-24

### Fixed
- support error response with different struct   
 
<a name="6.4.7"></a>
## 6.4.7 - 2022-05-18

### Changed
- Switch from deprecated Request package to Axios Package. <br/>
Note: If you are using exported functions such as callXsuaa, you would need to adapt to the Axios syntax - `request.body` is replaced with `request.data`.

### Removed
- Remove npm-shrinkwrap.json

<a name="6.4.6"></a>
## 6.4.6 - 2022-04-17

### Fixed
- Updates to dependency versions 

<a name="6.4.5"></a>
## 6.4.5 - 2022-03-21

### Added
- Updates to dependency versions 

<a name="6.4.4"></a>
## 6.4.4 - 2022-01-24

### Added
- Updates to dependency versions 

<a name="6.4.3"></a>
## 6.4.3 - 2022-01-19

### Added
- Updates to dependency versions 

<a name="6.4.2"></a>
## 6.4.2 - 2021-11-25

### Added
- Get certurl field from xsuaa binding 

<a name="6.4.1"></a>
## 6.4.1 - 2021-11-10

### Added
- mTls fixes

<a name="6.4.1"></a>
## 6.4.0 - 2021-09-26

### Added
- Out-of-the-Box mTLS
- Customized mTLS 


<a name="6.3.1"></a>
## 6.3.1 - 2021-08-22

### Added
- fix for auditlog oauth2 plan

<a name="6.3.0"></a>
## 6.3.0 - 2021-08-22

### Added
- Updating audit-logging to support oauth2 plan
- Adapt to XSUAA's new mtls (x.509) security descriptor

<a name="6.2.13"></a>
## 6.2.13 - 2021-08-13

### Added
- fix ambiguity error when SBF_CREDENTIALS_PROVIDER_SERVICE is set
- allow brokers to be configured with tls and no basic authentication

<a name="6.2.12"></a>
## 6.2.12 - 2021-07-25

### Added
- Allow specification of x509 parameters when binding

<a name="6.2.11"></a>
## 6.2.11 - 2021-06-22

### Added
- fix to instance parameters endpoint

<a name="6.2.10"></a>
## 6.2.10 - 2021-05-05

### Added
- fetch instance parameters endpoint and hook

<a name="6.2.9"></a>
## 6.2.9 - 2021-03-16

### Added
- update prepareRelease command

<a name="6.2.8"></a>
## 6.2.8 - 2021-03-15

### Added
- Add --production flag to npm shrinkwrap 

<a name="6.2.7"></a>
## 6.2.7 - 2021-03-04

### Added
- Updates to dependency versions

<a name="6.2.6"></a>
## 6.2.6 - 2021-03-02

### Added
- Updates to dependency versions

<a name="6.2.5"></a>
## 6.2.5 - 2021-02-03

### Added
- Updates to dependency versions

<a name="6.2.4"></a>
## 6.2.4 - 2021-01-11

### Added
- Support Node v14

<a name="6.2.3"></a>
## 6.2.3 - 2020-12-16

### Added
- Support IAS authentication in node-sbf

<a name="6.2.2"></a>
## 6.2.2 - 2020-09-24

### Fixed
- Updates to dependency versions

<a name="6.2.1"></a>
## 6.2.1 - 2020-07-30

### Fixed
- Updates to dependency versions

<a name="6.2.0"></a>
## 6.2.0 - 2020-04-30

### Added
- Support for XSUAA clone update
- Expose `tenantId` in `onProvision` and `onUpdate` hooks via the `xsuaa` property
- `callXsuaa` - add `baseUrlProperty` option to specify base URL

### Fixed
- Properly filter `access_token` information in debug log

<a name="6.1.0"></a>
## 6.1.0 - 2020-03-12

### Added
- Built-in health HTTP endpoint

<a name="6.0.0"></a>
## 6.0.0 - 2020-01-17

### Added
- Support authentication using X.509 client certificates (externally managed)
- Support running on K8S

### Removed
- Support for Node.js 6.x

### Fixed
- User friendlier error message for XSUAA timeouts
- Removed deprecated XSUAA endpoint from tests
- Updated @sap/xsenv to v2.2.0

<a name="5.1.1"></a>
## 5.1.1 - 2019-07-11

### Fixed
- Updated `lodash` to 4.17.13

<a name="5.1.0"></a>
## 5.1.0 - 2019-06-14

### Added
- Support authentication using X.509 client certificates (certificates managed by XSUAA).

### Fixed
- Updated dependencies.

<a name="5.0.0"></a>
## 5.0.0 - 2019-05-21

### Changed
- Setting the provider tenant (see *Added* section) is mandatory when a broker is running on Cloud Foundry and audit logging is enabled.
The value is automatically detected (no error will be thrown if not explicitly provided) in case `autoCredentials` is `true` and the broker is using XSUAA as credentials provider.

### Fixed
- Duplicate `app_host_id`s are removed in a response to a bind request.
- Remove the catalog suffix from `service_id` and `plan_id` for update instance requests (part of [`previous_values`](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/spec.md#previous-values-object)).

### Added
- `SBF_TENANT_ID` environment variable and `tenantId` option for providing a tenant (of the provider) for audit logging.
- Node.js 10 support. **Note**: To use SBSS on HANA with Node.js 10, a version of `@sap/hdbext` (a peer dependency) that supports Node 10 should be added to application's dependencies. Refer to the *package.json* file of the corresponding `@sap/sbss` version for the version range of `@sap/hdbext`.

<a name="4.2.0"></a>
## 4.2.0 - 2019-03-27

### Added
- Improvements in documentation.
- Possibility to add/extend `app_host_id` in the `onBind` hook.
- Return `sap.cloud.service.alias` property from the service metadata as part of the credentials.
- Support for multiple 'html5-apps-repo' service bindings from the environment.

### Fixed
- Search in the environment for 'html5-apps-repo' instances by the 'html5-apps-repo-dt' tag instead of 'html5-apps-repo-rt'.
- Updated dependencies.

<a name="4.1.0"></a>
## 4.1.0 - 2019-01-30

### Added
- Expose credential providers

### Fixed
- Docu: add `SBF_SBSS_RESTRICTED_USER_SERVICE` to the list of environment variables

<a name="4.0.0"></a>
## 4.0.0 - 2019-01-18

### Changed
- _@sap/sbf_ now depends on _@sap/sbss_ v4 which no longer brings the _@sap/hdbext_ package by default.
Brokers that use SBSS on HANA need to explicitly specify _@sap/hdbext_ as a dependency.

### Fixed
- Added Node 8 to list of supported versions

<a name="3.3.1"></a>
## 3.3.1 - 2019-01-11

### Fixed
- Typo: property `saasregistryenable` is now renamed to `saasregistryenabled`

<a name="3.3.0"></a>
## 3.3.0 - 2019-01-08

### Added
- Support for `subaccount_id` in SBSS on PostgreSQL

### Fixed
- Using empty string as user name during audit logging on Kubernetes

<a name="3.2.0"></a>
## 3.2.0 - 2018-12-04

### Added
- Support for Business Service
- Improvements in documentation

<a name="3.1.0"></a>
## 3.1.0 - 2018-10-25

### Added
- Utility function to make HTTP calls to XSUAA
- Specify catalog.json file via `SBF_CATALOG_FILE` environment variable
- Improvements in documentation

## 3.0.0 - 2018-09-20

### Changed
- Version 4 of the _@sap/logging_ package is now used. The `requestId` property is no longer available in `params.req.loggingContext` (in custom hooks). Use the `correlationId` for correlating log entries from different components involved in a broker operation.

### Added
- Support for CF Log format (via adopting _@sap/logging_ v4).
- Provisioning with XSUAA credentials provider: use `subaccount_id` if provided.

### Fixed
- Validation of update requests.
- Updated dependencies.

## 2.1.2 - 2018-08-14

### Fixed
 - Updated dependencies
 - Validation of provision and bind requests

## 2.1.1 - 2018-07-27

### Fixed
 - Update 'request' to v2.87.0

## 2.1.0 - 2018-06-07

### Added
 - 'user_id' and 'originating_identity' properties are available in custom hooks
 - 'req' object is available in custom hooks
 - New "Audit logging" section in README.md
 - Support for OSB API context

### Fixed
 - Enhanced example applications
 - Propagate some XSUAA errors to the client
 - Updated dependencies

## 2.0.0 - 2018-04-12

See the [migration guide](migration.md) how to adapt to incompatible changes.

### Changed
- Audit log service integration (**Incompatible**)
- PostgreSQL restricted user support (**Incompatible**)
- Reverse the order of operations during unbind and deprovision (**Incompatible**)
- X-Broker-API-version header is now mandatory (**Incompatible**)

### Removed
- The old format where `xsappname` and the other security properties appear on root level is removed when creating a service instance (**Incompatible**)

### Added
- Enforce secure outgoing connections via environment variable `SBF_SECURE_OUTGOING_CONNECTIONS`
- Configure timeout for requests to XSUAA via environment variable `SBF_UAA_TIMEOUT`
- New "Error handling" section in README.md
- Memory consumption sizing guide
- Documented how to limit heap size

## 1.5.0 - 2017-12-12

### Added
- Allow to set scopes/authorities per service/plan with environment variable
- New section in the readme about asynchronous broker operations

### Fixed
- Propagate some XSUAA errors to the client side
- Change X-Broker-Api-Version check in order to work with XSA

## 1.4.0 - 2017-10-25

### Added
- Add support for hashed broker password
- Script for generating hashed broker password
- Allow to embed SBF in an express.js application
- Support new SBSS version
- Script for generating unique ids in service catalog
- Pass generated credentials to the `onBind` hook
- Java examples
- Added "Security" section in README.md
- Verify service catalog for consistency
- Log warning if broker password is shorter than 15 characters

### Fixed
- Deprovision does not fail if UAA cloning is already deleted (Allow to retry deprovision operation)
- Properly encode URL parameters in outbound requests

## 1.3.0 - 2017-08-16

### Added
- Allow for custom parameters in create service operation
- New section in the readme about providing custom parameters
- Simple example to register the broker automatically with MTA descriptor

## 1.2.0 - 2017-08-03

### Added
- Troubleshooting section in the readme
- New section in the readme about extending the service broker
- Example for OAuth authentication with client credentials grant
- Example for OAuth authentication with user token grant
- Example using MTA and deploy service
- Provide catalog suffix via broker URL

## 1.1.0 - 2017-06-02

### Added
- OAuth authentication with UAA

## 1.0.1 - 2017-05-18

### Fixed
- Broker will fail if `serviceConfig` contains service that is not defined in *catalog.json*
- Only `onBind` hook is required to be implemented if `autoCredentials: false`
