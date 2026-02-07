# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[NodeJS](https://nodejs.org/en/download/) Version `20.14.0` or higher

## [1.142.1] - 2026-01-21

### Added
- Restricted the property type for the `overflowGroup` action to integer.
- Added support for setting the `tooltip`, `importance`, and `required` properties for custom columns
- Enhanced the page schema by adding `manifestPath` support for table properties and static nodes (such as the header and the root page level) for OData V2 applications
- Added support for the `CreateMode` property at the page level and application level for OData V2 applications

### Changed
- Refactored the initial step of generating a list report page for OData V4 applications

### Fixed
- Ensures compatibility with newer OData v4.01 services while maintaining backward compatibility with existing v4.0 services.
- Fixed an issue where the empty `sap.ui.generic.app` property was removed and an empty `chartSettings` property was added to the `manifest.json` file when exporting an overview page for OData V2 applications

Upgrades:

| Package | Change | 
|---|---|
| [@sap-ux/annotation-converter](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/annotation-converter)) | [`0.10.9` -> `0.10.19`] |
| [@sap-ux/edmx-parser](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/edmx-parser)) | [`0.9.6` -> `0.9.8`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.40.2` -> `0.40.11`] |
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/project-access)) | [`1.33.0` -> `1.34.2`] |
| [@sap-ux/vocabularies-types](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-odata/tree/main/packages/vocabularies-types)) | [`0.13.2` -> `0.14.5`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.51.0` -> `8.53.1`] |
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.51.0` -> `8.53.1`] |
| [@ui5/manifest](https://github.com/SAP/ui5-manifest) | [`1.80.0` -> `1.82.0`] |
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | [`5.5.4` → `5.5.5`] | 
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next)) | [`25.7.3` -> `25.7.4`] |
| [prettier](https://prettier.io) ([source](https://github.com/prettier/prettier)) | [`3.6.2` → `3.8.0`] |
| [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) | [`0.65.1` -> `0.67.1`] |

## [1.142.0] - 2026-01-07

### Added
- Support for setting `overflowGroup` property for an action

### Quality

Upgrades:

| Package | Change | 
|---|---|
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/project-access)) | [`1.32.12` -> `1.33.0`] |
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next)) | [`25.6.3` -> `25.7.3`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer)) | [`0.40.0` -> `0.40.2`] |
| [esbuild](https://github.com/evanw/esbuild) | [`0.27.1` → `0.27.2`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin)) | [`8.49.0` -> `8.51.0`] |
| [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) ([source](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/parser)) | [`8.49.0` -> `8.51.0`] |
