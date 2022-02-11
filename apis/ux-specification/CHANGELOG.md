# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.96.3] - 2022-01-26

### Added

- OData V2:
  - `exportType` property can now be configured to specify the type of export to be used in the SmartTable control
  - OP: `statePreservationMode` property can now be configured to allowing applications to configure persistence mode in an object page
  - OP: `draftDiscardConfirmationSettings` property can now be configured allowing applications to turn off the discard draft confirmation popup in various scenarios

### Changed

### Removed

### Deprecated

### Fixed

### Quality

- Upgrade of node-fetch

## [1.96.2] - 2022-01-12

### Added

- OData V2:
  - OP: properties of footer actions are displayed and supported in side panel
  - properties of toolbar actions are displayed and supported in side panel
  - OVP: The property `showLineItemDetail` is now supported for List and Table cards
  - OP: Schema now supports column extensions for TreeTable

### Changed

- OData V2:
  - property `filterDefaultsFromSelectionVariant` is now only supported for AnalyticalListPage floorplan
  - OVP: The property `tabs` and `addOdataSelect` can now be confirued for all cards
- OData V4:
  - property `afterExecution` of table columns now is only visible for actions but not for other record types
  - deprecated `name` property and support new `template` property for custom sections in manifest
  
### Removed

- OData V2:
  - OVP: removed `tabs` property from card level

### Fixed

- OData V2:
  - correct schema generation in case multiple facets are referring to lineitem annotation of same entity
  - Facet Id is considered for import and export of manifest settings
  - Fixed sync issues in case no text is provided for custom columns
- OData V4:
  - Avoid exporting empty arrays to manifest.json

### Quality

- Upgrade of trim-off-newlines
- Upgrade of yarn classic
- New whitesource endpoint
- Upgrade of follow-redirects

## [1.96.1] - 2021-12-06

### Quality

- Update of pipeline configuration

## [1.96.0] - 2021-12-02

### Added

In comparison to release 1.90, this release also comprises an API generateCustomExtension, refer to the README.

### Changed

The api version (getApiVersion) is increased to 2 to reflect the presence of the new generateCustomExtension API.
