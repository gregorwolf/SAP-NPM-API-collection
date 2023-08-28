# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.108.12] - 2023-08-09

### Added

- During the API call, an additional check verifies the given specification version against the minUI5Version from the passed manifest; in case of a mismatch a warning is added to the logger
- OData V4: 
  - Support connected fields on the Object Page

### Changed

### Removed

### Deprecated

### Fixed

### Quality

- Update transitive dependencies

Upgrades:

- eslint to 8.46.0
- eslint-config-prettier to 8.9.0

## [1.108.11] - 2023-07-26

### Added

- OData V4:
  - Default aggregation support for macros table and action group
  - Multiple namespaces support for macros

### Changed

### Removed

### Deprecated

### Fixed

- Fixed an issue with the CHANGELOG.md file not being visible on npmjs
- Fixed an issue with schema generation where annotation columns were not resolved in cases when a macros table was referring to a line item with a qualifier defined in the metaPath

### Quality

- Update transitive dependencies

Upgrades:

- eslint to 8.45.0
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser to 5.62.0
- @sap-ux/vocabularies-types to 0.9.1

## [1.108.10] - 2023-07-12

### Quality

- Update transitive dependencies

Upgrades:

- @sap-ux/fe-fpm-writer to 0.22.3
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser to 5.61.0
- eslint to 8.44.0
- eslint-formatter-multiple to 2.0.0
- eslint-plugin-prettier to 4.2.1
- semver to 7.5.4
- @sapui5/ts-types-esm to 1.108.20

## [1.108.9] - 2023-06-30

### Fixed

- OData V2:
  - Fixed type of variant key for QuickVariantSelection (X) on tables to `string`.
- OData V4:
  - Exception on macro table with metaPath to PresentationVariant.

### Quality

- Update transitive dependencies

Upgrades:

- semver to 7.5.3
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser to 5.60.0
- @sap-ux/vocabularies-types to 0.9.0
- @sap-ux/edmx-parser to 0.6.0
- @sapui5/ts-types-esm to 1.108.19
- @sap-ux/fe-fpm-writer to 0.22.2

## [1.108.8] - 2023-06-14

### Added

- OData V4:
  - Support for Custom subsections.

### Changed

- OData V4:
  - Changed binding expression to use "isEditable" property instead of "editable". Thus we have binding expressions {ui>/isEditable} and {= !${ui>/isEditable}}.

### Fixed

- OData V4:
  - When adding new pages, the export calculates the route pattern for the new manifest entry.
  Indeed, the previous logic did not consider the naming at parent pages, but defined the key name in the pattern as `key`(+ index). This led to navigation errors at run-time. Now, the key names of existing parent pages are taken over to the child page's pattern.

### Quality

- Update transitive dependencies

Upgrades:

- d3 to 7.8.5
- @sapui5/ts-types-esm to 1.108.18
- i18next to 22.5.1
- @sap-ux/fe-fpm-writer to 0.22.1

## [1.108.7] - 2023-05-31

### Fixed

- Correct missing or inconsistent tags `keys`and `dataType` in the app schema generation, especially for intentbased navigation

### Quality

- Update transitive dependencies

Upgrades:

- @sapui5/ts-types-esm to 1.108.16
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser to 5.59.8
- i18next to 22.5.0
- ts-node to 8.10.2
- rimraf to 5.0.1
- @sap-ux/fe-fpm-writer to 0.20.2

## [1.108.6] - 2023-05-18

### Added

- General:
  - Enhancement of error handling, more explicit messages are passed to the logger.  
  Fix of error handling of exceptions from annotation parser.
  - Fix for List Report with multiple views and Object pages on second level in Page map

- OData V4:
  - Added ID (`internalId`) property for macros metadata in schema

### Quality

- Update transitive dependencies

Upgrades:

- excel4node to 1.8.2
- rimraf to 5.0.0
- i18next to 22.4.15
- @sap-ux/fe-fpm-writer to 0.18.9
- @sapui5/ts-types-esm to 1.108.15
- semver to 7.5.1
- typescript-eslint to 5.59.5
- jquery to 3.7.0

## [1.108.5] - 2023-05-04

### Added

- OData V4:
  - OP: New value "InilneCreationRows" added to creationMode->name property
  - OP: Addded support for property 'inlineCreationRowsHiddenInEditMode' in creationMode

### Fixed

- OData V4:
  - Parsing of commented contents in XML fragments, comments are now getting ignored during generation and import

### Quality

- Update transitive dependencies

Upgrades:
- prettier to 2.8.8
- @sapui5/ts-types-esm to 1.108.13 
- typescript to 4.9.5
- @types/node to 18.16.3
- patch-package to 6.5.1
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser to 5.59.2
- Update @sap-ux/vocabularies-types to 0.7.4
- Update @sap-ux/annotation-converter to 0.5.22
- Update @sap-ux/edmx-parser to 0.5.14

## [1.108.4] - 2023-04-19

### Fixed

- OData V4:
  - Fixed an issue with custom extensions running into an endless loop

### Quality

- Update transitive dependencies

Upgrades:
- @sapui5/ts-types-esm to 1.108.12
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser to 5.58.0
- @types/mem-fs-editor to 7.0.3
- semver to 7.5.0

## [1.108.3] - 2023-04-05

### Added

- OData V4:
  - Building blocks support for custom sections

### Quality

- Update transitive dependencies

Upgrades:
- excel4node to 1.8.1
- eslint-config-prettier to 8.8.0
- prettier to 2.8.7
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser to 5.57.0
- d3 to 7.8.4

## [1.108.2] - 2023-03-22

### Added

- OData V4: the schema App.json and config app.json that get generated now also comprise the information `routePattern` for each page, i.e. the route pattern of the page as comprised in the manifest.json.

### Quality

Upgrades:
- chalk to 4.1.2
- types/jest to 28.1.8
- jQuery to 3.6.4
- sapui5/ts-types-esm to 1.108.11
- ejs to 3.1.9
- deepmerge to 4.3.1
- eslint-config-prettier to 8.7.0
- prettier to 2.8.4

## [1.108.0] - 2023-03-08

### Fixed

- OData V2:
  - Fixed deletion issues for Custom Columns that appeared after positions were changed

### Quality

- Upgrade "typescript" to "4.9.4"
- Upgrade "@typescript-eslint/eslint-plugin" and  "@typescript-eslint/parser" to "5.52.0"
- Upgrade "ts-node" to "10.9.1" 
- Upgrade "@sapui5/ts-types-esm" to "1.108.10"
- Upgrade "@sap-ux/fe-fpm-writer" to "0.18.7"
- Upgrade "mem-fs-editor" to "9.7.0"
- Revert "typescript-json-schema" to "0.53.0" in types package

## [1.108.0] - 2023-02-22

### Added

- OData V2:
  - Additional values `creationRows` and `creationRowsHiddenInEditMode` of property `CreateMode` are supported now for object page tables.

### Changed

- OData V4:
  - Adapted view property key handling for views created using different `entitySet` value.

### Quality

- Upgrade transitive dependencies
- Upgrade "@types/jquery" to "3.5.16"
- Upgrade "@types/mem-fs-editor" to "7.0.2"
- Upgrade "excel4node" to "1.8.0"
- Upgrade "i18next" to "20.6.1"
- Upgrade "typescript-json-schema" to "0.55.0" in types package
- Upgrade "@sap-ux/fe-fpm-writer` to "0.18.5"
- Upgrade "d3" to "7.8.2"
- Upgrade "@sapui5/ts-types-esm" to "1.108.7"
- Upgrade "jest", "ts-jest", "@types/jest"
- Upgrade "set-value"
