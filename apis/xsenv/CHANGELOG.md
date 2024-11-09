# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 5.4.0 - 2024-10-24

### Added
- Added node 22.x support

### Updated
- Updated `filter-node-package` dependency to 5.0.0
- Updated `mock-fs` dependency to 5.4.0
- Updated `@eslint/js` dependency to ^9.12.0
- Updated `@eslint/eslintrc` dependency to ^3.1.0
- Updated `@babel/eslint-parser` dependency to 7.25.8

## 5.3.0 - 2024-09-19

### Added
- Redacted sensitive information in debug console for k8s services

### Updated
- Updated `debug` dependency to 4.3.7
- Updated `node-cache` dependency to 5.1.2
- Updated `eslint` dependency to 8.57.1
- Updated `filter-node-package` dependency to 4.1.0
- Updated `mocha` dependency to 10.7.3
- Updated `node-build` dependency to 3.0.0

## 5.2.0 - 2024-07-22

### Added
- Redacted sensitive information in debug console for cf services

### Updated
- Updated `debug` dependency to 4.3.5
- Updated `eslint` dependency to 8.57.0
- Updated `c8` dependency to 10.1.2
- Updated `mocha` dependency to 10.7.0

## 5.1.0 - 2024-04-01

### Removed
- Removed shrinkwrap from preRelease

### Updated
- Updated `debug` dependency to 4.3.4
- Updated `verror` dependency to 1.10.1

## 5.0.0 - 2024-03-26

### Removed
- Removed node 12.x, 14.x, 16.x support and tests

## 4.2.0 - 2023-11-21

### Added
- Added an environment variable XSENV_PASE_ALL_JSON to control if all the values in k8s secrets should be parsed as JSON instead of only JSON objects  
- Added custom tags in service-bindings

## 4.1.0 - 2023-11-06

### Added
- Added node 20.x support and tests

## 4.0.0 - 2023-08-14

### Removed
- Removed node 10.x support and tests

## 3.4.0 - 2022-10-27

### Added
- Support Node.js 18.x


## 3.3.2 - 2022-06-17

### Fixed
- service bindings for Kubernetes: bindings were not read because of symlinks

## 3.3.1 - 2022-06-08

### Fixed
- change node plugin version for xmake to 10.15.0

## 3.3.0 - 2022-06-06

### Added
- Service bindings for Kubernetes

## 3.2.2 - 2022-04-11

### Removed
- Removed node 8.x support and tests

### Changed
- Changed istanbul test framework with c8

## 3.2.1 - 2022-02-28

### Added
- Reading K8s services now caches the results to decrease file system calls.
- Documentation on how to disable caching for K8s Services if needed.

## 3.2.0 - 2022-01-24

### Added
- Support Node.js 16.x

### Updated
- `debug` dependency to 4.3.3.

## 3.1.1 - 2021-07-01

### Fixed
- Reading services will now properly check for K8s services when VCAP_SERVICES is defined but contains no services.
- Getting a service will now properly check in K8s services if VCAP_SERVICES does not have the service.

### Updated
- `debug` dependency to 4.2.0.
- `lodash` dependency to 4.17.21.

## 3.1.0 - 2020-11-20

### Added
- Support Node.js 14.x

## 3.0.0 - 2020-06-05

### Removed
- Node.js 6 support

### Changed
- K8S case: nested objects in credentials are now automatically parsed (does not apply to arrays)

## 2.2.0 - 2019-11-28

### Added
- Support Node.js 12.x

## 2.1.0 - 2019-10-15

### Added
- Support for K8S secrets mounted as volumes.

## 2.0.0 - 2019-04-22

### Removed
- Node.js 4 support
- Remove deprecated loadCaCert function

## 1.3.0 - 2018-12-18

### Added
- Node.js 10 support

### Fixed
- Update `lodash` to 4.17.11

## 1.2.9 - 2018-01-18
### Added
- Release with npm-shrinkwrap.json


## 1.2.8 - 2017-10-09
### Security
- Updated debug package to fix a security issue https://snyk.io/vuln/npm:debug:20170905
