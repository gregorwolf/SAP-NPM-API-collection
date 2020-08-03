# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

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
