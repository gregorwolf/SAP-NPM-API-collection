# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.7.0 - 2020-04-23 (part of cds-runtime 1.1.0)

### Changed

- Use open source version of `@sap-cloud-sdk/core`

## Version 1.6.2 - 2020-03-19

### Changed

- In case there is no credentials.destination provided the `destinations` environment variable is not created anymore.
  The connection to the remote service is handled internally.

### Removed

- `npm-shrinkwrap.json`

## Version 1.5.0 - 2020-02-19

### Changed

- Updated version number for public release

## Version 1.4.0 - 2020-02-05

### Added

- Where x in (a,b,...) predicates are translated to series of (x eq a) or (x eq b) in OData `$filter` options

### Changed

- Version of `@sap/cloud-sdk-core` pinned to `1.15.1`
- Version of `@sap/cloud-sdk-util` pinned to `1.15.1`

## Version 1.3.0 - 2019-10-29

### Removed

- `npm-shrinkwrap.json`

## Version 1.2.0 - 2019-10-02

### Added

- If JWT token provided in context, it is forwarded to Cloud SDK

### Changed

- Version of `@sap/cloud-sdk-core` to `1.10.0`
- Version of `@sap/cloud-sdk-util` to `1.10.0`

## Version 1.1.3 - 2019-09-21

### Added

- Dependency to `@sap/cloud-sdk-util`

## Version 1.1.2 - 2019-09-19

### Fixed

- `npm-shrinkwrap.json` containing wrong versions

## Version 1.1.1 - 2019-09-18

### Added

- Support `where`, `columns` and `one` properties in SELECT

### Changed

- Enforce JSON format in OData
- Clean up OData V2 responses

## Version 1.1.0 - 2019-09-09

### Added

- Auto-generate `destinations` env variable if `NODE_ENV !== 'production`'

## Version 1.0.2 - 2019-08-27

### Fixed

- `npm-shrinkwrap.json` containing wrong versions

## Version 1.0.1 - 2019-08-26

 ### Changed

- Version of `@sap/cloud-sdk-core` pinned to `1.8.0`

## Version 1.0.0 - 2019-08-21

### Added

- Initial implementation