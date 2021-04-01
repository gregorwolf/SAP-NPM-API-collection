# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.24.0 - 2020-03-19

### Added

- Single timestamp per transaction
- default timeout 5s for acquiring client from pool

### Changed
- deleted concat handling (done in cds-sql)

## Version 1.23.1 - 2020-02-26

### Removed

- `npm-shrinkwrap.json`

## Version 1.23.0 - 2020-02-19

### Changed

- Updated version of @sap/cds-sql to 1.23.0

## Version 1.22.0 - 2020-02-05

### Added

- Allow setting the [journal mode](https://www.sqlite.org/draft/pragma.html#pragma_journal_mode) via credentials.journalMode

### Changed

- Pool options can once again be overwritten

## Version 1.21.0 - 2019-12-10

### Changed

- Pool options always set to default

## Version 1.20.1 - 2019-11-29

### Changed

- Updated version of @sap/cds-sql to 1.20.1

## Version 1.20.0 - 2019-11-19

### Added

- Conversion of hana's `seconds_between` function to `strftime` for sqlite

## Version 1.19.1 - 2019-10-30

### Changed

- Updated version of @sap/cds-sql to 1.19.1

## Version 1.19.0 - 2019-10-29

### Removed

- `npm-shrinkwrap.json`

## Version 1.18.1 - 2019-10-16

### Changed

- Updated version of @sap/cds-sql to 1.18.1

## Version 1.18.0 - 2019-10-02

### Changed

- Updated version of @sap/cds-sql to 1.18.0

## Version 1.17.1 - 2019-09-18

### Changed

- Updated version of @sap/cds-sql to 1.17.1

## Version 1.17.0 - 2019-09-09

### Added

- Streaming into sqlite

## Version 1.16.0 - 2019-08-21

### Changed

- Signature of the Client's constructor

## Version 1.15.0 - 2019-07-23

### Added

- Support multi tenancy for file based database

### Fixed

- Streaming supports `null` values

## Version 1.14.0 - 2019-07-09

### Added

- Named binding parameters
- Support files as db in tenant manager

## Version 1.13.0 - 2019-06-24

### Changed

- Updated version of @sap/cds-sql to 1.13.0

## Version 1.12.0 - 2019-05-24

### Changed

- Updated version of @sap/cds-sql to 1.12.0

## Version 1.11.1 - 2019-05-16

### Changed

- Updated version of @sap/cds-sql to 1.11.1

## Version 1.11.0 - 2019-05-15

### Changed

- Bulk inserts are now traced

## Version 1.10.0 - 2019-05-03

### Added

- Mitigation for loosely typed columns and imported data
- service related functions
- Streaming support via `client.stream()`

## Version 1.9.0 - 2019-04-16

### Changed

- Updated version of @sap/cds-sql to 1.9.0

## Version 1.8.0 - 2019-03-29

### Added

- Support for odata method functions

## Version 1.7.0 - 2019-03-19

### Changed

- Updated version of @sap/cds-sql to 1.7.0

## Version 1.6.0 - 2019-02-25

### Changed

- Updated version of @sap/cds-sql to 1.6.0

## Version 1.5.1 - 2019-02-12

### Changed

- Updated version of @sap/cds-sql to 1.5.1

## Version 1.5.0 - 2019-02-06

### Changed

- Minimum node version 8.9.0
- Improve expand performance

## Version 1.4.0 - 2019-01-22

### Added

- `.execute` supports placeholders in CQN

## Version 1.3.0 - 2019-01-11

### Changed

- Use latest version of @sap/cds-sql

## Version 1.2.0 - 2018-12-21

### Added

- Set default values in case of CREATE, UPSERT and adding a child in deep documents

## Version 1.1.0 - 2018-12-12

### Added

- Support Deep Document CQNs

## Version 1.0.3 - 2018-11-27

### Added

- credentials.database can be used instead of parameters host and url

### Changed

- Throw db error instead of wrapping it in Sql Error
- Throw an error if database is not defined instead of fallback to memory

### Fixed

- Bulk Insert with $user / $now
- Post processing of Binary, Boolean, DateTime and Integer64

## Version 0.10.0 - 2018-10-17

- Refactoring and changes due to updated dependencies 

## Version 0.9.0 - 2018-10-04

### Changed

- Updated version of @sap/cds-sql to 0.11.0

## Version 0.8.0 - 2018-09-17

### Fixed

- CQN queries with contains and expand (limitation: expanded columns cannot be part of contains)

## Version 0.7.1 - 2018-09-05
   
### Changed

- Improved npm-shrinkwrap

## Version 0.7.0 - 2018-08-28

### Changed

- API documentation updated

## Version 0.6.1 - 2018-08-09

### Changed

- Require submodules on demand

## Version 0.6.0 - 2018-08-07

### Added

- cds.Timestamp and cds.DateTime converted into ISO time format when reading
- Support for abstract placeholders #now and #user

### Fixed

- SQL error hides internal error messages and provides details in log

## Version 0.5.0 - 2018-06-25

### Added

- support execution of blocks of statements
- support plain mode of SQL name mapping
 
### Changed

 - Added SQL Error to hide the internal information from other errors

### Fixed

- CDS injection

## Version 0.4.0 - 2018-05-02

### Changed

- connect options aligned to spec
- support for latest CQN spec changes

## Version 0.3.0 - 2018-04-16

### Added

- support CREATE statements

## Version 0.2.0 - 2018-03-16

### Added

- usage of npm-shrinkwrap

### Changed

- improved performance