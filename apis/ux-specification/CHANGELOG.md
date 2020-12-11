# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## What's new with version 1.84

*Official support of OData V4*

## [1.84.0] - 2020-12-03

### Added

- OData V4: new properties added to the specification for table settings of list report and object page
- OVP custom card - `template` property uses pattern to avoid non-custom card template overlap
- OVP cards - `model` property uses enum entries populated from `manifest.json`

### Changed

- OData V2: Use enum instead of string for property `createWithFilters -> strategy`

### Deprecated

### Removed

### Fixed

- OData V2: Improved sync logic to avoid deletion of entries from page config
- OData V4: Not all properties had been imported into config files

### Quality
