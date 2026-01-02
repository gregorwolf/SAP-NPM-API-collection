# Change Log

- All notable changes to this project are documented in this file.
- The format is based on [Keep a Changelog](https://keepachangelog.com/).
- This project adheres to [Semantic Versioning](https://semver.org/).

## Version 2.1.0 - 2025-12-15

### Added

- Multitenancy Support

## Version 2.0.3 - 2025-10-24

### Fixed

- import with `--name` no longer fails for modules in namespaces like `/FOO/BAR`

## Version 2.0.2 - 2025-07-11

### Fixed

- Add fallback to default language if `cds.context.locale` is not set

## Version 2.0.1 - 2025-06-02

### Fixed

- License link in readme.

## Version 2.0.0 - 2025-05-09

### Changed

- Change license from SAP DEVELOPER LICENSE AGREEMENT '3.1' to '3.2 CAP'. See https://cap.cloud.sap/resources/license/developer-license-3_2_CAP.txt.

## Version 1.4.2 - 2025-03-12

### Fixed

- import: Disambiguate ABAP Type `p` - could mean `RFCTYPE_BCD` or `RFCTYPE_UTCLONG`
- import: Don't set `SY-<...>` system variables as default values - they look like a `cds.String` and can cause inconsistent modeling
- import: Correctly import table types with one anonymous element - resulting in things like `many Integer` etc.

## Version 1.4.1 - 2025-03-05

### Fixed

- Local setup for `client` starting with 0

## Version 1.4.0 - 2025-01-27

### Added

- More information on the needed entitlements for the library.
- `cds import --group <name>` allows to import multiple modules under the given name.  This could be the function group name, application component, or any other string.

## Version 1.3.0 - 2024-12-12

### Added

- Support for Principal Propagation
- Imported services are now marked with `@protocol: 'rfc'`.

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
