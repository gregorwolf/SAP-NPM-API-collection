# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 0.11.0 - 2018-10-04

### Added

- Support of string values bei fluid usage in .where

### Fixed

- Promise rejection in Session.run

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
