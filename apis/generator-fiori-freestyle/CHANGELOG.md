# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [0.9.17] - 2020-12-10
### Added
- The SAP Fiori Worklist V2 and SAP Fiori Worklist V4 floorplan types have been merged into one floorplan.  The version of the OData service provided will determine which application type is generated.
- The generator now supports the SAP API Business Hub for data source selection when using VSCode.

## [0.9.16] - 2020-11-25
### Added
- The generator now supports the API Business Hub for data source selection in the SAP Business Application Studio.

### Fixed
- Adding a new SAP system in VSCode now only gets saved when the application is being generated.  Previously this was happening when proceeding from the data source step.

## [0.9.15] - 2020-11-13
### Added
- Snapshot versions of UI5 now supported on Business Application Studio for internal users.

### Fixed
- Standard SAP UI5 floorplan no longer generates an invalid mock data launch target

## [0.9.13] - 2020-10-27
### Added
- Dropdown selections for services and entities are now sorted alphabetically.
- Module name now allows dash and underscore characters.

### Fixed
- The suggested project folder to use for generating the application in VSCode now defaults to the open workspace folder.

## [0.9.12] - 2020-10-13
### Added
- Added support for plain UI5 freestyle template.

### Fixed
- Sorted SAP system connections alphabetically.
- The Fiori freestyle generator should now be discoverable from the `Install and Explore Generators` tab in the Application Wizard by filtering on `SAP Fiori` shortcuts.

## [0.9.7] - 2020-08-31
### Added
- CHANGELOG.md documenting changes
- Optionally generate annotations.cds file for CAP projects
- Update README.md
- Added tooltip to display generator version number on first step of generator.
- The minimum version of UI5 supported for V4 applications has been updated to 1.81.0

### Fixed
- Technical name in generated freestyle application should now be correctly generated.

## [0.9.6] - 2020-08-21
### Fixed
- Loading of advanced options could timeout on some external systems.
- Updated version of UI5 tooling library

## [0.9.5] - 2020-08-13
### Fixed
- Worklist V4 Application template enabled.

## [0.9.4] - 2020-08-08
### Fixed
- Data source authorisation with Cloud systems  

## [0.9.3] - 2020-08-07
### Added
- Initial version
