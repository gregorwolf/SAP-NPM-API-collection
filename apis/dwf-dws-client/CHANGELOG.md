# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [2.2.16] - 2018-03-06

### Added

### Changed

- Set Certificate Authority for tasktype load from url

## [2.2.15] - 2018-02-22

### Added

### Changed

- Update dependencies to the latest version

## [2.2.14] - 2018-02-15

### Added

### Changed

- Do not commit procedure execution task in case of errors
- Bump version of used package "@sap/dwf-ndso-backend" to 1.4.0

## [2.2.13] - 2017-11-20

### Added

### Changed

- Make value help services provided in version 2.2.12. backward compatible - include check for url api version of the
dwf service instance.

- Bump version of used package "@sap/dwf-ndso-backend" to 1.1.1 and update other "@sap/..." module versions more
strictly.

## [2.2.12] - 2017-11-13

### Added

- Add CHANGELOG.md (this file) and publishable README.md

### Changed

- Fix database connection leak on task execution.

- Task Types 'Execute Procedure' and 'Execute Flowgraph': Replace the drop-down value help for the selection of the
procedure / flow graph name by the 'contains' filter operator. This functionality is supported by the DWF Runtime
component with version 2.2.2 or higher.

## [2.2.11] - 2017-10-16

### Changed

- Move dataStore tasks to reuse package @sap/dwf-ndso-backend
