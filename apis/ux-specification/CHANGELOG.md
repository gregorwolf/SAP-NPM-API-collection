# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

You have [Node.js](https://nodejs.org/en/download/) version `20.14.0` or higher installed

## [1.144.1] - 2026-03-19

### Added

- Enhanced the object page schema by adding `manifestPath` support for action properties inside manifest-based action menus
- Enhanced the object page schema by adding `manifestPath` support for chart sections, custom sections, and analytical list pages in OData V2 applications

### Fixed

- Fixed an incorrect validation message with `analyticalConfiguration` in list report pages with multiple views
- Corrected the `annotationPath` for the Chart building block where `metaPath` was set to the selection variant annotation
- Fixed an issue where modifying the "Semantic Object Action" property of an intent-based navigation action in the annotation did not update the corresponding key in the `manifest.json` file
- Fixed an issue where `undefined.position` was created in the `manifest.json` file during view creation and deletion for OData V4 applications
- Fixed the incomplete conversion of aggregations to schema logic in the building block `api.json` file
- Fixed an issue where building block properties had the `any` type instead of a specific type
- Fixed the initialization configuration of `i18next`

### Quality

Upgrades:

| Package                                                                                                                                           | Change                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer))   | [`0.43.7` -> `0.43.10`]  |
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/project-access)) | [`1.35.10` -> `1.35.13`] |
| [esbuild](https://github.com/evanw/esbuild)                                                                                                       | [`0.27.3` -> `0.27.4`]   |
| [i18next](https://www.i18next.com)                                                                                                                | [`25.8.13` -> `25.8.18`] |
| [eslint](https://eslint.org)                                                                                                                      | [`9.39.3` -> `9.39.4`]   |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io)                                                                                  | [`8.54.0` -> `8.57.1`]   |
| [@typescript-eslint/parser](https://typescript-eslint.io)                                                                                         | [`8.54.0` -> `8.57.1`]   |
| [tar](https://github.com/npm/node-tar)                                                                                                            | [`7.5.10` -> `7.5.11`]   |

## [1.144.0] - 2026-03-05

### Added

- Added support for retrieving name options for the `ButtonGroup` from the `enum` map in the Rich Text Editor building block.
- Added support for the `enableLazyLoading` property at the application and object page level for OData V4 applications.
- Enhanced the page schema by adding `manifestPath` support for actions, sections, columns, fields, and filter fields in OData V4 applications.
- Enhanced the page schema by adding `manifestPath` support for overview page properties in OData V2 applications.
- Added support for `enableExport` property for OData V2 applications, which should replace the `useExportToExcel` property.
- Enhanced the logic for resolving descriptions in the view node of building blocks.

### Fixed

- Fixed an issue where the `personalization` property could not be set to `true` or `false` if a subproperty was defined.
- Fixed an issue where a crash occurred during schema generation when a selection field had no value. Added a warning message instead.
- Fixed an issue where `undefined.position` was created in the `manifest.json` file during view creation and deletion for OData V4 applications.
- Fixed an issue where a wrong `entityType` was resolved when generating list report pages where `NavigationProperty` had a `Partner` attribute.

### Quality

Upgrades:

| Package                                                                                                                                                       | Change                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [esbuild](https://github.com/evanw/esbuild)                                                                                                                   | [`0.27.2` -> `0.27.3`]   |
| [semver](https://github.com/npm/node-semver)                                                                                                                  | [`7.7.3` -> `7.7.4`]     |
| [i18next](https://www.i18next.com) ([source](https://github.com/i18next/i18next))                                                                             | [`25.8.0` -> `25.8.13`]  |
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/project-access))             | [`1.35.2` -> `1.35.10`]  |
| [@sap-ux/vocabularies-types](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/vocabularies-types))     | [`0.14.6` -> `0.15.0`]   |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/fe-fpm-writer))               | [`0.42.6` -> `0.43.1`]   |
| [@sap-ux/edmx-parser](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/edmx-parser))                   | [`0.9.8` -> `0.10.0`]    |
| [@sap-ux/annotation-converter](https://github.com/SAP/open-ux-tools) ([source](https://github.com/SAP/open-ux-tools/tree/HEAD/packages/annotation-converter)) | [`0.10.20` -> `0.10.21`] |
| [axios](https://axios-http.com) ([source](https://github.com/axios/axios))                                                                                    | [`1.13.5` -> `1.13.6`]   |
| [@types/jquery](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/jquery)                                                                    | [`3.5.33` -> `3.5.34`]   |
| [eslint](https://eslint.org) ([source](https://github.com/eslint/eslint))                                                                                     | [`9.39.2` -> `9.39.3`]   |
| [tar](https://github.com/npm/node-tar)                                                                                                                        | [`7.5.9` -> `7.5.11`]    |
