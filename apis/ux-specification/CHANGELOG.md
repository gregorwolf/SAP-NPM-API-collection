# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.100.1] - 2022-04-21

### Added

- OData V2:
  - LR: Old settings for table type (tableType) had been ignored in newer specification releases. As a consequence, you may have found the table type twice in manifest, once with the old syntax and an additional entry with the new syntax, after switching to a newer UI5 version.
  Now an implicit conversion to the new tableSettings takes place, and the old setting gets automatically replaced during the export. 
- OData V4:
  - OP: Added support for presentationVariants with chart or lineItem visualization

- Documentation actualized with regards to the new release version 1.100.

### Changed

### Removed

### Deprecated

### Fixed
- OData V4: 
  - Exception in case of multi-tab views in manifest that referred to a SelectionVariant.
  - Export of table settings of list report was targeting the wrong manifest settings if a defaultTemplateAnnotationPath is defined, pointing to a SelectionPresentationVariant. 
  - List report with multiple views: insert and reordering was not supported correctly.
- OData V2:
  - After an entry of quickVariantSelectionX got deleted, the entry still was present in manifest.json.
  - Sections of subordinate object pages had not been added correctly to the app schema in all cases.

### Quality

- SonarQube: issued solved with regards to cognitive complexity
- upgrade ejs to 3.1.7

## [1.100.0] - 2022-04-07

### Added

- OData V2:
  - LR: Added support for `multiEdit` property to enable mass edit feature.
- OData V4:
  - LR: Added support for property `hideFilterBar`
  - Support of defaultTemplateAnnotationPath as property; consider defaultTemplateAnnotationPath when retrieving the relevant table settings and while switching to ALP flavour.

### Changed

### Removed

### Deprecated

### Fixed

- OData V2:
  - Extensions - empty "extensions" object was created in "sap.ui5/"extends"/"extensions"/"sap.ui.viewExtensions"/"sap.suite.ui.generic.template.ListReport.view.ListReport".

### Quality

- Replace type object for schemas by Definition from 'typescript-json-schema'.
- Upgrade of async.
