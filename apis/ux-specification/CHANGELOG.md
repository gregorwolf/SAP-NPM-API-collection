# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[NodeJS](https://nodejs.org/en/download/) Version `20.14.0` or higher

## [1.136.8] - 2025-10-01

### Added

OData V4:
- `operationGroupingMode` property support for table `enableMassEdit`
- Add icon support and improve description for main building blocks in schema

### Fixed

- Macros: Corrections related to macros sub namespaces. Properties of richtexteditor:ButtonGroup control are not listed in app specific schema

### Quality

Upgrades:

- Upgraded TS target to `ES2023`

| Package | Change |
|---|---|
| [ts-jest](https://kulshekhar.github.io/ts-jest) ([source](https://github.com/kulshekhar/ts-jest)) | [`29.4.1` -> `29.4.4`] |
| [@sap-ux/edmx-parser](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/HEAD/packages/edmx-parser)) | [`0.9.5` -> `0.9.6`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.38.6` -> `0.39.2`] |
| [esbuild](https://github.com/evanw/esbuild) | [`0.25.9` -> `0.25.10`] | 
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.44.0` -> `8.45.0`] | 
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.44.0` -> `8.45.0`] | 
| [tar](https://github.com/isaacs/node-tar) | [`7.4.3` -> `7.5.1`] | 

## [1.136.7] - 2025-09-17

### Added

OData V4:
- Object Page: Added support for the `rowCountMode: Interactive` property on grid, analytical, and tree tables.

### Quality

Upgrades:

| Package | Change |
|---|---|
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.38.2` -> `0.38.6`] | 
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.42.0` -> `8.44.0`] | 
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.42.0` -> `8.44.0`] | 
| [axios](https://axios-http.com) ([source](https://github.com/axios/axios)) | [`1.11.0` -> `1.12.0`] | 
| [@sap-ux/annotation-converter](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/HEAD/packages/annotation-converter)) | [`0.10.3` -> `0.10.5`] | 
| [@sap-ux/edmx-parser](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/HEAD/packages/edmx-parser)) | [`0.8.2` -> `0.9.5`] | 
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next)) | [`25.4.2` -> `25.5.2`] |

## [1.136.6] - 2025-09-03

### Added

OData V4:
- Added possibility to define the 'InlineCreationRows' mode as the default creation mode that is used for all tables within an application.
- Object Page: Support of `creationMode` settings on tables

### Fixed

OVP page. Properties from different card types on the OVP page were not imported/exported, which prevented resetting them in the Page Editor.

### Quality

Upgrades:

| Package | Change |
|---|---|
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.40.0` -> `8.42.0`] | 
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.40.0` -> `8.42.0`] | 
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.38.0` -> `0.38.2`]) | 
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next)) | [`25.4.0` -> `25.4.2`] | 

## [1.136.5] - 2025-08-20

### Fixed

Page macros. Default aggregation `items` is not recognized

### Quality

Upgrades:

| Package | Change |
|---|---|
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.39.0` -> `8.40.0`] | 
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.39.0` -> `8.40.0`] | 
| [esbuild](https://github.com/evanw/esbuild) | [`0.25.8` -> `0.25.9`] |
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | [`5.5.3` -> `5.5.4`] | 
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next)) | [`25.3.0` -> `25.4.0`] | 
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.36.0` -> `0.38.0`] | 

## [1.136.4] - 2025-08-06

### Fixed

OData V4:
- Support of `enableMassEdit` properties for single view table

### Quality

Upgrades:

| Package | Change | 
|---|---|
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.37.0` -> `8.39.0`] | 
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.37.0` -> `8.39.0`] | 
| [typescript](https://www.typescriptlang.org/) ([source](https://github.com/microsoft/TypeScript)) | [`5.8.3` -> `5.9.2`] | 
| [ts-jest](https://kulshekhar.github.io/ts-jest) ([source](https://github.com/kulshekhar/ts-jest)) | [`29.4.0` -> `29.4.1`] | 
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.35.5` -> `0.36.0`] | 
| [i18next](https://github.com/i18next/i18next) | [`23.16.8` -> `25.3.0`] | 
| [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) | [`0.57.0` -> `0.65.1`] |

## [1.136.3] - 2025-07-23

### Added

OData V4:
- Support of `enableMassEdit` properties for table

### Quality

Upgrades:

| Package | Change | 
|---|---|
| [axios](https://axios-http.com) ([source](https://github.com/axios/axios)) | [`1.10.0` -> `1.11.0`] | 
| [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) | [`9.1.0` -> `9.1.2`] | 
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | [`5.5.1` -> `5.5.3`] | 
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.35.1` -> `8.37.0`] | 
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.35.1` -> `8.37.0`] | 
| [esbuild](https://github.com/evanw/esbuild) | [`0.25.5` -> `0.25.8`] | 


## [1.136.2] - 2025-07-09

### Quality

Upgrades:

| Package | Change |
|---|---|
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.35.0` -> `8.35.1`] |
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.35.0` -> `8.35.1`] |
| [prettier](https://prettier.io) ([source](https://github.com/prettier/prettier)) | [`3.5.3` -> `3.6.2`] | 
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | [`5.5.0` -> `5.5.1`] | 

## [1.136.1] - 2025-06-25

### Quality

Upgrades:

| Package | Change |
|---|---|
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.35.0` -> `0.35.5`]|
| [axios](https://axios-http.com) ([source](https://github.com/axios/axios)) | [`1.9.0` -> `1.10.0`] |
| [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) | [`50.7.1` -> `50.8.0`] |
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | [`5.4.1` -> `5.5.0`] |
| [ts-jest](https://kulshekhar.github.io/ts-jest) ([source](https://github.com/kulshekhar/ts-jest)) | [`29.3.4` -> `29.4.0`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.34.0` -> `8.35.0`] |
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.34.0` -> `8.35.0`] |

## [1.136.0] - 2025-06-11

### Added

First version for SAP UI5 1.136 and higher

OData V4:
- Support of `hideDraft` related internal setting
- Basic support for new SAP Ariba LR/OP templates

OData V4/V2:
- Schema generation - add link to documentation for "flexibleColumnLayout" property

### Fixed

OData V4:
- Export of the empty application settings

OData V4/V2:
- Schema generation - update description for "flexibleColumnLayout" property

### Quality

Upgrades:

| Package | Type | Update | Change |
|---|---|---|---|
| [esbuild](https://github.com/evanw/esbuild) | devDependencies | patch | [`0.25.4` -> `0.25.5`] |
| [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) | devDependencies | minor | [`50.6.17` -> `50.7.1`] |
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | devDependencies | patch | [`5.4.0` -> `5.4.1`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | devDependencies | minor | [`8.32.1` -> `8.34.0`]|
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | devDependencies | minor | [`8.32.1` -> `8.34.0`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | devDependencies | minor | [`0.33.28` -> `0.35.0`]
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | dependencies | minor | [`0.33.28` -> `0.35.0`]
| [@sap-ux/vocabularies-types](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/main/packages/vocabularies-types)) | devDependencies | minor | [`0.12.0` -> `0.13.0`]
| [@sap-ux/vocabularies-types](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/main/packages/vocabularies-types)) | dependencies | minor | [`0.12.0` -> `0.13.0`]
