# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[Node.js](https://nodejs.org/en/download/) version `20.14.0` or higher

## [1.139.4] - 2025-12-15
 - Updated dist tags

## [1.139.3] - 2025-12-11

### Fixed
 - Removed the `group` property from actions

## [1.139.2] - 2025-11-26

### Added
- Enhanced the `readApp` API method:
  - The method now returns an `applicationModel` where each page includes its own `TreeModel`
  - Added the `skipParsing` option (default: false) to allow skipping page parsing and model generation


### Fixed

OData V4:
- Removed the `enableMassEdit` and `analyticalConfiguration` properties from the chart view
- Avoid unnecessary deletion of `targets.{target}.contextPattern`

### Quality

Upgrades:

| Package | Change |
|---|---|
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.39.18` -> `0.39.25`] |
| [@sap-ux/vocabularies-types](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/main/packages/vocabularies-types)) | [`0.13.0` -> `0.13.2`] |
| [@sap-ux/annotation-converter](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/HEAD/packages/annotation-converter)) | [`0.10.7` -> `0.10.9`] |
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/project-access)) | [`1.32.8` -> `1.32.9`] |
| [@types/mem-fs](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mem-fs) | [`1.1.2` -> `1.1.5`] |
| [@types/json-schema](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/json-schema) | [-> `7.0.5`] |
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next)) | [`25.6.2` -> `25.6.3`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.46.4` -> `8.48.0`] |
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.46.4` -> `8.48.0`] |
| [axios](https://axios-http.com) ([source](https://github.com/axios/axios)) | [`1.11.0` -> `1.13.2`] |
| [es5-ext](https://github.com/medikoo/es5-ext) | [`0.10.63` -> `0.10.64`] |
| [glob-parent](https://github.com/gulpjs/glob-parent) | [`6.0.1` -> `6.0.2`] |
| [parse-url](https://github.com/IonicaBizau/parse-url) | [`9.0.0` -> `9.2.0`] |
| [tar](https://github.com/isaacs/node-tar) | [`7.0.2` -> `7.5.2`] |
| [js-yaml](https://github.com/nodeca/js-yaml) | [-> `4.1.1`] |



## [1.139.1] - 2025-11-12

### Added
- Added the ability to delete building blocks on a custom page
- Added the ability to delete the "Page" building block
- Added the ability to create custom fields in form sections
- Added support for setting aggregation only for visible columns in analytical tables
- Added the new API method `readApp`: a simpler wrapper around `importProject` that only requires the app parameter (path or `ApplicationAccess` instance)

### Fixed
- Fixed an issue where a message defined in i18n did not match the mode name capitalization
- Removed unsupported navigation properties from the `creationMode: creationFields` property dropdown
- Removed unsupported navigation properties from the `enableMassEdit: visibleFields/ignoredFields` property dropdown


### Quality

Upgrades:

| Package | Change |
|---|---|
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next)) | [`25.6.0` -> `25.6.2`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.39.15` -> `0.39.18`] |
| [esbuild](https://github.com/evanw/esbuild) | [`0.25.11` -> `0.27.0`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.46.0` -> `8.46.2`] |
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.46.0` -> `8.46.2`] |
| [axios](https://axios-http.com) ([source](https://github.com/axios/axios)) | [`1.12.0` -> `1.13.2`] | 
| [tar](https://github.com/isaacs/node-tar) | [`7.5.1` -> `7.5.2`] | 
| [glob](https://github.com/isaacs/node-glob) | [-> `10.5.0`] | 

## [1.139.0] - 2025-10-29

### Added

OData V4:
- Support for the `group` property for actions
- Support for the `creationMode` property for the List Report tables

### Fixed
- Fixed an issue where the Object Page synchronization of tables was not working correctly

### Quality

Upgrades:

| Package | Change |
|---|---|
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.39.10` -> `0.39.15`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.46.0` -> `8.46.2`] |
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.46.0` -> `8.46.2`] |
| [esbuild](https://github.com/evanw/esbuild) | [`0.25.10` -> `0.25.11`] |
| [@sap-ux/annotation-converter](https://github.com/SAP/open-ux-odata) ([source](https://github.com/SAP/open-ux-odata/tree/HEAD/packages/annotation-converter)) | [`0.10.6` -> `0.10.7`] |
