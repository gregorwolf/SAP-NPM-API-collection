# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

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
