# Change Log

- All notable changes to this project are documented in this file.
- The format is based on [Keep a Changelog](http://keepachangelog.com/).
- This project adheres to [Semantic Versioning](http://semver.org/).

## Version 1.2.0 - 2023-11-17

### Changed

- Preview now uses SAP UI5 version 1.120.0 by default

## Version 1.1.0 - 2023-08-31

### Changed

- Fiori preview now pins the UI5 version to be more robust against unforeseen UI changes. It will get updated from time to time.
- The former config key `cds.preview.*` is no longer used.  All config is now in `cds.fiori.*`
- The UI5 version can now be configured using `cds.fiori.preview.ui5.version`.

## Version 1.0.0 - 2023-06-22

### Changed

- `@sap/cds` 7 is required at minimum

## Version 0.1.0 - 2023-06-07

### Added

- Initial release. Includes preview code for SAP Fiori Elements, formerly in `@sap/cds`.
