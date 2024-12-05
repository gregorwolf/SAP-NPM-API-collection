# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[NodeJS](https://nodejs.org/en/download/) Version `18.18.0` or higher

## [1.124.6] - 2024-11-13

### Added

### Changed

### Removed

### Deprecated

### Fixed

- OData V2: flex changes had not been written for table columns of type DataField that use a navigationPath.

### Quality

Upgrades:

- npm-run-all2 to v7
- typescript-eslint to 8.13.0
- uuid to 11.0.2
- @sap-ux/fe-fpm-writer to 0.31.16
- @sap-ux/annotation-converter to 0.9.9
- @sap-ux/vocabularies-types to 0.11.6
- @sap-ux/edmx-parser to 0.8.2
- i18next to 23.16.5
- [Security] - upgrade cross-spawn to 7.0.5

## [1.124.5] - 2024-10-30

### Added

### Changed

- Descriptions of all properties have been reviewed.

### Removed

### Deprecated

### Fixed

- An exception occured if a view fragment was completely empty. This is now caught, leading to an error message in the log that better describes the root cause.  

### Quality

Upgrades:

- typescript to 5.6.3
- typescript-eslint monorepo to 8.10.0
- i18next to 23.16.2
- npm-run-all2 to 6.2.6
- @types/jquery to 3.5.32
- i18next to 23.16.4
- @types/jest to 29.5.14
- @sap-ux/fe-fpm-writer to 0.31.10

## [1.124.4] - 2024-10-16

### Changed

- Definition of PageType adjusted to the needs of consuming applications at Fiori Toolsuite

### Quality

Upgrades:

- "@sap-ux/vocabularies-types": "0.11.4"
- "@sap-ux/annotation-converter": "0.9.6"
- i18next to 23.15.2
- esbuild to 0.24.0
- @sap-ux/fe-fpm-writer to 0.31.7
- @sapui5/types to latest-1.124
- @typescript-eslint/eslint-plugin to 8.8.1
- @typescript-eslint/parser to 8.8.1

## [1.124.3] - 2024-10-04

### Added

OData V4:

- added enum definition and values for `properties` of custom columns, list report and object page.
- Support of `cloudDevAdaptionStatus` internal setting.

### Fixed

- OData V2: Flex change is removed if the facet ID contains a single hyphen.
- General: exception "No schema available for type: FreestylePage" when calling `importProject` for an app that does not have any pages defined (yet).

### Quality

Upgrades:

- @sap-ux/fe-fpm-writer to 0.31.4
- eslint to 8.57.1
- npm-run-all2 to 6.2.3
- @types/jquery to 3.5.31
- @types/jest to 29.5.13
- jest-file-snapshot to 0.7.0
- ts-jest to 29.2.5
- i18next to 23.15.1
- @ui5/manifest to 1.67.0
- jsdom to 25.0.1
- tar to 7.0.0
- ini to 5.0.0
- uuid to 10.0.0
- typescript to 5.6.2

## [1.124.2] - 2024-09-18

### Added

- Add `i18nClassification` property for macros schema properties(Support translation inputs for macros/building block properties).

### Fixed

- Table views: new error handling for undefined keys.
- Corrections for API functions exportConfigEntityByPath and deleteConfigEntityByPath:
  - change indicator was not set for manifest.json in v4.
  - entityPath was not forwarded at overview pages.
  - the check against entityPathArray did not consider intermediate anyOf definitions, and thus exited without executing the property change.
  - FPM custom pages had not been considered by function `exportConfigEntityByPathV4`.

### Quality

Upgrades:

- @sap-ux/fe-fpm-writer to 0.30.0
- @sapui5/types to 1.128.1
- @sap-ux/vocabularies-types to 0.11.3
- @sap-ux/annotation-converter to 0.9.5
- ws to 8.18.0
- @sap-ux/edmx-parser to 0.8.1

## [1.124.1] - 2024-09-04

### Fixed

- Supply of oDataVersion and fioriElementsVersion in the app.json

### Quality

Upgrades:

- axios to 1.7.7
- @sap-ux/fe-fpm-writer to 0.28.3
- jsdom to 24.1.3
- new resolution: "@sap/ux-cds-compiler-facade": "1.14.2"

## [1.124.0] - 2024-08-21

### Added

First version for SAP UI5 1.124 and higher

OData V4:

- Support of `disableCopyToClipboard` table property

### Fixed

- Start of debug script for schema generation via launch.json.
- Error "TypeError: Cannot read properties of undefined (reading 'replace')" is thrown on export attempt when empty action is presented in annotations.
- app.json config of freestyle apps could not be generated in all cases.
- OData V4 and freestyle: If routing name and target name had been different for an entry in manifest.json, the export had falsified the routing information.

### Quality

Upgrades:

- micromatch to 4.0.8
- eslint-plugin-prettier to 5.2.1
- rimraf to 5.0.10
- @sapui5/types to 1.127.0
- i18next to 23.14.0
- esbuild to 0.23.1
- @sap-ux/fe-fpm-writer to 0.27.5
- @sap-ux/vocabularies-types to 0.11.1
- @sap-ux/annotation-converter to 0.9.2
- @sap-ux/edmx-parser to 0.7.1
