# Change Log

- All notable changes to this project are documented in this file.
- The format is based on [Keep a Changelog](http://keepachangelog.com/).
- This project adheres to [Semantic Versioning](http://semver.org/).

## Version 1.2.1 - 2024-11-26

### Added

- Link to documentation for the usage in SAP Business Application Studio.


## Version 1.2.0 - 2024-09-26

### Added

- Online import with RFC name instead of metadata json: `cds import --from rfc --name <RfcName>`

## Version 1.1.2 - 2024-09-24

### Fixed

- Only provide Cloud connector's Location ID if maintained in destination

## Version 1.1.2 - 2024-09-24

### Fixed

- Only provide Cloud connector's Location ID if maintained in destination

## Version 1.1.1 - 2024-09-23

### Fixed

- `cds import --from rfc` updates `package.json` file in `srv` folder if existing. The `srv` folder name is determined from `cds.env.folders.srv` or parameter `--out`.
- Cloud connector's Location ID is forwarded the RFC client, if it is set in the destination configuration.

## Version 1.1.0 - 2024-09-18

### Changed

- Use `@sap-rfc/node-rfc-library` ^1.0.0
- Revised annotations for optional parameters.

### Added

- Connectivity/Destination handling on SAP BTP
- Support for a cds import API version `cds.import.from.rfc` in addition to the CLI version `cds import --from rfc`. Requires min version `8.2.2` of `@sap/cds-dk`.


## Version 1.0.0 - 2024-09-06

### Added

- Initial version
