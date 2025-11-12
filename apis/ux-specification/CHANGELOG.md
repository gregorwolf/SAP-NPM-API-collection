# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[NodeJS](https://nodejs.org/en/download/) Version `20.14.0` or higher

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
