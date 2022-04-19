# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.100.0] - 2022-04-07

### Added

- OData V2:
  - LR: Added support for `multiEdit` property to enable mass edit feature
- OData V4:
  - LR: Added support for property `hideFilterBar`
  - Support of defaultTemplateAnnotationPath as property; consider defaultTemplateAnnotationPath when retrieving the relevant table settings and while switching to ALP flavour.

### Changed

### Removed

### Deprecated

### Fixed

- OData V2:
  - Extensions - empty "extensions" object was created in "sap.ui5/"extends"/"extensions"/"sap.ui.viewExtensions"/"sap.suite.ui.generic.template.ListReport.view.ListReport"

### Quality

- Replace type object for schemas by Definition from 'typescript-json-schema'
- upgrade of async
