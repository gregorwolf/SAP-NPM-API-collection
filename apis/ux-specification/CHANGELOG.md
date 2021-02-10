# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## What's new with version 1.84

*Official support of OData V4*

## [1.84.2] - 2021-01-28

### Added

### Changed

### Deprecated

### Removed

### Fixed

- The 'views' definition for OData V4 was not read nor written to the right position at manifest.
- Flex changes for ALP table columns had been written with the wrong selector id and thus had no effect in the run-time.

### Quality

- Dependencies to other npm modules have been actualized

## [1.84.1] - 2021-01-14

### Added

- The specification API now allows passing a logger, i.e. an instance of the new interface ExtensionLogger.
If supplied, all messages resulting from the API processing will be passed to the logger instance instead of console.log.
- Property showDataLabel on global OVP level
- OData V2: New `extensionType` property is added to Custom Column definition.
- OData V2: Support for Custom Columns in Object Page tables.

### Changed

- OData V4: List Report `variantManagement` property is now moved to page level
- The specification API now returns a _complete_ list of flex changes, not only the updated ones; if a flex property was not maintained or deleted, you can find it in the list with content.newValue = null. This allows the consuming application to distinguish flex changes that are supported by the JSON schema of the specification from other flex changes that may have been created by other means; only changes that are part of the result list of the API but have content.newValue = null should get deleted from the app.

### Fixed

- OData V2: Export fails to resolve page in `manifest.json` when page key does not contain entitySet.
- OData V4: Switching from FCL to Standard Layout - `manifest.json` -> `sap.ui5/routing/routes/[]/target` was not reseting back

## [1.84.0] - 2020-12-03

### Added

- OData V4: new properties added to the specification for table settings of list report and object page
- OVP custom card - `template` property uses pattern to avoid non-custom card template overlap
- OVP cards - `model` property uses enum entries populated from `manifest.json`

### Changed

- OData V2: Use enum instead of string for property `createWithFilters -> strategy`

### Fixed

- OData V2: Improved sync logic to avoid deletion of entries from page config
- OData V4: Not all properties had been imported into config files
