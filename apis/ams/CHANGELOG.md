# Version 3

Version 3 drastically changes the core API. Instead of checking privileges on a `PolicyDecisionPoint` with an `Attributes` object, an `AuthProvider` prepares an `Authorizations` object for the same purpose. This separates *what* to check from *how* to check it. The necessary configuration for advanced authorization scenarios such as principal propagation or non-standard authorization strategies are configured once during application start. As a result, the authorization checks themselves remain straight-forward in version 3, with a focus on the application domain.

New features:

- Out-of-the-box support for technical communication scenarios via SAP Identity Service
- Flexible configuration and extensibility for non-standard authorization strategies, e.g. when authenticating both via XSUAA and SAP Identity Service tokens
- Exports Typescript Types for a better development experience
- Improved events that allows correlating authorization checks with requests for logging and auditing
- Support for SAP Identity Service credentials with certificates changing at runtime, e.g. when using ZTIS or mounted Kyma service bindings

### Breaking Changes
CAP Node.js Applications should **not** need to make changes when updating to version 3.

For Non-CAP Node.js applications, please refer to the [migration guide](./doc/V2_V3_Migration_Guide.md).

## 3.5.0
- Fix: Catch request errors such as TLS certificate expiration errors during AMS bundle download and emit them via "bundleInitializationError" or "bundleRefreshError" events
- Fix: Duplicated log output in CAP applications
- improve bundle download error messages to include relevant information for support, such as bundle URL and region
- `IdentityServiceAuthProvider#withApiMapper` and `IdentityServiceAuthProvider#withServicePlanMapper` now also accept plain objects for mapping APIs/service plans to policies as a simpler alternative to mapper functions.
- ignore "local" DCL sub-packages during bundle upload case-insensitively
- ignore legacy DCL test files ending in `_test.dcl` during bundle upload

## 3.4.0
- Removed some unused npm dependencies
- Fix: AuthorizationManagementService no longer emits "error" events on failed bundle requests when no listeners are registered. Instead, it logs the error to console.error.
- [CAP] Fix: use cds.context.user.authInfo instead of deprecated cds.context.http.req.authInfo if available (@sap/cds >= 9.3.0) to avoid deprecation warning
- [CAP] Fix: During `cds serve|watch|test` in `production` profile, the CSN model is no longer traversed to validate AMS annotations or generate DCL at server start (only in `development` profile). During `cds build`, the model is still traversed regardless of the profile.
- [CAP] Removed `requires.auth.ams.cache` default configuration for `cds env` as a cache has no longer been necessary since version 2.0.0.
- [CAP] Added `requires.auth.generatePoliciesDeployer` configuration property (default: `auto`) that can be set to `false` to disable generation of an ams policy deployer application during `cds build` in applications that use a dedicated deployer application instead of the main application for deploying DCL files. In a future release, the `auto` option may receive intelligent behavior to detect whether a deployer application is required or not, while `true` can be used to enforce it.

## 3.3.1
- IdentityServiceAuthProvider now fills $user input without $env prefix which is semantically equal but more concise.
- AuthorizationManagementService now emits different "error" events depending on its readiness state: `bundleInitializationError` or `bundleRefreshError`. The latter contains a new `secondsSinceLastRefresh` property.

## 3.3.0
- Make API Permission Group -> Policy Mapper optional for app2app principal propagation flow (error log messages reduced to debug level)
- Simplify attribute input handling in `Authorizations#checkPrivilege` method, so attribute names work the same as in DCL where $app and $env prefixes are inferred automatically
- Fix `getPotentialActions` and `getPotentialResources` methods in app2app principal propagation flow

## 3.2.0
- `IdentityServiceAuthProvider` now has special handling for API consumption of `principal-propagation` API by not limiting user authorizations to policies of consumed API(s) in this case
- much improved DEBUG logging
- `authorizationCheck` events now have additional relevant properties and log better to console
- various fixes in error handlers
- internal values of `TECHNICAL_USER_FLOW` and `PRINCIPAL_PROPAGATION_FLOW` changed from a Symbol to string constants for better loggability
- fix type definition of `callName` to be one of several **lowercased** instead of **uppercased** call names in first callback of `Decision#visit`

## 3.1.3

- Fix in TarReader for AMS Bundle Download
- Fix error handling in IdentityServiceAuthProvider
- Fix error handling in CAP Build Plugin

## 3.1.2
- Fix: Do not throw error from IdentityServiceAuthProvider#getAuthorizations for not yet supported token scenarios (e.g. internal client_credentials token). Instead, return an Authorizations object with 0 policies.
- Typescript improvements for Decision#visit
- fix LICENSE file
- fix start command path in ams-dcl-content-deployer Dockerfile for version 3

## 3.1.1
- provide Typescript typings

## 3.1.0
- fix error logging in `deploy-dcl` script for AMS policy deployer
- add `config.start` flag to `AuthorizationManagementService` factory methods to manually start AMS bundle load when ZTIS is used
- fix `getPotentialActions` for policies that `GRANT <actions> ON *`.

[CAP Node.js]
- remove check for `requires.auth.kind = 'ias'` to support custom authentication middlewares without overriding `AuthProvider`
- Identity Service credentials may be manually provided via `amsCapPluginRuntime.credentials = ...` when not available under `cds.env.requires.auth.credentials`.

[CAP Java]
- Fix error due to missing @sap/xssec dependency when using @sap/ams as cds plugin

## 3.0.0
Refactored core API for non-CAP projects.

# Version 2

Version 2 introduces an improved and re-designed instance-based authorization via AMS for CAP projects. The integration switches from `@ams.publicFields` annotations to `@ams.attributes` annotations.

For exclusively role-based CAP projects and non-CAP projects, the changes are minimal but there are still a few improvements over version 1. 

## Features
#### deploy-dcl
The `deploy-dcl` script has been moved from `@sap/ams-dev` to `@sap/ams 2`. AMS DCL policy deployer applications should be updated to use the `/ams-dcl-content-deployer/package.json` file provided by `@sap/ams 2` instead of the `package.json` of `@sap/ams-dev 1`. Uploading base policies with the old `package.json` will still work fine as the upload implementation remains mostly the same. However, there have been quality-of-life improvements in the log output of `deploy-dcl` script that help during problem analysis:
- log list of DCL files found and zipped for upload
- log detailed server response on rejected upload

### Improved CAP integration
The structure of the AMS schema is now decoupled from the cds model and no longer resembles the service and entity structure of the cds model. This prevents exposing the internal application structure to policy administrators which provides more flexibility by letting developers change the application under the hood at a later time without breaking the authorization policies. It also results in an improved experience during policy administration because flat AMS attributes can be used for filters instead of nested ones.

#### Instance-based authorization via role attributes
The `IS (NOT) RESTRICTED` conditions for AMS attributes are now written to a `WHERE` condition behind role assignments, e.g. `ASSIGN ROLE Reader WHERE genre IN ('Fantasy', 'Fiction')`. This policy grants full access wherever the `Reader` role is required in the cds model. However, if (and only if) a target entity contains an `@ams.attributes` annotation that maps the `genre` attribute to a cds element of the entity, the list of instances for which access is granted is filtered to those of genre *Fantasy* or *Fiction*.

#### DCL generation
The DCL generation algorithm has been changed to fit the new `@ams.attributes` annotations based on assigning roles:

- It uses the new `ASSIGN ROLE <role>` DCL syntax in the generated `basePolicies.dcl`. This is syntactic sugar for `GRANT <role> ON $SCOPES` but semantically equivalent.
- It generates a `schema.dcl` based on the AMS attributes that get mapped via `@ams.attributes` annotations. Their types are inferred automatically based on the cds elements to which they are mapped.
- To allow manual customization, the DCL generation algorithm now only overrides files that have not been changed by the developer since they were generated. This is determined via a hash value in the header of generated DCL files. It is possible to enforce a re-generation of a file by deleting it prior to the next generation.
- There is no longer a need for a custom DCL folder which means the VSCode Data Control Language extension finally works fine in CAP Node.js projects because there is now a single DCL root folder with a `schema.dcl`.

#### Validation of AMS annotations
The `@ams.attributes` annotations are validated for syntactic correctness and type coherence during `cds build` and whenever a model is loaded if the application was started via `cds serve`, `cds watch` or `cds.test`. This gives early feedback about the correctness of the annotations during development:

- validates that `@ams.attributes` annotations map AMS attributes syntactically correct to cds elements via expression syntax.
- if a manually written/adjusted `schema.dcl` is used, validates that all AMS attributes mapped via `@ams.attributes` annotations exist and have a type that fits each cds element to which they are mapped.
- if a generated `schema.dcl` is used, validates that the inferred type of each AMS attribute is coherent across all `@ams.attributes` mappings in which it is mapped to a cds element.

## Breaking Changes

- The constructor of `PolicyDecisionPoint` has been changed from `constructor(url, timeout=0, bundleProvider)` to `constructor(bundleProvider)` as those parameters were deprecated since the replacement of the OPA sidecar by the DCN engine. 
- The `cap` and `runtime` packages are no longer exported via `index.js`.
- Instance-based authorization via `@ams.publicFields` annotations is no longer supported and requires switching to `@ams.attributes` annotations. It is possible to migrate the annotations without changing the AMS schema and base policies, so that admin policies of productive system do not break.
- The DCL generation for purely role-based authorization is backward-compatible with version 1. However, for projects with `@ams.publicFields` annotations, it is not. The DCL needs to be manually written or adapted for instance-based authorization.
- In Node.js CAP projects, DCL files are now generated into the `ams/dcl` folder by default which is not *gitignored*, so that the files can be customized if required. We suggest manually adding this folder to *gitignore* if only generated DCL files are used without making manual changes to them.

## Migration Guide
The migration guide can be found in `doc/V1_V2_CAP_Migration.md`.

## Version compatibility
### @sap/ams-dev
Version 2 of @sap/ams should must be used with @sap/ams-dev version 2 because a lot of functionality has been moved from @sap/ams-dev to @sap/ams in version 2.

### @sap/cds
It is compatible with cds ^7.5 and cds 8.

### CAP Java
In CAP Java projects, @sap/ams 2 can be installed as cds plugin to provide tooling support (e.g. during `cds build`). It should be used with the following maven module which introduces the corresponding runtime support for the new instance-based authorization:

```xml
<group>com.sap.cloud.security.ams.client</group>
<artifactId>cap-ams-support</artifactId>
```

Do **not** use it with the old `cap-support` maven module whose name is similar to `cap-ams-support`.

## 2.4.0
- [CAP]
    - bug fixes and improvements for attribute filtering via @ams.attributes annotations
    - add support for attribute filtering of roles required by @restrict on service level
    - remove unnecessary brackets from generated CQL in where condition

## 2.3.0
- Improved DCL upload error logging
- [CAP] several bug fixes for both Node.js and Java projects:
    - fix CAP Java projects requiring @sap/xssec during cds build when using @sap/ams as cds plugin
    - fix some validation errors being swallowed instead of reported
    - fix DCL generation crashing instead of throwing a proper error when a cds type cannot be inferred
    - throw meaningful error message when schema.dcl parsing fails during validation
    - add proper type validation for nested attributes (parts of nested attribute names must not be mapped to data types as they need to be a structure)
    - do CDS -> DCL compilation for DCL generation and schema validation only during dev-time and not during runtime

## 2.2.0
- [CAP] fix: add early exits to AMS plugin handlers to prevent errors when authenticating with technical user tokens or tokens that are not from SAP Identity Service (e.g. to make hybrid XSUAA/IAS authentication scenarios possible)

## 2.1.0

- [CAP Java] fix: prevent dcl root folder deletion at the beginning of cds build
- [CAP] added `dclGenerationPackage` (default: `cap`) configuration property to change the name of the package to which `basePolicies.dcl` is generated.
- DCL (sub-)packages called *local* are no longer included in the archive during `deploy-dcl` (the AMS server ignores them anyways)

## 2.0.0

- Added `deploy-dcl` script (previously in `@sap/ams-dev`)
- Improved CAP integration (see [Features](#features) for details)
- Removed deprecated parameters and exports (see [Breaking Changes](#breaking-changes) for details)


### CAP Node.js
- Fix roles middleware by overriding `user.is` instead of adding roles to `user.roles` which may not exist on custom auth middlewares
- Changed default cache TTL from `20s` to `15min` which is used for both `role` computations and `role-based attribute filters` computed by the AMS plugin
- Disabled cache by default in *development* profile
- Removed support for instance-based authorization via `@ams.publicFields` annotations.
- Added support for instance-based authorization via `@ams.attributes` annotations.
- Changed default DCL generation output folder from `gen/srv/ams/dcl` to `ams/dcl` which fixes problems with the VSCode Data Control Language extension

### CAP Node.js and Java
- Changed DCL generation algorithm. It now requires manual changes in `basePolicies.dcl` for applications with instance-based authorization via AMS
- *autoCompile* configuration property renamed to *generateDcl* but for backward-compatibility, both are supported
- *dclFolder* configuration property renamed to *dclRoot* but for backward-compatibility, both are supported
- Removed *customDclRoot* / *customDclFolder* configuration property as there is no longer a need for a separate DCL folder with custom DCL
- Removed tooling for copying file changes from custom policy folder to generated policy folder as it is no longer necessary to have a separate folder for custom DCL content



# Version 1

Version 1 introduces CAP support.

## 1.18.0 - 2024-10-10

- [CAP] provide auto-configuration for AMS plugins
- [CAP] log AMS bundle load events
- [CAP] reduce log level of "AMS plugin not loaded" to debug

## 1.17.0 - 2024-08-21

- [CAP] added support for cds 8

PolicyDecisionPoint now evaluates authorization checks with a new in-process DCN engine instead of an OPA sidecar process. The *url* parameter of its constructor is not used anymore.

#### Authorization Bundle Loading
With the removal of the sidecar, the authorization bundle now has to be loaded into the application directly. For backwards-compatibility, the PolicyDecisionPoint constructor configures a BundeLoader for this automatically, unless an explicit BundleLoader is passed to the new, third constructor argument.\
By default, it loads the bundle from the SAP Identity Service instance to which the application is bound, e.g. when running on CF or Kyma\*. For local tests, DCL can be compiled to DCN with @sap/ams-dev >= 1.0.0. When environment variable AMS_DCN_ROOT is set to the DCN output folder, the default BundleLoader will try to load the bundle from there instead.

For details and a migration guide for your local test setup, refer to the documentation of @sap/ams-dev 1.0.0.

\*The k8s sidecar can be removed. The mount path of the apps' identity binding should follow the [SAP Kubernetes Service Bindings Spec](https://community.sap.com/t5/technology-blogs-by-sap/the-new-way-to-consume-service-bindings-on-kyma-runtime/ba-p/13540594), e.g. by setting env variable `SERVICE_BINDING_ROOT=/bindings` and using `/bindings/identity` as mounth path. We strongly suggest following this new standard to enforce uniform mount paths across all services. However, technically there are alternative fixes: the mount path */etc/secrets/sapbtp/identity/auth* previously required by the k8s sidecar can be changed to */etc/secrets/sapcp/identity/auth* or env variable `SERVICE_BINDING_ROOT=/etc/secrets/sapbtp` can be used with the old path. 

## 1.16.0 - 2024-05-17

- add AmsScopeExtension for XSUAA/IAS hybrid transition stage 0
- fire event before pdp evaluations for XSUAA/IAS hybrid transition stage 1 to set policies based on XSUAA scopes
- [CAP] remove deprecation warning related to req.user.tenant

## 1.15.1 - 2024-03-05

- [CAP] fix crash in RestrictionsProvider for CAP entities whose restrictions are null or undefined

## 1.15.0 - 2024-02-16

- [CAP] add AmsEventService
- [CAP] fire getRestrictionsEvent from AmsEventService that allows changing the attributes before they are sent to pdp

## 1.14.2 - 2024-01-30

- provide separate README for npmjs release and clean up docs

## 1.14.1 - 2024-01-23

- [CAP] fix IAS app_tid and scim_id access for @sap/cds 7.5.2 as the information has been removed from user.attr

## 1.14.0 - 2023-12-20

- add @sap/cds@7.5.0 as optional peer depenency
- [CAP] bugfix missing await in RolesMiddleware
- [CAP] several changes for new "cds build --for ams" feature

## 1.13.1 - 2023-9-12

- support users with empty tenant in CAP

## 1.13.0 - 2023-9-7

- add limit for maximum entries to RolesCache. In CAP, this can be configured via requires.auth.ams.cache.limit
- fix CAP watch mode detection under Windows file systems

## 1.12.0 - 2023-8-15

- refactor runtime package

## 1.11.0 - 2023-8-14

refactoring of CAP plugin:
- \_dcl\_.cap file is now called entityMapping

## 1.10.1 - 2023-8-7

- export the new functionality from 1.10.0 via index.js

## 1.10.0 - 2023-8-2

- the API and cache for retrieving a user's roles based on specific role policies has been moved from the corresponding CAP-specific RolesMiddleware to a standalone class (RolesProvider). RolesMiddleware has been changed to configure and use RolesProvider.

## 1.0.9 - 2023-8-1

- change warning to debug message when roles middleware is handling request without user object

## 1.0.8 - 2023-8-1

- the cache TTL (time-to-live) of the roles middleware can now be configured in the CAP config via property requires.auth.ams.cache.TTL

## 1.0.7 - 2023-7-26

- add runtime for AmsInstance functionality

## 1.0.6 - 2023-7-25

- fixed cds-plugin.js missing from previous builds and releases

## 1.0.5 - 2023-7-21

- improved logging of cds plugin

## 1.0.4 - 2023-7-20

- convert to cds plugin

## 1.0.3 - 2023-7-19

- small bugfixes and improvements for CAP integration

## 1.0.2 - 2023-7-17

- small bugfixes and improvements for CAP integration

## 1.0.1 - 2023-7-11

- small bugfixes and improvements for CAP integration

## 1.0.0 - 2023-7-10

- add CAP integration code to src/cap



# Version 0

## 0.4.0 - 2023-6-30

- update ams-dev lib

## 0.3.0 - 2023-5-3

- update ams-dev lib

## 0.2.2 - 2023-1-13

- fix pdp url if set from outside

## 0.2.1 - 2023-1-12

- fix connection refused bug for node versions 17 upwards

## 0.2.0 - 2023-1-11

- support for scim id in attributes setTokenInfo

## 0.1.5 - 2022-12-30

- add getHealthStatus and startupCheck functions

## 0.1.4 - 2022-10-21

- update ams-dev to version 0.2.3

## 0.1.3 - 2022-10-05

- update ams dev lib

## 0.1.2 - 2022-08-18

- update to new ams-compiler and opa version in ams-dev-lib

## 0.1.1 - 2022-04-14

- updated dcl compiler to version 0.10.0

## 0.1.0 - 2022-03-22

- Updated ams-dev lib which contained vulnerability

## 0.0.2 - 2022-03-07

- First release
