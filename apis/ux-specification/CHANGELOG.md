# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[NodeJS](https://nodejs.org/en/download/) Version `18.18.0` or higher

## [1.120.3] - 2024-01-xx

### Added

- OData V4:
  - View columns set as view nodes

### Changed

### Removed

### Deprecated

### Fixed

- OData V4:
  - Schema is not generated for custom page when namespaces are not defined in view file

### Quality

- Update transitive dependencies

Upgrades

- @sap-ux/annotation-converter to 0.8.2
- @sap-ux/vocabularies-types to 0.10.2
- @sap-ux/vocabularies-types to 0.10.2

## [1.120.2] - 2024-01-11

### Added

- UX adjustments of inplace documentation:
  - Support of Keyboard Navigation
- OData V2: Support of global table settings for object pages
- OData V4:
  - OP: Added support for `Edit` and `Delete` standard actions considering draft support and capabilities annotation
  - OP: Sequence of actions is now based on criticality annotation
  - TBD
  
### Changed

- Alignment of settings for sap.ovp:  
The global settings and card specific settings have been compared with the actual status of the documentation and the subschema as available at <https://www.npmjs.com/package/@ui5/manifest>. Missing settings have been added, obsolete settings have been eliminated.
The assignment of settings to the specific card types has been revised and adjusted.
- Increased `fe-fpm-writer` api version
- Increased api version
- OData V2:  ALP root properties order

### Removed

### Deprecated

### Fixed

- OData V4:  Empty visualization throws unhandled error during sync
- Prevent exception in case of illegal annotationPath references of fields or columns
- OData V2:  ALP not displaying chart and properties
- OVP:
  - In case of unknown properties, other card settings like listFlavor or listFlavor could get deleted.
  - Property "Category" was shown with an initial value as object, although being of type string.
  - Properties enableAddToInsights, imageSupported, showLineItemDetail, valueSelectionInfo might not have been exported correctly to the manifest.

### Quality

- Update transitive dependencies

Upgrades

- eslint to 8.56.0
- esbuild to 0.19.11
- reflect-metadata to 0.2.1
- axios to 1.6.5
- @sapui5/ts-types-esm to 1.120.4

## [1.120.1] - 2023-11-30

### Added

- OData V2: Added missing `annotationPath` property for table definitions in schema

### Changed

- OVP card settings:
  - Added missing properties
  - Removed irrelevant settings from custom card settings
  - Assignment of settings to card types has been generally aligned with the given capabilities of SAP Fiori elements

- If problems had been posted to the log with regards to annotations, they normally ended with the information `location: webapp/localService/metadata.xml`. This location information might be misleading for edmx projects, as annotation may reside in a different file. It was always wrong for CAP projects.
Thus the location information is removed for annotation problems

- If no line item annotation is present, no `annotationPath` property gets added to the schemas of OData V2 and V4
  
### Removed

### Deprecated

### Fixed

- The check of minUI5Version against the dist tags raised wrong warnings in case of minUI5Version using the pattern 'UI5-xxx'
- OData V4: Inconsistencies in the JSON schema for macros led to exceptions when generating the overall page schemas. Such exceptions are now caught and indicated in the error log

### Quality

- Update transitive dependencies

Upgrades

- axios to 1.6.2
- yarn to 1.22.21
- esbuild to 0.19.7
- eslint to 8.54.0
- @sap-ux/fe-fpm-writer to 0.24.2
- @sap-ux/annotation-converter to 0.8.1
- @sap-ux/vocabularies-types to 0.10.1
- @types/mem-fs-editor to 7.0.7
- @types/semver to 7.5.6
- @types/jquery to 3.5.29

## [1.120.0] - 2023-11-16

### Added

- OData V4: 
  - Added support for TreeTable

### Changed
  
### Removed

### Deprecated

### Fixed

- Fixed an exception "Cannot read properties of undefined (reading 'includes')" when generating the app schemas

- OData V4:
  - If multiple facets refer to target annotations without an ID but with identical labels, only one of the facets was shown in the page editor
  - An error message was added to the logger if the ID was missing for a reference facet. This was wrong, the ID is optional for reference facets. Instead, the error message is now added for missing IDs of collection facets
  - Building blocks:
    - The number of new lines that get created from the description of building block properties was decreased
    - Missing 'enum' for multiple building block properties

### Quality

- Update transitive dependencies

Upgrades

- eslint to 8.53.0
- axios to 1.6.0
- @sap-ux/fe-fpm-writer to v0.24.1
- @types/jquery to v3.5.27
- @types/semver to v7.5.5
- @types/d3 to v7.4.3
- @types/mem-fs-editor to v7.0.6
- @sapui5/ts-types-esm to 1.120.1
