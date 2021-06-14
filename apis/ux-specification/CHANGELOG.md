# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.90.1] - 2021-06-03

### Added

### Changed

- The access to reflect metadata is now centralized in factory classes and thus runs in a generic way in most situations.

### Deprecated

### Fixed

- Path references of labels had not been resolved correctly. Common.label annotations of the target reference are now considered correctly.
- The regex pattern for binding changes was incomplete, resulting in validation errrors.
- OData V4: Enhance sync logic to ensure only properties that are supported by specification module are modified in the manifest.json

### Quality

Upgrades of dependencies to:

- "ts-loader": 9.1.2
- node version 12
- "webpack": 5.37.1
- "chalk": "4.1.1"
- "ejs": "3.1.6"
- "i18next": "20.3.1"
- "ts-json-schema-generator": "0.93.0"

Added resolutions for

- "glob-parent": "^5.1.2"
- "normalize-url": "^6.0.1"
- "ws": "^7.4.6"
- "trim-newlines": "^3.0.1"

## [1.90.0] - 2021-05-20

### Added

First specification version for SAPUI5 release 1.90 and later.

### Changed

- The initialLoad setting of V4 tables is now an enum with three different options, in accordance with sap.fe.
