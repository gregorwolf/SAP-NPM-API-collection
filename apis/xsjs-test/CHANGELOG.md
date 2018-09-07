# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 2.0.15 - 2018-04-19

### Fixed
- use newer fibers to enable running on newer node.js runtimes

## 2.0.14 - 2018-01-18

### Changed
- cleaned integrity field from npm-shrinkwrap.json to avoid checksum errors on customer side

## 2.0.13 - 2018-01-15

### Changed
- use released version of hdbext 
- added missing double quote for table names in createTestTable 

## 2.0.12 - 2018-01-12

### Added
- CHANGELOG.md

## 2.0.11 - 2018-01-12

### Added
- Node 8 support.

### Fixed
- Update dependencies.

## 2.0.10 - 2018-01-09

### Added
- console output for test results

### Fixed
- jasmine.toEqualObject matches semantic equality
- correct decimal value of a column in a row in resultSet
- expect().toEqual(jasmine.any()) fixed
- Can't wait without a fiber bug
- set package parameter
- sqlExecutor.execQuery (when hdbConnection) returns correct ColumnType and ColumnTypeName
- execSingle works for update statement
