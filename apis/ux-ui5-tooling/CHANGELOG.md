# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

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
