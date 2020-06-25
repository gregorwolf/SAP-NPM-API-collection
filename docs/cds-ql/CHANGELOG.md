# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.21.0 - 2019-11-19

### Added

- Acquire now sets session contexts `valid-from` and `valid-to`

### Fixed

- Single ticked entry in function now resolves to `val` instead of `ref`

## Version 1.20.1 - 2019-10-30

### Changed

- Updated version of @sap/cds-sql to 1.19.1
- Updated version of @sap/cds-sqlite to 1.19.1
- Updated version of @sap/cds-hana to 1.19.1

## Version 1.20.0 - 2019-10-29

### Changed

- Improved UPDATE error messages

### Removed

- `npm-shrinkwrap.json`

## Version 1.19.2 - 2019-10-16

### Changed

- `.run` handles arrays in a `Promise.all` fashion

## Version 1.19.1 - 2019-10-08

### Fixed

- Default mainkind in case of compound service (messaging and rest)

## Version 1.19.0 - 2019-10-02

### Changed

- Updated version of @sap/cds-sql to 1.18.0
- Updated version of @sap/cds-sqlite to 1.18.0
- Updated version of @sap/cds-hana to 1.18.0

## Version 1.18.2 - 2019-09-18

### Changed

- Improved error messages

### Fixed

- Disconnect in multi tenancy scenario

## Version 1.18.1 - 2019-09-10

### Fixed

- Model loading

## Version 1.18.0 - 2019-09-09

### Changed

- Improved error messages for statements
- No more model loading, model needs to be passed now

### Fixed

- Nested functions as strings in statements
- Options in connect combined with env variables 

### Removed

- Workaround for `onCond` that used custom object notation

## Version 1.17.0 - 2019-08-21

### Added

- `options.kind` can also be an object
- Service related functions `create`, `insert`, `read`, `update` and `delete` to transaction
- Http related functions `get`, `post`, `put`, `patch` and `delete` to transaction

### Changed

- `.transaction(...).run` can be used with an array of queries

### Fixed

- Update with binary property

## Version 1.16.0 - 2019-07-23

### Changed

- Updated version of @sap/cds-sql to 1.15.0
- Updated version of @sap/cds-sqlite to 1.15.0
- Updated version of @sap/cds-hana to 1.15.0

## Version 1.15.0 - 2019-07-09

### Added

- Enhanced statements to be compatible to specification
- Support for views with parameters

### Removed

- `generateUUID` function and `uuid`dependency
- usage of xsenv for authorization (is provided by cds.env)

## Version 1.14.0 - 2019-06-24

### Fixed

- Bug with nested types in update
- Improved logging of SQLs when DEBUG=true is provided

## Version 1.13.0 - 2019-06-07

### Changed

 - updated generic-pool to 3.7.1

## Version 1.12.0 - 2019-05-24

### Removed

- Removed superficial cache for services

## Version 1.11.1 - 2019-05-16

### Changed

- Updated version of @sap/cds-sql to 1.11.1
- Updated version of @sap/cds-sqlite to 1.11.1
- Updated version of @sap/cds-hana to 1.11.1

## Version 1.11.0 - 2015-05-15

### Changed

- Improved performance by reducing calls to process.nextTick()

## Version 1.10.2 - 2019-05-08

### Fixed

- `service.deploy`

## Version 1.10.1 - 2019-05-07

### Changed

- More resilience towards setting the model manually in service

## Version 1.10.0 - 2019-05-03

### Added

- Functions `create`, `insert`, `read`, `update` and `delete` added to service
- Streaming support via `service.stream()`

### Changed

- instanceof replaced with typeof in some cases

## Version 1.9.0 - 2019-04-16

### Changed

- Select.one now adds property ```one``` instead of ```limit``` to CQN
- Transactions can be created (i.e. are not promisified) although initial model loading is not yet finished

## Version 1.8.0 - 2019-03-29

### Added

- Support for transactions on multiple data sources

- Service.stream() provided for cds.stream()

### Changed

- Entities can be accessed via short name (if only one service in model)

## Version 1.7.1 - 2019-03-19

### Changed

- Updated version of @sap/cds-hana to 1.7.1

## Version 1.7.0 - 2019-03-19

### Added

- Added more transaction functions (`tx.foreach`, `tx.commit`, `tx.rollback`)

### Changed

- Prevent app crash if tenant cannot connect
- Service hands over model to clients

## Version 1.6.0 - 2019-02-25

### Changed

- Updated version of @sap/cds-sql to 1.6.0
- Updated version of @sap/cds-sqlite to 1.6.0
- Updated version of @sap/cds-hana to 1.6.0

## Version 1.5.1 - 2019-02-12

### Added

- Support for sql functions lower, upper, trim, length in $filter and $orderby
- Support `.and` for where conditions

### Fixed

 - Use `.entities` from reflected models

## Version 1.5.0 - 2019-02-06

### Changed

- Minimum node version 8.9.0

## Version 1.4.0 - 2019-01-22

### Changed

- Use latest version of @sap/cds-sql

## Version 1.3.0 - 2019-01-11

### Changed

- Use latest version of uuid and @sap/cds-sql

## Version 1.2.0 - 2018-12-21

### Added

- Allow Arrays in `UPDATE.set()`

## Version 1.1.0 - 2018-12-12

### Added

- Support for `full join` in SELECT
- Support for inline

## Version 1.0.0 - 2018-11-27

### Added

- tenantId can be specified at disconnect
- model property can specified at connect
- entities and model of connection can be accessed

### Changed

- Connect option `driver` is renamed to `kind`
- Connect options regarding connecting moved to 'credentials' property instead of one flat object

### Fixed

- Read drafts with $filter/$search

## Version 0.12.0 - 2018-10-17

### Added

- .where supports object notation with arrays of and/or

### Changed

- Refactoring and changes due to updated dependencies

## Version 0.11.0 - 2018-10-04

### Added

- Support of string values bei fluid usage in .where

### Fixed

- Promise rejection in Service.run

## Version 0.10.0 - 2018-09-17

### Added

- Auto lookup of db service if no configuration given at connect but is available at environmental VCAP_SERVICES
- Support of an array as argument in .where

## Version 0.9.1 - 2018-09-05
   
### Changed

- Improved npm-shrinkwrap

## Version 0.9.0 - 2018-08-28

### Added

- Added support for .columns() in SELECT
- where/or/having support fluid API based on the first argument
- init.js at reuse model can be used by deploy and may export an async function
   
### Changed

- any object filter combination of @sap/xsenv can be used to search the db service

## Version 0.8.1 - 2018-08-09

### Changed

- Require submodules on demand

## Version 0.8.0 - 2018-08-07

### Added

- Pool and Pool resources are evicted by default
- .from, .where and .having support partial CQN
- Inline support at CQN of where and columns in Select
- Functions .values and .entries at INSERT 
- Support of .run().then.run() shortcut
- Debug is printed in case environmental variable DEBUG=true is set
- SELECT(<column>, <column>).from(<table>)
- SELECT.from(<table>).where({<column>: CQN})
- Support for unary and binary expressions in contains
- Support for expand with string/array notation in SELECT.columns (e. g. SELECT.from('Books', ['author', ['name']]))
- Support for excluding in service projection
  
### Changed

- .where and .having can be used multiple times instead of .where.and or .having.and
- .or can be used directly: Instead of calling where.or you can call or.or

### Fixed

- Issue with service renaming attributes
- Issue with 'exists' in object mode

### Removed

- .and for .where/.having

## Version 0.7.0 - 2018-07-11

### Fixed

- Race condition at running block statements in transactional mode
- Brackets are only added to where or having if needed

### Removed

- Statement blocks cannot be run with "sequential" pragma anymore (use "serialized" instead)

## Version 0.6.0 - 2018-07-02

### Added

- Multi tenancy support

## Version 0.5.0 - 2018-06-25

### Added

- support .deploy to automatically set up database artifacts
- support of SQL functions lower and contains in .where
- support for navigation over entities with multiple keys
- SELECT allows partial CQNs as columns
- .run can execute blocks of statements

### Changed

- support for latest CQN spec changes
- renamed .hasPool to .hasSession

### Fixed

- CQL navigation on entity
- CDS injection
- .where with nested ORs and ANDs if provided as object input parameter 

## Version 0.4.1 - 2018-05-03

### Fixed

- Issue with postinstall script in package.json

## Version 0.4.0 - 2018-05-02

### Added

- support DROP statements
- connection pool validates resources before provisioning
- support .foreach
- cds used via injection
- support fluid usage of .where and .having in DML statements

### Changed

- connect options aligned to spec
- support for latest CQN spec changes
- refactored .connect to return undefined instead of Promise
- refactored .acquire to wait for .connect before providing a client

## Version 0.3.0 - 2018-04-16

### Added

- allow CQN as parameter in SELECT.from
- support CREATE statements

## Version 0.2.0 - 2018-03-16
### Added

- support for SELECT.one
- usage of npm-shrinkwrap

### Changed

- made generateUUID synchronous
