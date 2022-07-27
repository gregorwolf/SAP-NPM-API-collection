# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.102.2] - 2022-07-14

### Added

### Changed

- OData V4: In case of PresentationVariant definitions for charts or line items an intermediate node had originally been introduced in the Object Page schema that represents the PresentationVariant. This multi-level propagation of references caused issues in the consuming UI, thus the intermediate node got deleted again. The PresentationVariant must be determined by the consuming application if necessary.

### Removed

- OData V4:

### Deprecated

### Fixed

- OData V2:
  - OVP:

- OData V4:
  - Properties of custom columns on object page had not been exported correctly if the table is associated to another entity type via navigation path or is using a PresentationVariant.
  The value help of the anchor in LSP (config JSON) also did not show the right values.
  - Object Page: Fixed an issue with the schema that `annotationPath` for Object Page Table Sections did not contain `qualifier`;
  wrong `annotationPath` and `isViewNode` settings are adjusted.
  - Fixed an issue with export that multiple changes to view's `key` property created duplicated entries in manifest.json

### Quality

- Switch from nexus repository to artifactory

## [1.102.1] - 2022-06-29

### Added

- OData V4:
  - Extend pagemap support for freestyle apps using FPM library

### Fixed

- OData V2:
  - OVP: LSP for `model` property of a card now lists models from sap.ui5 section of manifest.json
  - Table type property is now set to blank in case not maintained in manifest.json
  - If two sections of object page referred to an element (e.g. action, table column) of the same name, they had been sync'd by the program logic: changes of one property had also been refelected in the other.
  - One UI adaptation or flexibility change may have been shown multiple times in the config, at different sections.
  - No sorting by time took place before for flexibility changes, as a result an older change of the same property may have shown up instead of the newer one.
  - If several flexibility changes existed for the same control property, secondary ones had not been imported correctly: you could find them under a wrong property name in the config JSON file.

## [1.102.0] - 2022-06-16

### Added

- Missing exposure of type definitions was added.

### Changed

OData V2:

- Custom column property "columnIndex". Schema enhancement by defining range using "minimum=0".

### Removed

OData V4:

- In case of List Report views, non-applicable table properties are removed.

### Fixed

OData V4:

- In case of List Report views, custom columns with navigation property are considered for the correct view.
- Avoid creation of empty personalization object
OData V2:
- Custom column issue with Grid/Tree/Analytical table types - empty second custom column is added in xml files
