# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.78.12] - 2020-11-05

### Added

- OData V2: `variantManagement` property for Object Page sections

### Changed

- Update description of npm package to "SAP Fiori tools - Specification"

### Deprecated

### Removed

### Fixed

- Adjustments to the regex used for binding changes, as introduced in previous version:
    1. accept false as value
    2. only allow the exact value from enums but no alteration
- Different enum for pageType in app.json for V2 and V4

### Quality

## [1.78.12] - 2020-10-22

### Added

- Added test project with free-style view
- Full support for binding changes as an option for the property values of
    List report + ALP: hAlign of table columns, popinLayout
    Object page: popinLayout, displayShape, header actions, hAlign of table columns

### Changed

- Dependencies updated:
    "@sap-ux/annotation-converter": "0.2.37",
    "@sap-ux/edmx-parser": "0.2.33,
    "@sap-ux/vocabularies-types": "0.2.33"
- OData V2: `showDraftToggle` property is now only part of List Report schema
- OData V2: `dateSettings` now appear direclty inside `filterBar` in List Report schema

### Fixed

- OData V4: Added descriptions to properties
- Fixed exception for freestyle views as part of an app
- Deletion of object page header transferred correctly
- Export import for header properties are consistent

## [1.78.11] - 2020-10-09

### Added

- OData V2: properties `variantManagementHidden` and `subTitleIfVariantMgmtHidden`
- OData V2: support for new property `useDateRange` in smart filter bar

### Fixed

- Passed manifest should not be modified by the specification API
- The outline view of the page map did not show all sections or facets

### Quality

- Cover V4 AnalyticalListPage.ts with unit tests

## [1.78.10] - 2020-09-28

### Added

- Table columns now have a description that appears on hover, showing the column header title as visible in the application at run-time.
    This description is also visible at the input help (LSP) when chosing a column at any configuration file.
- OData V4: Schemas for Analytical List Page

### Changed

- V4 table settings:
    a) There had been two possible representations for 'creationMode': a simple string, or an object with multiple properties.
    As this led to confusion in the UI (having the same property twice in the outline), we streamlined this to only have the object representation; any existing string representation that gets detected in the manifest will be implicitly converted to an object for the configuration file.
    b) The same approach was also applied to 'personalization': here, any boolean value of the manifest will be converted to an object.
    c) The 'personalization' property has an additional property 'filter'.
    d) The enum type for selectionMode has a new option 'Auto' (for further information refer to the inline description at the configuration file).
- Analytical List Page OData V2: showGoButtonOnFilterBar property moved to **filterbar** section in config

### Fixed

- Property displayShape of Analytical List Page was not imported correctly.
- Generate correct app specific schema for ALP in V4
- Generation of app specific schemas generally ran into exceptions for apps without LineItem or Facet annotation.
    To fix this, the schema generation got changed so that it runs over the existing pages as registered in manifest.json, instead of being based on the LineItem and Facet annotations.

### Quality

- Test coverage increased

## [1.78.9] - 2020-09-11

### Added

- OData V2: Support for manifest property `defaultLayoutTypeIfExternalNavigation` in Object Page
- OData V2: Support for manifest property `inlineDelete` for Resposive Tables in List Report and Object Page
- Validity information for various properties

### Changed

- Pipeline settings now support intermediate staging
- New version of Annotation Vocabularies Tools
- Description for createWithFilters

### Fixed

- Added different page type for V4 application
- Import properties correctly for ALP

## [1.78.8] - 2020-08-28

### Added

- importProject API: support of OVP and ALP templates

### Changed

- Use @ui5/flexibility-utils for stringify/parse flex changes

### Fixed

- Synchronization of changes in manifest.json
- Properties objectPageHeaderType and showDraftToggle are not shown anymore as part of app.json (JSON schema validation error)
- Wrong ID at generated flex changes for object page table columns
- Shows warning in case of invalid card name for overview page
- Enhanced test coverage: objectPageHeaderAction
- Sections not shown correctly in the page map for V4 applications
- Manifest did not get updated in case of deletion of some of the properties from config file

## [1.78.7] - 2020-08-25

### Fixed

- Fixed issue related to page map and app.json while exporting

## [1.78.6] - 2020-08-21

### Added

- Support UI Flex binding change for header action

## [1.78.5] - 2020-08-07

### Removed

- `postPublish` script to avoid issues with `npm pack`

## [1.78.4] - 2020-08-06

### Added

- `getApiVersion()` added

### Changed

- Renaming API method from `importProjectNoConfig()` to `importProjectSchema()`.

### Fixed

- Fix for custom section export

## [1.78.3] - 2020-07-29

### Added

- Support of subsections in the object page schema
- Full support of flexible column layout for Fiori Elements V2 and V4
- New API importProjectNoConfig for generation of all schemas without generation of configs
- Fault-tolerance in case of incomplete app projects
- New properties for V2 applications:

    1. tableColumnVerticalAlignment (on app level)
    2. Possibility to define different tableSettings per variant in case of multiple tabs

### Changed

- File naming of schemas is based on entity type now, central function for determination of schema file name
- App providers as well as the API importProject have been enhanced
- enableAutoBinding on table level is replaced by loadDataOnAppLaunch; alternatively, enableAutoBinding for quickVariantSelectionX (multiple tabs) is also considered

### Deprecated

### Removed

### Fixed

- Synchronization of changes in manifest.json and delete complete block
- Deletion of last setting/block from configuration file
- Boolean value false was not written to manifest but the property was deleted
- Export of V4 app.json may lead to empty structures like config: {} in the manifest
- Exception occured in case of free-style pages as part of the manifest
- Exception occured during the import of invalid UI flexibility changes
- Wrong ID's had been written to UI flexibility changes in case of (complex) annotation paths like columns of type DataFieldForAnnotation;
    the changes then either disappeared after reload or had still been visible but without any implication on the app

### Security

## [1.78.2] - 2020-07-06

### Removed

- Property `flexibleColumnLayout` is removed from application schema (app.json)
- Property `createWithFilters` is removed from Analytical List Page schema

### Fixed

- Odata V4: Schema enhanced to avoid creation of empty objects in manifest
- Sync between changes file and pages config for ALP
- Generation of correct config file for ALP
- Enhance test coverage for ALP(included import)
- Correct descriptions for properties `title` and `description` in app.json
- Different schema for Analytical Table in case of List Report and Analytical List Page

### Security

## [1.78.1] - 2020-06-24

### Added

- Support of custom sections for object page

### Fixed

- Missing descriptions added to schemas
- Analytical List Page Schema enhanced to show only relevant properties

## [1.78.0] - 2020-06-12

### Added

- new API `importProject()` to create schema and config files

### Changed

- `ServiceMetadata` not required anymore to generate schemas
