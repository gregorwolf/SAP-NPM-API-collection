# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

## [1.0.9] - 2020-03-17

## [1.0.8] - 2019-08-16

### Fixed
- Fixed an issue with version tag in CSN.

## [1.0.7] - 2019-08-05

### Fixed
- Fixed an issue to pick the Cardinality when Association and AssociatioSet Name are different.
- Added version tag.

## [1.0.6] - 2018-12-04
### Fixed
- Renamed the attribute `targetMax` to `max`.
- Replaced the CSN syntax `onCond` used in associations with `on`.

## [1.0.5] - 2018-10-03
### Fixed
- Edm.DateTimeOffset is now mapped to Date for any property having the attribute `sap:display-format="Date"`.
- Errors generated from this tool is now propagated back to the system process that invokes this tool.

## [1.0.4] - 2018-09-24
### Fixed
- Edm.single is now mapped to DecimalFloat in the HANA database.
- Fixed an issue when mapping navigation in the OData model to `onCond` in the CSN model.
- New option `-p` has been added to ignore `@cds.persistence.skip` annotation specified on any entity in the model.

## [1.0.3] - 2018-08-20
### Fixed
Modified open source dependency to a specific version.

## [1.0.2] - 2018-08-13
### Fixed
Converts inherited complex types and entities from the OData model to CSN equivalent.

## [1.0.1] - 2018-05-30

### Added
The annotation @cds.persistence.skip:true is added for all entities in the converted CSN file.

## [1.0.0] - 2018-05-02
 
### Added
- Performs basic OData V2 metadata validation
- Converts OData V2 entities/properties to CSN entities/elements
- Converts OData V2 complex types to CSN structures
- Converts OData V2 entity navigations to CSN associations
