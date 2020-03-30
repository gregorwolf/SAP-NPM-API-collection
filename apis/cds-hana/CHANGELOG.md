# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.25.1 - 2020-03-20

### Removed

- Timeout for update and delete statements (if needed: increase libuv's threadpool size via environment variable `UV_THREADPOOL_SIZE`)

## Version 1.25.0 - 2020-03-19

### Added

 - Single timestamp per transaction
 - default timeout 20s for acquiring client from pool

## Version 1.24.0 - 2020-02-26

### Added

- Streaming from draft
- Timeout for update and delete statements to handle locked records (@sap/hana-client only, default: 1s)

## Version 1.23.0 - 2020-02-19

### Changed

- Use `like` instead of `contains` fuzzy search for `$search` queries

## Version 1.22.0 - 2020-02-05

### Added

- Implement statement drop

### Changed

- SESSION_CONTEXT('APPLICATIONUSER') instead of SESSION_CONTEXT('XS_APPLICATIONUSER')
- @sap/hana-client is preferred over hdb

## Version 1.21.0 - 2019-12-10

### Changed

- Updated version of @sap/cds-sql to 1.21.0

## Version 1.20.1 - 2019-11-29

### Changed

- Updated version of @sap/cds-sql to 1.20.1

## Version 1.20.0 - 2019-11-19

### Added

- Method to set session context

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

### Fixed

- Issue in streaming while using hana-client

## Version 1.17.0 - 2019-09-09

### Changed

- Updated version of @sap/cds-sql to 1.17.0

## Version 1.16.0 - 2019-08-21

### Changed

- Signature of the Client's constructor

## Version 1.15.0 - 2019-07-23

### Fixed

- `@sap/hana-client` streaming extension is used only if necessary
- Streaming supports `null` values

## Version 1.14.0 - 2019-07-09

### Changed

- Updated version of @sap/cds-sql to 1.13.0

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

- Improved performance by reducing calls to process.nextTick()

## Version 1.10.0 - 2019-05-03

### Added

- Service related functions

## Version 1.9.0 - 2019-04-16

### Added

- `client.stream()` for streaming large binaries

### Changed

- Make hdb default driver

## Version 1.8.0 - 2019-03-29

### Changed

- Updated version of @sap/cds-sql to 1.8.0

## Version 1.7.1 - 2019-03-19

### Changed

- Updated version of @sap/cds-sql to 1.7.0

## Version 1.7.0 - 2019-03-19

### Removed

- Hana specific SQL generation for SELECT statements in case of 'contains'

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

- `validate_certificate` and `hostname_in_certificate` to override certificate validation in local development mode
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

### Changed

- Throw db error instead of wrapping it in Sql Error
- Use options.credentials instead of options directly

### Fixed

- Post processing of Binary, Boolean and Integer64

## Version 0.10.0 - 2018-10-17

- Refactoring and changes due to updated dependencies 

## Version 0.9.0 - 2018-10-04

### Fixed

 - limit and order when expanding a to many association

## Version 0.8.0 - 2018-09-17

### Changed

- Updated version of @sap/cds-sql to 0.10.0

## Version 0.7.1 - 2018-09-05
   
### Changed

- Improved npm-shrinkwrap

## Version 0.7.0 - 2018-08-28

### Added

- Fallback in case certificate is used instead of ca at connect options

### Changed

- API documentation updated

## Version 0.6.1 - 2018-08-09

### Changed

- Require submodules on demand

## Version 0.6.0 - 2018-08-07

### Added

- Full SQL including eventual parameters to stack trace error message
- Support for abstract placeholders #now and #user
- Support for unary and binary expressions in contains

### Changed

- Increased default option of max. db connection clients to 100

### Fixed

- SQL error hides internal error messages and provides details in log

## Version 0.5.1 - 2018-07-02

### Fixed

 - Escaping of special characters in case of 'contains'

## Version 0.5.0 - 2018-06-25

### Added

 - Hana specific SQL generation for DROP statements
 - Hana specific SQL generation for SELECT statements in case of 'contains'
 - Added SQL Error to hide the internal information from other errors
 - support execution of blocks of statements
 - support plain mode of SQL name mapping

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

- improved performance for expand in case of one-to-many relations
