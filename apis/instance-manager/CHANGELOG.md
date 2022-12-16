# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).


## 3.5.2 - 2022-12-08

### Changed
- SM and IM Errors optimization

## 3.5.1 - 2022-12-02

### Changed
- Fixing Errors responses from Instance Manager

## 3.5.0 - 2022-12-01

### Changed
- Fixing Errors responses from Service Manager

## 3.4.0 - 2022-10-27

### Added
- Added caching for Service offering and Service plan
- Support for Node.js v18.x

## 3.3.6 - 2022-10-21

### Changed
- Polling_interval_millis is now increased by 500 milliseconds for every next request 


## 3.3.5 - 2022-10-10

### Added
- Added allowBinding options to Service Manager parameters

## 3.3.4 - 2022-06-10

### Updated
- Updated devDep async to 3.2.4

## 3.3.3 - 2022-05-17

### Fixed
- **Migration Manager.** Fixed typo in cache_item_expire_seconds.

### Changed
- Changed istanbul test framework with c8.

## 3.3.2 - 2022-03-14

### Fixed
- **Service Manager.** Bindings will no longer attempt to be created for non-ready instances.

## 3.3.1 - 2022-02-16

### Updated
- Updated xssec to v3.2.13

## 3.3.0 - 2022-02-04

### Added
- Support for Node.js v16.x

### Fixed
- Updated debug package to v4.3.3

## 3.2.1 - 2022-01-20

### Added
- **Service Manager.** Added token caching.

### Updated
- `node-fetch` version updated to v2.6.7.

## 3.2.0 - 2022-01-12

### Added
- **Migration Manager.** Implement Migration Manager to help with transition from Instance to Service Manager on Cloud Foundry.

### Fixed
- **Service Manager.** Fixed Token retrieval max timeout.

## 3.1.1 - 2022-01-04

### Fixed
- **Service Manager.** Fixed a bug where if binding creation (fallback) failed it will call callback twice.

## 3.1.0 - 2021-12-13

### Added
- **Service Manager.** Support for mTLS authentication
- **Service Manager.** Retrieving an instance will create a binding if no binding exists for that instance.
- **Service Manager.** Creating a new instance will now also put the *tenant_id* as label.
- **Service Manager.** Optional parameters supported for get and getAll to support fallback for mTLS.

## 3.0.0 - 2021-05-05

### Fixed
- Replaced dependency request with node-fetch
- Updated debug package to v4.2.0

### Removed
- Support for Node.js 6

### Added
- Support for Node.js 14

## 2.2.0 - 2020-07-24

### Added
- Integration with Service Manager

### Fixed
- Update dependencies
- Update license

## 2.1.0 - 2019-12-10

### Added
- Support for Node.js v12.x

## 2.0.0 - 2019-04-24

### Removed
- Support for Node.js v0.12
- Support for Node.js v4

## 1.4.0 - 2018-12-18

### Added
- Node.js version 10 support

## 1.3.4 - 2018-08-14

### Fixed
- Update dependencies

## 1.3.3 - 2018-07-17

### Fixed
- Update request package to v2.87.0

## 1.3.2 - 2018-05-28

### Fixed
- Update request package to v2.86.0

## 1.3.1 - 2018-04-05

### Fixed
- Update npm-shrinkwrap.json

## 1.3.0 - 2018-01-19

### Added
- npm-shrinkwrap.json

## 1.2.0 - 2017-10-13

### Added
- Support for Node.js 8
- Optional argument to `instanceManager.create` - an object with parameters for provisioning or binding

### Changed
- Dependencies' versions

## 1.1.0 - 2017-06-01

### Added
- `instanceManager.getAll` function

## 1.0.1 - 2017-02-10

### Fixed
- Update dependencies

## 1.0.0 - 2017-02-02

### Added
- Initial implementation
