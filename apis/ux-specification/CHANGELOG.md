# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

You have [Node.js](https://nodejs.org/en/download/) version `22.13.0` or higher installed

## [1.144.7] - 2026-06-25

### Added
- Added support for actions and menus in the chart toolbar for OData V4 applications
- Added support for the attachment reuse component for hierarchical document management in object pages for OData V4 applications

### Fixed
- Fixed the `esbuild` configuration by splitting it into a separate file and correcting the documentation script extension

### Quality

Upgrades:

| Package | Change |
| --- | --- |
| [esbuild](https://esbuild.github.io/) | [`0.28.0` -> `0.28.1`] |
| [prettier](https://prettier.io) | [`3.8.3` -> `3.8.4`] |
| [semver](https://github.com/npm/node-semver) | [`7.8.3` -> `7.8.4`] |
| [i18next](https://www.i18next.com) | [`25.8.18` -> `25.10.10`] |
| [axios](https://axios-http.com) | [`1.17.0` -> `1.18.0`] |
| [fast-xml-parser](https://naturalintelligence.github.io/fast-xml-parser/) | [`5.8.0` -> `5.9.3`] |
| [@ui5/manifest](https://www.npmjs.com/package/@ui5/manifest) | [`1.82.0` -> `1.86.0`] |

## [1.144.6] - 2026-06-11

### Added
- Added support for dynamic default table type detection based on OData service capabilities for list report pages and object pages in OData V4 applications

### Fixed
- Fixed an issue with version gating based on the SAPUI5 version and table type for `creationMode` and `popinLayout` properties for tables in OData V4 applications
- Moved `@sap-ux/fe-fpm-writer` from an external dependency to an internal dependency. The code is bundled in `dist\index-min.js`

### Quality
- Upgraded the minimum Node.js version from v20 to v22 because Node.js 20 reached end-of-life on 2026-04-30.
- Migrated to ESM-only bundle output. Added the package `exports` field.

Upgrades:

| Package | Change |
| --- | --- |
| [axios](https://axios-http.com) | [`1.16.1` -> `1.17.0`] |
| [semver](https://github.com/npm/node-semver) | [`7.8.1` -> `7.8.3`] |
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | [`5.5.5` -> `5.5.6`] |

## [1.144.5] - 2026-05-28

### Added
- Added support for `exportSettings` aggregation on columns in the `Table` building block and enabling the configuration of export setting properties such as `label`, `type`, `textAlign`, `valueMap`, and `wrap`
- Added support for `array` properties in the building blocks schema

### Fixed
- Fixed an issue where the `ColumnOverride` import silently dropped entries when `override` was placed at the table level rather than inside the `columns` wrapper
- Updated the actions aggregation for `TreeModel` to support menu actions

### Quality

Upgrades:

| Package | Change |
| --- | --- |
| [semver](https://github.com/npm/node-semver) | [`7.7.4` -> `7.8.1`] |
| [axios](https://axios-http.com) | [`1.16.0` -> `1.16.1`] |
| [ts-jest](https://kulshekhar.github.io/ts-jest) | [`29.4.9` -> `29.4.11`] |
| [uuid](https://www.npmjs.com/package/uuid) | [forced transitive resolution to `11.1.1`] [security] |

## [1.144.4] - 2026-05-14

### Added

- Added support for the `personalization.group` property for responsive and analytical tables in list report pages
- Added a warning on the "Flexible Column Layout" when `inlineEdit` is configured

### Fixed

### Quality

Upgrades:

| Package | Change |
| ------- | ------ |
| [uuid](https://www.npmjs.com/package/uuid) | [`11.1.0` -> `11.1.1`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) | [`0.43.26` -> `0.43.28`] |
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) | [`1.36.1` -> `1.36.3`] |
| [axios](https://axios-http.com) | [`1.15.2` -> `1.16.0`] |

## [1.144.3] - 2026-04-30

### Added

- Added support for the `disableStrictUomFiltering` manifest setting
- Enhanced the schema for the `massEdit.visibleFields`, `massEdit.ignoredFields`, and `creationMode.creationFields` properties to represent the tree structure `enum`

### Fixed

- Fixed unnecessary namespace addition during `FPMCustomPage` export for view nodes with a missing override class
- Fixed ID generation for new cell content in custom columns to prevent collisions and correctly handle dummy content
- Prevented column and cell ID collision in responsive tables by ensuring unique ID generation

### Quality

Upgrades:

| Package | Change |
| ------- | ------ |
| [fast-xml-parser](https://naturalintelligence.github.io/fast-xml-parser/) | [`5.7.1` -> `5.7.2`] |
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) | [`1.35.20` -> `1.36.1`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) | [`0.43.21` -> `0.43.26`] |
| [axios](https://axios-http.com) | [`1.15.0` -> `1.15.2`] |

## [1.144.2] - 2026-04-16

### Added

- Added support for `ColumnOverride` and `ActionOverride` building block properties in the schema generation, import, and export processes for custom pages
- Added support for single-cardinality aggregation macros, for example, `massEdit` with the correct wrapper and inner control XML structure in the export for custom pages.
- Added icons for the `Form`, `Field`, `FormElement`, `RichTextEditor` and `RichTextEditorWithMetadata` building blocks in the view node for a custom page
- Added support for the `sideEffectsEventsInteractionType` application setting which requires using an annotation in the metadata
- Added `Fields` aggregation support in the schema generation for the `Form` building block in custom pages
- Added support for custom form fields in the `Form` building block for custom pages
- Added automatic ID generation for custom columns and sections in view and fragment templates and controller extensions in OData V2 applications

### Fixed

- Fixed the `typings` field in `@sap/ux-specification-types` to use an explicit file path

- Fixed the description of custom filter fields in the view node of a custom page.
- Fixed the display label for custom fields in the `Form` building block for custom pages.
- Fixed the removal of the `ColumnOverride` config entry when its parent config entry is removed or undefined.
- Fixed macros page building block items aggregation causing page map to crash.

### Quality

Upgrades:

| Package | Change |
| ------- | ------ |
| [lodash](https://www.npmjs.com/package/lodash) | [`4.17.23` -> `4.18.1`] |
| [lodash.template](https://www.npmjs.com/package/lodash.template) | [`4.17.23` -> `4.18.1`] |
| [esbuild](https://esbuild.github.io/) | [`0.27.4` -> `0.28.0`] |
| [ts-jest](https://kulshekhar.github.io/ts-jest) | [`29.4.6` -> `29.4.9`] |
| [fast-xml-parser](https://naturalintelligence.github.io/fast-xml-parser/) | [`5.5.9` -> `5.6.0`] |
| [@sap-ux/fe-fpm-writer](https://github.com/SAP/open-ux-tools) | [`0.43.10` -> `0.43.19`] |
| [axios](https://axios-http.com) | [`1.13.6` -> `1.15.0`] |
| [@sap-ux/project-access](https://github.com/SAP/open-ux-tools) | [`1.35.13` -> `1.35.20`] |
| [cpy-cli](https://github.com/sindresorhus/cpy-cli) | [`copyfiles` -> `7.0.0`] |
| [tmp](https://github.com/raszi/node-tmp) | [`resolution` -> `^0.2.5`] |
| [prettier](https://prettier.io) | [`3.8.1` -> `3.8.3`] |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io) | [`8.57.1` -> `8.58.2`] |
| [@typescript-eslint/parser](https://typescript-eslint.io) | [`8.57.1` -> `8.58.2`] |

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
