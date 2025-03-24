# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.17.0] - 2025-03-05
### Quality

Upgrades:

| Package | Type | Update | Change |
|---|---|---|---|
| [@sap-ux/adp-tooling](https://github.com/SAP/open-ux-tools/tree/main/packages/adp-tooling) | devDependencies | minor | [`0.12.137` -> `0.13.7`] |
| [@sap-ux/preview-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/preview-middleware) | dependencies | minor | [`0.17.47` -> `0.18.7`] |
| [@sap-ux/deploy-tooling](https://github.com/SAP/open-ux-tools/tree/main/packages/deploy-tooling) | devDependencies | minor | [`0.15.44` -> `0.15.45`] |
| [@sap-ux/backend-proxy-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/backend-proxy-middleware) | devDependencies | minor | [`0.8.35` -> `0.8.36`] |

## [1.16.5] - 2025-02-20
### Quality

Upgrades:

| Package | Type | Update | Change |
|---|---|---|---|
| [@sap-ux/adp-tooling](https://github.com/SAP/open-ux-tools/tree/main/packages/adp-tooling) | devDependencies | minor | [`0.12.122` -> `0.12.136`] |
| [@sap-ux/backend-proxy-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/backend-proxy-middleware) | devDependencies | minor | [`0.8.32` -> `0.8.35`] |
| [@sap-ux/btp-utils](https://github.com/SAP/open-ux-tools/tree/main/packages/btp-utils) | devDependencies | minor | [`1.0.0` -> `1.0.1`] |
| [@sap-ux/deploy-tooling](https://github.com/SAP/open-ux-tools/tree/main/packages/deploy-tooling) | devDependencies | minor | [`0.15.41` -> `0.15.44`] |
| [@sap-ux/preview-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/preview-middleware) | dependencies | minor | [`0.17.18` -> `0.17.44`] |
| [@sap-ux/reload-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/reload-middleware) | devDependencies | minor | [`0.2.15` -> `0.2.17`] |
| [@sap-ux/serve-static-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/serve-static-middleware) | devDependencies | minor | [`0.2.2` -> `0.2.3`] |
| [@sap-ux/ui5-proxy-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/ui5-proxy-middleware) | devDependencies | minor | `1.4.14` -> [`1.4.16`] |

## [1.16.4] - 2025-02-06
### Fixed
- Fixed an issue where changes of applications generated with an older version of SAP Fiori tools were not reflected on the preview due to missing the `sap-ui-xx-viewCache=false` parameter

## [1.16.2] - 2025-01-08
### Fixed
- Fixed an issue where preview with 'start-embedded' runs only with the first parameter
- Fixed an issue where workspace changes are not loaded in preview of an already deployed project

## [1.15.6] - 2024-10-30
### Changed
- Refactored the command to add configuration for variants creation and moved it from `@sap/ux-ui5-tooling` to the open source `@sap-ux/create` package

## [1.14.3] - 2024-07-24
### Added
- Added more flexibility to the `fiori-tools-preview` middleware to support all possible configuration options provided by the open source `@sap-ux/preview-middleware`

### Fixed
- Fixed an issue with preview of adaptation projects not working

## [1.14.1] - 2024-06-26
### Fixed
- Fixed an issue where run configurations were loading the SAPUI5 version from the default location, even though a different source location was specified

## [1.13.6] - 2024-05-29
### Fixed
- Fixed an issue with the preview of adaptation projects using reuse libraries

## [1.13.3] - 2024-04-17
### Fixed
- Fixed an issue with preview not working with latest `node.js` versions on Windows-based systems ("Command run failed with error : spawn EINVAL")

## [1.13.1] - 2024-03-20
### Changed
- The `fiori-tools-appreload` middleware now uses [@sap-ux/reload-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/reload-middleware)

## [1.13.0] - 2024-03-07
### Changed
- The `fiori-tools-servestatic` middleware now uses [@sap-ux/serve-static-middleware](https://github.com/SAP/open-ux-tools/tree/main/packages/serve-static-middleware)

### Fixed
- Fixed an issue with self-signed certificates and the preview of adaptation projects

## [1.12.4] - 2024-02-08
### Fixed
- Fixed an issue with CSRF token validation when previewing

## [1.12.3] - 2024-01-25
### Changed
- Switched to using Bearer Token for connecting to ABAP Cloud systems.

### Fixed
- Fixed an issue with the fallback version of SAPUI5 when a custom source path is specified: the check will now only be performed if the SAPUI5 source is CDN

## [1.12.2] - 2024-01-10
### Added
- Added support for previewing adaptation projects

## [1.12.1] - 2023-12-18
### Fixed
- Fixed an issue preventing reuse libraries from being loaded when previewing with the `start-variants-management` script for creating developer variants

## [1.12.0] - 2023-11-29
### Fixed
- Removed usage of the deprecated `@ui5/fs` version 2 package
- Fixed an issue with the check of a newer version preventing the server from starting if the customer is behind a corporate proxy

## [1.11.4] - 2023-11-01
### Fixed
- Fixed an issue with using `fiori-tools-servestatic` middleware in an npm monorepository

## [1.11.3] - 2023-10-18
### Changed
- Changed the minimum required [NodeJS](https://nodejs.org/en/download) version to 18.14.2 or higher

### Fixed
- Fixed an issue with starting developer variant creation with an older UI5 version
## [1.11.2] - 2023-10-04
### Fixed
- Removed usage of the deprecated `@ui5/logger` version 2 package 

## [1.11.0] - 2023-09-06
### Fixed
- Fixed an issue with newly created variants not being shown during the preview

## [1.10.6] - 2023-08-23
### Added
- Check the `@ui5/cli` version of the project and advise the user on how to upgrade, if version < 3

## [1.10.5] - 2023-08-09
### Changed
- The `fiori-tools-preview` is now using the [@sap-ux/preview-middleware](https://www.npmjs.com/package/@sap-ux/preview-middleware) for the support of developer variant creation
- The `@sap/ux-ui5-tooling` middlewares now require the `@ui5/cli` version >= 3 to be installed in the project

## [1.9.5] - 2023-04-19
### Fixed
- Fixed an issue with not finding the preview helper library `locate-reuse-libs.js` in older apps after its default location was changed

## [1.9.2] - 2023-03-09
### Fixed
- Fixed an issue which prevented starting the fiori-tools-appreload middleware with default setting
- Fixed an issue with FLP embedded preview failing to load when encountering unknown encodings

## [1.9.1] - 2023-02-23
### Fixed
- Fixed an issue where checking the UI5 version fails when the user is behind a corporate proxy

## [1.8.5] - 2023-01-12
### Added
- The `fiori-tools-proxy` now supports more configuration properties. Please see README for more details

## [1.8.4] - 2022-12-16
### Fixed
- Fixed an issue where project path was incorrectly added to telemetry data

## [1.8.2] - 2022-11-17
### Changed
- Minor improvements in `WorkspaceConnector.js` when using developer variant creation

## [1.8.1] - 2022-11-03
### Fixed
- Improved Regex for determining if host is a trusted host, when using developer variant creation
- Fixed an issue where the SAPUI5 version check breaks the starting of the preview

## [1.8.0] - 2022-10-20
### Fixed
- Fixed an issue with previewing applications when the user is behind a corporate proxy

### Added
- The `fiori-tools-appreload` middleware now watches also for changes in typescript files

## [1.7.4] - 2022-09-08
### Fixed
- Fixed an issue where the use of the `pathPrefix` property was not working
  
## [1.7.1] - 2022-08-11
### Added
- Added a check if the SAPUI5 version is available on the SAPUI5 SDK when starting the application. If not, the nearest highest patch version is used instead

## [1.7.0] - 2022-07-28
### Changed
- Improved error handling of the `fiori-tools-proxy`

### Fixed
- Fixed an issue where previewing an application using a full url destination was not working

## [1.6.7] - 2022-07-14
### Changed
- The `fiori-tools-proxy` is now using the [@sap-ux/backend-proxy-middleware](https://www.npmjs.com/package/@sap-ux/backend-proxy-middleware) for proxying requests to the backend

## [1.6.0] - 2022-05-05
### Changed
- The `fiori-tools-proxy` is now using the [@sap-ux/ui5-proxy-middleware](https://www.npmjs.com/package/@sap-ux/ui5-proxy-middleware) for proxying the UI5 sources

## [1.5.5] - 2022-04-21
### Fixed
- Fixed an issue with the `fiori-tools-servestatic` middleware not serving files starting with a dot

## [1.5.4] - 2022-04-07
### Fixed
- Fixed an issue with escaping runtime arguments on Windows with Node.js version 16

## [1.5.3] - 2022-03-24
### Added
- Added support of new run configuration UI options

### Fixed
- Fixed an issue where developer variant creation is not starting with SAPUI5 version 1.100.0 and higher
- Fixed an issue where an exception was thrown for SAPUI5 versions <= 1.65 when starting the application preview

## [1.5.2] - 2022-03-10
### Fixed
- Fixed an issue with the validation of SAPUI5 snapshot versions when starting developer variant creation

### Changed
- If a port is explictly defined when previewing the application, then this port is not automatically changed, if it is occupied

## [1.5.1] - 2022-02-24
### Fixed
- Fixed an issue with reading and comparing UI5 versions
- Fixed an issue with previewing applications using services behind a corporate proxy

### Changed
- Build is no longer executed automatically before starting the application in an external Fiori Launchpad to accomodate custom build procedures

## [1.5.0] - 2022-02-10
### Fixed
- Fixed an issue with reading and comparing UI5 versions
- Fixed an issue with previewing applications using project based destination

### Changed
- Requests are not forwarded anymore to next available middleware if UI5 proxy returns 404

## [1.4.7] - 2022-01-27
### Changed
- Forward request to next available middleware if UI5 proxy response returns 404
- Consolidate UI5 version handling

## [1.4.6] - 2022-01-13
### Fixed
- Improved variant management validation logic

## [1.4.3] - 2021-11-18
### Changed
- Updated help texts

### Fixed
- Fixed an issue with resetting the IAppState on the Object Page

## [1.4.1] - 2021-11-04
### Fixed
- Fixed minor issues

## [1.4.0] - 2021-10-21
### Added
- Added a new option to create delivery variants/views

### Fixed
- Removed wrong WARN messages in the terminal when executing `npx fiori run`

## [1.3.7] - 2021-10-07
### Changed
- Fixed minor issues and refactoring

## [1.3.5] - 2021-09-23
### Added
- Added help options for SAP Fiori tools CLI. Typing `npx fiori help` will give the list of commands that the command line tools support. Help text for individual `fiori` commands can also be displayed, e.g. `npx fiori add help`.

### Fixed
- Stability fixes

## [1.3.3] - 2021-09-09
### Added
- Added instructions for users on how to retrieve the URL of a deployed application on Cloud foundry

### Fixed
- Fixed Regex for injecting the UI5 URL into the application's HTML file

## [1.3.1] - 2021-08-12
### Fixed
- Fixed minor issues

## [1.3.0] - 2021-07-29
### Added
- Provided the possibility to load UI5 libs directly from CDN, instead of loading via the fiori-tools-proxy
- Introduced iAppState handling. The iAppState is now being deleted when an application is reloaded

## [1.2.5] - 2021-07-15
### Changed
- Internal improvements and refactoring

## [1.2.4] - 2021-07-01
### Changed
- Minor fixes and refactoring

## [1.2.3] - 2021-06-17
### Added
- Added new configuration parameter `fallthrough` for the fiori-tools-servestatic middleware

## [1.2.1] - 2021-06-03
### Fixed
- Updated dependencies versions because of security fixes

### Added
- Support for previewing application with destinations that have as URL the full path to the OData service

## [1.2.0] - 2021-05-20
### Fixed
- Fixed previewing an application with MTA configuration

## [1.1.11] - 2021-05-06
### Added
- Added new command `npx fiori undeploy` to undeploy an application from ABAP system

### Fixed
- Fixed an issue causing the application preview to fail if a custom port greater than 9010 is specified

## [1.1.9] - 2021-04-08
### Added
* Added support in proxy for backend system credentials stored in secure store or in .env file
* Added new proxy configuration property: xfwd
* Added a client property to the YAML file to be used for proxy destination handling

## [1.1.5] - 2021-03-11
### Fixed
* Improved handling of runtime arguments

### Added
* Added support for proxying WebSockets

## [1.1.4] - 2021-02-25
### Fixed
* Fixed handling of the ui5 version parameter in the Fiori CLI
* Hide credentials from proxy url

### Added
* Notify user when new version is available to install

## [1.1.2] - 2021-02-11
### Fixed
* Fixed fetching of user information when creating a system

## [1.1.0] - 2021-01-27
### Fixed
* Fixed HTTPS support for the Livereload of the application
* Fixed automatic SSL certificate creation
* Fixed handling of boolean parameters in the Fiori cli
* Fixed caching issues

## [1.0.28] - 2021-01-14
### Added
* Support preview of applications based on datasource url of a destination configuration inside a destination instance

### Fixed
* Fixed several issues in conjunction with preview start in SAP Business Application Studio
* Improved UI of the web page for providing the service key to a service

## [1.0.26] - 2020-12-03
### Added
* Preview support of applications based on SAP API Business Hub services
* Additional instructions provided to the user when generating `flp-config` to allow integration with the Launchpad module using SAP Business Application Studio

### Fixed
* Fixed issue when reading the NO_PROXY configuration

## [1.0.25] - 2020-11-18
### Fixed
* Use ATO Catalog to fetch ATO settings
* Other minor fixes

### Added
* Proxy support for SAP API Business Hub in SAP Business Application Studio

## [1.0.24] - 2020-11-05
### Fixed
* Fixed dependency installation in the application folder
* Unable to change folder for a project while generating the deployment configuration on windows
* Fixed the generated xs-app.json for non-SAP systems

### Added
* Added support for multiple paths configuration for the fiori-tools-servestatic middleware


## [1.0.22] - 2020-10-21
### Fixed
* Reduced bundle size

## [1.0.21] - 2020-10-07
### Fixed
* Build sources are no longer minified to improve debugging.
* Error logging improved
* Fixed issues with unit tests

### Added
* Provided API to read and remove flex changes from the user's workspace


## [1.0.19] - 2020-09-23
### Fixed
* Connectivity service information was missing from the generated mta.yaml for destinations that require it for deployment 

### Added
* Support for specifying username/password provided in an environment variable and passing these as CLI arguments, instead of entering these in ui5.yaml file for deployment
* Provide API to write flex changes into the user's workspace

## [1.0.18] - 2020-09-09

### Fixed
* Fixed issue with re-deployment to ABAP
* Updated version of the livereload package
* Fixed configuration for Fiori Launchpad when deploying to Cloud Foundry

### Added
* Support deployment to S/4HANA Cloud

## [1.0.16] - 2020-09-02

### Fixed
* Fix for UI5 parameters provided as string instead of array
* Fix for caching of ui5 sources
* Correct documentation for command to add deployment config
* Improvement for command prompt when creating deployment config for mta project

### Added
* Updated documentation with info relevant to Cloud Foundry

## [1.0.15] - 2020-08-12

### Fixed
* Intent ID is not overwritten when creating the SAP Fiori Launchpad deploy configuration

## [1.0.11] - 2020-07-29

### Fixed
* Fixed path re-write issue in App Studio
* Fixed Windows bundling issue
* Fixed issue with fiori run command on Windows
* Other minor fixes

### Added
* Deploy to Cloud Foundry
* Confirmation added when starting the deployment process
* Confirmation added for app name during deploy config generation
* Confirmation added for target name during deploy config generation
* Confirmation added for sap client during deploy config generation

## [1.0.9] - 2020-07-16

### Fixed

* Fix loading of custom libs

### Added

* Add run command to Fiori CLI
* Read fiori run cli params in the proxy middleware
* Readme file updated

## [1.0.8] - 2020-07-01
### Fixed
- Readme file updated

## [1.0.7] - 2020-06-17
### Fixed
- Minor stability fixes

## [1.0.0] - 2020-06-16
Release status: GA

We are pleased to announce the official GA of the ux-ui5-tooling.

## [0.0.89] - 2020-06-03
### Added
- Multiple back-ends support
- Support for custom UI5 modules

## [0.0.86] - 2020-05-20
### Added
 - Additional deploy functionality (see `npx fiori help`)
 - New command `fiori add flp-config` to add Fiori launchpad configuration
 - System keys can be uploaded to users secure store
 
### Fixed
 - Logged URL after deploy is now correct and can be opened
 - Namespace check for `z` space during deploy configuration is not case sensitive anymore
 - Package name is now all capitals when sending to backend during deployment
 - Warning before overwriting existing deploy configuration

## [0.0.85] - 2020-05-08
### Added
 - Downloading of UI5 sources from NPM

### Fixed
- Reading proxy configuration from VSCode
- Loading UI5 sources in SAP Business Application Studio
- Live reload configuration

## [0.0.84] - 2020-04-22
### Added
- Destinations support for SAP Business Application Studio

### Fixed
- Cookies and CSRF token issues fixed

## [0.0.81] - 2020-04-09
### Added
- Deploy to ABAP functionality with OAuth support
- New middleware for serving local ui5 sources
- Support of snapshot UI5 versions for internal users

### Fixed
- Fix preview with local UI5 resources
- Add proper handling for ui5Uri arg
- Add proper handling of space separated & quoted runtime args

## [0.0.79] - 2020-03-24
### Fixed
- Resolved issue when requests are tunneled via proxy

## [0.0.68] - 2020-02-07
### Added
- CHANGELOG.md documenting the changes
- Internal: enhanced test coverage

## [0.0.65] - 2020-01-31
### Fixed
- Resolved issues when proxying OData requests to SAP systems with CSRF protection enabled

## [0.0.62] - 2020-01-17
### Added
- Initial version
- Included proxy and live load middlewares
