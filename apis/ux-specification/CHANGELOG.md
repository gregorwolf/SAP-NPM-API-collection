# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.78.9] - 2020-09-11

### Added

- ODataV2: Support for manifest property `defaultLayoutTypeIfExternalNavigation` in Object Page
- ODataV2: Support for manifest property `inlineDelete` for Resposive Tables in List Report and Object Page
- Validity information for various properties

### Changed

- Pipeline settings now support intermediate staging
- New version of Annotation Vocabularies Tools
- Description for createWithFilters

### Deprecated

### Removed

### Fixed

- Added different page type for V4 application
- Import properties correctly for ALP

## [1.78.8] - 2020-08-28

### Added

- importProject API: support of OVP and ALP templates

### Changed

- Use @ui5/flexibility-utils for stringify/parse flex changes

### Deprecated

### Removed

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
