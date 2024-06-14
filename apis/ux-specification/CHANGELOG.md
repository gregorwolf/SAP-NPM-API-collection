# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[NodeJS](https://nodejs.org/en/download/) Version `18.18.0` or higher

## [1.120.12] - 2024-05-31

### Added

- OData V4: Related Apps button and its manifest settings
- General: support array-like definition of minUI5Version in manifest

### Changed

OData V4:

- Updated custom sections storage from array to object in schema
- The showRelatedApps property is moved from the Object Page Header to the new Related Apps button.

### Removed

### Deprecated

### Fixed

- List Report V2: LineItem should be taken from PV without qualifier when annotationPath points to a SV

### Quality

Upgrades:

- @sap-ux/annotation-converter to 0.8.13
- @sap-ux/vocabularies-types to 0.10.12
- semver to 7.6.2
- i18next to 23.11.5
- ini to 4.1.3
- @ui5/manifest to 1.65.1
- new resolution: micromatch ^4.0.6
- new resolution: braces ^3.0.3

## [1.120.11] - 2024-05-16

### Added

- The new API functions exportConfigEntityByPath and deleteConfigEntityByPath from 1.120.6 are now published in the external interface.

### Changed

- The logic for defining the keys of V2 sections in the app schema has been adapted, so that the facet ID is now representing the facet in the key, if defined, instead of the target annotation path.

### Removed

- Properties disableInlineCreateSort and selectionLimit were removed from the global table settings of OData V2, as they are not supported yet by the run-time.

### Fixed

- V4. Schema generation for object page. Section label is not resolved within target definition and id was presented in "description"
- V4. Schema generation for building block macros. AnnotationPath was not resolved for macros when absolute path was used in "metaPath" attribute 

### Quality

Upgrades:

- @ui5/manifest to 1.65.0
- @sap-ux/annotation-converter to 0.8.12
- @sap-ux/vocabularies-types to 0.10.11
- @sap-ux/fe-fpm-writer to 0.24.11
- @types/jquery to 3.5.30
- i18next to 23.11.4

## [1.120.10] - 2024-05-02

### Added

- OData V4:
  - property widthIncludingColumnHeader on table and column level

### Changed

- In a previous version, the tag `descriptionSrcUrl` (link to the UI5 documentation) was added in form of a JSDoc annotation. It became evident that this annotation was not transferred correctly in all cases to the JSON schema by the to-json-schema generator.
To overcome this problem, `descriptionSrcUrl` is now placed in form of reflect metadata at all sync classes, and added to the schema by an own post-processing routine `processMetadata` that evaluates the reflect metadata.

### Removed

- Property createMode was removed from the global table settings of OData V2, as it is not supported yet by the run-time.

### Deprecated

### Fixed

OData V4:

- view properties like custom columns or table settings had not been exported, as the anyOf definition of additionalProperties had not been considered during the export.
- sync rule was missing for ViewToolBarAction.afterExecution
- partially an invalid annotationPath was added for views, comprising '@@'
- toolbar actions had partially not been considered during the import
- the export of table properties had overwritten the export from views
- the export now supports two different constellations for anyOf definitions in schema:
  - anyOf directly defined as additionalProperties (of MultiTableMode)
  - anyOf reachable via $ref, properties defined there.
- Custom section fragments with event handler. `core:require` attribute is moved from `Button` to wrapper `VBox`
- Default 'empty' `manifest.json` is returned after export of FPM Custom Page
- The generation of config files failed with exception if a custom header action was defined with an invalid type, like string.
- empty `sap.ui5/routing/config` object removed from `manifest.json` during export

OData V2:

- The logic that determines the LineItem and the Chart annotation to be used by ALP was not in sync with the logic implemented in Fiori Elements v2. The logic has been adapted accordingly.

### Quality

- Code comments added in types package that explain the interfaces and refer to their implementation classes

Upgrades:

- @ui5/manifest to 1.64.0

## [1.120.9] - 2024-04-17

### Added

- Odata V4: Support of SelectionPresentationVariants at Object Page tables

### Changed

- OData V2:
  - Documentation for property createMode of OP table adapted
  - Fragment templates for custom column extensions for AnalyticalTable, GridTable, TreeTable, ResponsiveTable

### Removed

### Deprecated

### Fixed

- V4 Macros. Property 'personalization' exported as XML element instead of attribute into xml file 

### Quality

- Update transitive dependencies
- cpy-cli replaced by copyfiles

Upgrades

- @sap-ux/annotation-converter to 0.8.10
- @sap-ux/vocabularies-types to 0.10.9
- ejs to 3.1.10
- i18next to 23.11.2
- new resolution for tar 6.2.1

## [1.120.8] - 2024-04-04

### Quality

- Update transitive dependencies

Upgrades

- axios to 1.6.8
- esbuild to 0.20.2
- semver to 7.6.0
- yarn to 1.22.22
- d3 to 7.9.0
- reflect-metadata to 0.2.2
- jest to 29.7.0
- ts-jest to 29.1.2

## [1.120.7] - 2024-03-20

### Added

- OData V4:
  - String type to bindable number type properties in macros schema
- Overview Pages: support three different ways of defining the colors of cards

### Quality

- Update transitive dependencies

Upgrades

- @sap-ux/vocabularies-types to 0.10.8
- @sap-ux/annotation-converter to 0.8.9
- @sap-ux/edmx-parser to 0.7.1
- @typescript-eslint/eslint-plugin to 7.1.1
- @typescript-eslint/parser to 7.1.1
- @types/jest to 29.5.12
- @ui5/manifest to v1.63.0
- cpy-cli to 5.0.0
- eslint-config-prettier to 9.1.0
- eslint-plugin-prettier to 5.1.3
- i18next to 23.10.1
- jest to 29.5.0,
- jsdom to 24.0.0
- patch-package to 8.0.0
- npm-run-all2 to 6.1.2
- prettier to 3.2.5
- ts-jest to 29.1.1
- ts-node to 10.9.2
- typescript to 5.3.2
- uuid to 9.0.1
- switch from sapui5/ts-types-esm to sapui5/types 1.120.9
- resolution of ini to 4.0.0
- resolution of parse-url to 9.0.0
- cleanup of other resolutions

## [1.120.6] - 2024-03-07

### Added

- New API functions exportConfigEntityByPath and deleteConfigEntityByPath have been added that allow a selective export or deletion of a single property or section from a config.json. The additional parameter entityPath must be applied. The new functions are released for List Report, Object Page and Analytical List Page of OData V2 and V4.
- In the API result a change indicator is added that shows if the manifest was changed. In case of the new functions exportConfigEntityByPath and deleteConfigEntityByPath, only updated fragment files are returned (V2 flexibility changes are still returned completely due to compatibility, deletion is indicated by newValue = null).

### Changed

- Increased `fe-fpm-writer` api version to include fix for controller extension namespace
- Actualization of the README file.

### Fixed

- An invalid app schema had been generated before, in case of table custom columns

### Quality

- Update transitive dependencies

Upgrades

- eslint to v8.57.0
- @types/semver: obsolete dependency deleted
- esbuild to v0.20.1
  
## [1.120.5] - 2024-02-21

### Added

- OData V2:
  - Support of Header facets on Object Page
- UX adjustments of inplace documentation:
  - Support for Screen Readers and Arrow Navigation

### Changed

- Increased `fe-fpm-writer` api version

### Quality

- Update transitive dependencies

Upgrades

- @sapui5/ts-types-esm to v1.120.6
- @sap-ux/fe-fpm-writer to v0.24.7
- @sap-ux/vocabularies-types to 0.10.5
- @sap-ux/annotation-converter to 0.8.6
- @types/semver to v7.5.7
- @ui5/manifest to v1.62.1

## [1.120.4] - 2024-02-08

### Added

OData V2:

- Support of "copy" setting for tables in List Report, Analytical List Page and Object Page

### Fixed

- Invalid object-like descriptions and keys had been generated into the app-specific schemas if DataFieldForIntentBasedNavigation was defined with a path reference
- An exception happened during app schema generation if a NavigationProperty pointed to an invalid target annotation
- OData V4:
  - Enum for macros table `variantManagement` property
  - Wrong resolution of contextPath in case of containment as target for a page, leading to an exception during the schema generation
  - Invalid '/' in app schema definition names replaced by '::'

### Quality

- Update transitive dependencies

Upgrades

- esbuild to 0.20.0
- axios to 1.6.7
- switch from npm-run-all 4.1.5 to npm-run-all2 5.0.2
- @sap-ux/fe-fpm-writer to 0.24.4
- @sap-ux/vocabularies-types to 0.10.4

## [1.120.3] - 2024-01-25

### Added

- OData V4:
  - View columns set as view nodes

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
